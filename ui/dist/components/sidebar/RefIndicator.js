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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefIndicator = exports.MessageWrapper = void 0;
const global_1 = __importDefault(require("global"));
const react_1 = __importStar(require("react"));
const components_1 = require("@storybook/components");
const theming_1 = require("@storybook/theming");
const polished_1 = require("polished");
const api_1 = require("@storybook/api");
const Menu_1 = require("./Menu");
const { document, window: globalWindow } = global_1.default;
const IndicatorPlacement = theming_1.styled.aside(({ theme }) => ({
    height: 16,
    display: 'flex',
    alignItems: 'center',
    '& > * + *': {
        marginLeft: theme.layoutMargin,
    },
}));
const IndicatorClickTarget = theming_1.styled.button(({ theme }) => ({
    height: 20,
    width: 20,
    padding: 0,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    outline: 'none',
    border: '1px solid transparent',
    borderRadius: '100%',
    cursor: 'pointer',
    color: theme.base === 'light'
        ? polished_1.transparentize(0.3, theme.color.defaultText)
        : polished_1.transparentize(0.6, theme.color.defaultText),
    '&:hover': {
        color: theme.barSelectedColor,
    },
    '&:focus': {
        color: theme.barSelectedColor,
        borderColor: theme.color.secondary,
    },
    svg: {
        height: 10,
        width: 10,
        transition: 'all 150ms ease-out',
        color: 'inherit',
    },
}));
const MessageTitle = theming_1.styled.span(({ theme }) => ({
    fontWeight: theme.typography.weight.bold,
}));
const Message = theming_1.styled.a(({ theme }) => ({
    textDecoration: 'none',
    lineHeight: '16px',
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    color: theme.color.defaultText,
    '&:not(:last-child)': {
        borderBottom: `1px solid ${theme.appBorderColor}`,
    },
    '&:hover': {
        background: theme.background.hoverable,
        color: theme.color.darker,
    },
    '&:link': {
        color: theme.color.darker,
    },
    '&:active': {
        color: theme.color.darker,
    },
    '&:focus': {
        color: theme.color.darker,
    },
    '& > *': {
        flex: 1,
    },
    '& > svg': {
        marginTop: 3,
        width: 16,
        height: 16,
        marginRight: 10,
        flex: 'unset',
    },
}));
exports.MessageWrapper = theming_1.styled.div({
    width: 280,
    boxSizing: 'border-box',
    borderRadius: 8,
    overflow: 'hidden',
});
const BlueIcon = theming_1.styled(components_1.Icons)(({ theme }) => ({
    color: theme.color.secondary,
}));
const YellowIcon = theming_1.styled(components_1.Icons)(({ theme }) => ({
    color: theme.color.gold,
}));
const RedIcon = theming_1.styled(components_1.Icons)(({ theme }) => ({
    color: theme.color.negative,
}));
const GreenIcon = theming_1.styled(components_1.Icons)(({ theme }) => ({
    color: theme.color.green,
}));
const Version = theming_1.styled.div(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    fontSize: theme.typography.size.s1,
    fontWeight: theme.typography.weight.regular,
    color: theme.base === 'light'
        ? polished_1.transparentize(0.3, theme.color.defaultText)
        : polished_1.transparentize(0.6, theme.color.defaultText),
    '& > * + *': {
        marginLeft: 4,
    },
    svg: {
        height: 10,
        width: 10,
    },
}));
const CurrentVersion = ({ url, versions }) => {
    const currentVersionId = react_1.useMemo(() => {
        const c = Object.entries(versions).find(([k, v]) => v === url);
        return c && c[0] ? c[0] : 'current';
    }, [url, versions]);
    return (react_1.default.createElement(Version, null,
        react_1.default.createElement("span", null, currentVersionId),
        react_1.default.createElement(components_1.Icons, { icon: "chevrondown" })));
};
exports.RefIndicator = react_1.default.memo(react_1.forwardRef((_a, forwardedRef) => {
    var { state } = _a, ref = __rest(_a, ["state"]);
    const api = api_1.useStorybookApi();
    const list = react_1.useMemo(() => Object.values(ref.stories || {}), [ref.stories]);
    const componentCount = react_1.useMemo(() => list.filter((v) => v.isComponent).length, [list]);
    const leafCount = react_1.useMemo(() => list.filter((v) => v.isLeaf).length, [list]);
    const changeVersion = react_1.useCallback(((event, item) => {
        event.preventDefault();
        api.changeRefVersion(ref.id, item.href);
    }), []);
    return (react_1.default.createElement(IndicatorPlacement, { ref: forwardedRef },
        react_1.default.createElement(components_1.WithTooltip, { placement: "bottom-start", trigger: "click", tooltip: react_1.default.createElement(exports.MessageWrapper, null,
                react_1.default.createElement(components_1.Spaced, { row: 0 },
                    state === 'loading' && react_1.default.createElement(LoadingMessage, { url: ref.url }),
                    (state === 'error' || state === 'empty') && (react_1.default.createElement(ErrorOccurredMessage, { url: ref.url })),
                    state === 'ready' && (react_1.default.createElement(ReadyMessage, Object.assign({}, { url: ref.url, componentCount, leafCount }))),
                    state === 'auth' && react_1.default.createElement(LoginRequiredMessage, Object.assign({}, ref)),
                    ref.type === 'auto-inject' && state !== 'error' && (react_1.default.createElement(PerformanceDegradedMessage, null)),
                    state !== 'loading' && react_1.default.createElement(ReadDocsMessage, null))) },
            react_1.default.createElement(IndicatorClickTarget, { "data-action": "toggle-indicator", "aria-label": "toggle indicator" },
                react_1.default.createElement(components_1.Icons, { icon: "globe" }))),
        ref.versions && Object.keys(ref.versions).length ? (react_1.default.createElement(components_1.WithTooltip, { placement: "bottom-start", trigger: "click", tooltip: react_1.default.createElement(components_1.TooltipLinkList, { links: Object.entries(ref.versions).map(([id, href]) => ({
                    left: href === ref.url ? react_1.default.createElement(Menu_1.MenuItemIcon, { icon: "check" }) : react_1.default.createElement("span", null),
                    id,
                    title: id,
                    href,
                    onClick: changeVersion,
                })) }) },
            react_1.default.createElement(CurrentVersion, { url: ref.url, versions: ref.versions }))) : null));
}));
const ReadyMessage = ({ url, componentCount, leafCount }) => (react_1.default.createElement(Message, { href: url.replace(/\/?$/, '/index.html'), target: "_blank" },
    react_1.default.createElement(BlueIcon, { icon: "globe" }),
    react_1.default.createElement("div", null,
        react_1.default.createElement(MessageTitle, null, "View external Storybook"),
        react_1.default.createElement("div", null,
            "Explore ",
            componentCount,
            " components and ",
            leafCount,
            " stories in a new browser tab."))));
const LoginRequiredMessage = ({ loginUrl, id }) => {
    const open = react_1.useCallback((e) => {
        e.preventDefault();
        const childWindow = globalWindow.open(loginUrl, `storybook_auth_${id}`, 'resizable,scrollbars');
        // poll for window to close
        const timer = setInterval(() => {
            if (!childWindow) {
                clearInterval(timer);
            }
            else if (childWindow.closed) {
                clearInterval(timer);
                document.location.reload();
            }
        }, 1000);
    }, []);
    return (react_1.default.createElement(Message, { onClick: open },
        react_1.default.createElement(YellowIcon, { icon: "lock" }),
        react_1.default.createElement("div", null,
            react_1.default.createElement(MessageTitle, null, "Log in required"),
            react_1.default.createElement("div", null, "You need to authenticate to view this Storybook's components."))));
};
const ReadDocsMessage = () => (react_1.default.createElement(Message, { href: "https://storybook.js.org", target: "_blank" },
    react_1.default.createElement(GreenIcon, { icon: "document" }),
    react_1.default.createElement("div", null,
        react_1.default.createElement(MessageTitle, null, "Read Composition docs"),
        react_1.default.createElement("div", null, "Learn how to combine multiple Storybooks into one."))));
const ErrorOccurredMessage = ({ url }) => (react_1.default.createElement(Message, { href: url.replace(/\/?$/, '/index.html'), target: "_blank" },
    react_1.default.createElement(RedIcon, { icon: "alert" }),
    react_1.default.createElement("div", null,
        react_1.default.createElement(MessageTitle, null, "Something went wrong"),
        react_1.default.createElement("div", null, "This external Storybook didn't load. Debug it in a new tab now."))));
const LoadingMessage = ({ url }) => (react_1.default.createElement(Message, { href: url.replace(/\/?$/, '/index.html'), target: "_blank" },
    react_1.default.createElement(BlueIcon, { icon: "time" }),
    react_1.default.createElement("div", null,
        react_1.default.createElement(MessageTitle, null, "Please wait"),
        react_1.default.createElement("div", null, "This Storybook is loading."))));
const PerformanceDegradedMessage = () => (react_1.default.createElement(Message, { href: "https://storybook.js.org/docs", target: "_blank" },
    react_1.default.createElement(YellowIcon, { icon: "lightning" }),
    react_1.default.createElement("div", null,
        react_1.default.createElement(MessageTitle, null, "Reduce lag"),
        react_1.default.createElement("div", null, "Learn how to speed up Composition performance."))));
