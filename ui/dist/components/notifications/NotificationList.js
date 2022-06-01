"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const theming_1 = require("@storybook/theming");
const NotificationItem_1 = __importDefault(require("./NotificationItem"));
const List = theming_1.styled.div({
    zIndex: 10,
    '> * + *': {
        marginTop: 10,
    },
    '&:empty': {
        display: 'none',
    },
}, ({ placement }) => placement || {
    bottom: 0,
    left: 0,
    right: 0,
    position: 'fixed',
});
const NotificationList = ({ notifications, clearNotification, placement = undefined }) => (react_1.default.createElement(List, { placement: placement }, notifications.map((notification) => (react_1.default.createElement(NotificationItem_1.default, { key: notification.id, onDismissNotification: (id) => clearNotification(id), notification: notification })))));
exports.default = NotificationList;
