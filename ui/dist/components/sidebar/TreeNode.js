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
exports.StoryNode = exports.DocumentNode = exports.ComponentNode = exports.GroupNode = exports.RootNode = exports.Path = exports.CollapseIcon = void 0;
const theming_1 = require("@storybook/theming");
const components_1 = require("@storybook/components");
const global_1 = __importDefault(require("global"));
const polished_1 = require("polished");
const react_1 = __importDefault(require("react"));
const { DOCS_MODE } = global_1.default;
exports.CollapseIcon = theming_1.styled.span(({ theme, isExpanded }) => ({
    display: 'inline-block',
    width: 0,
    height: 0,
    marginTop: 6,
    marginLeft: 8,
    marginRight: 5,
    color: polished_1.transparentize(0.4, theme.color.mediumdark),
    borderTop: '3px solid transparent',
    borderBottom: '3px solid transparent',
    borderLeft: `3px solid`,
    transform: isExpanded ? 'rotateZ(90deg)' : 'none',
    transition: 'transform .1s ease-out',
}));
const iconColors = {
    light: {
        document: DOCS_MODE ? 'secondary' : '#ff8300',
        bookmarkhollow: 'seafoam',
        component: 'secondary',
        folder: 'ultraviolet',
    },
    dark: {
        document: DOCS_MODE ? 'secondary' : 'gold',
        bookmarkhollow: 'seafoam',
        component: 'secondary',
        folder: 'primary',
    },
};
const isColor = (theme, color) => color in theme.color;
const TypeIcon = theming_1.styled(components_1.Icons)({
    width: 12,
    height: 12,
    padding: 1,
    marginTop: 3,
    marginRight: 5,
    flex: '0 0 auto',
}, ({ theme, icon, symbol = icon }) => {
    const colors = theme.base === 'dark' ? iconColors.dark : iconColors.light;
    const color = colors[symbol];
    return { color: isColor(theme, color) ? theme.color[color] : color };
});
const BranchNode = theming_1.styled.button(({ theme, depth = 0, isExpandable = false }) => ({
    width: '100%',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'start',
    textAlign: 'left',
    padding: 3,
    paddingLeft: `${(isExpandable ? 2 : 18) + depth * 16}px`,
    color: 'inherit',
    fontSize: `${theme.typography.size.s2 - 1}px`,
    background: 'transparent',
    '&:hover, &:focus': {
        background: theme.background.hoverable,
        outline: 'none',
    },
}));
const LeafNode = theming_1.styled.a(({ theme, depth = 0 }) => ({
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'start',
    padding: 3,
    paddingLeft: `${18 + depth * 16}px`,
    fontSize: `${theme.typography.size.s2 - 1}px`,
    textDecoration: 'none',
    color: theme.color.defaultText,
    background: 'transparent',
    '&:hover, &:focus': {
        outline: 'none',
        background: theme.background.hoverable,
    },
    '&[data-selected="true"]': {
        color: theme.color.lightest,
        background: theme.color.secondary,
        fontWeight: theme.typography.weight.bold,
        '&:hover, &:focus': {
            background: theme.color.secondary,
        },
        svg: { color: theme.color.lightest },
    },
}));
exports.Path = theming_1.styled.span(({ theme }) => ({
    display: 'grid',
    justifyContent: 'start',
    gridAutoColumns: 'auto',
    gridAutoFlow: 'column',
    color: theme.textMutedColor,
    fontSize: `${theme.typography.size.s1 - 1}px`,
    '& > span': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    '& > span + span': {
        position: 'relative',
        marginLeft: 4,
        paddingLeft: 7,
        '&:before': {
            content: "'/'",
            position: 'absolute',
            left: 0,
        },
    },
}));
exports.RootNode = theming_1.styled.div(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    marginTop: 16,
    marginBottom: 4,
    fontSize: `${theme.typography.size.s1 - 1}px`,
    fontWeight: theme.typography.weight.black,
    lineHeight: '16px',
    minHeight: 20,
    letterSpacing: '0.35em',
    textTransform: 'uppercase',
    color: theme.color.mediumdark,
}));
exports.GroupNode = react_1.default.memo((_a) => {
    var { children, isExpanded = false, isExpandable = false } = _a, props = __rest(_a, ["children", "isExpanded", "isExpandable"]);
    return (react_1.default.createElement(BranchNode, Object.assign({ isExpandable: isExpandable, tabIndex: -1 }, props),
        isExpandable ? react_1.default.createElement(exports.CollapseIcon, { isExpanded: isExpanded }) : null,
        react_1.default.createElement(TypeIcon, { symbol: "folder", color: "primary" }),
        children));
});
exports.ComponentNode = react_1.default.memo((_a) => {
    var { theme, children, isExpanded, isExpandable, isSelected } = _a, props = __rest(_a, ["theme", "children", "isExpanded", "isExpandable", "isSelected"]);
    return (react_1.default.createElement(BranchNode, Object.assign({ isExpandable: isExpandable, tabIndex: -1 }, props),
        isExpandable && react_1.default.createElement(exports.CollapseIcon, { isExpanded: isExpanded }),
        react_1.default.createElement(TypeIcon, { symbol: "component", color: "secondary" }),
        children));
});
exports.DocumentNode = react_1.default.memo((_a) => {
    var { theme, children } = _a, props = __rest(_a, ["theme", "children"]);
    return (react_1.default.createElement(LeafNode, Object.assign({ tabIndex: -1 }, props),
        react_1.default.createElement(TypeIcon, { symbol: "document" }),
        children));
});
exports.StoryNode = react_1.default.memo((_a) => {
    var { theme, children } = _a, props = __rest(_a, ["theme", "children"]);
    return (react_1.default.createElement(LeafNode, Object.assign({ tabIndex: -1 }, props),
        react_1.default.createElement(TypeIcon, { symbol: "bookmarkhollow" }),
        children));
});
