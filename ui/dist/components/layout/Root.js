"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Root = void 0;
const theming_1 = require("@storybook/theming");
exports.Root = theming_1.styled.div({
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
});
