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
exports.useMenu = void 0;
const react_1 = __importStar(require("react"));
const components_1 = require("@storybook/components");
const theming_1 = require("@storybook/theming");
const shortcut_1 = require("@storybook/api/shortcut");
const Menu_1 = require("../components/sidebar/Menu");
const focusableUIElements = {
    storySearchField: 'storybook-explorer-searchfield',
    storyListMenu: 'storybook-explorer-menu',
    storyPanelRoot: 'storybook-panel-root',
};
const Key = theming_1.styled.code(({ theme }) => ({
    width: 16,
    height: 16,
    lineHeight: '17px',
    textAlign: 'center',
    fontSize: '11px',
    background: 'rgba(0,0,0,0.07)',
    color: theme.color.defaultText,
    borderRadius: 2,
    userSelect: 'none',
    pointerEvents: 'none',
    '& + &': {
        marginLeft: 2,
    },
}));
const Shortcut = ({ keys }) => (react_1.default.createElement(react_1.default.Fragment, null, keys.map((key, index) => (
// eslint-disable-next-line react/no-array-index-key
react_1.default.createElement(Key, { key: index }, shortcut_1.shortcutToHumanString([key]))))));
exports.useMenu = (api, showToolbar, isFullscreen, showPanel, showNav, enableShortcuts) => {
    const theme = theming_1.useTheme();
    const shortcutKeys = api.getShortcutKeys();
    const about = react_1.useMemo(() => ({
        id: 'about',
        title: 'About PatternFly',
        onClick: () => api.navigateToSettingsPage('/settings/about'),
        right: api.versionUpdateAvailable() && react_1.default.createElement(components_1.Badge, { status: "positive" }, "Update"),
        left: react_1.default.createElement(Menu_1.MenuItemIcon, null),
    }), [api, enableShortcuts, shortcutKeys]);
    const releaseNotes = react_1.useMemo(() => ({
        id: 'release-notes',
        title: 'Release notes',
        onClick: () => api.navigateToSettingsPage('/settings/release-notes'),
        left: react_1.default.createElement(Menu_1.MenuItemIcon, null),
    }), [api, enableShortcuts, shortcutKeys]);
    const shortcuts = react_1.useMemo(() => ({
        id: 'shortcuts',
        title: 'Keyboard shortcuts',
        onClick: () => api.navigateToSettingsPage('/settings/shortcuts'),
        right: enableShortcuts ? react_1.default.createElement(Shortcut, { keys: shortcutKeys.shortcutsPage }) : null,
        left: react_1.default.createElement(Menu_1.MenuItemIcon, null),
        style: {
            borderBottom: `4px solid ${theme.appBorderColor}`,
        },
    }), [api, enableShortcuts, shortcutKeys]);
    const sidebarToggle = react_1.useMemo(() => ({
        id: 'S',
        title: 'Show sidebar',
        onClick: () => api.toggleNav(),
        right: enableShortcuts ? react_1.default.createElement(Shortcut, { keys: shortcutKeys.toggleNav }) : null,
        left: showNav ? react_1.default.createElement(Menu_1.MenuItemIcon, { icon: "check" }) : react_1.default.createElement(Menu_1.MenuItemIcon, null),
    }), [api, enableShortcuts, shortcutKeys, showNav]);
    const toolbarToogle = react_1.useMemo(() => ({
        id: 'T',
        title: 'Show toolbar',
        onClick: () => api.toggleToolbar(),
        right: enableShortcuts ? react_1.default.createElement(Shortcut, { keys: shortcutKeys.toolbar }) : null,
        left: showToolbar ? react_1.default.createElement(Menu_1.MenuItemIcon, { icon: "check" }) : react_1.default.createElement(Menu_1.MenuItemIcon, null),
    }), [api, enableShortcuts, shortcutKeys, showToolbar]);
    const addonsToggle = react_1.useMemo(() => ({
        id: 'A',
        title: 'Show addons',
        onClick: () => api.togglePanel(),
        right: enableShortcuts ? react_1.default.createElement(Shortcut, { keys: shortcutKeys.togglePanel }) : null,
        left: showPanel ? react_1.default.createElement(Menu_1.MenuItemIcon, { icon: "check" }) : react_1.default.createElement(Menu_1.MenuItemIcon, null),
    }), [api, enableShortcuts, shortcutKeys, showPanel]);
    const addonsOrientationToggle = react_1.useMemo(() => ({
        id: 'D',
        title: 'Change addons orientation',
        onClick: () => api.togglePanelPosition(),
        right: enableShortcuts ? react_1.default.createElement(Shortcut, { keys: shortcutKeys.panelPosition }) : null,
        left: react_1.default.createElement(Menu_1.MenuItemIcon, null),
    }), [api, enableShortcuts, shortcutKeys]);
    const fullscreenToggle = react_1.useMemo(() => ({
        id: 'F',
        title: 'Go full screen',
        onClick: () => api.toggleFullscreen(),
        right: enableShortcuts ? react_1.default.createElement(Shortcut, { keys: shortcutKeys.fullScreen }) : null,
        left: isFullscreen ? 'check' : react_1.default.createElement(Menu_1.MenuItemIcon, null),
    }), [api, enableShortcuts, shortcutKeys, isFullscreen]);
    const searchToggle = react_1.useMemo(() => ({
        id: '/',
        title: 'Search',
        onClick: () => api.focusOnUIElement(focusableUIElements.storySearchField),
        right: enableShortcuts ? react_1.default.createElement(Shortcut, { keys: shortcutKeys.search }) : null,
        left: react_1.default.createElement(Menu_1.MenuItemIcon, null),
    }), [api, enableShortcuts, shortcutKeys]);
    const up = react_1.useMemo(() => ({
        id: 'up',
        title: 'Previous component',
        onClick: () => api.jumpToComponent(-1),
        right: enableShortcuts ? react_1.default.createElement(Shortcut, { keys: shortcutKeys.prevComponent }) : null,
        left: react_1.default.createElement(Menu_1.MenuItemIcon, null),
    }), [api, enableShortcuts, shortcutKeys]);
    const down = react_1.useMemo(() => ({
        id: 'down',
        title: 'Next component',
        onClick: () => api.jumpToComponent(1),
        right: enableShortcuts ? react_1.default.createElement(Shortcut, { keys: shortcutKeys.nextComponent }) : null,
        left: react_1.default.createElement(Menu_1.MenuItemIcon, null),
    }), [api, enableShortcuts, shortcutKeys]);
    const prev = react_1.useMemo(() => ({
        id: 'prev',
        title: 'Previous story',
        onClick: () => api.jumpToStory(-1),
        right: enableShortcuts ? react_1.default.createElement(Shortcut, { keys: shortcutKeys.prevStory }) : null,
        left: react_1.default.createElement(Menu_1.MenuItemIcon, null),
    }), [api, enableShortcuts, shortcutKeys]);
    const next = react_1.useMemo(() => ({
        id: 'next',
        title: 'Next story',
        onClick: () => api.jumpToStory(1),
        right: enableShortcuts ? react_1.default.createElement(Shortcut, { keys: shortcutKeys.nextStory }) : null,
        left: react_1.default.createElement(Menu_1.MenuItemIcon, null),
    }), [api, enableShortcuts, shortcutKeys]);
    const collapse = react_1.useMemo(() => ({
        id: 'collapse',
        title: 'Collapse all',
        onClick: () => api.collapseAll(),
        right: enableShortcuts ? react_1.default.createElement(Shortcut, { keys: shortcutKeys.collapseAll }) : null,
        left: react_1.default.createElement(Menu_1.MenuItemIcon, null),
    }), [api, enableShortcuts, shortcutKeys]);
    const getAddonsShortcuts = () => {
        const addonsShortcuts = api.getAddonsShortcuts();
        const keys = shortcutKeys;
        return Object.entries(addonsShortcuts)
            .filter(([actionName, { showInMenu }]) => showInMenu)
            .map(([actionName, { label, action }]) => ({
            id: actionName,
            title: label,
            onClick: () => action(),
            right: enableShortcuts ? react_1.default.createElement(Shortcut, { keys: keys[actionName] }) : null,
            left: react_1.default.createElement(Menu_1.MenuItemIcon, null),
        }));
    };
    return react_1.useMemo(() => [
        about,
        ...(api.releaseNotesVersion() ? [releaseNotes] : []),
        shortcuts,
        sidebarToggle,
        toolbarToogle,
        addonsToggle,
        addonsOrientationToggle,
        fullscreenToggle,
        searchToggle,
        up,
        down,
        prev,
        next,
        collapse,
        ...getAddonsShortcuts(),
    ], [
        about,
        ...(api.releaseNotesVersion() ? [releaseNotes] : []),
        shortcuts,
        sidebarToggle,
        toolbarToogle,
        addonsToggle,
        addonsOrientationToggle,
        fullscreenToggle,
        searchToggle,
        up,
        down,
        prev,
        next,
        collapse,
    ]);
};
