"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLastViewed = void 0;
const debounce_1 = __importDefault(require("lodash/debounce"));
const react_1 = require("react");
const store2_1 = __importDefault(require("store2"));
const save = debounce_1.default((value) => store2_1.default.set('lastViewedStoryIds', value), 1000);
exports.useLastViewed = (selection) => {
    const initialLastViewedStoryIds = react_1.useMemo(() => {
        const items = store2_1.default.get('lastViewedStoryIds');
        if (!items || !Array.isArray(items))
            return [];
        if (!items.some((item) => typeof item === 'object' && item.storyId && item.refId))
            return [];
        return items;
    }, [store2_1.default]);
    const lastViewedRef = react_1.useRef(initialLastViewedStoryIds);
    const updateLastViewed = react_1.useCallback((story) => {
        const items = lastViewedRef.current;
        const index = items.findIndex(({ storyId, refId }) => storyId === story.storyId && refId === story.refId);
        if (index === 0)
            return;
        if (index === -1) {
            lastViewedRef.current = [story, ...items];
        }
        else {
            lastViewedRef.current = [story, ...items.slice(0, index), ...items.slice(index + 1)];
        }
        save(lastViewedRef.current);
    }, [lastViewedRef]);
    react_1.useEffect(() => {
        if (selection)
            updateLastViewed(selection);
    }, [selection]);
    return {
        getLastViewed: react_1.useCallback(() => lastViewedRef.current, [lastViewedRef]),
        clearLastViewed: react_1.useCallback(() => {
            lastViewedRef.current = lastViewedRef.current.slice(0, 1);
            save(lastViewedRef.current);
        }, [lastViewedRef]),
    };
};
