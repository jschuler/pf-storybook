"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoaderBlock = exports.EmptyBlock = exports.ErrorBlock = exports.AuthBlock = void 0;
const global_1 = __importDefault(require("global"));
const react_1 = __importStar(require("react"));
const components_1 = require("@storybook/components");
const client_logger_1 = require("@storybook/client-logger");
const theming_1 = require("@storybook/theming");
const Loader_1 = require("./Loader");
const { window: globalWindow, document } = global_1.default;
const TextStyle = theming_1.styled.div(({ theme }) => ({
    fontSize: theme.typography.size.s2 - 1,
    lineHeight: '20px',
    margin: 0,
}));
const Text = theming_1.styled.div(({ theme }) => ({
    fontSize: theme.typography.size.s2 - 1,
    lineHeight: '20px',
    margin: 0,
    code: {
        fontSize: theme.typography.size.s1,
    },
    ul: {
        paddingLeft: 20,
        marginTop: 8,
        marginBottom: 8,
    },
}));
const ErrorDisplay = theming_1.styled.pre({
    width: 420,
    boxSizing: 'border-box',
    borderRadius: 8,
    overflow: 'auto',
    whiteSpace: 'pre',
}, ({ theme }) => ({
    color: theme.color.dark,
}));
const ErrorName = theming_1.styled.strong(({ theme }) => ({
    color: theme.color.orange,
}));
const ErrorImportant = theming_1.styled.strong(({ theme }) => ({
    color: theme.color.ancillary,
    textDecoration: 'underline',
}));
const ErrorDetail = theming_1.styled.em(({ theme }) => ({
    color: theme.color.mediumdark,
}));
const firstLineRegex = /(Error): (.*)\n/;
const linesRegex = /at (?:(.*) )?\(?(.+)\)?/;
const ErrorFormatter = ({ error }) => {
    if (!error) {
        return react_1.default.createElement(react_1.Fragment, null, "This error has no stack or message");
    }
    if (!error.stack) {
        return react_1.default.createElement(react_1.Fragment, null, error.message || 'This error has no stack or message');
    }
    const input = error.stack.toString();
    const match = input.match(firstLineRegex);
    if (!match) {
        return react_1.default.createElement(react_1.Fragment, null, input);
    }
    const [, type, name] = match;
    const rawLines = input.split(/\n/).slice(1);
    const [, ...lines] = rawLines
        .map((line) => {
        const r = line.match(linesRegex);
        return r ? { name: r[1], location: r[2].replace(document.location.origin, '') } : null;
    })
        .filter(Boolean);
    return (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement("span", null, type),
        ": ",
        react_1.default.createElement(ErrorName, null, name),
        react_1.default.createElement("br", null),
        lines.map((l, i) => l.name ? (
        // eslint-disable-next-line react/no-array-index-key
        react_1.default.createElement(react_1.Fragment, { key: i },
            '  ',
            "at ",
            react_1.default.createElement(ErrorImportant, null, l.name),
            " (",
            react_1.default.createElement(ErrorDetail, null, l.location),
            ")",
            react_1.default.createElement("br", null))) : (
        // eslint-disable-next-line react/no-array-index-key
        react_1.default.createElement(react_1.Fragment, { key: i },
            '  ',
            "at ",
            react_1.default.createElement(ErrorDetail, null, l.location),
            react_1.default.createElement("br", null))))));
};
exports.AuthBlock = ({ loginUrl, id, }) => {
    const [isAuthAttempted, setAuthAttempted] = react_1.useState(false);
    const refresh = react_1.useCallback(() => {
        globalWindow.document.location.reload();
    }, []);
    const open = react_1.useCallback((e) => {
        e.preventDefault();
        const childWindow = globalWindow.open(loginUrl, `storybook_auth_${id}`, 'resizable,scrollbars');
        // poll for window to close
        const timer = setInterval(() => {
            if (!childWindow) {
                client_logger_1.logger.error('unable to access loginUrl window');
                clearInterval(timer);
            }
            else if (childWindow.closed) {
                clearInterval(timer);
                setAuthAttempted(true);
            }
        }, 1000);
    }, []);
    return (react_1.default.createElement(Loader_1.Contained, null,
        react_1.default.createElement(components_1.Spaced, null, isAuthAttempted ? (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement(Text, null,
                "Authentication on ",
                react_1.default.createElement("strong", null, loginUrl),
                " concluded. Refresh the page to fetch this Storybook."),
            react_1.default.createElement("div", null,
                react_1.default.createElement(components_1.Button, { small: true, gray: true, onClick: refresh },
                    react_1.default.createElement(components_1.Icons, { icon: "sync" }),
                    "Refresh now")))) : (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement(Text, null, "Sign in to browse this Storybook."),
            react_1.default.createElement("div", null,
                react_1.default.createElement(components_1.Button, { small: true, gray: true, onClick: open },
                    react_1.default.createElement(components_1.Icons, { icon: "lock" }),
                    "Sign in")))))));
};
exports.ErrorBlock = ({ error }) => (react_1.default.createElement(Loader_1.Contained, null,
    react_1.default.createElement(components_1.Spaced, null,
        react_1.default.createElement(TextStyle, null,
            "Oh no! Something went wrong loading this Storybook.",
            react_1.default.createElement("br", null),
            react_1.default.createElement(components_1.WithTooltip, { trigger: "click", closeOnClick: false, tooltip: react_1.default.createElement(ErrorDisplay, null,
                    react_1.default.createElement(ErrorFormatter, { error: error })) },
                react_1.default.createElement(components_1.Link, { isButton: true },
                    "View error ",
                    react_1.default.createElement(components_1.Icons, { icon: "arrowdown" }))),
            ' ',
            react_1.default.createElement(components_1.Link, { withArrow: true, href: "https://storybook.js.org/docs", cancel: false, target: "_blank" }, "View docs")))));
const FlexSpaced = theming_1.styled(components_1.Spaced)({
    display: 'flex',
});
const WideSpaced = theming_1.styled(components_1.Spaced)({
    flex: 1,
});
exports.EmptyBlock = ({ isMain }) => (react_1.default.createElement(Loader_1.Contained, null,
    react_1.default.createElement(FlexSpaced, { col: 1 },
        react_1.default.createElement(WideSpaced, null,
            react_1.default.createElement(Text, null, isMain ? (react_1.default.createElement(react_1.default.Fragment, null,
                "Oh no! Your Storybook is empty. Possible reasons why:",
                react_1.default.createElement("ul", null,
                    react_1.default.createElement("li", null,
                        "The glob specified in ",
                        react_1.default.createElement("code", null, "main.js"),
                        " isn't correct."),
                    react_1.default.createElement("li", null, "No stories are defined in your story files.")),
                ' ')) : (react_1.default.createElement(react_1.default.Fragment, null, "Yikes! Something went wrong loading these stories.")))))));
exports.LoaderBlock = ({ isMain }) => (react_1.default.createElement(Loader_1.Contained, null,
    react_1.default.createElement(Loader_1.Loader, { size: isMain ? 17 : 5 })));
