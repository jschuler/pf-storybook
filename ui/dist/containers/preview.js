"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = __importDefault(require("global"));
const react_1 = __importDefault(require("react"));
const api_1 = require("@storybook/api");
const preview_1 = require("../components/preview/preview");
const { PREVIEW_URL } = global_1.default;
const splitTitleAddExtraSpace = (input) => input.split('/').join(' / ').replace(/\s\s/, ' ');
const getDescription = (item) => {
    if (api_1.isRoot(item)) {
        return item.name ? `${item.name} ⋅ Storybook` : 'Storybook';
    }
    if (api_1.isGroup(item)) {
        return item.name ? `${item.name} ⋅ Storybook` : 'Storybook';
    }
    if (api_1.isStory(item)) {
        const { kind, name } = item;
        return kind && name ? splitTitleAddExtraSpace(`${kind} - ${name} ⋅ Storybook`) : 'Storybook';
    }
    return 'Storybook';
};
const mapper = ({ api, state }) => {
    const { layout, location, customQueryParams, storyId, refs, viewMode, path, refId } = state;
    const story = api.getData(storyId, refId);
    const docsOnly = story && story.parameters ? !!story.parameters.docsOnly : false;
    return {
        api,
        story,
        options: layout,
        description: getDescription(story),
        viewMode,
        path,
        refs,
        storyId,
        baseUrl: PREVIEW_URL || 'iframe.html',
        queryParams: customQueryParams,
        docsOnly,
        location,
    };
};
const PreviewConnected = react_1.default.memo((props) => (react_1.default.createElement(api_1.Consumer, { filter: mapper }, (fromState) => react_1.default.createElement(preview_1.Preview, Object.assign({}, props, fromState)))));
exports.default = PreviewConnected;
