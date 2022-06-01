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
exports.Mobile = void 0;
const react_1 = __importStar(require("react"));
const api_1 = require("@storybook/api");
const theming_1 = require("@storybook/theming");
const components_1 = require("@storybook/components");
const Root_1 = require("./Root");
const { SIDEBAR, CANVAS, ADDONS } = api_1.ActiveTabs;
const Pane = theming_1.styled.div({
    transition: 'transform .2s ease',
    position: 'absolute',
    top: 0,
    height: '100%',
    overflow: 'auto',
}, ({ theme }) => ({
    background: theme.background.content,
    '&:nth-of-type(1)': {
        borderRight: `1px solid ${theme.appBorderColor}`,
    },
    '&:nth-of-type(3)': {
        borderLeft: `1px solid ${theme.appBorderColor}`,
    },
}), ({ index }) => {
    switch (index) {
        case 0: {
            return {
                width: '80vw',
                transform: 'translateX(-80vw)',
                left: 0,
            };
        }
        case 1: {
            return {
                width: '100%',
                transform: 'translateX(0) scale(1)',
                left: 0,
            };
        }
        case 2: {
            return {
                width: '80vw',
                transform: 'translateX(80vw)',
                right: 0,
            };
        }
        default: {
            return {};
        }
    }
}, ({ active, index }) => {
    switch (true) {
        case index === 0 && active === SIDEBAR: {
            return {
                transform: 'translateX(-0px)',
            };
        }
        case index === 1 && active === SIDEBAR: {
            return {
                transform: 'translateX(40vw) translateY(-42.5vh) translateY(40px) scale(0.2)',
            };
        }
        case index === 1 && active === ADDONS: {
            return {
                transform: 'translateX(-40vw) translateY(-42.5vh) translateY(40px) scale(0.2)',
            };
        }
        case index === 2 && active === ADDONS: {
            return {
                transform: 'translateX(0px)',
            };
        }
        default: {
            return {};
        }
    }
});
const Panels = react_1.default.memo((({ children, active, isFullscreen }) => (react_1.default.createElement(PanelsContainer, { isFullscreen: isFullscreen }, react_1.Children.toArray(children).map((item, index) => (
// eslint-disable-next-line react/no-array-index-key
react_1.default.createElement(Pane, { key: index, index: index, active: active }, item)))))));
Panels.displayName = 'Panels';
const PanelsContainer = theming_1.styled.div({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
}, ({ isFullscreen }) => ({
    height: isFullscreen ? '100vh' : 'calc(100% - 40px)',
}));
const Bar = theming_1.styled.nav({
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100vw',
    height: 40,
    display: 'flex',
    boxShadow: '0 1px 5px 0 rgba(0, 0, 0, 0.1)',
    '& > *': {
        flex: 1,
    },
}, ({ theme }) => ({
    background: theme.barBg,
}));
class Mobile extends react_1.Component {
    constructor(props) {
        super(props);
        const { options } = props;
        this.state = {
            active: options.isFullscreen ? CANVAS : options.initialActive || SIDEBAR,
        };
    }
    render() {
        const { Sidebar, Preview, Panel, Notifications, pages, viewMode, options, docsOnly } = this.props;
        const { active } = this.state;
        return (react_1.default.createElement(Root_1.Root, null,
            react_1.default.createElement(Notifications, { placement: {
                    position: 'fixed',
                    bottom: 60,
                    left: 20,
                    right: 20,
                } }),
            react_1.default.createElement(Panels, { active: active, isFullscreen: options.isFullscreen },
                react_1.default.createElement(Sidebar, null),
                react_1.default.createElement("div", null,
                    react_1.default.createElement("div", { hidden: !viewMode },
                        react_1.default.createElement(Preview, { showToolbar: options.showToolbar, id: "main", viewMode: viewMode })),
                    pages.map(({ key, route: Route, render: Content }) => (react_1.default.createElement(Route, { key: key },
                        react_1.default.createElement(Content, null))))),
                react_1.default.createElement(Panel, { hidden: !viewMode })),
            !options.isFullscreen && (react_1.default.createElement(Bar, null,
                react_1.default.createElement(components_1.TabButton, { onClick: () => this.setState({ active: SIDEBAR }), active: active === SIDEBAR }, "Sidebar"),
                react_1.default.createElement(components_1.TabButton, { onClick: () => this.setState({ active: CANVAS }), active: active === CANVAS },
                    viewMode ? 'Canvas' : null,
                    pages.map(({ key, route: Route }) => (react_1.default.createElement(Route, { key: key }, key)))),
                viewMode && !docsOnly ? (react_1.default.createElement(components_1.TabButton, { onClick: () => this.setState({ active: ADDONS }), active: active === ADDONS }, "Addons")) : null))));
    }
}
exports.Mobile = Mobile;
