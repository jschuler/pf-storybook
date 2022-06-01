"use strict";
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./typings.d.ts" />
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = exports.Root = void 0;
const global_1 = __importDefault(require("global"));
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const router_1 = require("@storybook/router");
const api_1 = require("@storybook/api");
const theming_1 = require("@storybook/theming");
const react_helmet_async_1 = require("react-helmet-async");
const app_1 = __importDefault(require("./app"));
const provider_1 = __importDefault(require("./provider"));
exports.Provider = provider_1.default;
const { DOCS_MODE } = global_1.default;
// @ts-ignore
theming_1.ThemeProvider.displayName = 'ThemeProvider';
// @ts-ignore
react_helmet_async_1.HelmetProvider.displayName = 'HelmetProvider';
const getDocsMode = () => {
    try {
        return !!DOCS_MODE;
    }
    catch (e) {
        return false;
    }
};
const Container = process.env.XSTORYBOOK_EXAMPLE_APP ? react_1.default.StrictMode : react_1.default.Fragment;
exports.Root = ({ provider }) => (react_1.default.createElement(Container, { key: "container" },
    react_1.default.createElement(react_helmet_async_1.HelmetProvider, { key: "helmet.Provider" },
        react_1.default.createElement(router_1.LocationProvider, { key: "location.provider" },
            react_1.default.createElement(Main, { provider: provider })))));
const Main = ({ provider }) => {
    const navigate = router_1.useNavigate();
    return (react_1.default.createElement(router_1.Location, { key: "location.consumer" }, (locationData) => (react_1.default.createElement(api_1.Provider, Object.assign({ key: "manager", provider: provider }, locationData, { navigate: navigate, docsMode: getDocsMode() }), ({ state, api }) => {
        const panelCount = Object.keys(api.getPanels()).length;
        const story = api.getData(state.storyId, state.refId);
        const isLoading = story
            ? !!state.refs[state.refId] && !state.refs[state.refId].ready
            : !state.storiesFailed && !state.storiesConfigured;
        return (react_1.default.createElement(theming_1.ThemeProvider, { key: "theme.provider", theme: theming_1.ensure(state.theme) },
            react_1.default.createElement(app_1.default, { key: "app", viewMode: state.viewMode, layout: isLoading ? Object.assign(Object.assign({}, state.layout), { showPanel: false }) : state.layout, panelCount: panelCount, docsOnly: story && story.parameters && story.parameters.docsOnly })));
    }))));
};
function renderStorybookUI(domNode, provider) {
    if (!(provider instanceof provider_1.default)) {
        throw new Error('provider is not extended from the base Provider');
    }
    react_dom_1.default.render(react_1.default.createElement(exports.Root, { key: "root", provider: provider }), domNode);
}
exports.default = renderStorybookUI;
