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
exports.default = void 0;
const api_1 = require("@storybook/api");
const components_1 = require("@storybook/components");
const router_1 = require("@storybook/router");
const theming_1 = require("@storybook/theming");
const global_1 = __importDefault(require("global"));
const react_1 = __importStar(require("react"));
const about_page_1 = require("./about_page");
const release_notes_page_1 = require("./release_notes_page");
const shortcuts_page_1 = require("./shortcuts_page");
const keybinding_1 = require("../keybinding");
const { document } = global_1.default;
const TabBarButton = react_1.default.memo(({ changeTab, id, title }) => (react_1.default.createElement(router_1.Location, null, ({ path }) => {
    const active = path.includes(`settings/${id}`);
    return (react_1.default.createElement(components_1.TabButton, { id: `tabbutton-${id}`, className: ['tabbutton'].concat(active ? ['tabbutton-active'] : []).join(' '), type: "button", key: "id", active: active, onClick: () => changeTab(id), role: "tab" }, title));
})));
const Content = theming_1.styled(components_1.ScrollArea)({
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'auto',
}, ({ theme }) => ({
    background: theme.background.content,
}));
const Pages = ({ changeTab, onClose, enableShortcuts = true, hasReleaseNotes = false }) => {
    react_1.default.useEffect(() => {
        const handleEscape = (event) => {
            if (!enableShortcuts || event.repeat)
                return;
            if (keybinding_1.matchesModifiers(false, event) && keybinding_1.matchesKeyCode('Escape', event)) {
                event.preventDefault();
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);
    return (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(components_1.FlexBar, { border: true },
            react_1.default.createElement(components_1.TabBar, { role: "tablist" },
                react_1.default.createElement(TabBarButton, { id: "about", title: "About", changeTab: changeTab }),
                hasReleaseNotes && (react_1.default.createElement(TabBarButton, { id: "release-notes", title: "Release notes", changeTab: changeTab })),
                react_1.default.createElement(TabBarButton, { id: "shortcuts", title: "Keyboard shortcuts", changeTab: changeTab })),
            react_1.default.createElement(components_1.IconButton, { onClick: (e) => {
                    e.preventDefault();
                    return onClose();
                }, title: "Close settings page" },
                react_1.default.createElement(components_1.Icons, { icon: "close" }))),
        react_1.default.createElement(Content, { vertical: true, horizontal: false },
            react_1.default.createElement(router_1.Route, { path: "about" },
                react_1.default.createElement(about_page_1.AboutPage, { key: "about" })),
            react_1.default.createElement(router_1.Route, { path: "release-notes" },
                react_1.default.createElement(release_notes_page_1.ReleaseNotesPage, { key: "release-notes" })),
            react_1.default.createElement(router_1.Route, { path: "shortcuts" },
                react_1.default.createElement(shortcuts_page_1.ShortcutsPage, { key: "shortcuts" })))));
};
const SettingsPages = () => {
    const api = api_1.useStorybookApi();
    const state = api_1.useStorybookState();
    const changeTab = (tab) => api.changeSettingsTab(tab);
    return (react_1.default.createElement(Pages, { hasReleaseNotes: !!api.releaseNotesVersion(), enableShortcuts: state.ui.enableShortcuts, changeTab: changeTab, onClose: api.closeSettings }));
};
exports.default = SettingsPages;
