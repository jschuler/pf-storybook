"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addonsTool = void 0;
const react_1 = __importDefault(require("react"));
const components_1 = require("@storybook/components");
const api_1 = require("@storybook/api");
const menuMapper = ({ api, state }) => ({
    isVisible: state.layout.showPanel,
    singleStory: state.singleStory,
    panelPosition: state.layout.panelPosition,
    toggle: () => api.togglePanel(),
});
exports.addonsTool = {
    title: 'addons',
    id: 'addons',
    match: ({ viewMode }) => viewMode === 'story',
    render: () => (react_1.default.createElement(api_1.Consumer, { filter: menuMapper }, ({ isVisible, toggle, singleStory, panelPosition }) => !singleStory &&
        !isVisible && (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(components_1.IconButton, { "aria-label": "Show addons", key: "addons", onClick: toggle, title: "Show addons" },
            react_1.default.createElement(components_1.Icons, { icon: panelPosition === 'bottom' ? 'bottombar' : 'sidebaralt' })))))),
};
