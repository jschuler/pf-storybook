"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoaderWrapper = exports.IframeWrapper = exports.DesktopOnly = exports.UnstyledLink = exports.FrameWrap = void 0;
const theming_1 = require("@storybook/theming");
const router_1 = require("@storybook/router");
exports.FrameWrap = theming_1.styled.div(({ offset }) => ({
    position: 'absolute',
    overflow: 'auto',
    left: 0,
    right: 0,
    bottom: 0,
    top: offset,
    zIndex: 3,
    transition: 'all 0.1s linear',
    height: `calc(100% - ${offset}px)`,
    background: 'transparent',
}));
exports.UnstyledLink = theming_1.styled(router_1.Link)({
    color: 'inherit',
    textDecoration: 'inherit',
    display: 'inline-block',
});
exports.DesktopOnly = theming_1.styled.span({
    // Hides full screen icon at mobile breakpoint defined in app.js
    '@media (max-width: 599px)': {
        display: 'none',
    },
});
exports.IframeWrapper = theming_1.styled.div(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    background: theme.background.content,
}));
exports.LoaderWrapper = theming_1.styled.div(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: theme.background.content,
    zIndex: 1,
}));
