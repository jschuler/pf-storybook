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
exports.Preview = void 0;
const react_1 = __importStar(require("react"));
const react_helmet_async_1 = require("react-helmet-async");
const api_1 = require("@storybook/api");
const core_events_1 = require("@storybook/core-events");
const addons_1 = require("@storybook/addons");
const components_1 = require("@storybook/components");
const router_1 = require("@storybook/router");
const S = __importStar(require("./utils/components"));
const zoom_1 = require("./tools/zoom");
const wrappers_1 = require("./wrappers");
const toolbar_1 = require("./toolbar");
const FramesRenderer_1 = require("./FramesRenderer");
const getWrappers = (getFn) => Object.values(getFn(addons_1.types.PREVIEW));
const getTabs = (getFn) => Object.values(getFn(addons_1.types.TAB));
const canvasMapper = ({ state, api }) => ({
    storyId: state.storyId,
    refId: state.refId,
    viewMode: state.viewMode,
    customCanvas: api.renderPreview,
    queryParams: state.customQueryParams,
    getElements: api.getElements,
    story: api.getData(state.storyId, state.refId),
    storiesConfigured: state.storiesConfigured,
    storiesFailed: state.storiesFailed,
    refs: state.refs,
    active: !!(state.viewMode && state.viewMode.match(/^(story|docs)$/)),
});
const createCanvas = (id, baseUrl = 'iframe.html', withLoader = true) => ({
    id: 'canvas',
    title: 'Canvas',
    route: ({ storyId, refId }) => (refId ? `/story/${refId}_${storyId}` : `/story/${storyId}`),
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: () => {
        return (react_1.default.createElement(api_1.Consumer, { filter: canvasMapper }, ({ story, refs, customCanvas, storyId, refId, viewMode, queryParams, getElements, storiesConfigured, storiesFailed, active, }) => {
            const wrappers = react_1.useMemo(() => [...wrappers_1.defaultWrappers, ...getWrappers(getElements)], [getElements, ...wrappers_1.defaultWrappers]);
            const isLoading = story
                ? !!refs[refId] && !refs[refId].ready
                : !storiesFailed && !storiesConfigured;
            return (react_1.default.createElement(zoom_1.ZoomConsumer, null, ({ value: scale }) => {
                return (react_1.default.createElement(react_1.default.Fragment, null,
                    withLoader && isLoading && (react_1.default.createElement(S.LoaderWrapper, null,
                        react_1.default.createElement(components_1.Loader, { id: "preview-loader", role: "progressbar" }))),
                    react_1.default.createElement(wrappers_1.ApplyWrappers, { id: id, storyId: storyId, viewMode: viewMode, active: active, wrappers: wrappers }, customCanvas ? (customCanvas(storyId, viewMode, id, baseUrl, scale, queryParams)) : (react_1.default.createElement(FramesRenderer_1.FramesRenderer, { baseUrl: baseUrl, refs: refs, scale: scale, story: story, viewMode: viewMode, refId: refId, queryParams: queryParams, storyId: storyId })))));
            }));
        }));
    },
});
const useTabs = (id, baseUrl, withLoader, getElements, story) => {
    const canvas = react_1.useMemo(() => {
        return createCanvas(id, baseUrl, withLoader);
    }, [id, baseUrl, withLoader]);
    const tabsFromConfig = react_1.useMemo(() => {
        return getTabs(getElements);
    }, [getElements]);
    return react_1.useMemo(() => {
        if (story === null || story === void 0 ? void 0 : story.parameters) {
            return filterTabs([canvas, ...tabsFromConfig], story.parameters);
        }
        return [canvas, ...tabsFromConfig];
    }, [story, canvas, ...tabsFromConfig]);
};
const Preview = react_1.default.memo((props) => {
    const { api, id: previewId, options, viewMode, storyId, story = undefined, description, baseUrl, withLoader = true, } = props;
    const { getElements } = api;
    const tabs = useTabs(previewId, baseUrl, withLoader, getElements, story);
    const shouldScale = viewMode === 'story';
    const { showToolbar, showTabs = true } = options;
    const visibleTabsInToolbar = showTabs ? tabs : [];
    const previousStoryId = react_1.useRef(storyId);
    const previousViewMode = react_1.useRef(viewMode);
    react_1.useEffect(() => {
        if (story && viewMode) {
            // Don't emit the event on first ("real") render, only when story or mode changes
            if (storyId !== previousStoryId.current || viewMode !== previousViewMode.current) {
                previousStoryId.current = storyId;
                previousViewMode.current = viewMode;
                if (viewMode.match(/docs|story/)) {
                    const { refId, id } = story;
                    api.emit(core_events_1.SET_CURRENT_STORY, {
                        storyId: id,
                        viewMode,
                        options: {
                            target: refId ? `storybook-ref-${refId}` : 'storybook-preview-iframe',
                        },
                    });
                }
            }
        }
    }, [story, viewMode]);
    return (react_1.default.createElement(react_1.Fragment, null,
        previewId === 'main' && (react_1.default.createElement(react_helmet_async_1.Helmet, { key: "description" },
            react_1.default.createElement("title", null, description))),
        react_1.default.createElement(zoom_1.ZoomProvider, { shouldScale: shouldScale },
            react_1.default.createElement(toolbar_1.ToolbarComp, { key: "tools", story: story, api: api, isShown: showToolbar, tabs: visibleTabsInToolbar }),
            react_1.default.createElement(S.FrameWrap, { key: "frame", offset: showToolbar ? 40 : 0 }, tabs.map((_a, i) => {
                var { render: Render, match } = _a, t = __rest(_a, ["render", "match"]);
                // @ts-ignore
                const key = t.id || t.key || i;
                return (react_1.default.createElement(react_1.Fragment, { key: key },
                    react_1.default.createElement(router_1.Location, null, (lp) => react_1.default.createElement(Render, { active: match(lp) }))));
            })))));
});
exports.Preview = Preview;
function filterTabs(panels, parameters) {
    const { previewTabs } = addons_1.addons.getConfig();
    const parametersTabs = parameters ? parameters.previewTabs : undefined;
    if (previewTabs || parametersTabs) {
        // deep merge global and local settings
        const tabs = api_1.merge(previewTabs, parametersTabs);
        const arrTabs = Object.keys(tabs).map((key, index) => (Object.assign(Object.assign({ index }, (typeof tabs[key] === 'string' ? { title: tabs[key] } : tabs[key])), { id: key })));
        return panels
            .filter((panel) => {
            const t = arrTabs.find((tab) => tab.id === panel.id);
            return t === undefined || t.id === 'canvas' || !t.hidden;
        })
            .map((panel, index) => (Object.assign(Object.assign({}, panel), { index })))
            .sort((p1, p2) => {
            const tab_1 = arrTabs.find((tab) => tab.id === p1.id);
            // @ts-ignore
            const index_1 = tab_1 ? tab_1.index : arrTabs.length + p1.index;
            const tab_2 = arrTabs.find((tab) => tab.id === p2.id);
            // @ts-ignore
            const index_2 = tab_2 ? tab_2.index : arrTabs.length + p2.index;
            return index_1 - index_2;
        })
            .map((panel) => {
            const t = arrTabs.find((tab) => tab.id === panel.id);
            if (t) {
                return Object.assign(Object.assign({}, panel), { title: t.title || panel.title, disabled: t.disabled, hidden: t.hidden });
            }
            return panel;
        });
    }
    return panels;
}
