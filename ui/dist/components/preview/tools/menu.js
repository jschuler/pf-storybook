"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuTool = void 0;
const react_1 = __importDefault(require("react"));
const components_1 = require("@storybook/components");
const api_1 = require("@storybook/api");
const menuMapper = ({ api, state }) => ({
    isVisible: state.layout.showNav,
    singleStory: state.singleStory,
    toggle: () => api.toggleNav(),
});
exports.menuTool = {
    title: 'menu',
    id: 'menu',
    match: ({ viewMode }) => viewMode === 'story',
    render: () => (react_1.default.createElement(api_1.Consumer, { filter: menuMapper }, ({ isVisible, toggle, singleStory }) => !singleStory &&
        !isVisible && (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(components_1.IconButton, { "aria-label": "Show sidebar", key: "menu", onClick: toggle, title: "Show sidebar" },
            react_1.default.createElement(components_1.Icons, { icon: "menu" })),
        react_1.default.createElement(components_1.Separator, null))))),
};
