"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useExpanded = void 0;
const api_1 = require("@storybook/api");
const core_events_1 = require("@storybook/core-events");
const global_1 = __importDefault(require("global"));
const throttle_1 = __importDefault(require("lodash/throttle"));
const react_1 = require("react");
const keybinding_1 = require("../../keybinding");
const utils_1 = require("./utils");
const { document } = global_1.default;
const initializeExpanded = ({ refId, data, initialExpanded, highlightedRef, rootIds, }) => {
    var _a, _b;
    const highlightedAncestors = ((_a = highlightedRef.current) === null || _a === void 0 ? void 0 : _a.refId) === refId
        ? utils_1.getAncestorIds(data, (_b = highlightedRef.current) === null || _b === void 0 ? void 0 : _b.itemId)
        : [];
    return [...rootIds, ...highlightedAncestors].reduce((acc, id) => Object.assign(acc, { [id]: id in initialExpanded ? initialExpanded[id] : true }), {});
};
const noop = () => { };
exports.useExpanded = ({ containerRef, isBrowsing, refId, data, initialExpanded, rootIds, highlightedRef, setHighlightedItemId, selectedStoryId, onSelectStoryId, }) => {
    const api = api_1.useStorybookApi();
    // Track the set of currently expanded nodes within this tree.
    // Root nodes are expanded by default.
    const [expanded, setExpanded] = react_1.useReducer((state, { ids, value }) => ids.reduce((acc, id) => Object.assign(acc, { [id]: value }), Object.assign({}, state)), { refId, data, highlightedRef, rootIds, initialExpanded }, initializeExpanded);
    const getElementByDataItemId = react_1.useCallback((id) => { var _a; return (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.querySelector(`[data-item-id="${id}"]`); }, [containerRef]);
    const highlightElement = react_1.useCallback((element) => {
        setHighlightedItemId(element.getAttribute('data-item-id'));
        utils_1.scrollIntoView(element);
    }, [setHighlightedItemId]);
    const updateExpanded = react_1.useCallback(({ ids, value }) => {
        var _a;
        setExpanded({ ids, value });
        if (ids.length === 1) {
            const element = (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.querySelector(`[data-item-id="${ids[0]}"][data-ref-id="${refId}"]`);
            if (element)
                highlightElement(element);
        }
    }, [containerRef, highlightElement, refId]);
    // Expand the whole ancestry of the currently selected story whenever it changes.
    react_1.useEffect(() => {
        setExpanded({ ids: utils_1.getAncestorIds(data, selectedStoryId), value: true });
    }, [data, selectedStoryId]);
    const collapseAll = react_1.useCallback(() => {
        const ids = Object.keys(data).filter((id) => !rootIds.includes(id));
        setExpanded({ ids, value: false });
    }, [data, rootIds]);
    const expandAll = react_1.useCallback(() => {
        setExpanded({ ids: Object.keys(data), value: true });
    }, [data]);
    react_1.useEffect(() => {
        if (!api)
            return noop;
        api.on(core_events_1.STORIES_COLLAPSE_ALL, collapseAll);
        api.on(core_events_1.STORIES_EXPAND_ALL, expandAll);
        return () => {
            api.off(core_events_1.STORIES_COLLAPSE_ALL, collapseAll);
            api.off(core_events_1.STORIES_EXPAND_ALL, expandAll);
        };
    }, [api, collapseAll, expandAll]);
    // Expand, collapse or select nodes in the tree using keyboard shortcuts.
    react_1.useEffect(() => {
        const menuElement = document.getElementById('storybook-explorer-menu');
        // Even though we ignore repeated events, use throttle because IE doesn't support event.repeat.
        const navigateTree = throttle_1.default((event) => {
            var _a, _b;
            const highlightedItemId = ((_a = highlightedRef.current) === null || _a === void 0 ? void 0 : _a.refId) === refId && ((_b = highlightedRef.current) === null || _b === void 0 ? void 0 : _b.itemId);
            if (!isBrowsing || !containerRef.current || !highlightedItemId || event.repeat)
                return;
            if (!keybinding_1.matchesModifiers(false, event))
                return;
            const isEnter = keybinding_1.matchesKeyCode('Enter', event);
            const isSpace = keybinding_1.matchesKeyCode('Space', event);
            const isArrowLeft = keybinding_1.matchesKeyCode('ArrowLeft', event);
            const isArrowRight = keybinding_1.matchesKeyCode('ArrowRight', event);
            if (!(isEnter || isSpace || isArrowLeft || isArrowRight))
                return;
            const highlightedElement = getElementByDataItemId(highlightedItemId);
            if (!highlightedElement || highlightedElement.getAttribute('data-ref-id') !== refId)
                return;
            const target = event.target;
            if (!utils_1.isAncestor(menuElement, target) && !utils_1.isAncestor(target, menuElement))
                return;
            if (target.hasAttribute('data-action')) {
                if (isEnter || isSpace)
                    return;
                target.blur();
            }
            const type = highlightedElement.getAttribute('data-nodetype');
            if ((isEnter || isSpace) && ['component', 'story', 'document'].includes(type)) {
                onSelectStoryId(highlightedItemId);
            }
            const isExpanded = highlightedElement.getAttribute('aria-expanded');
            if (isArrowLeft) {
                if (isExpanded === 'true') {
                    // The highlighted node is expanded, so we collapse it.
                    setExpanded({ ids: [highlightedItemId], value: false });
                    return;
                }
                const parentId = highlightedElement.getAttribute('data-parent-id');
                const parentElement = parentId && getElementByDataItemId(parentId);
                if (parentElement && parentElement.getAttribute('data-highlightable') === 'true') {
                    // The highlighted node isn't expanded, so we move the highlight to its parent instead.
                    highlightElement(parentElement);
                    return;
                }
                // The parent can't be highlighted, which means it must be a root.
                // The highlighted node is already collapsed, so we collapse its descendants.
                setExpanded({ ids: utils_1.getDescendantIds(data, highlightedItemId, true), value: false });
                return;
            }
            if (isArrowRight) {
                if (isExpanded === 'false') {
                    updateExpanded({ ids: [highlightedItemId], value: true });
                }
                else if (isExpanded === 'true') {
                    updateExpanded({ ids: utils_1.getDescendantIds(data, highlightedItemId, true), value: true });
                }
            }
        }, 60);
        document.addEventListener('keydown', navigateTree);
        return () => document.removeEventListener('keydown', navigateTree);
    }, [
        containerRef,
        isBrowsing,
        refId,
        data,
        highlightedRef,
        setHighlightedItemId,
        onSelectStoryId,
    ]);
    return [expanded, updateExpanded];
};
