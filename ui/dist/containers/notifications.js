"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapper = void 0;
const react_1 = __importDefault(require("react"));
const api_1 = require("@storybook/api");
const NotificationList_1 = __importDefault(require("../components/notifications/NotificationList"));
exports.mapper = ({ state }) => {
    const { clearNotification } = api_1.useStorybookApi();
    const { notifications } = state;
    return {
        notifications,
        clearNotification,
    };
};
const NotificationConnect = (props) => (react_1.default.createElement(api_1.Consumer, { filter: exports.mapper }, (fromState) => react_1.default.createElement(NotificationList_1.default, Object.assign({}, props, fromState))));
exports.default = NotificationConnect;
