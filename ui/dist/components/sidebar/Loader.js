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
exports.Loader = exports.Contained = void 0;
const react_1 = __importStar(require("react"));
const theming_1 = require("@storybook/theming");
const LOADER_SEQUENCE = [0, 0, 1, 1, 2, 3, 3, 3, 1, 1, 1, 2, 2, 2, 3];
const Loadingitem = theming_1.styled.div({
    cursor: 'progress',
    fontSize: 13,
    height: '16px',
    marginTop: 4,
    marginBottom: 4,
    alignItems: 'center',
    overflow: 'hidden',
}, ({ depth = 0 }) => ({
    marginLeft: depth * 15,
    maxWidth: 85 - depth * 5,
}), ({ theme }) => theme.animation.inlineGlow, ({ theme }) => ({
    background: theme.appBorderColor,
}));
exports.Contained = theming_1.styled.div({
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
});
exports.Loader = ({ size }) => {
    const repeats = Math.ceil(size / LOADER_SEQUENCE.length);
    // Creates an array that repeats LOADER_SEQUENCE depths in order, until the size is reached.
    const sequence = Array.from(Array(repeats)).fill(LOADER_SEQUENCE).flat().slice(0, size);
    return (react_1.default.createElement(react_1.Fragment, null, sequence.map((depth, index) => (
    // eslint-disable-next-line react/no-array-index-key
    react_1.default.createElement(Loadingitem, { depth: depth, key: index })))));
};
