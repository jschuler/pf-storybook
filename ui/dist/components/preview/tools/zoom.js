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
exports.zoomTool = exports.ZoomProvider = exports.ZoomConsumer = exports.Zoom = void 0;
const react_1 = __importStar(require("react"));
const components_1 = require("@storybook/components");
const initialZoom = 1;
const Context = react_1.default.createContext({ value: initialZoom, set: (v) => { } });
class ZoomProvider extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            value: initialZoom,
        };
        this.set = (value) => this.setState({ value });
    }
    render() {
        const { children, shouldScale } = this.props;
        const { set } = this;
        const { value } = this.state;
        return (react_1.default.createElement(Context.Provider, { value: { value: shouldScale ? value : initialZoom, set } }, children));
    }
}
exports.ZoomProvider = ZoomProvider;
const { Consumer: ZoomConsumer } = Context;
exports.ZoomConsumer = ZoomConsumer;
const Zoom = react_1.default.memo(({ zoomIn, zoomOut, reset }) => (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(components_1.IconButton, { key: "zoomin", onClick: zoomIn, title: "Zoom in" },
        react_1.default.createElement(components_1.Icons, { icon: "zoom" })),
    react_1.default.createElement(components_1.IconButton, { key: "zoomout", onClick: zoomOut, title: "Zoom out" },
        react_1.default.createElement(components_1.Icons, { icon: "zoomout" })),
    react_1.default.createElement(components_1.IconButton, { key: "zoomreset", onClick: reset, title: "Reset zoom" },
        react_1.default.createElement(components_1.Icons, { icon: "zoomreset" })))));
exports.Zoom = Zoom;
const ZoomWrapper = react_1.default.memo(({ set, value }) => {
    const zoomIn = react_1.useCallback((e) => {
        e.preventDefault();
        set(0.8 * value);
    }, [set, value]);
    const zoomOut = react_1.useCallback((e) => {
        e.preventDefault();
        set(1.25 * value);
    }, [set, value]);
    const reset = react_1.useCallback((e) => {
        e.preventDefault();
        set(initialZoom);
    }, [set, initialZoom]);
    return react_1.default.createElement(Zoom, Object.assign({ key: "zoom" }, { zoomIn, zoomOut, reset }));
});
exports.zoomTool = {
    title: 'zoom',
    id: 'zoom',
    match: ({ viewMode }) => viewMode === 'story',
    render: react_1.default.memo(() => (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ZoomConsumer, null, ({ set, value }) => react_1.default.createElement(ZoomWrapper, Object.assign({}, { set, value }))),
        react_1.default.createElement(components_1.Separator, null)))),
};
