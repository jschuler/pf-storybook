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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortcutsScreen = exports.SuccessIcon = exports.Fade = exports.TextInput = exports.Description = exports.GridWrapper = exports.Row = exports.GridHeaderRow = exports.HeaderItem = void 0;
const react_1 = __importStar(require("react"));
const theming_1 = require("@storybook/theming");
const shortcut_1 = require("@storybook/api/shortcut");
const components_1 = require("@storybook/components");
const SettingsFooter_1 = __importDefault(require("./SettingsFooter"));
const { Button, Input } = components_1.Form;
const Header = theming_1.styled.header(({ theme }) => ({
    marginBottom: 20,
    fontSize: theme.typography.size.m3,
    fontWeight: theme.typography.weight.black,
    alignItems: 'center',
    display: 'flex',
}));
// Grid
exports.HeaderItem = theming_1.styled.div(({ theme }) => ({
    fontWeight: theme.typography.weight.bold,
}));
exports.GridHeaderRow = theming_1.styled.div({
    alignSelf: 'flex-end',
    display: 'grid',
    margin: '10px 0',
    gridTemplateColumns: '1fr 1fr 12px',
    '& > *:last-of-type': {
        gridColumn: '2 / 2',
        justifySelf: 'flex-end',
        gridRow: '1',
    },
});
exports.Row = theming_1.styled.div(({ theme }) => ({
    padding: '6px 0',
    borderTop: `1px solid ${theme.appBorderColor}`,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 0px',
}));
exports.GridWrapper = theming_1.styled.div({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridAutoRows: 'minmax(auto, auto)',
    marginBottom: 20,
});
// Form
exports.Description = theming_1.styled.div({
    alignSelf: 'center',
});
exports.TextInput = theming_1.styled(Input)(({ valid, theme }) => valid === 'error'
    ? {
        animation: `${theme.animation.jiggle} 700ms ease-out`,
    }
    : {}, {
    display: 'flex',
    width: 80,
    flexDirection: 'column',
    justifySelf: 'flex-end',
    paddingLeft: 4,
    paddingRight: 4,
    textAlign: 'center',
});
exports.Fade = theming_1.keyframes `
0%,100% { opacity: 0; }
  50% { opacity: 1; }
`;
exports.SuccessIcon = theming_1.styled(components_1.Icons)(({ valid, theme }) => valid === 'valid'
    ? {
        color: theme.color.positive,
        animation: `${exports.Fade} 2s ease forwards`,
    }
    : {
        opacity: 0,
    }, {
    alignSelf: 'center',
    display: 'flex',
    marginLeft: 10,
    height: 14,
    width: 14,
});
const Container = theming_1.styled.div(({ theme }) => ({
    fontSize: theme.typography.size.s2,
    padding: `3rem 20px`,
    maxWidth: 600,
    margin: '0 auto',
}));
const shortcutLabels = {
    fullScreen: 'Go full screen',
    togglePanel: 'Toggle addons',
    panelPosition: 'Toggle addons orientation',
    toggleNav: 'Toggle sidebar',
    toolbar: 'Toggle canvas toolbar',
    search: 'Focus search',
    focusNav: 'Focus sidebar',
    focusIframe: 'Focus canvas',
    focusPanel: 'Focus addons',
    prevComponent: 'Previous component',
    nextComponent: 'Next component',
    prevStory: 'Previous story',
    nextStory: 'Next story',
    shortcutsPage: 'Go to shortcuts page',
    aboutPage: 'Go to about page',
    collapseAll: 'Collapse all items on sidebar',
    expandAll: 'Expand all items on sidebar',
};
// Shortcuts that cannot be configured
const fixedShortcuts = ['escape'];
function toShortcutState(shortcutKeys) {
    return Object.entries(shortcutKeys).reduce((acc, [feature, shortcut]) => fixedShortcuts.includes(feature) ? acc : Object.assign(Object.assign({}, acc), { [feature]: { shortcut, error: false } }), {});
}
class ShortcutsScreen extends react_1.Component {
    constructor(props) {
        super(props);
        this.onKeyDown = (e) => {
            const { activeFeature, shortcutKeys } = this.state;
            if (e.key === 'Backspace') {
                return this.restoreDefault();
            }
            const shortcut = shortcut_1.eventToShortcut(e);
            // Keypress is not a potential shortcut
            if (!shortcut) {
                return false;
            }
            // Check we don't match any other shortcuts
            const error = !!Object.entries(shortcutKeys).find(([feature, { shortcut: existingShortcut }]) => feature !== activeFeature &&
                existingShortcut &&
                shortcut_1.shortcutMatchesShortcut(shortcut, existingShortcut));
            return this.setState({
                shortcutKeys: Object.assign(Object.assign({}, shortcutKeys), { [activeFeature]: { shortcut, error } }),
            });
        };
        this.onFocus = (focusedInput) => () => {
            const { shortcutKeys } = this.state;
            this.setState({
                activeFeature: focusedInput,
                shortcutKeys: Object.assign(Object.assign({}, shortcutKeys), { [focusedInput]: { shortcut: null, error: false } }),
            });
        };
        this.onBlur = () => __awaiter(this, void 0, void 0, function* () {
            const { shortcutKeys, activeFeature } = this.state;
            if (shortcutKeys[activeFeature]) {
                const { shortcut, error } = shortcutKeys[activeFeature];
                if (!shortcut || error) {
                    return this.restoreDefault();
                }
                return this.saveShortcut();
            }
            return false;
        });
        this.saveShortcut = () => __awaiter(this, void 0, void 0, function* () {
            const { activeFeature, shortcutKeys } = this.state;
            const { setShortcut } = this.props;
            yield setShortcut(activeFeature, shortcutKeys[activeFeature].shortcut);
            this.setState({ successField: activeFeature });
        });
        this.restoreDefaults = () => __awaiter(this, void 0, void 0, function* () {
            const { restoreAllDefaultShortcuts } = this.props;
            const defaultShortcuts = yield restoreAllDefaultShortcuts();
            return this.setState({ shortcutKeys: toShortcutState(defaultShortcuts) });
        });
        this.restoreDefault = () => __awaiter(this, void 0, void 0, function* () {
            const { activeFeature, shortcutKeys } = this.state;
            const { restoreDefaultShortcut } = this.props;
            const defaultShortcut = yield restoreDefaultShortcut(activeFeature);
            return this.setState({
                shortcutKeys: Object.assign(Object.assign({}, shortcutKeys), toShortcutState({ [activeFeature]: defaultShortcut })),
            });
        });
        this.displaySuccessMessage = (activeElement) => {
            const { successField, shortcutKeys } = this.state;
            return activeElement === successField && shortcutKeys[activeElement].error === false
                ? 'valid'
                : undefined;
        };
        this.displayError = (activeElement) => {
            const { activeFeature, shortcutKeys } = this.state;
            return activeElement === activeFeature && shortcutKeys[activeElement].error === true
                ? 'error'
                : undefined;
        };
        this.renderKeyInput = () => {
            const { shortcutKeys, addonsShortcutLabels } = this.state;
            const arr = Object.entries(shortcutKeys).map(([feature, { shortcut }]) => (react_1.default.createElement(exports.Row, { key: feature },
                react_1.default.createElement(exports.Description, null, shortcutLabels[feature] || addonsShortcutLabels[feature]),
                react_1.default.createElement(exports.TextInput, { spellCheck: "false", valid: this.displayError(feature), className: "modalInput", onBlur: this.onBlur, onFocus: this.onFocus(feature), 
                    // @ts-ignore
                    onKeyDown: this.onKeyDown, value: shortcut ? shortcut_1.shortcutToHumanString(shortcut) : '', placeholder: "Type keys", readOnly: true }),
                react_1.default.createElement(exports.SuccessIcon, { valid: this.displaySuccessMessage(feature), icon: "check" }))));
            return arr;
        };
        this.renderKeyForm = () => (react_1.default.createElement(exports.GridWrapper, null,
            react_1.default.createElement(exports.GridHeaderRow, null,
                react_1.default.createElement(exports.HeaderItem, null, "Commands"),
                react_1.default.createElement(exports.HeaderItem, null, "Shortcut")),
            this.renderKeyInput()));
        this.state = {
            activeFeature: undefined,
            successField: undefined,
            // The initial shortcutKeys that come from props are the defaults/what was saved
            // As the user interacts with the page, the state stores the temporary, unsaved shortcuts
            // This object also includes the error attached to each shortcut
            shortcutKeys: toShortcutState(props.shortcutKeys),
            addonsShortcutLabels: props.addonsShortcutLabels,
        };
    }
    render() {
        const layout = this.renderKeyForm();
        return (react_1.default.createElement(Container, null,
            react_1.default.createElement(Header, null, "Keyboard shortcuts"),
            layout,
            react_1.default.createElement(Button, { tertiary: true, small: true, id: "restoreDefaultsHotkeys", onClick: this.restoreDefaults }, "Restore defaults"),
            react_1.default.createElement(SettingsFooter_1.default, null)));
    }
}
exports.ShortcutsScreen = ShortcutsScreen;
