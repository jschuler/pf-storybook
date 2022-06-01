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
exports.Desktop = void 0;
const react_1 = __importStar(require("react"));
const S = __importStar(require("./container"));
const Desktop = Object.assign(react_1.default.memo(({ Panel, Sidebar, Preview, Notifications, pages, options, viewMode = undefined, width = 0, height = 0, panelCount, docsOnly = false, }) => (react_1.default.createElement(react_1.Fragment, null,
    react_1.default.createElement(Notifications, { placement: {
            position: 'fixed',
            bottom: 20,
            left: 20,
        } }),
    width && height ? (react_1.default.createElement(S.Layout, { options: options, bounds: { width, height, top: 0, left: 0 }, viewMode: viewMode, docsOnly: !!docsOnly, panelCount: panelCount }, ({ navProps, mainProps, panelProps, previewProps }) => (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(S.Sidebar, Object.assign({}, navProps),
            react_1.default.createElement(Sidebar, null)),
        react_1.default.createElement(S.Main, Object.assign({}, mainProps, { isFullscreen: !!mainProps.isFullscreen }),
            react_1.default.createElement(S.Preview, Object.assign({}, previewProps, { hidden: viewMode === 'settings' }),
                react_1.default.createElement(Preview, { id: "main" })),
            react_1.default.createElement(S.Panel, Object.assign({}, panelProps, { hidden: viewMode !== 'story' || docsOnly }),
                react_1.default.createElement(Panel, null)),
            pages.map(({ key, route: Route, render: Content }) => (react_1.default.createElement(Route, { key: key },
                react_1.default.createElement(Content, null))))))))) : (react_1.default.createElement("div", { title: JSON.stringify({ width, height }) }))))), {
    displayName: 'DesktopLayout',
});
exports.Desktop = Desktop;
