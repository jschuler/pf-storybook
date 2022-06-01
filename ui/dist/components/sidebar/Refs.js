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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ref = void 0;
const react_1 = __importStar(require("react"));
const api_1 = require("@storybook/api");
const theming_1 = require("@storybook/theming");
const polished_1 = require("polished");
const RefBlocks_1 = require("./RefBlocks");
const RefIndicator_1 = require("./RefIndicator");
const Tree_1 = require("./Tree");
const TreeNode_1 = require("./TreeNode");
const data_1 = require("./data");
const utils_1 = require("./utils");
const Wrapper = theming_1.styled.div(({ isMain }) => ({
    position: 'relative',
    marginLeft: -20,
    marginRight: -20,
    marginTop: isMain ? undefined : 0,
}));
const RefHead = theming_1.styled.div(({ theme }) => ({
    fontWeight: theme.typography.weight.black,
    fontSize: theme.typography.size.s2 - 1,
    // Similar to ListItem.tsx
    textDecoration: 'none',
    lineHeight: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'transparent',
    width: '100%',
    marginTop: 20,
    paddingTop: 16,
    borderTop: `1px solid ${theme.appBorderColor}`,
    color: theme.base === 'light' ? theme.color.defaultText : polished_1.transparentize(0.2, theme.color.defaultText),
}));
const RefTitle = theming_1.styled.span(({ theme }) => ({
    display: 'block',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    flex: 1,
    overflow: 'hidden',
    marginLeft: 2,
}));
const CollapseButton = theming_1.styled.button(({ theme }) => ({
    // Reset button
    background: 'transparent',
    border: '1px solid transparent',
    borderRadius: 26,
    outline: 'none',
    boxSizing: 'content-box',
    cursor: 'pointer',
    position: 'relative',
    textAlign: 'left',
    lineHeight: 'normal',
    font: 'inherit',
    color: 'inherit',
    display: 'flex',
    padding: 3,
    paddingLeft: 1,
    paddingRight: 12,
    margin: 0,
    marginLeft: -20,
    overflow: 'hidden',
    'span:first-of-type': {
        marginTop: 5,
    },
    '&:focus': {
        borderColor: theme.color.secondary,
        'span:first-of-type': {
            borderLeftColor: theme.color.secondary,
        },
    },
}));
exports.Ref = react_1.default.memo((props) => {
    const api = api_1.useStorybookApi();
    const { stories, id: refId, title = refId, isLoading: isLoadingMain, isBrowsing, selectedStoryId, highlightedRef, setHighlighted, loginUrl, type, expanded = true, ready, error, } = props;
    const length = react_1.useMemo(() => (stories ? Object.keys(stories).length : 0), [stories]);
    const indicatorRef = react_1.useRef(null);
    const isMain = refId === data_1.DEFAULT_REF_ID;
    const isLoadingInjected = type === 'auto-inject' && !ready;
    const isLoading = isLoadingMain || isLoadingInjected || type === 'unknown';
    const isError = !!error;
    const isEmpty = !isLoading && length === 0;
    const isAuthRequired = !!loginUrl && length === 0;
    const state = utils_1.getStateType(isLoading, isAuthRequired, isError, isEmpty);
    const [isExpanded, setExpanded] = react_1.useState(expanded);
    const handleClick = react_1.useCallback(() => setExpanded((value) => !value), [setExpanded]);
    const setHighlightedItemId = react_1.useCallback((itemId) => setHighlighted({ itemId, refId }), [setHighlighted]);
    const onSelectStoryId = react_1.useCallback((storyId) => api && api.selectStory(storyId, undefined, { ref: !isMain && refId }), [api, isMain, refId]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        isMain || (react_1.default.createElement(RefHead, { "aria-label": `${isExpanded ? 'Hide' : 'Show'} ${title} stories`, "aria-expanded": isExpanded },
            react_1.default.createElement(CollapseButton, { "data-action": "collapse-ref", onClick: handleClick },
                react_1.default.createElement(TreeNode_1.CollapseIcon, { isExpanded: isExpanded }),
                react_1.default.createElement(RefTitle, { title: title }, title)),
            react_1.default.createElement(RefIndicator_1.RefIndicator, Object.assign({}, props, { state: state, ref: indicatorRef })))),
        isExpanded && (react_1.default.createElement(Wrapper, { "data-title": title, isMain: isMain },
            state === 'auth' && react_1.default.createElement(RefBlocks_1.AuthBlock, { id: refId, loginUrl: loginUrl }),
            state === 'error' && react_1.default.createElement(RefBlocks_1.ErrorBlock, { error: error }),
            state === 'loading' && react_1.default.createElement(RefBlocks_1.LoaderBlock, { isMain: isMain }),
            state === 'empty' && react_1.default.createElement(RefBlocks_1.EmptyBlock, { isMain: isMain }),
            state === 'ready' && (react_1.default.createElement(Tree_1.Tree, { isBrowsing: isBrowsing, isMain: isMain, refId: refId, data: stories, selectedStoryId: selectedStoryId, onSelectStoryId: onSelectStoryId, highlightedRef: highlightedRef, setHighlightedItemId: setHighlightedItemId }))))));
});
