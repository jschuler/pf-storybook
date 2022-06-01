"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const memoizerific_1 = __importDefault(require("memoizerific"));
const api_1 = require("@storybook/api");
const panel_1 = __importDefault(require("../components/panel/panel"));
const createPanelActions = memoizerific_1.default(1)((api) => ({
    onSelect: (panel) => api.setSelectedPanel(panel),
    toggleVisibility: () => api.togglePanel(),
    togglePosition: () => api.togglePanelPosition(),
}));
const mapper = ({ state, api }) => ({
    panels: api.getStoryPanels(),
    selectedPanel: api.getSelectedPanel(),
    panelPosition: state.layout.panelPosition,
    actions: createPanelActions(api),
    shortcuts: api.getShortcutKeys(),
});
const Panel = (props) => (react_1.default.createElement(api_1.Consumer, { filter: mapper }, (customProps) => react_1.default.createElement(panel_1.default, Object.assign({}, props, customProps))));
exports.default = Panel;
