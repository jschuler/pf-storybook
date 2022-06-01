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
exports.SearchResults = void 0;
const theming_1 = require("@storybook/theming");
const components_1 = require("@storybook/components");
const global_1 = __importDefault(require("global"));
const react_1 = __importStar(require("react"));
const TreeNode_1 = require("./TreeNode");
const types_1 = require("./types");
const utils_1 = require("./utils");
const keybinding_1 = require("../../keybinding");
const { document, DOCS_MODE } = global_1.default;
const ResultsList = theming_1.styled.ol({
    listStyle: 'none',
    margin: 0,
    marginLeft: -20,
    marginRight: -20,
    padding: 0,
});
const ResultRow = theming_1.styled.li(({ theme, isHighlighted }) => ({
    display: 'block',
    margin: 0,
    padding: 0,
    background: isHighlighted ? theme.background.hoverable : 'transparent',
    cursor: 'pointer',
    'a:hover, button:hover': {
        background: 'transparent',
    },
}));
const NoResults = theming_1.styled.div(({ theme }) => ({
    marginTop: 20,
    textAlign: 'center',
    fontSize: `${theme.typography.size.s2 - 1}px`,
    lineHeight: `18px`,
    color: theme.color.defaultText,
    small: {
        color: theme.barTextColor,
        fontSize: `${theme.typography.size.s1}px`,
    },
}));
const Mark = theming_1.styled.mark(({ theme }) => ({
    background: 'transparent',
    color: theme.color.secondary,
}));
const ActionRow = theming_1.styled(ResultRow)({
    display: 'flex',
    padding: '6px 19px',
    alignItems: 'center',
});
const BackActionRow = theming_1.styled(ActionRow)({
    marginTop: 8,
});
const ActionLabel = theming_1.styled.span(({ theme }) => ({
    flexGrow: 1,
    color: theme.color.mediumdark,
    fontSize: `${theme.typography.size.s1}px`,
}));
const ActionIcon = theming_1.styled(components_1.Icons)(({ theme }) => ({
    display: 'inline-block',
    width: 10,
    height: 10,
    marginRight: 6,
    color: theme.color.mediumdark,
}));
const ActionKey = theming_1.styled.code(({ theme }) => ({
    minWidth: 16,
    height: 16,
    lineHeight: '17px',
    textAlign: 'center',
    fontSize: '11px',
    background: 'rgba(0,0,0,0.1)',
    color: theme.textMutedColor,
    borderRadius: 2,
    userSelect: 'none',
    pointerEvents: 'none',
}));
const Highlight = react_1.default.memo(({ children, match }) => {
    if (!match)
        return react_1.default.createElement(react_1.default.Fragment, null, children);
    const { value, indices } = match;
    const { nodes: result } = indices.reduce(({ cursor, nodes }, [start, end], index, { length }) => {
        /* eslint-disable react/no-array-index-key */
        nodes.push(react_1.default.createElement("span", { key: `${index}-0` }, value.slice(cursor, start)));
        nodes.push(react_1.default.createElement(Mark, { key: `${index}-1` }, value.slice(start, end + 1)));
        if (index === length - 1) {
            nodes.push(react_1.default.createElement("span", { key: `${index}-2` }, value.slice(end + 1)));
        }
        /* eslint-enable react/no-array-index-key */
        return { cursor: end + 1, nodes };
    }, { cursor: 0, nodes: [] });
    return react_1.default.createElement(react_1.default.Fragment, null, result);
});
const Result = react_1.default.memo((_a) => {
    var { item, matches, icon, onClick } = _a, props = __rest(_a, ["item", "matches", "icon", "onClick"]);
    const click = react_1.useCallback((event) => {
        event.preventDefault();
        onClick(event);
    }, [onClick]);
    const nameMatch = matches.find((match) => match.key === 'name');
    const pathMatches = matches.filter((match) => match.key === 'path');
    const label = (react_1.default.createElement("div", { className: "search-result-item--label" },
        react_1.default.createElement("strong", null,
            react_1.default.createElement(Highlight, { match: nameMatch }, item.name)),
        react_1.default.createElement(TreeNode_1.Path, null, item.path.map((group, index) => (
        // eslint-disable-next-line react/no-array-index-key
        react_1.default.createElement("span", { key: index },
            react_1.default.createElement(Highlight, { match: pathMatches.find((match) => match.arrayIndex === index) }, group)))))));
    const title = `${item.path.join(' / ')} / ${item.name}`;
    if (DOCS_MODE) {
        return (react_1.default.createElement(ResultRow, Object.assign({}, props),
            react_1.default.createElement(TreeNode_1.DocumentNode, { depth: 0, onClick: click, href: utils_1.getLink(item.id, item.refId), title: title }, label)));
    }
    const TreeNode = item.isComponent ? TreeNode_1.ComponentNode : TreeNode_1.StoryNode;
    return (react_1.default.createElement(ResultRow, Object.assign({}, props),
        react_1.default.createElement(TreeNode, { isExpanded: false, depth: 0, onClick: onClick, title: title }, label)));
});
exports.SearchResults = react_1.default.memo(({ query, results, closeMenu, getMenuProps, getItemProps, highlightedIndex, isLoading = false, enableShortcuts = true, }) => {
    react_1.useEffect(() => {
        const handleEscape = (event) => {
            if (!enableShortcuts || isLoading || event.repeat)
                return;
            if (keybinding_1.matchesModifiers(false, event) && keybinding_1.matchesKeyCode('Escape', event)) {
                const target = event.target;
                if ((target === null || target === void 0 ? void 0 : target.id) === 'storybook-explorer-searchfield')
                    return; // handled by downshift
                event.preventDefault();
                closeMenu();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [enableShortcuts, isLoading]);
    return (react_1.default.createElement(ResultsList, Object.assign({}, getMenuProps()),
        results.length > 0 && !query && (react_1.default.createElement("li", null,
            react_1.default.createElement(TreeNode_1.RootNode, { className: "search-result-recentlyOpened" }, "Recently opened"))),
        results.length === 0 && query && (react_1.default.createElement("li", null,
            react_1.default.createElement(NoResults, null,
                react_1.default.createElement("strong", null, "No components found"),
                react_1.default.createElement("br", null),
                react_1.default.createElement("small", null, "Find components by name or path.")))),
        results.map((result, index) => {
            if (types_1.isCloseType(result)) {
                return (react_1.default.createElement(BackActionRow, Object.assign({}, result, getItemProps({ key: index, index, item: result }), { isHighlighted: highlightedIndex === index, className: "search-result-back" }),
                    react_1.default.createElement(ActionIcon, { icon: "arrowleft" }),
                    react_1.default.createElement(ActionLabel, null, "Back to components"),
                    react_1.default.createElement(ActionKey, null, "ESC")));
            }
            if (types_1.isClearType(result)) {
                return (react_1.default.createElement(ActionRow, Object.assign({}, result, getItemProps({ key: index, index, item: result }), { isHighlighted: highlightedIndex === index, className: "search-result-clearHistory" }),
                    react_1.default.createElement(ActionIcon, { icon: "trash" }),
                    react_1.default.createElement(ActionLabel, null, "Clear history")));
            }
            if (types_1.isExpandType(result)) {
                return (react_1.default.createElement(ActionRow, Object.assign({}, result, getItemProps({ key: index, index, item: result }), { isHighlighted: highlightedIndex === index, className: "search-result-more" }),
                    react_1.default.createElement(ActionIcon, { icon: "plus" }),
                    react_1.default.createElement(ActionLabel, null,
                        "Show ",
                        result.moreCount,
                        " more results")));
            }
            const { item } = result;
            const key = `${item.refId}::${item.id}`;
            return (react_1.default.createElement(Result, Object.assign({}, result, getItemProps({ key, index, item: result }), { isHighlighted: highlightedIndex === index, className: "search-result-item" })));
        })));
});
