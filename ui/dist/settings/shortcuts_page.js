"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortcutsPage = void 0;
const react_1 = __importDefault(require("react"));
const api_1 = require("@storybook/api");
const shortcuts_1 = require("./shortcuts");
const ShortcutsPage = () => (react_1.default.createElement(api_1.Consumer, null, ({ api: { getShortcutKeys, getAddonsShortcutLabels, setShortcut, restoreDefaultShortcut, restoreAllDefaultShortcuts, }, }) => (react_1.default.createElement(shortcuts_1.ShortcutsScreen, Object.assign({ shortcutKeys: getShortcutKeys(), addonsShortcutLabels: getAddonsShortcutLabels() }, { setShortcut, restoreDefaultShortcut, restoreAllDefaultShortcuts })))));
exports.ShortcutsPage = ShortcutsPage;
