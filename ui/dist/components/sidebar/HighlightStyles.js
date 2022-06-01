"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HighlightStyles = void 0;
const polished_1 = require("polished");
const react_1 = __importDefault(require("react"));
const theming_1 = require("@storybook/theming");
exports.HighlightStyles = ({ refId, itemId }) => (react_1.default.createElement(theming_1.Global, { styles: ({ color }) => {
        const background = polished_1.transparentize(0.85, color.secondary);
        return {
            [`[data-ref-id="${refId}"][data-item-id="${itemId}"]:not([data-selected="true"])`]: {
                [`&[data-nodetype="component"], &[data-nodetype="group"]`]: {
                    background,
                    '&:hover, &:focus': { background },
                },
                [`&[data-nodetype="story"], &[data-nodetype="document"]`]: {
                    color: color.defaultText,
                    background,
                    '&:hover, &:focus': { background },
                },
            },
        };
    } }));
