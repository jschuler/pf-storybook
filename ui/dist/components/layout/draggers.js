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
exports.Handle = exports.Draggable = void 0;
const react_draggable_1 = __importStar(require("react-draggable"));
exports.Draggable = react_draggable_1.default;
const theming_1 = require("@storybook/theming");
const Handle = theming_1.styled.div(({ theme, isDragging }) => ({
    zIndex: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: isDragging ? theme.color.secondary : theme.appBorderColor,
    overflow: 'hidden',
    transition: 'color 0.2s linear, background-position 0.2s linear, background-size 0.2s linear, background 0.2s linear',
    '&:hover': {
        color: theme.color.secondary,
    },
}), ({ axis }) => ({
    cursor: axis === 'x' ? 'col-resize' : 'row-resize',
}), ({ theme, axis }) => axis === 'x'
    ? {
        height: '100%',
        width: theme.layoutMargin,
        marginLeft: 0,
    }
    : {
        height: theme.layoutMargin,
        width: '100%',
        marginTop: 0,
    }, ({ axis, isDragging }) => {
    if (axis === 'y') {
        const style = {
            backgroundImage: `radial-gradient(at center center,rgba(0,0,0,0.2) 0%,transparent 70%,transparent 100%)`,
            backgroundSize: '100% 50px',
            backgroundPosition: '50% 0',
            backgroundRepeat: 'no-repeat',
        };
        return isDragging
            ? style
            : Object.assign(Object.assign({}, style), { backgroundPosition: '50% 10px', '&:hover': style });
    }
    if (axis === 'x') {
        const style = {
            backgroundImage: `radial-gradient(at center center,rgba(0,0,0,0.2) 0%,transparent 70%,transparent 100%)`,
            backgroundSize: '50px 100%',
            backgroundPosition: '0 50%',
            backgroundRepeat: 'no-repeat',
        };
        return isDragging
            ? style
            : Object.assign(Object.assign({}, style), { backgroundPosition: '10px 50%', '&:hover': style });
    }
    return {};
});
exports.Handle = Handle;
