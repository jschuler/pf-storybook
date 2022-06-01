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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FramesRenderer = void 0;
const react_1 = __importStar(require("react"));
const api_1 = require("@storybook/api");
const components_1 = require("@storybook/components");
const theming_1 = require("@storybook/theming");
const iframe_1 = require("./iframe");
const stringifyQueryParams_1 = require("./utils/stringifyQueryParams");
const getActive = (refId) => {
    if (refId) {
        return `storybook-ref-${refId}`;
    }
    return 'storybook-preview-iframe';
};
const SkipToSidebarLink = theming_1.styled(components_1.Button)(({ theme }) => ({
    display: 'none',
    '@media (min-width: 600px)': {
        position: 'absolute',
        top: 10,
        right: 15,
        padding: '10px 15px',
        fontSize: theme.typography.size.s1,
        transform: 'translateY(-100px)',
        '&:focus': {
            transform: 'translateY(0)',
            zIndex: 1,
        },
    },
}));
const whenSidebarIsVisible = ({ state }) => ({
    isFullscreen: state.layout.isFullscreen,
    showNav: state.layout.showNav,
    selectedStoryId: state.storyId,
});
exports.FramesRenderer = ({ refs, story, scale, viewMode = 'story', refId, queryParams = {}, baseUrl, storyId = '*', }) => {
    var _a;
    const version = (_a = refs[refId]) === null || _a === void 0 ? void 0 : _a.version;
    const stringifiedQueryParams = stringifyQueryParams_1.stringifyQueryParams(Object.assign(Object.assign({}, queryParams), (version && { version })));
    const active = getActive(refId);
    const styles = react_1.useMemo(() => {
        // add #root to make the selector high enough in specificity
        return {
            '#root [data-is-storybook="false"]': {
                display: 'none',
            },
            '#root [data-is-storybook="true"]': {
                display: 'block',
            },
        };
    }, []);
    const [frames, setFrames] = react_1.useState({
        'storybook-preview-iframe': components_1.getStoryHref(baseUrl, storyId, Object.assign(Object.assign(Object.assign({}, queryParams), (version && { version })), { viewMode })),
    });
    react_1.useEffect(() => {
        const newFrames = Object.values(refs)
            .filter((r) => {
            if (r.error) {
                return false;
            }
            if (r.type === 'auto-inject') {
                return true;
            }
            if (story && r.id === story.refId) {
                return true;
            }
            return false;
        })
            .reduce((acc, r) => {
            return Object.assign(Object.assign({}, acc), { [`storybook-ref-${r.id}`]: `${r.url}/iframe.html?id=${storyId}&viewMode=${viewMode}&refId=${r.id}${stringifiedQueryParams}` });
        }, frames);
        setFrames(newFrames);
    }, [storyId, story, refs]);
    return (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(theming_1.Global, { styles: styles }),
        react_1.default.createElement(api_1.Consumer, { filter: whenSidebarIsVisible }, ({ isFullscreen, showNav, selectedStoryId }) => {
            if (!isFullscreen && !!showNav && selectedStoryId) {
                return (react_1.default.createElement(SkipToSidebarLink, { secondary: true, isLink: true, tabIndex: 0, href: `#${selectedStoryId}` }, "Skip to sidebar"));
            }
            return null;
        }),
        Object.entries(frames).map(([id, src]) => (react_1.default.createElement(react_1.Fragment, { key: id },
            react_1.default.createElement(iframe_1.IFrame, { active: id === active, key: refs[id] ? refs[id].url : id, id: id, title: id, src: src, allowFullScreen: true, scale: scale }))))));
};
