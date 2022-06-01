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
exports.ToolbarMenu = exports.SidebarMenu = exports.SidebarMenuList = exports.MenuButton = exports.MenuItemIcon = void 0;
const react_1 = __importStar(require("react"));
const theming_1 = require("@storybook/theming");
const components_1 = require("@storybook/components");
const sharedStyles = {
    height: 10,
    width: 10,
    marginLeft: -5,
    marginRight: -5,
    display: 'block',
};
const Icon = theming_1.styled(components_1.Icons)(sharedStyles, ({ theme }) => ({
    color: theme.color.secondary,
}));
const Img = theming_1.styled.img(sharedStyles);
const Placeholder = theming_1.styled.div(sharedStyles);
exports.MenuItemIcon = ({ icon, imgSrc }) => {
    if (icon) {
        return react_1.default.createElement(Icon, { icon: icon });
    }
    if (imgSrc) {
        return react_1.default.createElement(Img, { src: imgSrc, alt: "image" });
    }
    return react_1.default.createElement(Placeholder, null);
};
exports.MenuButton = theming_1.styled(components_1.Button)(({ highlighted, theme }) => (Object.assign({ position: 'relative', overflow: 'visible', padding: 7, transition: 'none', '&:focus': {
        background: theme.barBg,
        boxShadow: 'none',
    }, 
    // creates a pseudo border that does not affect the box model, but is accessible in high contrast mode
    '&:focus:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: '100%',
        border: `1px solid ${theme.color.secondary}`,
    } }, (highlighted && {
    '&:after': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        width: 8,
        height: 8,
        borderRadius: 8,
        background: theme.color.positive,
    },
}))));
exports.SidebarMenuList = ({ menu, onHide }) => {
    const links = react_1.useMemo(() => {
        return menu.map((_a) => {
            var { onClick } = _a, rest = __rest(_a, ["onClick"]);
            return (Object.assign(Object.assign({}, rest), { onClick: ((event, item) => {
                    if (onClick) {
                        onClick(event, item);
                    }
                    onHide();
                }) }));
        });
    }, [menu]);
    return react_1.default.createElement(components_1.TooltipLinkList, { links: links });
};
exports.SidebarMenu = ({ isHighlighted, menu }) => {
    return (react_1.default.createElement(components_1.WithTooltip, { placement: "top", trigger: "click", closeOnClick: true, tooltip: ({ onHide }) => react_1.default.createElement(exports.SidebarMenuList, { onHide: onHide, menu: menu }) },
        react_1.default.createElement(exports.MenuButton, { outline: true, small: true, containsIcon: true, highlighted: isHighlighted, title: "Shortcuts" },
            react_1.default.createElement(components_1.Icons, { icon: "ellipsis" }))));
};
exports.ToolbarMenu = ({ menu }) => {
    return (react_1.default.createElement(components_1.WithTooltip, { placement: "bottom", trigger: "click", closeOnClick: true, tooltip: ({ onHide }) => react_1.default.createElement(exports.SidebarMenuList, { onHide: onHide, menu: menu }) },
        react_1.default.createElement(components_1.IconButton, { title: "Shortcuts", "aria-label": "Shortcuts" },
            react_1.default.createElement(components_1.Icons, { icon: "menu" }))));
};
