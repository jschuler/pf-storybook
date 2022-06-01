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
exports.filterTools = exports.Tools = exports.ToolbarComp = exports.ToolRes = exports.defaultToolsExtra = exports.defaultTools = exports.createTabsTool = exports.fullScreenTool = exports.Toolbar = exports.getToolsExtra = exports.getTools = void 0;
const react_1 = __importStar(require("react"));
const theming_1 = require("@storybook/theming");
const components_1 = require("@storybook/components");
const api_1 = require("@storybook/api");
const shortcut_1 = require("@storybook/api/shortcut");
const addons_1 = require("@storybook/addons");
const router_1 = require("@storybook/router");
const zoom_1 = require("./tools/zoom");
const S = __importStar(require("./utils/components"));
const copy_1 = require("./tools/copy");
const eject_1 = require("./tools/eject");
const menu_1 = require("./tools/menu");
const addons_2 = require("./tools/addons");
const remount_1 = require("./tools/remount");
exports.getTools = (getFn) => Object.values(getFn(addons_1.types.TOOL));
exports.getToolsExtra = (getFn) => Object.values(getFn(addons_1.types.TOOLEXTRA));
const Bar = (_a) => {
    var { shown } = _a, props = __rest(_a, ["shown"]);
    return (react_1.default.createElement(components_1.FlexBar, Object.assign({}, props)));
};
exports.Toolbar = theming_1.styled(Bar)({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    transition: 'transform .2s linear',
}, ({ shown }) => ({
    transform: shown ? 'translateY(0px)' : 'translateY(-40px)',
}));
const fullScreenMapper = ({ api, state }) => ({
    toggle: api.toggleFullscreen,
    value: state.layout.isFullscreen,
    shortcut: shortcut_1.shortcutToHumanString(api.getShortcutKeys().fullScreen),
    hasPanel: Object.keys(api.getPanels()).length > 0,
    singleStory: state.singleStory,
});
exports.fullScreenTool = {
    title: 'fullscreen',
    id: 'fullscreen',
    match: (p) => ['story', 'docs'].includes(p.viewMode),
    render: () => (react_1.default.createElement(api_1.Consumer, { filter: fullScreenMapper }, ({ toggle, value, shortcut, hasPanel, singleStory }) => (!singleStory || (singleStory && hasPanel)) && (react_1.default.createElement(components_1.IconButton, { key: "full", onClick: toggle, title: `${value ? 'Exit full screen' : 'Go full screen'} [${shortcut}]` },
        react_1.default.createElement(components_1.Icons, { icon: value ? 'close' : 'expand' }))))),
};
const tabsMapper = ({ state }) => ({
    viewMode: state.docsOnly,
    storyId: state.storyId,
    path: state.path,
    location: state.location,
    refId: state.refId,
});
exports.createTabsTool = (tabs) => ({
    title: 'title',
    id: 'title',
    render: () => (react_1.default.createElement(api_1.Consumer, { filter: tabsMapper }, (rp) => (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(components_1.TabBar, { key: "tabs" }, tabs
            .filter((p) => !p.hidden)
            .map((t, index) => {
            const to = t.route(rp);
            const isActive = rp.path === to;
            return (react_1.default.createElement(S.UnstyledLink, { key: t.id || `l${index}`, to: to },
                react_1.default.createElement(components_1.TabButton, { disabled: t.disabled, active: isActive }, t.title)));
        })),
        react_1.default.createElement(components_1.Separator, null))))),
});
exports.defaultTools = [remount_1.remountTool, zoom_1.zoomTool];
exports.defaultToolsExtra = [addons_2.addonsTool, exports.fullScreenTool, eject_1.ejectTool, copy_1.copyTool];
const useTools = (getElements, tabs, viewMode, story, location, path) => {
    const toolsFromConfig = react_1.useMemo(() => exports.getTools(getElements), [getElements]);
    const toolsExtraFromConfig = react_1.useMemo(() => exports.getToolsExtra(getElements), [getElements]);
    const tools = react_1.useMemo(() => [...exports.defaultTools, ...toolsFromConfig], [exports.defaultTools, toolsFromConfig]);
    const toolsExtra = react_1.useMemo(() => [...exports.defaultToolsExtra, ...toolsExtraFromConfig], [exports.defaultToolsExtra, toolsExtraFromConfig]);
    return react_1.useMemo(() => {
        return story && story.parameters
            ? filterTools(tools, toolsExtra, tabs, { viewMode, story, location, path })
            : { left: tools, right: toolsExtra };
    }, [viewMode, story, location, path, tools, toolsExtra, tabs]);
};
exports.ToolRes = react_1.default.memo(({ api, story, tabs, isShown, location, path, viewMode }) => {
    const { left, right } = useTools(api.getElements, tabs, viewMode, story, location, path);
    return left || right ? (react_1.default.createElement(exports.Toolbar, { key: "toolbar", shown: isShown, border: true },
        react_1.default.createElement(exports.Tools, { key: "left", list: left }),
        react_1.default.createElement(exports.Tools, { key: "right", list: right }))) : null;
});
exports.ToolbarComp = react_1.default.memo((props) => (react_1.default.createElement(router_1.Location, null, ({ location, path, viewMode }) => react_1.default.createElement(exports.ToolRes, Object.assign({}, props, { location, path, viewMode })))));
exports.Tools = react_1.default.memo(({ list }) => (react_1.default.createElement(react_1.default.Fragment, null, list.filter(Boolean).map((_a, index) => {
    var { render: Render, id } = _a, t = __rest(_a, ["render", "id"]);
    return (
    // @ts-ignore
    react_1.default.createElement(Render, { key: id || t.key || `f-${index}` }));
}))));
function toolbarItemHasBeenExcluded(item, story) {
    var _a;
    const toolbarItemsFromStoryParameters = 'toolbar' in story.parameters ? story.parameters.toolbar : undefined;
    const { toolbar: toolbarItemsFromAddonsConfig } = addons_1.addons.getConfig();
    const toolbarItems = api_1.merge(toolbarItemsFromAddonsConfig, toolbarItemsFromStoryParameters);
    return toolbarItems ? !!((_a = toolbarItems[item.id]) === null || _a === void 0 ? void 0 : _a.hidden) : false;
}
function filterTools(tools, toolsExtra, tabs, { viewMode, story, location, path, }) {
    const toolsLeft = [
        menu_1.menuTool,
        tabs.filter((p) => !p.hidden).length >= 1 && exports.createTabsTool(tabs),
        ...tools,
    ];
    const toolsRight = [...toolsExtra];
    const filter = (item) => item &&
        (!item.match ||
            item.match({
                storyId: story.id,
                refId: story.refId,
                viewMode,
                location,
                path,
            })) &&
        !toolbarItemHasBeenExcluded(item, story);
    const left = toolsLeft.filter(filter);
    const right = toolsRight.filter(filter);
    return { left, right };
}
exports.filterTools = filterTools;
