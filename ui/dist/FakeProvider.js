"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrettyFakeProvider = exports.Centered = exports.FakeProvider = void 0;
const react_1 = __importDefault(require("react"));
const theming_1 = require("@storybook/theming");
const addons_1 = require("@storybook/addons");
const provider_1 = __importDefault(require("./provider"));
class FakeProvider extends provider_1.default {
    constructor() {
        super();
        // @ts-ignore
        this.addons = addons_1.addons;
        // @ts-ignore
        this.channel = {
            on: () => { },
            off: () => { },
            emit: () => { },
            addListener: () => { },
            removeListener: () => { },
        };
    }
    // @ts-ignore
    getElements(type) {
        return addons_1.addons.getElements(type);
    }
    renderPreview() {
        return react_1.default.createElement("div", null, "This is from a 'renderPreview' call from FakeProvider");
    }
    // @ts-ignore
    handleAPI(api) {
        addons_1.addons.loadAddons(api);
    }
    // @ts-ignore
    getConfig() {
        return {};
    }
}
exports.FakeProvider = FakeProvider;
exports.Centered = theming_1.styled.div({
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
});
class PrettyFakeProvider extends FakeProvider {
    renderPreview(...args) {
        return (react_1.default.createElement(exports.Centered, null,
            "This is from a 'renderPreview' call from FakeProvider",
            react_1.default.createElement("hr", null),
            "'renderPreview' was called with:",
            react_1.default.createElement("pre", null, JSON.stringify(args, null, 2))));
    }
}
exports.PrettyFakeProvider = PrettyFakeProvider;
