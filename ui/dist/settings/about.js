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
exports.AboutScreen = void 0;
const react_1 = __importStar(require("react"));
const semver_1 = __importDefault(require("@storybook/semver"));
const theming_1 = require("@storybook/theming");
const markdown_to_jsx_1 = __importDefault(require("markdown-to-jsx"));
const components_1 = require("@storybook/components");
const SettingsFooter_1 = __importDefault(require("./SettingsFooter"));
const Header = theming_1.styled.header(({ theme }) => ({
    marginBottom: 20,
    fontSize: theme.typography.size.m3,
    fontWeight: theme.typography.weight.black,
    alignItems: 'center',
    display: 'flex',
    '> svg': {
        height: 32,
        width: 'auto',
        marginRight: 8,
    },
}));
const Subheading = theming_1.styled.span(({ theme }) => ({
    letterSpacing: '0.35em',
    textTransform: 'uppercase',
    fontWeight: theme.typography.weight.black,
    fontSize: theme.typography.size.s2 - 1,
    lineHeight: '24px',
    color: theme.color.mediumdark,
}));
const SubheadingLink = theming_1.styled(components_1.Link)(({ theme }) => ({
    fontSize: theme.typography.size.s1,
}));
const Subheader = theming_1.styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '.75rem',
});
const UpdateMessage = theming_1.styled.div(({ status, theme }) => {
    if (status === 'positive') {
        return { background: theme.background.positive, color: theme.color.positive };
    }
    if (status === 'negative') {
        return { background: theme.background.negative, color: theme.color.negative };
    }
    return { background: '#EAF3FC', color: theme.color.darkest };
}, ({ theme }) => ({
    fontWeight: theme.typography.weight.bold,
    fontSize: theme.typography.size.s2,
    padding: '10px 20px',
    marginBottom: 24,
    borderRadius: theme.appBorderRadius,
    border: `1px solid ${theme.appBorderColor}`,
    textAlign: 'center',
}));
const ErrorMessage = theming_1.styled.div(({ theme }) => ({
    fontWeight: theme.typography.weight.bold,
    textAlign: 'center',
}));
const Upgrade = theming_1.styled.div(({ theme }) => ({
    marginTop: 20,
    borderTop: `1px solid ${theme.appBorderColor}`,
}));
const Container = theming_1.styled.div({
    padding: `3rem 20px`,
    maxWidth: 600,
    margin: '0 auto',
});
const AboutScreen = ({ latest = null, current }) => {
    const canUpdate = latest && semver_1.default.gt(latest.version, current.version);
    let updateMessage;
    if (latest) {
        if (canUpdate) {
            updateMessage = (react_1.default.createElement(UpdateMessage, { status: "positive" },
                "Storybook ",
                latest.version,
                " is available. Upgrade from ",
                current.version,
                " now."));
        }
        else {
            updateMessage = (react_1.default.createElement(UpdateMessage, { status: "neutral" }, "Looking good! You're up to date."));
        }
    }
    else {
        updateMessage = (react_1.default.createElement(UpdateMessage, { status: "negative" }, "Oops! The latest version of Storybook couldn't be fetched."));
    }
    return (react_1.default.createElement(Container, null,
        react_1.default.createElement(Header, null,
            react_1.default.createElement(components_1.StorybookIcon, null),
            "Storybook ",
            current.version),
        updateMessage,
        latest ? (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement(Subheader, null,
                react_1.default.createElement(Subheading, null,
                    latest.version,
                    " Changelog"),
                react_1.default.createElement(SubheadingLink, { secondary: true, href: "https://github.com/storybookjs/storybook/blob/next/CHANGELOG.md", withArrow: true, cancel: false, target: "_blank" }, "Read full changelog")),
            react_1.default.createElement(components_1.DocumentWrapper, null,
                react_1.default.createElement(markdown_to_jsx_1.default, null, latest.info.plain)))) : (react_1.default.createElement(ErrorMessage, null,
            react_1.default.createElement(components_1.Link, { href: "https://github.com/storybookjs/storybook/releases", target: "_blank", withArrow: true, secondary: true, cancel: false }, "Check Storybook's release history"))),
        canUpdate && (react_1.default.createElement(Upgrade, null,
            react_1.default.createElement(components_1.DocumentWrapper, null,
                react_1.default.createElement("p", null,
                    react_1.default.createElement("b", null, "Upgrade all Storybook packages to latest:")),
                react_1.default.createElement(components_1.SyntaxHighlighter, { language: "bash", copyable: true, padded: true, bordered: true }, "npx sb upgrade")))),
        react_1.default.createElement(SettingsFooter_1.default, null)));
};
exports.AboutScreen = AboutScreen;
