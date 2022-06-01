"use strict";
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
exports.collapseDocsOnlyStories = exports.collapseAllStories = exports.DEFAULT_REF_ID = void 0;
exports.DEFAULT_REF_ID = 'storybook_internal';
exports.collapseAllStories = (stories) => {
    // keep track of component IDs that have been rewritten to the ID of their first leaf child
    const componentIdToLeafId = {};
    // 1) remove all leaves
    const leavesRemoved = Object.values(stories).filter((item) => !(item.isLeaf && stories[item.parent].isComponent));
    // 2) make all components leaves and rewrite their ID's to the first leaf child
    const componentsFlattened = leavesRemoved.map((item) => {
        const { id, isComponent, children } = item, rest = __rest(item, ["id", "isComponent", "children"]);
        // this is a folder, so just leave it alone
        if (!isComponent) {
            return item;
        }
        const nonLeafChildren = [];
        const leafChildren = [];
        children.forEach((child) => (stories[child].isLeaf ? leafChildren : nonLeafChildren).push(child));
        if (leafChildren.length === 0) {
            return item; // pass through, we'll handle you later
        }
        const leafId = leafChildren[0];
        const component = Object.assign(Object.assign({ args: {} }, rest), { id: leafId, kind: stories[leafId].kind, isRoot: false, isLeaf: true, isComponent: true, children: [] });
        componentIdToLeafId[id] = leafId;
        // this is a component, so it should not have any non-leaf children
        if (nonLeafChildren.length !== 0) {
            throw new Error(`Unexpected '${item.id}': ${JSON.stringify({ isComponent, nonLeafChildren })}`);
        }
        return component;
    });
    // 3) rewrite all the children as needed
    const childrenRewritten = componentsFlattened.map((item) => {
        if (item.isLeaf) {
            return item;
        }
        const { children } = item, rest = __rest(item, ["children"]);
        const rewritten = children.map((child) => componentIdToLeafId[child] || child);
        return Object.assign({ children: rewritten }, rest);
    });
    const result = {};
    childrenRewritten.forEach((item) => {
        result[item.id] = item;
    });
    return result;
};
exports.collapseDocsOnlyStories = (storiesHash) => {
    // keep track of component IDs that have been rewritten to the ID of their first leaf child
    const componentIdToLeafId = {};
    const docsOnlyStoriesRemoved = Object.values(storiesHash).filter((item) => {
        if (item.isLeaf && item.parameters && item.parameters.docsOnly) {
            componentIdToLeafId[item.parent] = item.id;
            return false; // filter it out
        }
        return true;
    });
    const docsOnlyComponentsCollapsed = docsOnlyStoriesRemoved.map((item) => {
        // collapse docs-only components
        const { isComponent, children, id } = item;
        if (isComponent && children.length === 1) {
            const leafId = componentIdToLeafId[id];
            if (leafId) {
                const collapsed = Object.assign(Object.assign({ args: {} }, item), { id: leafId, isLeaf: true, children: [] });
                return collapsed;
            }
        }
        // update groups
        if (children) {
            const rewritten = children.map((child) => componentIdToLeafId[child] || child);
            return Object.assign(Object.assign({}, item), { children: rewritten });
        }
        // pass through stories unmodified
        return item;
    });
    const result = {};
    docsOnlyComponentsCollapsed.forEach((item) => {
        result[item.id] = item;
    });
    return result;
};
