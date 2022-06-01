"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const api_1 = require("@storybook/api");
const Sidebar_1 = require("../components/sidebar/Sidebar");
const menu_1 = require("./menu");
const Sidebar = react_1.default.memo(() => {
    const mapper = ({ state, api }) => {
        const { ui: { name, url, enableShortcuts }, viewMode, storyId, refId, layout: { showToolbar, isFullscreen, showPanel, showNav }, storiesHash, storiesConfigured, storiesFailed, refs, } = state;
        const menu = menu_1.useMenu(api, showToolbar, isFullscreen, showPanel, showNav, enableShortcuts);
        return {
            title: name,
            url,
            stories: storiesHash,
            storiesFailed,
            storiesConfigured,
            refs,
            storyId,
            refId,
            viewMode,
            menu,
            menuHighlighted: api.versionUpdateAvailable(),
            enableShortcuts,
        };
    };
    return (react_1.default.createElement(api_1.Consumer, { filter: mapper }, (fromState) => {
        return react_1.default.createElement(Sidebar_1.Sidebar, Object.assign({}, fromState));
    }));
});
exports.default = Sidebar;
