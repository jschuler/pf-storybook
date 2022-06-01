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
exports.Sidebar = void 0;
const global_1 = __importDefault(require("global"));
const react_1 = __importStar(require("react"));
const theming_1 = require("@storybook/theming");
const components_1 = require("@storybook/components");
const Heading_1 = require("./Heading");
const data_1 = require("./data");
const Explorer_1 = require("./Explorer");
const Search_1 = require("./Search");
const SearchResults_1 = require("./SearchResults");
const useLastViewed_1 = require("./useLastViewed");
const { DOCS_MODE } = global_1.default;
const Container = theming_1.styled.nav({
    position: 'absolute',
    zIndex: 1,
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
});
const StyledSpaced = theming_1.styled(components_1.Spaced)({
    paddingBottom: '2.5rem',
});
const CustomScrollArea = theming_1.styled(components_1.ScrollArea)({
    '&&&&& .os-scrollbar-handle:before': {
        left: -12,
    },
    '&&&&& .os-scrollbar-vertical': {
        right: 5,
    },
    padding: 20,
});
const Swap = react_1.default.memo(({ children, condition }) => {
    const [a, b] = react_1.default.Children.toArray(children);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { style: { display: condition ? 'block' : 'none' } }, a),
        react_1.default.createElement("div", { style: { display: condition ? 'none' : 'block' } }, b)));
});
const useCombination = (stories, ready, error, refs) => {
    const hash = react_1.useMemo(() => (Object.assign({ [data_1.DEFAULT_REF_ID]: {
            stories,
            title: null,
            id: data_1.DEFAULT_REF_ID,
            url: 'iframe.html',
            ready,
            error,
        } }, refs)), [refs, stories]);
    return react_1.useMemo(() => ({ hash, entries: Object.entries(hash) }), [hash]);
};
exports.Sidebar = react_1.default.memo(({ storyId = null, refId = data_1.DEFAULT_REF_ID, stories: storiesHash, storiesConfigured, storiesFailed, menu, menuHighlighted = false, enableShortcuts = true, refs = {}, }) => {
    const collapseFn = DOCS_MODE ? data_1.collapseAllStories : data_1.collapseDocsOnlyStories;
    const selected = react_1.useMemo(() => storyId && { storyId, refId }, [storyId, refId]);
    const stories = react_1.useMemo(() => collapseFn(storiesHash), [DOCS_MODE, storiesHash]);
    const adaptedRefs = react_1.useMemo(() => {
        return Object.entries(refs).reduce((acc, [id, ref]) => {
            if (ref.stories) {
                acc[id] = Object.assign(Object.assign({}, ref), { stories: collapseFn(ref.stories) });
            }
            else {
                acc[id] = ref;
            }
            return acc;
        }, {});
    }, [DOCS_MODE, refs]);
    const dataset = useCombination(stories, storiesConfigured, storiesFailed, adaptedRefs);
    const isLoading = !dataset.hash[data_1.DEFAULT_REF_ID].ready;
    const lastViewedProps = useLastViewed_1.useLastViewed(selected);
    return (react_1.default.createElement(Container, { className: "container sidebar-container" },
        react_1.default.createElement(CustomScrollArea, { vertical: true },
            react_1.default.createElement(StyledSpaced, { row: 1.6 },
                react_1.default.createElement(Heading_1.Heading, { className: "sidebar-header", menuHighlighted: menuHighlighted, menu: menu, skipLinkHref: "#storybook-preview-wrapper" }),
                react_1.default.createElement(Search_1.Search, Object.assign({ dataset: dataset, isLoading: isLoading, enableShortcuts: enableShortcuts }, lastViewedProps), ({ query, results, isBrowsing, closeMenu, getMenuProps, getItemProps, highlightedIndex, }) => (react_1.default.createElement(Swap, { condition: isBrowsing },
                    react_1.default.createElement(Explorer_1.Explorer, { dataset: dataset, selected: selected, isLoading: isLoading, isBrowsing: isBrowsing }),
                    react_1.default.createElement(SearchResults_1.SearchResults, { query: query, results: results, closeMenu: closeMenu, getMenuProps: getMenuProps, getItemProps: getItemProps, highlightedIndex: highlightedIndex, enableShortcuts: enableShortcuts, isLoading: isLoading }))))))));
});
