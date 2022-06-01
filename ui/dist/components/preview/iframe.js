"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IFrame = void 0;
const react_1 = __importDefault(require("react"));
const theming_1 = require("@storybook/theming");
const components_1 = require("@storybook/components");
const StyledIframe = theming_1.styled.iframe({
    position: 'absolute',
    display: 'block',
    boxSizing: 'content-box',
    height: '100%',
    width: '100%',
    border: '0 none',
    transition: 'all .3s, background-position 0s, visibility 0s',
    backgroundPosition: '-1px -1px, -1px -1px, -1px -1px, -1px -1px',
});
function IFrame(props) {
    const { active, id, title, src, allowFullScreen, scale } = props, rest = __rest(props, ["active", "id", "title", "src", "allowFullScreen", "scale"]);
    const iFrameRef = react_1.default.useRef(null);
    return (react_1.default.createElement(components_1.Zoom.IFrame, { scale: scale, active: active, iFrameRef: iFrameRef },
        react_1.default.createElement(StyledIframe, Object.assign({ "data-is-storybook": active ? 'true' : 'false', onLoad: (e) => e.currentTarget.setAttribute('data-is-loaded', 'true'), id: id, title: title, src: src, allowFullScreen: allowFullScreen, ref: iFrameRef }, rest))));
}
exports.IFrame = IFrame;
