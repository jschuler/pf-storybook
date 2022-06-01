"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyTool = void 0;
const global_1 = __importDefault(require("global"));
const react_1 = __importDefault(require("react"));
const copy_to_clipboard_1 = __importDefault(require("copy-to-clipboard"));
const components_1 = require("@storybook/components");
const api_1 = require("@storybook/api");
const { PREVIEW_URL } = global_1.default;
const copyMapper = ({ state }) => {
    const { storyId, refId, refs } = state;
    const ref = refs[refId];
    return {
        refId,
        baseUrl: ref ? `${ref.url}/iframe.html` : PREVIEW_URL || 'iframe.html',
        storyId,
        queryParams: state.customQueryParams,
    };
};
exports.copyTool = {
    title: 'copy',
    id: 'copy',
    match: ({ viewMode }) => viewMode === 'story',
    render: () => (react_1.default.createElement(api_1.Consumer, { filter: copyMapper }, ({ baseUrl, storyId, queryParams }) => storyId ? (react_1.default.createElement(components_1.IconButton, { key: "copy", onClick: () => copy_to_clipboard_1.default(components_1.getStoryHref(baseUrl, storyId, queryParams)), title: "Copy canvas link" },
        react_1.default.createElement(components_1.Icons, { icon: "link" }))) : null)),
};
