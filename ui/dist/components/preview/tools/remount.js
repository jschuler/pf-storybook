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
exports.remountTool = void 0;
const react_1 = __importStar(require("react"));
const components_1 = require("@storybook/components");
const api_1 = require("@storybook/api");
const theming_1 = require("@storybook/theming");
const core_events_1 = require("@storybook/core-events");
const StyledAnimatedIconButton = theming_1.styled(components_1.IconButton)(({ theme, animating, disabled }) => ({
    opacity: disabled ? 0.5 : 1,
    svg: {
        animation: animating && `${theme.animation.rotate360} 1000ms ease-out`,
    },
}));
const menuMapper = ({ api, state }) => {
    const { storyId } = state;
    return {
        storyId,
        remount: () => api.emit(core_events_1.FORCE_REMOUNT, { storyId: state.storyId }),
    };
};
exports.remountTool = {
    title: 'remount',
    id: 'remount',
    match: ({ viewMode }) => viewMode === 'story',
    render: () => (react_1.default.createElement(api_1.Consumer, { filter: menuMapper }, ({ remount, storyId }) => {
        const [isAnimating, setIsAnimating] = react_1.useState(false);
        const animateAndReplay = () => {
            if (!storyId)
                return;
            setIsAnimating(true);
            remount();
        };
        return (react_1.default.createElement(StyledAnimatedIconButton, { key: "remount", title: "Remount component", onClick: animateAndReplay, onAnimationEnd: () => setIsAnimating(false), animating: isAnimating, disabled: !storyId },
            react_1.default.createElement(components_1.Icons, { icon: "sync" })));
    })),
};
