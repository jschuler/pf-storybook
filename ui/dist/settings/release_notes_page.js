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
exports.ReleaseNotesPage = void 0;
const api_1 = require("@storybook/api");
const react_1 = __importStar(require("react"));
const release_notes_1 = require("./release_notes");
const ReleaseNotesPage = () => {
    const api = api_1.useStorybookApi();
    react_1.useEffect(() => {
        api.setDidViewReleaseNotes();
    }, []);
    const version = api.releaseNotesVersion();
    return react_1.default.createElement(release_notes_1.ReleaseNotesScreen, { version: version });
};
exports.ReleaseNotesPage = ReleaseNotesPage;
