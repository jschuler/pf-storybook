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
exports.Search = void 0;
const api_1 = require("@storybook/api");
const theming_1 = require("@storybook/theming");
const components_1 = require("@storybook/components");
const downshift_1 = __importDefault(require("downshift"));
const fuse_js_1 = __importDefault(require("fuse.js"));
const global_1 = __importDefault(require("global"));
const polished_1 = require("polished");
const react_1 = __importStar(require("react"));
const data_1 = require("./data");
const types_1 = require("./types");
const utils_1 = require("./utils");
const { document } = global_1.default;
const DEFAULT_MAX_SEARCH_RESULTS = 50;
const options = {
    shouldSort: true,
    tokenize: true,
    findAllMatches: true,
    includeScore: true,
    includeMatches: true,
    threshold: 0.2,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
        { name: 'name', weight: 0.7 },
        { name: 'path', weight: 0.3 },
    ],
};
const ScreenReaderLabel = theming_1.styled.label({
    position: 'absolute',
    left: -10000,
    top: 'auto',
    width: 1,
    height: 1,
    overflow: 'hidden',
});
const SearchIcon = theming_1.styled(components_1.Icons)(({ theme }) => ({
    width: 12,
    height: 12,
    position: 'absolute',
    top: 8,
    left: 10,
    zIndex: 1,
    pointerEvents: 'none',
    color: theme.textMutedColor,
}));
const SearchField = theming_1.styled.div(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    '&:focus-within svg': {
        color: theme.color.defaultText,
    },
}));
const Input = theming_1.styled.input(({ theme }) => ({
    appearance: 'none',
    height: 28,
    paddingLeft: 28,
    paddingRight: 28,
    border: `1px solid ${polished_1.transparentize(0.6, theme.color.mediumdark)}`,
    background: 'transparent',
    borderRadius: 28,
    fontSize: `${theme.typography.size.s1}px`,
    fontFamily: 'inherit',
    transition: 'all 150ms',
    color: theme.color.defaultText,
    '&:focus, &:active': {
        outline: 0,
        borderColor: theme.color.secondary,
        background: theme.background.app,
    },
    '&::placeholder': {
        color: theme.textMutedColor,
    },
    '&:valid ~ code, &:focus ~ code': {
        display: 'none',
    },
    '&:invalid ~ svg': {
        display: 'none',
    },
    '&:valid ~ svg': {
        display: 'block',
    },
    '&::-ms-clear': {
        display: 'none',
    },
    '&::-webkit-search-decoration, &::-webkit-search-cancel-button, &::-webkit-search-results-button, &::-webkit-search-results-decoration': {
        display: 'none',
    },
}));
const FocusKey = theming_1.styled.code(({ theme }) => ({
    position: 'absolute',
    top: 6,
    right: 12,
    width: 16,
    height: 16,
    zIndex: 1,
    lineHeight: '17px',
    textAlign: 'center',
    fontSize: '11px',
    background: 'rgba(0,0,0,0.1)',
    color: theme.textMutedColor,
    borderRadius: 2,
    userSelect: 'none',
    pointerEvents: 'none',
}));
const ClearIcon = theming_1.styled(components_1.Icons)(({ theme }) => ({
    width: 16,
    height: 16,
    padding: 4,
    position: 'absolute',
    top: 6,
    right: 8,
    zIndex: 1,
    background: 'rgba(0,0,0,0.1)',
    borderRadius: 16,
    color: theme.color.defaultText,
    cursor: 'pointer',
}));
const FocusContainer = theming_1.styled.div({ outline: 0 });
exports.Search = react_1.default.memo(({ children, dataset, isLoading = false, enableShortcuts = true, getLastViewed, clearLastViewed, initialQuery = '', }) => {
    const api = api_1.useStorybookApi();
    const inputRef = react_1.useRef(null);
    const [inputPlaceholder, setPlaceholder] = react_1.useState('Find components');
    const [allComponents, showAllComponents] = react_1.useState(false);
    const selectStory = react_1.useCallback((id, refId) => {
        if (api)
            api.selectStory(id, undefined, { ref: refId !== data_1.DEFAULT_REF_ID && refId });
        inputRef.current.blur();
        showAllComponents(false);
    }, [api, inputRef, showAllComponents, data_1.DEFAULT_REF_ID]);
    const list = react_1.useMemo(() => {
        return dataset.entries.reduce((acc, [refId, { stories }]) => {
            if (stories) {
                acc.push(...Object.values(stories).map((item) => utils_1.searchItem(item, dataset.hash[refId])));
            }
            return acc;
        }, []);
    }, [dataset]);
    const fuse = react_1.useMemo(() => new fuse_js_1.default(list, options), [list]);
    const getResults = react_1.useCallback((input) => {
        if (!input)
            return [];
        let results = [];
        const resultIds = new Set();
        const distinctResults = fuse.search(input).filter(({ item }) => {
            if (!(item.isComponent || item.isLeaf) || resultIds.has(item.parent))
                return false;
            resultIds.add(item.id);
            return true;
        });
        if (distinctResults.length) {
            results = distinctResults.slice(0, allComponents ? 1000 : DEFAULT_MAX_SEARCH_RESULTS);
            if (distinctResults.length > DEFAULT_MAX_SEARCH_RESULTS && !allComponents) {
                results.push({
                    showAll: () => showAllComponents(true),
                    totalCount: distinctResults.length,
                    moreCount: distinctResults.length - DEFAULT_MAX_SEARCH_RESULTS,
                });
            }
        }
        return results;
    }, [allComponents, fuse]);
    const stateReducer = react_1.useCallback((state, changes) => {
        switch (changes.type) {
            case downshift_1.default.stateChangeTypes.blurInput: {
                return Object.assign(Object.assign({}, changes), { 
                    // Prevent clearing the input on blur
                    inputValue: state.inputValue, 
                    // Return to the tree view after selecting an item
                    isOpen: state.inputValue && !state.selectedItem, selectedItem: null });
            }
            case downshift_1.default.stateChangeTypes.mouseUp: {
                // Prevent clearing the input on refocus
                return {};
            }
            case downshift_1.default.stateChangeTypes.keyDownEscape: {
                if (state.inputValue) {
                    // Clear the inputValue, but don't return to the tree view
                    return Object.assign(Object.assign({}, changes), { inputValue: '', isOpen: true, selectedItem: null });
                }
                // When pressing escape a second time, blur the input and return to the tree view
                inputRef.current.blur();
                return Object.assign(Object.assign({}, changes), { isOpen: false, selectedItem: null });
            }
            case downshift_1.default.stateChangeTypes.clickItem:
            case downshift_1.default.stateChangeTypes.keyDownEnter: {
                if (types_1.isSearchResult(changes.selectedItem)) {
                    const { id, refId } = changes.selectedItem.item;
                    selectStory(id, refId);
                    // Return to the tree view, but keep the input value
                    return Object.assign(Object.assign({}, changes), { inputValue: state.inputValue, isOpen: false });
                }
                if (types_1.isExpandType(changes.selectedItem)) {
                    changes.selectedItem.showAll();
                    // Downshift should completely ignore this
                    return {};
                }
                if (types_1.isClearType(changes.selectedItem)) {
                    changes.selectedItem.clearLastViewed();
                    inputRef.current.blur();
                    // Nothing to see anymore, so return to the tree view
                    return { isOpen: false };
                }
                if (types_1.isCloseType(changes.selectedItem)) {
                    inputRef.current.blur();
                    // Return to the tree view
                    return { isOpen: false };
                }
                return changes;
            }
            case downshift_1.default.stateChangeTypes.changeInput: {
                // Reset the "show more" state whenever the input changes
                showAllComponents(false);
                return changes;
            }
            default:
                return changes;
        }
    }, [inputRef, selectStory, showAllComponents]);
    return (react_1.default.createElement(downshift_1.default, { initialInputValue: initialQuery, stateReducer: stateReducer, 
        // @ts-ignore
        itemToString: (result) => { var _a; return ((_a = result === null || result === void 0 ? void 0 : result.item) === null || _a === void 0 ? void 0 : _a.name) || ''; } }, ({ isOpen, openMenu, closeMenu, inputValue, clearSelection, getInputProps, getItemProps, getLabelProps, getMenuProps, getRootProps, highlightedIndex, }) => {
        const input = inputValue ? inputValue.trim() : '';
        let results = input ? getResults(input) : [];
        const lastViewed = !input && getLastViewed();
        if (lastViewed && lastViewed.length) {
            results = lastViewed.reduce((acc, { storyId, refId }) => {
                const data = dataset.hash[refId];
                if (data && data.stories && data.stories[storyId]) {
                    const story = data.stories[storyId];
                    const item = story.isLeaf && !story.isComponent && !story.isRoot
                        ? data.stories[story.parent]
                        : story;
                    // prevent duplicates
                    if (!acc.some((res) => res.item.refId === refId && res.item.id === item.id)) {
                        acc.push({ item: utils_1.searchItem(item, dataset.hash[refId]), matches: [], score: 0 });
                    }
                }
                return acc;
            }, []);
            results.push({ closeMenu });
            if (results.length > 0) {
                results.push({ clearLastViewed });
            }
        }
        const inputProps = getInputProps({
            id: 'storybook-explorer-searchfield',
            ref: inputRef,
            required: true,
            type: 'search',
            placeholder: inputPlaceholder,
            onFocus: () => {
                openMenu();
                setPlaceholder('Type to find...');
            },
            onBlur: () => setPlaceholder('Find components'),
        });
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(ScreenReaderLabel, Object.assign({}, getLabelProps()), "Search for components"),
            react_1.default.createElement(SearchField, Object.assign({}, getRootProps({ refKey: '' }, { suppressRefError: true }), { className: "search-field" }),
                react_1.default.createElement(SearchIcon, { icon: "search" }),
                react_1.default.createElement(Input, Object.assign({}, inputProps)),
                enableShortcuts && react_1.default.createElement(FocusKey, null, "/"),
                react_1.default.createElement(ClearIcon, { icon: "cross", onClick: () => clearSelection() })),
            react_1.default.createElement(FocusContainer, { tabIndex: 0, id: "storybook-explorer-menu" }, children({
                query: input,
                results,
                isBrowsing: !isOpen && document.activeElement !== inputRef.current,
                closeMenu,
                getMenuProps,
                getItemProps,
                highlightedIndex,
            }))));
    }));
});
