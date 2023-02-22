"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs_1 = require("fs");
var promises_1 = require("fs/promises");
var path_1 = require("path");
var axios_1 = require("axios");
var jsdom_1 = require("jsdom");
function fetchPage(url) {
    console.log('Jag kommer in in i fetchPage');
    return axios_1["default"]
        .get(url)
        .then(function (res) { return res.data; })["catch"](function (error) {
        var _a;
        console.error("There was an error with ".concat((_a = error.config) === null || _a === void 0 ? void 0 : _a.url, "."));
        console.error(error.toJSON());
    });
}
function fetchFromWebOrCache(url, ignoreCache) {
    return __awaiter(this, void 0, void 0, function () {
        var HTMLData, dom, HTMLData, dom;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ignoreCache = false;
                    // If the cache folder doesn't exist, create it
                    if (!(0, fs_1.existsSync)((0, path_1.resolve)(__dirname, '.cache'))) {
                        (0, fs_1.mkdirSync)('.cache');
                    }
                    console.log("Getting data for ".concat(url, "..."));
                    if (!(!ignoreCache &&
                        (0, fs_1.existsSync)((0, path_1.resolve)(__dirname, ".cache/".concat(Buffer.from(url).toString('base64'), ".html"))))) return [3 /*break*/, 2];
                    console.log("I read ".concat(url, " from cache"));
                    return [4 /*yield*/, (0, promises_1.readFile)((0, path_1.resolve)(__dirname, ".cache/".concat(Buffer.from(url).toString('base64'), ".html")), { encoding: 'utf8' })];
                case 1:
                    HTMLData = _a.sent();
                    dom = new jsdom_1.JSDOM(HTMLData);
                    return [2 /*return*/, dom.window.document];
                case 2:
                    console.log("I fetched ".concat(url, " fresh"));
                    return [4 /*yield*/, fetchPage(url)];
                case 3:
                    HTMLData = _a.sent();
                    //console.log('Jag har hämtat HTML datan');
                    //console.log(ignoreCache);
                    if (!ignoreCache) { //&& !(HTMLData === undefined)) {
                        console.log('Kommer in i if satsen');
                        (0, promises_1.writeFile)((0, path_1.resolve)(__dirname, ".cache/".concat(Buffer.from(url).toString('base64'), ".html")), HTMLData, { encoding: 'utf8' });
                    }
                    console.log('efter if satsen');
                    dom = new jsdom_1.JSDOM(HTMLData);
                    return [2 /*return*/, dom.window.document];
            }
        });
    });
}
function extractData(document) {
    console.log('Kommer in i extractData');
    var writingLinks = Array.from(document.querySelectorAll('p'));
    //return writingLinks;
    return writingLinks.map(function (link) {
        return {
            title: link.title,
            text: link.textContent
        };
    });
}
function saveData(filename, data) {
    console.log('Kommer in i saveData');
    console.log(data);
    //console.log(existsSync(resolve(__dirname, 'data')));
    //console.log(JSON.stringify(data));
    if (!(0, fs_1.existsSync)((0, path_1.resolve)(__dirname, 'data'))) {
        (0, fs_1.mkdirSync)('data');
    }
    (0, promises_1.writeFile)((0, path_1.resolve)(__dirname, "data/".concat(filename, ".json")), JSON.stringify(data), 
    //"test",
    { encoding: 'utf8' });
}
function getData() {
    return __awaiter(this, void 0, void 0, function () {
        var document, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchFromWebOrCache('https://en.wikipedia.org/wiki/Web_scraping', true)];
                case 1:
                    document = _a.sent();
                    data = extractData(document);
                    //console.log(data);
                    saveData('wiki-web-scraping', data);
                    return [2 /*return*/];
            }
        });
    });
}
getData();
