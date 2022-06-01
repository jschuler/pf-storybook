"use strict";
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
exports.Heading = void 0;
const react_1 = __importDefault(require("react"));
const theming_1 = require("@storybook/theming");
const components_1 = require("@storybook/components");
const Brand_1 = require("./Brand");
const Menu_1 = require("./Menu");
const BrandArea = theming_1.styled.div(({ theme }) => ({
    fontSize: theme.typography.size.s2,
    fontWeight: theme.typography.weight.bold,
    color: theme.color.defaultText,
    marginRight: 20,
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    minHeight: 22,
    '& > *': {
        maxWidth: '100%',
        height: 'auto',
        display: 'block',
        flex: '1 1 auto',
    },
}));
const HeadingWrapper = theming_1.styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    minHeight: 28,
});
const SkipToCanvasLink = theming_1.styled(components_1.Button)(({ theme }) => ({
    display: 'none',
    '@media (min-width: 600px)': {
        display: 'block',
        position: 'absolute',
        width: '100%',
        padding: '10px 15px',
        fontSize: theme.typography.size.s1,
        zIndex: 1,
        transform: 'translate(0,-100px)',
        '&:focus': {
            transform: 'translate(0)',
        },
    },
}));
exports.Heading = (_a) => {
    var { menuHighlighted = false, menu, skipLinkHref } = _a, props = __rest(_a, ["menuHighlighted", "menu", "skipLinkHref"]);
    return (react_1.default.createElement(HeadingWrapper, Object.assign({}, props),
        skipLinkHref && (react_1.default.createElement(SkipToCanvasLink, { secondary: true, isLink: true, tabIndex: 0, href: skipLinkHref }, "Skip to canvas")),
        react_1.default.createElement(BrandArea, null,
            react_1.default.createElement(Brand_1.Brand, null)),
        react_1.default.createElement(Menu_1.SidebarMenu, { menu: menu, isHighlighted: menuHighlighted })));
};
