"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ejectTool = void 0;
const global_1 = __importDefault(require("global"));
const react_1 = __importDefault(require("react"));
const components_1 = require("@storybook/components");
const api_1 = require("@storybook/api");
const { PREVIEW_URL } = global_1.default;
const ejectMapper = ({ state }) => {
    const { storyId, refId, refs } = state;
    const ref = refs[refId];
    return {
        refId,
        baseUrl: ref ? `${ref.url}/iframe.html` : PREVIEW_URL || 'iframe.html',
        storyId,
        queryParams: state.customQueryParams,
    };
};
exports.ejectTool = {
    title: 'eject',
    id: 'eject',
    match: ({ viewMode }) => viewMode === 'story',
    render: () => (react_1.default.createElement(api_1.Consumer, { filter: ejectMapper }, ({ baseUrl, storyId, queryParams }) => storyId ? (react_1.default.createElement(components_1.IconButton, { key: "opener", href: components_1.getStoryHref(baseUrl, storyId, queryParams), target: "_blank", title: "Open canvas in new tab" },
        react_1.default.createElement(components_1.Icons, { icon: "sharealt" }))) : null)),
};
