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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_sizeme_1 = __importDefault(require("react-sizeme"));
const components_1 = require("@storybook/components");
const router_1 = require("@storybook/router");
const theming_1 = require("@storybook/theming");
const mobile_1 = require("./components/layout/mobile");
const desktop_1 = require("./components/layout/desktop");
const sidebar_1 = __importDefault(require("./containers/sidebar"));
const preview_1 = __importDefault(require("./containers/preview"));
const panel_1 = __importDefault(require("./containers/panel"));
const notifications_1 = __importDefault(require("./containers/notifications"));
const settings_1 = __importDefault(require("./settings"));
const View = theming_1.styled.div({
    position: 'fixed',
    overflow: 'hidden',
    height: '100vh',
    width: '100vw',
});
const App = react_1.default.memo(({ viewMode, docsOnly, layout, panelCount, size: { width, height } }) => {
    let content;
    const props = react_1.useMemo(() => ({
        Sidebar: sidebar_1.default,
        Preview: preview_1.default,
        Panel: panel_1.default,
        Notifications: notifications_1.default,
        pages: [
            {
                key: 'settings',
                render: () => react_1.default.createElement(settings_1.default, null),
                route: (({ children }) => (react_1.default.createElement(router_1.Route, { path: "/settings/", startsWith: true }, children))),
            },
        ],
    }), []);
    if (!width || !height) {
        content = react_1.default.createElement("div", null);
    }
    else if (width < 600) {
        content = react_1.default.createElement(mobile_1.Mobile, Object.assign({}, props, { viewMode: viewMode, options: layout, docsOnly: docsOnly }));
    }
    else {
        content = (react_1.default.createElement(desktop_1.Desktop, Object.assign({}, props, { viewMode: viewMode, options: layout, docsOnly: docsOnly }, { width, height }, { panelCount: panelCount })));
    }
    return (react_1.default.createElement(View, null,
        react_1.default.createElement(theming_1.Global, { styles: theming_1.createGlobal }),
        react_1.default.createElement(components_1.Symbols, { icons: ['folder', 'component', 'document', 'bookmarkhollow'] }),
        content));
}, 
// This is the default shallowEqual implementation, but with custom behavior for the `size` prop.
(prevProps, nextProps) => {
    if (Object.is(prevProps, nextProps))
        return true;
    if (typeof prevProps !== 'object' || prevProps === null)
        return false;
    if (typeof nextProps !== 'object' || nextProps === null)
        return false;
    const keysA = Object.keys(prevProps);
    const keysB = Object.keys(nextProps);
    if (keysA.length !== keysB.length)
        return false;
    // eslint-disable-next-line no-restricted-syntax
    for (const key of keysA) {
        if (key === 'size') {
            // SizeMe injects a new `size` object every time, even if the width/height doesn't change,
            // so we chech that one manually.
            if (prevProps[key].width !== nextProps[key].width)
                return false;
            if (prevProps[key].height !== nextProps[key].height)
                return false;
        }
        else {
            if (!Object.prototype.hasOwnProperty.call(nextProps, key))
                return false;
            if (!Object.is(prevProps[key], nextProps[key]))
                return false;
        }
    }
    return true;
});
const SizedApp = react_sizeme_1.default({ monitorHeight: true })(App);
App.displayName = 'App';
exports.default = SizedApp;
