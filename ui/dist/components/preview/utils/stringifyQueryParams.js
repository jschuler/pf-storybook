"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringifyQueryParams = void 0;
const qs_1 = __importDefault(require("qs"));
exports.stringifyQueryParams = (queryParams) => qs_1.default.stringify(queryParams, { addQueryPrefix: true, encode: false }).replace(/^\?/, '&');
