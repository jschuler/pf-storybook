"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationItemSpacer = void 0;
const react_1 = __importDefault(require("react"));
const router_1 = require("@storybook/router");
const theming_1 = require("@storybook/theming");
const components_1 = require("@storybook/components");
const polished_1 = require("polished");
const DEFAULT_ICON_COLOUR = '#66BF3C';
const Notification = theming_1.styled.div(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    padding: 15,
    width: 280,
    borderRadius: 4,
    alignItems: 'center',
    background: theme.base === 'light'
        ? 'rgba(50,53,71,0.97)'
        : 'linear-gradient(0deg, rgba(248,248,248,0.97) 0%, rgba(247,252,255,0.97) 100%)',
    boxShadow: `0 2px 5px 0 rgba(0,0,0,0.05), 0 5px 15px 0 rgba(0,0,0,0.1)`,
    color: theme.color.inverseText,
    textDecoration: 'none',
}));
const NotificationWithInteractiveStates = theming_1.styled(Notification)(() => ({
    transition: 'all 150ms ease-out',
    transform: 'translate3d(0, 0, 0)',
    '&:hover': {
        transform: 'translate3d(0, -3px, 0)',
        boxShadow: '0 1px 3px 0 rgba(30,167,253,0.5), 0 2px 5px 0 rgba(0,0,0,0.05), 0 5px 15px 0 rgba(0,0,0,0.1)',
    },
    '&:active': {
        transform: 'translate3d(0, 0, 0)',
        boxShadow: '0 1px 3px 0 rgba(30,167,253,0.5), 0 2px 5px 0 rgba(0,0,0,0.05), 0 5px 15px 0 rgba(0,0,0,0.1)',
    },
    '&:focus': {
        boxShadow: '0 1px 3px 0 rgba(30,167,253,0.5), 0 2px 5px 0 rgba(0,0,0,0.05), 0 5px 15px 0 rgba(0,0,0,0.1)',
    },
}));
const NotificationLink = NotificationWithInteractiveStates.withComponent(router_1.Link);
const NotificationIconWrapper = theming_1.styled.div(() => ({
    display: 'flex',
    marginRight: 10,
    alignItems: 'center',
}));
const NotificationTextWrapper = theming_1.styled.div(() => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
}));
const Headline = theming_1.styled.div(({ theme, hasIcon }) => ({
    height: '100%',
    width: hasIcon ? 205 : 230,
    alignItems: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: theme.typography.size.s1,
    lineHeight: '16px',
    fontWeight: theme.typography.weight.bold,
}));
const SubHeadline = theming_1.styled.div(({ theme }) => ({
    color: polished_1.transparentize(0.25, theme.color.inverseText),
    fontSize: theme.typography.size.s1 - 1,
    lineHeight: '14px',
    marginTop: 2,
}));
const ItemContent = ({ icon, content: { headline, subHeadline }, }) => (react_1.default.createElement(react_1.default.Fragment, null,
    !icon || (react_1.default.createElement(NotificationIconWrapper, null,
        react_1.default.createElement(components_1.Icons, { icon: icon.name, width: 16, color: icon.color || DEFAULT_ICON_COLOUR }))),
    react_1.default.createElement(NotificationTextWrapper, null,
        react_1.default.createElement(Headline, { title: headline, hasIcon: !!icon }, headline),
        subHeadline && react_1.default.createElement(SubHeadline, null, subHeadline))));
const DismissButtonWrapper = theming_1.styled(components_1.IconButton)(({ theme }) => ({
    alignSelf: 'center',
    marginTop: 0,
    color: theme.base === 'light' ? 'rgba(255,255,255,0.7)' : ' #999999',
}));
const DismissNotificationItem = ({ onDismiss }) => (react_1.default.createElement(DismissButtonWrapper, { title: "Dismiss notification", onClick: (e) => {
        e.preventDefault();
        onDismiss();
    } },
    react_1.default.createElement(components_1.Icons, { icon: "closeAlt", height: 12, width: 12 })));
exports.NotificationItemSpacer = theming_1.styled.div({
    height: 48,
});
const NotificationItem = ({ notification: { content, link, onClear, id, icon }, onDismissNotification }) => {
    const dismissNotificationItem = () => {
        onDismissNotification(id);
        onClear();
    };
    return link ? (react_1.default.createElement(NotificationLink, { to: link },
        react_1.default.createElement(ItemContent, { icon: icon, content: content }),
        react_1.default.createElement(DismissNotificationItem, { onDismiss: dismissNotificationItem }))) : (react_1.default.createElement(Notification, null,
        react_1.default.createElement(ItemContent, { icon: icon, content: content }),
        react_1.default.createElement(DismissNotificationItem, { onDismiss: dismissNotificationItem })));
};
exports.default = NotificationItem;
