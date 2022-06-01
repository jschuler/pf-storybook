"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brand = exports.LogoLink = exports.Img = exports.StorybookLogoStyled = void 0;
const react_1 = __importDefault(require("react"));
const theming_1 = require("@storybook/theming");
const components_1 = require("@storybook/components");
exports.StorybookLogoStyled = theming_1.styled(components_1.StorybookLogo)({
    width: 'auto',
    height: '22px !important',
    display: 'block',
});
exports.Img = theming_1.styled.img({
    width: 'auto',
    height: 'auto',
    display: 'block',
    maxWidth: '100%',
});
exports.LogoLink = theming_1.styled.a(({ theme }) => ({
    display: 'inline-block',
    height: '100%',
    margin: '-3px -4px',
    padding: '2px 3px',
    border: '1px solid transparent',
    borderRadius: 3,
    color: 'inherit',
    textDecoration: 'none',
    '&:focus': {
        outline: 0,
        borderColor: theme.color.secondary,
    },
}));
exports.Brand = theming_1.withTheme(({ theme }) => {
    const { title = 'Storybook', url = './', image, target } = theme.brand;
    const targetValue = target || (url === './' ? '' : '_blank');
    // When image is explicitly set to null, enable custom HTML support
    if (image === null) {
        if (title === null)
            return null;
        // eslint-disable-next-line react/no-danger
        if (!url)
            return react_1.default.createElement("div", { dangerouslySetInnerHTML: { __html: title } });
        return react_1.default.createElement(exports.LogoLink, { href: url, target: targetValue, dangerouslySetInnerHTML: { __html: title } });
    }
    const logo = image ? react_1.default.createElement(exports.Img, { src: image, alt: title }) : react_1.default.createElement(exports.StorybookLogoStyled, { alt: title });
    if (url) {
        return (react_1.default.createElement(exports.LogoLink, { title: title, href: url, target: targetValue }, logo));
    }
    // The wrapper div serves to prevent image misalignment
    return react_1.default.createElement("div", null, logo);
});
