"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStoryHoistable = exports.removeNoiseFromName = exports.isAncestor = exports.getStateType = exports.scrollIntoView = exports.cycle = exports.searchItem = exports.getPath = exports.getDescendantIds = exports.getAncestorIds = exports.getParents = exports.getParent = exports.get = exports.prevent = exports.getLink = exports.createId = void 0;
const memoizerific_1 = __importDefault(require("memoizerific"));
const global_1 = __importDefault(require("global"));
const api_1 = require("@storybook/api");
const data_1 = require("./data");
const { document, window: globalWindow, DOCS_MODE } = global_1.default;
exports.createId = (itemId, refId) => !refId || refId === data_1.DEFAULT_REF_ID ? itemId : `${refId}_${itemId}`;
exports.getLink = (itemId, refId) => {
    const type = DOCS_MODE ? 'docs' : 'story';
    return `${document.location.pathname}?path=/${type}/${exports.createId(itemId, refId)}`;
};
exports.prevent = (e) => {
    e.preventDefault();
    return false;
};
exports.get = memoizerific_1.default(1000)((id, dataset) => dataset[id]);
exports.getParent = memoizerific_1.default(1000)((id, dataset) => {
    const item = exports.get(id, dataset);
    return item && !api_1.isRoot(item) ? exports.get(item.parent, dataset) : undefined;
});
exports.getParents = memoizerific_1.default(1000)((id, dataset) => {
    const parent = exports.getParent(id, dataset);
    return parent ? [parent, ...exports.getParents(parent.id, dataset)] : [];
});
exports.getAncestorIds = memoizerific_1.default(1000)((data, id) => exports.getParents(id, data).map((item) => item.id));
exports.getDescendantIds = memoizerific_1.default(1000)((data, id, skipLeafs) => {
    const { children = [] } = data[id] || {};
    return children.reduce((acc, childId) => {
        if (!data[childId] || (skipLeafs && data[childId].isLeaf))
            return acc;
        acc.push(childId, ...exports.getDescendantIds(data, childId, skipLeafs));
        return acc;
    }, []);
});
function getPath(item, ref) {
    const parent = !api_1.isRoot(item) && item.parent ? ref.stories[item.parent] : null;
    if (parent)
        return [...getPath(parent, ref), parent.name];
    return ref.id === data_1.DEFAULT_REF_ID ? [] : [ref.title || ref.id];
}
exports.getPath = getPath;
exports.searchItem = (item, ref) => {
    return Object.assign(Object.assign({}, item), { refId: ref.id, path: getPath(item, ref) });
};
function cycle(array, index, delta) {
    let next = index + (delta % array.length);
    if (next < 0)
        next = array.length + next;
    if (next >= array.length)
        next -= array.length;
    return next;
}
exports.cycle = cycle;
exports.scrollIntoView = (element, center = false) => {
    if (!element)
        return;
    const { top, bottom } = element.getBoundingClientRect();
    const isInView = top >= 0 && bottom <= (globalWindow.innerHeight || document.documentElement.clientHeight);
    if (!isInView)
        element.scrollIntoView({ block: center ? 'center' : 'nearest' });
};
exports.getStateType = (isLoading, isAuthRequired, isError, isEmpty) => {
    switch (true) {
        case isAuthRequired:
            return 'auth';
        case isError:
            return 'error';
        case isLoading:
            return 'loading';
        case isEmpty:
            return 'empty';
        default:
            return 'ready';
    }
};
exports.isAncestor = (element, maybeAncestor) => {
    if (!element || !maybeAncestor)
        return false;
    if (element === maybeAncestor)
        return true;
    return exports.isAncestor(element.parentElement, maybeAncestor);
};
exports.removeNoiseFromName = (storyName) => storyName.replaceAll(/(\s|-|_)/gi, '');
exports.isStoryHoistable = (storyName, componentName) => exports.removeNoiseFromName(storyName) === exports.removeNoiseFromName(componentName);
