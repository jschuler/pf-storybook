"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHighlighted = void 0;
const global_1 = __importDefault(require("global"));
const react_1 = require("react");
const keybinding_1 = require("../../keybinding");
const utils_1 = require("./utils");
const { document, window: globalWindow } = global_1.default;
const fromSelection = (selection) => selection ? { itemId: selection.storyId, refId: selection.refId } : null;
exports.useHighlighted = ({ containerRef, isLoading, isBrowsing, dataset, selected, }) => {
    const initialHighlight = fromSelection(selected);
    const highlightedRef = react_1.useRef(initialHighlight);
    const [highlighted, setHighlighted] = react_1.useState(initialHighlight);
    const updateHighlighted = react_1.useCallback((highlight) => {
        highlightedRef.current = highlight;
        setHighlighted(highlight);
    }, [highlightedRef]);
    // Sets the highlighted node and scrolls it into view, using DOM elements as reference
    const highlightElement = react_1.useCallback((element, center = false) => {
        const itemId = element.getAttribute('data-item-id');
        const refId = element.getAttribute('data-ref-id');
        if (!itemId || !refId)
            return;
        updateHighlighted({ itemId, refId });
        utils_1.scrollIntoView(element, center);
    }, [updateHighlighted]);
    // Highlight and scroll to the selected story whenever the selection or dataset changes
    react_1.useEffect(() => {
        const highlight = fromSelection(selected);
        updateHighlighted(highlight);
        if (highlight) {
            const { itemId, refId } = highlight;
            setTimeout(() => {
                var _a;
                utils_1.scrollIntoView((_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.querySelector(`[data-item-id="${itemId}"][data-ref-id="${refId}"]`), true // make sure it's clearly visible by centering it
                );
            }, 0);
        }
    }, [dataset, highlightedRef, containerRef, selected]);
    // Highlight nodes up/down the tree using arrow keys
    react_1.useEffect(() => {
        const menuElement = document.getElementById('storybook-explorer-menu');
        let lastRequestId;
        const navigateTree = (event) => {
            if (isLoading || !isBrowsing || !containerRef.current)
                return; // allow event.repeat
            if (!keybinding_1.matchesModifiers(false, event))
                return;
            const isArrowUp = keybinding_1.matchesKeyCode('ArrowUp', event);
            const isArrowDown = keybinding_1.matchesKeyCode('ArrowDown', event);
            if (!(isArrowUp || isArrowDown))
                return;
            event.preventDefault();
            const requestId = globalWindow.requestAnimationFrame(() => {
                globalWindow.cancelAnimationFrame(lastRequestId);
                lastRequestId = requestId;
                const target = event.target;
                if (!utils_1.isAncestor(menuElement, target) && !utils_1.isAncestor(target, menuElement))
                    return;
                if (target.hasAttribute('data-action'))
                    target.blur();
                const highlightable = Array.from(containerRef.current.querySelectorAll('[data-highlightable=true]'));
                const currentIndex = highlightable.findIndex((el) => {
                    var _a, _b;
                    return el.getAttribute('data-item-id') === ((_a = highlightedRef.current) === null || _a === void 0 ? void 0 : _a.itemId) &&
                        el.getAttribute('data-ref-id') === ((_b = highlightedRef.current) === null || _b === void 0 ? void 0 : _b.refId);
                });
                const nextIndex = utils_1.cycle(highlightable, currentIndex, isArrowUp ? -1 : 1);
                const didRunAround = isArrowUp ? nextIndex === highlightable.length - 1 : nextIndex === 0;
                highlightElement(highlightable[nextIndex], didRunAround);
            });
        };
        document.addEventListener('keydown', navigateTree);
        return () => document.removeEventListener('keydown', navigateTree);
    }, [isLoading, isBrowsing, highlightedRef, highlightElement]);
    return [highlighted, updateHighlighted, highlightedRef];
};
