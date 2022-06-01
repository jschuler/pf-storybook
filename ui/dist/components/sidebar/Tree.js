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
exports.Tree = exports.Action = void 0;
const api_1 = require("@storybook/api");
const theming_1 = require("@storybook/theming");
const components_1 = require("@storybook/components");
const polished_1 = require("polished");
const react_1 = __importStar(require("react"));
const TreeNode_1 = require("./TreeNode");
const useExpanded_1 = require("./useExpanded");
const utils_1 = require("./utils");
exports.Action = theming_1.styled.button(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
    margin: 0,
    marginLeft: 'auto',
    padding: 0,
    outline: 0,
    lineHeight: 'normal',
    background: 'none',
    border: `1px solid transparent`,
    borderRadius: '100%',
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
    color: theme.base === 'light'
        ? polished_1.transparentize(0.3, theme.color.defaultText)
        : polished_1.transparentize(0.6, theme.color.defaultText),
    '&:hover': {
        color: theme.color.secondary,
    },
    '&:focus': {
        color: theme.color.secondary,
        borderColor: theme.color.secondary,
        '&:not(:focus-visible)': {
            borderColor: 'transparent',
        },
    },
    svg: {
        width: 10,
        height: 10,
    },
}));
const CollapseButton = theming_1.styled.button(({ theme }) => ({
    // Reset button
    background: 'transparent',
    border: 'none',
    outline: 'none',
    boxSizing: 'content-box',
    cursor: 'pointer',
    position: 'relative',
    textAlign: 'left',
    lineHeight: 'normal',
    font: 'inherit',
    color: 'inherit',
    letterSpacing: 'inherit',
    textTransform: 'inherit',
    display: 'flex',
    flex: '0 1 auto',
    padding: '3px 10px 1px 1px',
    margin: 0,
    marginLeft: -19,
    overflow: 'hidden',
    borderRadius: 26,
    transition: 'color 150ms, box-shadow 150ms',
    'span:first-of-type': {
        marginTop: 4,
        marginRight: 7,
    },
    '&:focus': {
        boxShadow: `0 0 0 1px ${theme.color.secondary}`,
        color: theme.color.secondary,
        'span:first-of-type': {
            color: theme.color.secondary,
        },
        '&:not(:focus-visible)': {
            boxShadow: 'none',
        },
    },
}));
const LeafNodeStyleWrapper = theming_1.styled.div(({ theme }) => ({
    position: 'relative',
}));
const SkipToContentLink = theming_1.styled(components_1.Button)(({ theme }) => ({
    display: 'none',
    '@media (min-width: 600px)': {
        display: 'block',
        zIndex: -1,
        position: 'absolute',
        top: 1,
        right: 20,
        height: '20px',
        fontSize: '10px',
        padding: '5px 10px',
        '&:focus': {
            background: 'white',
            zIndex: 1,
        },
    },
}));
const Node = react_1.default.memo(({ item, refId, isOrphan, isDisplayed, isSelected, isFullyExpanded, setFullyExpanded, isExpanded, setExpanded, onSelectStoryId, }) => {
    var _a, _b, _c;
    if (!isDisplayed)
        return null;
    const id = utils_1.createId(item.id, refId);
    if (api_1.isStory(item)) {
        const LeafNode = item.isComponent ? TreeNode_1.DocumentNode : TreeNode_1.StoryNode;
        return (react_1.default.createElement(LeafNodeStyleWrapper, null,
            react_1.default.createElement(LeafNode, { key: id, id: id, className: "sidebar-item", "data-ref-id": refId, "data-item-id": item.id, "data-parent-id": item.parent, "data-nodetype": item.isComponent ? 'document' : 'story', "data-selected": isSelected, "data-highlightable": isDisplayed, depth: isOrphan ? item.depth : item.depth - 1, href: utils_1.getLink(item.id, refId), onClick: (event) => {
                    event.preventDefault();
                    onSelectStoryId(item.id);
                } }, ((_a = item.renderLabel) === null || _a === void 0 ? void 0 : _a.call(item, item)) || item.name),
            isSelected && (react_1.default.createElement(SkipToContentLink, { secondary: true, outline: true, isLink: true, href: "#storybook-preview-wrapper" }, "Skip to canvas"))));
    }
    if (api_1.isRoot(item)) {
        return (react_1.default.createElement(TreeNode_1.RootNode, { key: id, id: id, className: "sidebar-subheading", "data-ref-id": refId, "data-item-id": item.id, "data-nodetype": "root", "aria-expanded": isExpanded },
            react_1.default.createElement(CollapseButton, { type: "button", "data-action": "collapse-root", onClick: (event) => {
                    event.preventDefault();
                    setExpanded({ ids: [item.id], value: !isExpanded });
                } },
                react_1.default.createElement(TreeNode_1.CollapseIcon, { isExpanded: isExpanded }),
                ((_b = item.renderLabel) === null || _b === void 0 ? void 0 : _b.call(item, item)) || item.name),
            isExpanded && (react_1.default.createElement(exports.Action, { type: "button", className: "sidebar-subheading-action", "aria-label": "expand", "data-action": "expand-all", "data-expanded": isFullyExpanded, onClick: (event) => {
                    event.preventDefault();
                    setFullyExpanded();
                } },
                react_1.default.createElement(components_1.Icons, { icon: isFullyExpanded ? 'collapse' : 'expandalt' })))));
    }
    const BranchNode = item.isComponent ? TreeNode_1.ComponentNode : TreeNode_1.GroupNode;
    return (react_1.default.createElement(BranchNode, { key: id, id: id, className: "sidebar-item", "data-ref-id": refId, "data-item-id": item.id, "data-parent-id": item.parent, "data-nodetype": item.isComponent ? 'component' : 'group', "data-highlightable": isDisplayed, "aria-controls": item.children && item.children[0], "aria-expanded": isExpanded, depth: isOrphan ? item.depth : item.depth - 1, isComponent: item.isComponent, isExpandable: item.children && item.children.length > 0, isExpanded: isExpanded, onClick: (event) => {
            event.preventDefault();
            setExpanded({ ids: [item.id], value: !isExpanded });
            if (item.isComponent && !isExpanded)
                onSelectStoryId(item.id);
        } }, ((_c = item.renderLabel) === null || _c === void 0 ? void 0 : _c.call(item, item)) || item.name));
});
const Root = react_1.default.memo((_a) => {
    var { setExpanded, isFullyExpanded, expandableDescendants } = _a, props = __rest(_a, ["setExpanded", "isFullyExpanded", "expandableDescendants"]);
    const setFullyExpanded = react_1.useCallback(() => setExpanded({ ids: expandableDescendants, value: !isFullyExpanded }), [setExpanded, isFullyExpanded, expandableDescendants]);
    return (react_1.default.createElement(Node, Object.assign({}, props, { setExpanded: setExpanded, isFullyExpanded: isFullyExpanded, setFullyExpanded: setFullyExpanded })));
});
const Container = theming_1.styled.div((props) => ({
    marginTop: props.hasOrphans ? 20 : 0,
    marginBottom: 20,
}));
exports.Tree = react_1.default.memo(({ isBrowsing, isMain, refId, data, highlightedRef, setHighlightedItemId, selectedStoryId, onSelectStoryId, }) => {
    const containerRef = react_1.useRef(null);
    // Find top-level nodes and group them so we can hoist any orphans and expand any roots.
    const [rootIds, orphanIds, initialExpanded] = react_1.useMemo(() => Object.keys(data).reduce((acc, id) => {
        const item = data[id];
        if (api_1.isRoot(item))
            acc[0].push(id);
        else if (!item.parent)
            acc[1].push(id);
        if (api_1.isRoot(item) && item.startCollapsed)
            acc[2][id] = false;
        return acc;
    }, [[], [], {}]), [data]);
    // Pull up (hoist) any "orphan" items that don't have a root item as ancestor so they get
    // displayed at the top of the tree, before any root items.
    // Also create a map of expandable descendants for each root/orphan item, which is needed later.
    // Doing that here is a performance enhancement, as it avoids traversing the tree again later.
    const { orphansFirst, expandableDescendants } = react_1.useMemo(() => {
        return orphanIds.concat(rootIds).reduce((acc, nodeId) => {
            const descendantIds = utils_1.getDescendantIds(data, nodeId, false);
            acc.orphansFirst.push(nodeId, ...descendantIds);
            acc.expandableDescendants[nodeId] = descendantIds.filter((d) => !data[d].isLeaf);
            return acc;
        }, { orphansFirst: [], expandableDescendants: {} });
    }, [data, rootIds, orphanIds]);
    // Create a list of component IDs which have exactly one story, which name exactly matches the component name.
    const singleStoryComponentIds = react_1.useMemo(() => {
        return orphansFirst.filter((nodeId) => {
            const { children = [], isComponent, isLeaf, name } = data[nodeId];
            return (!isLeaf &&
                isComponent &&
                children.length === 1 &&
                api_1.isStory(data[children[0]]) &&
                utils_1.isStoryHoistable(data[children[0]].name, name));
        });
    }, [data, orphansFirst]);
    // Omit single-story components from the list of nodes.
    const collapsedItems = react_1.useMemo(() => {
        return orphansFirst.filter((id) => !singleStoryComponentIds.includes(id));
    }, [orphanIds, orphansFirst, singleStoryComponentIds]);
    // Rewrite the dataset to place the child story in place of the component.
    const collapsedData = react_1.useMemo(() => {
        return singleStoryComponentIds.reduce((acc, id) => {
            const { children, parent } = data[id];
            const [childId] = children;
            if (parent) {
                const siblings = [...data[parent].children];
                siblings[siblings.indexOf(id)] = childId;
                acc[parent] = Object.assign(Object.assign({}, data[parent]), { children: siblings });
            }
            acc[childId] = Object.assign(Object.assign({}, data[childId]), { parent, depth: data[childId].depth - 1 });
            return acc;
        }, Object.assign({}, data));
    }, [data]);
    const ancestry = react_1.useMemo(() => {
        return collapsedItems.reduce((acc, id) => Object.assign(acc, { [id]: utils_1.getAncestorIds(collapsedData, id) }), {});
    }, [collapsedItems, collapsedData]);
    // Track expanded nodes, keep it in sync with props and enable keyboard shortcuts.
    const [expanded, setExpanded] = useExpanded_1.useExpanded({
        containerRef,
        isBrowsing,
        refId,
        data: collapsedData,
        initialExpanded,
        rootIds,
        highlightedRef,
        setHighlightedItemId,
        selectedStoryId,
        onSelectStoryId,
    });
    return (react_1.default.createElement(Container, { ref: containerRef, hasOrphans: isMain && orphanIds.length > 0 }, collapsedItems.map((itemId) => {
        const item = collapsedData[itemId];
        const id = utils_1.createId(itemId, refId);
        if (api_1.isRoot(item)) {
            const descendants = expandableDescendants[item.id];
            const isFullyExpanded = descendants.every((d) => expanded[d]);
            return (react_1.default.createElement(Root, { key: id, item: item, refId: refId, isOrphan: false, isDisplayed: true, isSelected: selectedStoryId === itemId, isExpanded: !!expanded[itemId], setExpanded: setExpanded, isFullyExpanded: isFullyExpanded, expandableDescendants: descendants, onSelectStoryId: onSelectStoryId }));
        }
        const isDisplayed = !item.parent || ancestry[itemId].every((a) => expanded[a]);
        return (react_1.default.createElement(Node, { key: id, item: item, refId: refId, isOrphan: orphanIds.some((oid) => itemId === oid || itemId.startsWith(`${oid}-`)), isDisplayed: isDisplayed, isSelected: selectedStoryId === itemId, isExpanded: !!expanded[itemId], setExpanded: setExpanded, onSelectStoryId: onSelectStoryId }));
    })));
});
