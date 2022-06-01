"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSearchResult = exports.isExpandType = exports.isClearType = exports.isCloseType = void 0;
function isCloseType(x) {
    return !!(x && x.closeMenu);
}
exports.isCloseType = isCloseType;
function isClearType(x) {
    return !!(x && x.clearLastViewed);
}
exports.isClearType = isClearType;
function isExpandType(x) {
    return !!(x && x.showAll);
}
exports.isExpandType = isExpandType;
function isSearchResult(x) {
    return !!(x && x.item);
}
exports.isSearchResult = isSearchResult;
