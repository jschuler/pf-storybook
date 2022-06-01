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
exports.defaultWrappers = exports.ApplyWrappers = void 0;
const react_1 = __importStar(require("react"));
const components_1 = require("./utils/components");
exports.ApplyWrappers = ({ wrappers, id, storyId, active, children, }) => {
    return (react_1.default.createElement(react_1.Fragment, null, wrappers.reduceRight((acc, wrapper, index) => wrapper.render({ index, children: acc, id, storyId, active }), children)));
};
exports.defaultWrappers = [
    {
        render: (p) => (react_1.default.createElement(components_1.IframeWrapper, { id: "storybook-preview-wrapper", hidden: !p.active }, p.children)),
    },
];
