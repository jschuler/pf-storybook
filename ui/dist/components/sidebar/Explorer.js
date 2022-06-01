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
exports.Explorer = void 0;
const react_1 = __importStar(require("react"));
const Refs_1 = require("./Refs");
const useHighlighted_1 = require("./useHighlighted");
const HighlightStyles_1 = require("./HighlightStyles");
exports.Explorer = react_1.default.memo(({ isLoading, isBrowsing, dataset, selected }) => {
    const containerRef = react_1.useRef(null);
    // Track highlighted nodes, keep it in sync with props and enable keyboard navigation
    const [highlighted, setHighlighted, highlightedRef] = useHighlighted_1.useHighlighted({
        containerRef,
        isLoading,
        isBrowsing,
        dataset,
        selected,
    });
    return (react_1.default.createElement("div", { ref: containerRef, id: "storybook-explorer-tree", "data-highlighted-ref-id": highlighted === null || highlighted === void 0 ? void 0 : highlighted.refId, "data-highlighted-item-id": highlighted === null || highlighted === void 0 ? void 0 : highlighted.itemId },
        highlighted && react_1.default.createElement(HighlightStyles_1.HighlightStyles, Object.assign({}, highlighted)),
        dataset.entries.map(([refId, ref]) => (react_1.default.createElement(Refs_1.Ref, Object.assign({}, ref, { key: refId, isLoading: isLoading, isBrowsing: isBrowsing, selectedStoryId: (selected === null || selected === void 0 ? void 0 : selected.refId) === ref.id ? selected.storyId : null, highlightedRef: highlightedRef, setHighlighted: setHighlighted }))))));
});
