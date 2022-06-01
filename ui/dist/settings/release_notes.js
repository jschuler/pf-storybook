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
exports.PureReleaseNotesScreen = exports.ReleaseNotesScreen = void 0;
const react_1 = __importStar(require("react"));
const theming_1 = require("@storybook/theming");
const components_1 = require("@storybook/components");
const Centered = theming_1.styled.div({
    top: '50%',
    position: 'absolute',
    transform: 'translateY(-50%)',
    width: '100%',
    textAlign: 'center',
});
const LoaderWrapper = theming_1.styled.div({
    position: 'relative',
    height: '32px',
});
const Message = theming_1.styled.div(({ theme }) => ({
    paddingTop: '12px',
    color: theme.color.mediumdark,
    maxWidth: '295px',
    margin: '0 auto',
    fontSize: `${theme.typography.size.s1}px`,
    lineHeight: `16px`,
}));
const Iframe = theming_1.styled.iframe({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    border: 0,
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%',
}, ({ isLoaded }) => ({ visibility: isLoaded ? 'visible' : 'hidden' }));
const AlertIcon = theming_1.styled(((props) => react_1.default.createElement(components_1.Icons, Object.assign({ icon: "alert" }, props))))(({ theme }) => ({
    color: theme.color.mediumdark,
    width: 40,
    margin: '0 auto',
}));
const getIframeUrl = (version) => {
    const [major, minor] = version.split('.');
    return `https://storybook.js.org/releases/iframe/${major}.${minor}`;
};
const ReleaseNotesLoader = () => (react_1.default.createElement(Centered, null,
    react_1.default.createElement(LoaderWrapper, null,
        react_1.default.createElement(components_1.Loader, null)),
    react_1.default.createElement(Message, null, "Loading release notes")));
const MaxWaitTimeMessaging = () => (react_1.default.createElement(Centered, null,
    react_1.default.createElement(AlertIcon, null),
    react_1.default.createElement(Message, null, "The release notes couldn't be loaded. Check your internet connection and try again.")));
const PureReleaseNotesScreen = ({ didHitMaxWaitTime, isLoaded, setLoaded, version, }) => (react_1.default.createElement(react_1.Fragment, null,
    !isLoaded && !didHitMaxWaitTime && react_1.default.createElement(ReleaseNotesLoader, null),
    didHitMaxWaitTime ? (react_1.default.createElement(MaxWaitTimeMessaging, null)) : (react_1.default.createElement(Iframe, { isLoaded: isLoaded, onLoad: () => setLoaded(true), src: getIframeUrl(version), title: `Release notes for Storybook version ${version}` }))));
exports.PureReleaseNotesScreen = PureReleaseNotesScreen;
const MAX_WAIT_TIME = 10000; // 10 seconds
const ReleaseNotesScreen = ({ version }) => {
    const [isLoaded, setLoaded] = react_1.useState(false);
    const [didHitMaxWaitTime, setDidHitMaxWaitTime] = react_1.useState(false);
    react_1.useEffect(() => {
        const timer = setTimeout(() => !isLoaded && setDidHitMaxWaitTime(true), MAX_WAIT_TIME);
        return () => clearTimeout(timer);
    }, [isLoaded]);
    return (react_1.default.createElement(PureReleaseNotesScreen, { didHitMaxWaitTime: didHitMaxWaitTime, isLoaded: isLoaded, setLoaded: setLoaded, version: version }));
};
exports.ReleaseNotesScreen = ReleaseNotesScreen;
