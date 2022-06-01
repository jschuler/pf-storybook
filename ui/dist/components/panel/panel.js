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
const react_1 = __importStar(require("react"));
const shortcut_1 = require("@storybook/api/shortcut");
const theming_1 = require("@storybook/theming");
const components_1 = require("@storybook/components");
const DesktopOnlyIconButton = theming_1.styled(components_1.IconButton)({
    // Hides full screen icon at mobile breakpoint defined in app.js
    '@media (max-width: 599px)': {
        display: 'none',
    },
});
const SafeTabContent = react_1.default.memo(({ children }) => children);
class SafeTab extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    componentDidCatch(error, info) {
        this.setState({ hasError: true });
        // eslint-disable-next-line no-console
        console.error(error, info);
    }
    render() {
        const { hasError } = this.state;
        const { children, title, id } = this.props;
        if (hasError) {
            return react_1.default.createElement("h1", null, "Something went wrong.");
        }
        return (react_1.default.createElement(SafeTabContent, { id: id, title: title }, children));
    }
}
const AddonPanel = react_1.default.memo(({ panels, shortcuts, actions, selectedPanel = null, panelPosition = 'right', absolute = true, }) => (react_1.default.createElement(components_1.Tabs, { absolute: absolute, selected: selectedPanel, actions: actions, tools: react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(DesktopOnlyIconButton, { key: "position", onClick: actions.togglePosition, title: `Change addon orientation [${shortcut_1.shortcutToHumanString(shortcuts.panelPosition)}]` },
            react_1.default.createElement(components_1.Icons, { icon: panelPosition === 'bottom' ? 'sidebaralt' : 'bottombar' })),
        react_1.default.createElement(DesktopOnlyIconButton, { key: "visibility", onClick: actions.toggleVisibility, title: `Hide addons [${shortcut_1.shortcutToHumanString(shortcuts.togglePanel)}]` },
            react_1.default.createElement(components_1.Icons, { icon: "close" }))), id: "storybook-panel-root" }, Object.entries(panels).map(([k, v]) => (react_1.default.createElement(SafeTab, { key: k, id: k, title: v.title }, v.render))))));
AddonPanel.displayName = 'AddonPanel';
exports.default = AddonPanel;
