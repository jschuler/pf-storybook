"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.set = exports.get = exports.store = void 0;
const store2_1 = __importDefault(require("store2"));
exports.store = store2_1.default;
const debounce_1 = __importDefault(require("lodash/debounce"));
const memoizerific_1 = __importDefault(require("memoizerific"));
exports.get = () => {
    try {
        const data = store2_1.default.local.get(`storybook-layout`);
        return data || false;
    }
    catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        return false;
    }
};
const write = memoizerific_1.default(1)((changes) => {
    try {
        store2_1.default.local.set(`storybook-layout`, changes);
    }
    catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
    }
});
exports.set = debounce_1.default(write, 500);
