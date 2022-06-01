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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = exports.Panel = exports.Preview = exports.Main = exports.Sidebar = void 0;
const react_1 = __importStar(require("react"));
const theming_1 = require("@storybook/theming");
const persistence = __importStar(require("./persist"));
const draggers_1 = require("./draggers");
const MIN_NAV_WIDTH = 200; // visually there's an additional 10px due to the canvas' left margin
const MIN_CANVAS_WIDTH = 200; // visually it's 10px less due to the canvas' left margin
const MIN_CANVAS_HEIGHT = 200; // visually it's 50px less due to the canvas toolbar and top margin
const MIN_PANEL_WIDTH = 200; // visually it's 10px less due to the canvas' right margin
const MIN_PANEL_HEIGHT = 200; // visually it's 50px less due to the panel toolbar and bottom margin
const DEFAULT_NAV_WIDTH = 220;
const DEFAULT_PANEL_WIDTH = 400;
const Pane = theming_1.styled.div({
    position: 'absolute',
    boxSizing: 'border-box',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
}, ({ hidden }) => hidden
    ? {
        opacity: 0,
    }
    : {
        opacity: 1,
    }, ({ top }) => top
    ? {
        zIndex: 9,
    }
    : {}, ({ border, theme }) => {
    switch (border) {
        case 'left': {
            return {
                borderLeft: `1px solid ${theme.appBorderColor}`,
            };
        }
        case 'right': {
            return {
                borderRight: `1px solid ${theme.appBorderColor}`,
            };
        }
        case 'top': {
            return {
                borderTop: `1px solid ${theme.appBorderColor}`,
            };
        }
        case 'bottom': {
            return {
                borderBottom: `1px solid ${theme.appBorderColor}`,
            };
        }
        default: {
            return {};
        }
    }
}, ({ animate }) => animate
    ? {
        transition: ['width', 'height', 'top', 'left', 'background', 'opacity', 'transform']
            .map((p) => `${p} 0.1s ease-out`)
            .join(','),
    }
    : {});
const Paper = theming_1.styled.div({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
}, ({ isFullscreen, theme }) => isFullscreen
    ? {
        boxShadow: 'none',
        borderRadius: 0,
    }
    : {
        borderRadius: theme.appBorderRadius,
        overflow: 'hidden',
        boxShadow: '0 1px 5px 0 rgba(0, 0, 0, 0.1)',
    });
exports.Sidebar = (_a) => {
    var { hidden = false, children, position = undefined } = _a, props = __rest(_a, ["hidden", "children", "position"]);
    return hidden ? null : (react_1.default.createElement(Pane, Object.assign({ style: position }, props), children));
};
exports.Main = (_a) => {
    var { isFullscreen = false, children, position = undefined } = _a, props = __rest(_a, ["isFullscreen", "children", "position"]);
    return (react_1.default.createElement(Pane, Object.assign({ style: position, top: true }, props, { role: "main" }),
        react_1.default.createElement(Paper, { isFullscreen: isFullscreen }, children)));
};
exports.Preview = (_a) => {
    var { hidden = false, children, position = undefined } = _a, props = __rest(_a, ["hidden", "children", "position"]);
    return (react_1.default.createElement(Pane, Object.assign({ style: position, top: true, hidden: hidden }, props), children));
};
exports.Panel = (_a) => {
    var { hidden = false, children, position = undefined, align = 'right' } = _a, props = __rest(_a, ["hidden", "children", "position", "align"]);
    return (react_1.default.createElement(Pane, Object.assign({ style: position, hidden: hidden }, props, { border: align === 'bottom' ? 'top' : 'left' }), children));
};
const HoverBlocker = theming_1.styled.div({
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 15,
    height: '100vh',
    width: '100vw',
});
const getPreviewPosition = ({ panelPosition, isPanelHidden, isNavHidden, isFullscreen, bounds, resizerPanel, resizerNav, margin, }) => {
    if (isFullscreen || isPanelHidden) {
        return {};
    }
    const navX = isNavHidden ? 0 : resizerNav.x;
    const panelX = resizerPanel.x;
    const panelY = resizerPanel.y;
    return panelPosition === 'bottom'
        ? {
            height: panelY - margin,
            left: 0,
            top: 0,
            width: bounds.width - navX - 2 * margin,
        }
        : {
            height: bounds.height - 2 * margin,
            left: 0,
            top: 0,
            width: panelX - navX - margin,
        };
};
const getMainPosition = ({ bounds, resizerNav, isNavHidden, isFullscreen, margin, }) => {
    if (isFullscreen) {
        return {};
    }
    const navX = isNavHidden ? 0 : resizerNav.x;
    return {
        height: bounds.height - margin * 2,
        left: navX + margin,
        top: margin,
        width: bounds.width - navX - margin * 2,
    };
};
const getPanelPosition = ({ isPanelBottom, isPanelHidden, isNavHidden, bounds, resizerPanel, resizerNav, margin, }) => {
    const navX = isNavHidden ? 0 : resizerNav.x;
    const panelX = resizerPanel.x;
    const panelY = resizerPanel.y;
    if (isPanelBottom && isPanelHidden) {
        return {
            height: bounds.height - panelY - margin,
            left: 0,
            top: panelY - margin,
            width: bounds.width - navX - 2 * margin,
        };
    }
    if (!isPanelBottom && isPanelHidden) {
        return {
            height: bounds.height - 2 * margin,
            left: panelX - navX - margin,
            top: 0,
            width: bounds.width - panelX - margin,
        };
    }
    return isPanelBottom
        ? {
            height: bounds.height - panelY - margin,
            left: 0,
            top: panelY - margin,
            width: bounds.width - navX - 2 * margin,
        }
        : {
            height: bounds.height - 2 * margin,
            left: panelX - navX - margin,
            top: 0,
            width: bounds.width - panelX - margin,
        };
};
class Layout extends react_1.Component {
    constructor(props) {
        super(props);
        this.resizeNav = (e, data) => {
            if (data.deltaX) {
                this.setState({ resizerNav: { x: data.x, y: data.y } });
            }
        };
        this.resizePanel = (e, data) => {
            const { options } = this.props;
            if ((data.deltaY && options.panelPosition === 'bottom') ||
                (data.deltaX && options.panelPosition === 'right')) {
                this.setState({ resizerPanel: { x: data.x, y: data.y } });
            }
        };
        this.setDragNav = () => {
            this.setState({ isDragging: 'nav' });
        };
        this.setDragPanel = () => {
            this.setState({ isDragging: 'panel' });
        };
        this.unsetDrag = () => {
            this.setState({ isDragging: false });
        };
        const { bounds, options } = props;
        const { resizerNav, resizerPanel } = persistence.get();
        this.state = {
            isDragging: false,
            resizerNav: resizerNav || { x: DEFAULT_NAV_WIDTH, y: 0 },
            resizerPanel: resizerPanel ||
                (options.panelPosition === 'bottom'
                    ? { x: 0, y: Math.round(bounds.height * 0.6) }
                    : { x: bounds.width - DEFAULT_PANEL_WIDTH, y: 0 }),
        };
    }
    static getDerivedStateFromProps(props, state) {
        const { bounds, options } = props;
        const { resizerPanel, resizerNav } = state;
        const isNavHidden = options.isFullscreen || !options.showNav;
        const isPanelHidden = options.isFullscreen || !options.showPanel;
        const { panelPosition } = options;
        const isPanelRight = panelPosition === 'right';
        const isPanelBottom = panelPosition === 'bottom';
        const navX = resizerNav.x;
        const panelX = resizerPanel.x;
        const panelY = resizerPanel.y;
        const mutation = {};
        if (!isNavHidden) {
            const minPanelWidth = !isPanelHidden && isPanelRight ? MIN_PANEL_WIDTH : 0;
            const minMainWidth = MIN_CANVAS_WIDTH + minPanelWidth;
            const maxNavX = bounds.width - minMainWidth;
            const minNavX = MIN_NAV_WIDTH; // coordinate translates directly to width here
            if (navX > maxNavX) {
                // upper bound
                mutation.resizerNav = {
                    x: maxNavX,
                    y: 0,
                };
            }
            else if (navX < minNavX || maxNavX < minNavX) {
                // lower bound, supercedes upper bound if needed
                mutation.resizerNav = {
                    x: minNavX,
                    y: 0,
                };
            }
        }
        if (isPanelRight && !isPanelHidden) {
            const maxPanelX = bounds.width - MIN_PANEL_WIDTH;
            const minPanelX = navX + MIN_CANVAS_WIDTH;
            if (panelX > maxPanelX || panelX === 0) {
                // upper bound or when switching orientation
                mutation.resizerPanel = {
                    x: maxPanelX,
                    y: 0,
                };
            }
            else if (panelX < minPanelX) {
                // lower bound
                mutation.resizerPanel = {
                    x: minPanelX,
                    y: 0,
                };
            }
        }
        if (isPanelBottom && !isPanelHidden) {
            const maxPanelY = bounds.height - MIN_PANEL_HEIGHT;
            if (panelY > maxPanelY || panelY === 0) {
                // lower bound or when switching orientation
                mutation.resizerPanel = {
                    x: 0,
                    y: bounds.height - 200,
                };
            }
            // upper bound is enforced by the Draggable's bounds
        }
        return mutation.resizerPanel || mutation.resizerNav ? Object.assign(Object.assign({}, state), mutation) : state;
    }
    componentDidUpdate(prevProps, prevState) {
        const { resizerPanel, resizerNav } = this.state;
        persistence.set({
            resizerPanel,
            resizerNav,
        });
        const { width: prevWidth, height: prevHeight } = prevProps.bounds;
        const { bounds, options } = this.props;
        const { width, height } = bounds;
        if (width !== prevWidth || height !== prevHeight) {
            const { panelPosition } = options;
            const isPanelBottom = panelPosition === 'bottom';
            if (isPanelBottom) {
                this.setState({
                    resizerPanel: {
                        x: prevState.resizerPanel.x,
                        y: prevState.resizerPanel.y - (prevHeight - height),
                    },
                });
            }
            else {
                this.setState({
                    resizerPanel: {
                        x: prevState.resizerPanel.x - (prevWidth - width),
                        y: prevState.resizerPanel.y,
                    },
                });
            }
        }
    }
    render() {
        const { children, bounds, options, theme, viewMode, docsOnly, panelCount } = this.props;
        const { isDragging, resizerNav, resizerPanel } = this.state;
        const margin = theme.layoutMargin;
        const isNavHidden = options.isFullscreen || !options.showNav;
        const isPanelHidden = options.isFullscreen ||
            !options.showPanel ||
            docsOnly ||
            viewMode !== 'story' ||
            panelCount === 0;
        const isFullscreen = options.isFullscreen || (isNavHidden && isPanelHidden);
        const { showToolbar } = options;
        const { panelPosition } = options;
        const isPanelBottom = panelPosition === 'bottom';
        const isPanelRight = panelPosition === 'right';
        const panelX = resizerPanel.x;
        const navX = resizerNav.x;
        return bounds ? (react_1.default.createElement(react_1.Fragment, null,
            isNavHidden ? null : (react_1.default.createElement(draggers_1.Draggable, { axis: "x", position: resizerNav, bounds: {
                    left: MIN_NAV_WIDTH,
                    top: 0,
                    right: isPanelRight && !isPanelHidden
                        ? panelX - MIN_CANVAS_WIDTH
                        : bounds.width - MIN_CANVAS_WIDTH,
                    bottom: 0,
                }, onStart: this.setDragNav, onDrag: this.resizeNav, onStop: this.unsetDrag },
                react_1.default.createElement(draggers_1.Handle, { axis: "x", isDragging: isDragging === 'nav' }))),
            isPanelHidden ? null : (react_1.default.createElement(draggers_1.Draggable, { axis: isPanelBottom ? 'y' : 'x', position: resizerPanel, bounds: isPanelBottom
                    ? {
                        left: 0,
                        top: MIN_CANVAS_HEIGHT,
                        right: 0,
                        bottom: bounds.height - MIN_PANEL_HEIGHT,
                    }
                    : {
                        left: isNavHidden ? MIN_CANVAS_WIDTH : navX + MIN_CANVAS_WIDTH,
                        top: 0,
                        right: bounds.width - MIN_PANEL_WIDTH,
                        bottom: 0,
                    }, onStart: this.setDragPanel, onDrag: this.resizePanel, onStop: this.unsetDrag },
                react_1.default.createElement(draggers_1.Handle, { isDragging: isDragging === 'panel', style: isPanelBottom
                        ? {
                            left: navX + margin,
                            width: bounds.width - navX - 2 * margin,
                            marginTop: -margin,
                        }
                        : {
                            marginLeft: -margin,
                        }, axis: isPanelBottom ? 'y' : 'x' }))),
            isDragging ? react_1.default.createElement(HoverBlocker, null) : null,
            children({
                mainProps: {
                    viewMode,
                    animate: !isDragging,
                    isFullscreen,
                    position: getMainPosition({ bounds, resizerNav, isNavHidden, isFullscreen, margin }),
                },
                previewProps: {
                    viewMode,
                    docsOnly,
                    animate: !isDragging,
                    isFullscreen,
                    showToolbar,
                    position: getPreviewPosition({
                        isFullscreen,
                        isNavHidden,
                        isPanelHidden,
                        resizerNav,
                        resizerPanel,
                        bounds,
                        panelPosition,
                        margin,
                    }),
                },
                navProps: {
                    viewMode,
                    animate: !isDragging,
                    hidden: isNavHidden,
                    position: {
                        height: bounds.height,
                        left: 0,
                        top: 0,
                        width: navX + margin,
                    },
                },
                panelProps: {
                    viewMode,
                    animate: !isDragging,
                    align: options.panelPosition,
                    hidden: isPanelHidden,
                    position: getPanelPosition({
                        isPanelBottom,
                        isPanelHidden,
                        isNavHidden,
                        bounds,
                        resizerPanel,
                        resizerNav,
                        margin,
                    }),
                },
            }))) : null;
    }
}
Layout.defaultProps = {
    viewMode: undefined,
    docsOnly: false,
};
const ThemedLayout = theming_1.withTheme(Layout);
exports.Layout = ThemedLayout;
