"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const theming_1 = require("@storybook/theming");
const components_1 = require("@storybook/components");
const Footer = theming_1.styled.div(({ theme }) => ({
    display: 'flex',
    paddingTop: 20,
    marginTop: 20,
    borderTop: `1px solid ${theme.appBorderColor}`,
    fontWeight: theme.typography.weight.bold,
    '& > * + *': {
        marginLeft: 20,
    },
}));
const SettingsFooter = (props) => (react_1.default.createElement(Footer, Object.assign({}, props),
    react_1.default.createElement(components_1.Link, { secondary: true, href: "https://storybook.js.org", cancel: false, target: "_blank" }, "Docs"),
    react_1.default.createElement(components_1.Link, { secondary: true, href: "https://github.com/storybookjs/storybook", cancel: false, target: "_blank" }, "GitHub"),
    react_1.default.createElement(components_1.Link, { secondary: true, href: "https://storybook.js.org/support", cancel: false, target: "_blank" }, "Support")));
exports.default = SettingsFooter;
