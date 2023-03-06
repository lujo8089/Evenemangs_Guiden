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
exports.scrapeSite = exports.getInfoFromLink = exports.saveData = void 0;
var fs_1 = require("fs");
var selenium_webdriver_1 = require("selenium-webdriver");
var chrome_1 = require("selenium-webdriver/chrome");
/**
 * Takes a string of data and stores it in a file in the folder "data" withe he given filename
 * @param {string} Data
 * @param {string} filename
 */
function saveData(Data, filename) {
    if (!(0, fs_1.existsSync)('data')) {
        (0, fs_1.mkdirSync)('data');
    }
    (0, fs_1.writeFile)('data/' + filename, Data, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("File created!");
    });
}
exports.saveData = saveData;
/**
 * Takes a URL of a link of an event and return all valuable information of the event in a string
 * @param {string} url - URL of event link we want to scrape
 * @returns {string} text - Returns a string of all the information of the event of the given URL
 */
function getInfoFromLink(url) {
    return __awaiter(this, void 0, void 0, function () {
        var options, driver, infoHeading, infoHost, infoDateOfEvent, infoInfo, infoArr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = new chrome_1.Options();
                    options.addArguments("--headless"); // Run Chrome in headless mode
                    options.addArguments("--disable-blink-features=AutomationControlled");
                    return [4 /*yield*/, new selenium_webdriver_1.Builder()
                            .forBrowser("chrome")
                            .setChromeOptions(options)
                            .build()];
                case 1:
                    driver = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, , 9, 11]);
                    //Go to page
                    return [4 /*yield*/, driver.get(url)];
                case 3:
                    //Go to page
                    _a.sent();
                    //Wait for page to load
                    return [4 /*yield*/, driver.wait(selenium_webdriver_1.until.urlContains("evid="), 10000)];
                case 4:
                    //Wait for page to load
                    _a.sent();
                    return [4 /*yield*/, driver.findElement(selenium_webdriver_1.By.xpath('//*[@id="wap-section-9019"]/div[2]/div/div[1]/div[2]/header/h1')).getText()];
                case 5:
                    infoHeading = _a.sent();
                    return [4 /*yield*/, driver.findElement(selenium_webdriver_1.By.xpath('//*[@id="wap-section-9019"]/div[2]/div/div[1]/div[2]/header/div[1]')).getText()];
                case 6:
                    infoHost = _a.sent();
                    return [4 /*yield*/, driver.findElement(selenium_webdriver_1.By.xpath('//*[@id="wap-section-9019"]/div[2]/div/div[1]/div[2]/header/div[2]')).getText()];
                case 7:
                    infoDateOfEvent = _a.sent();
                    return [4 /*yield*/, driver.findElement(selenium_webdriver_1.By.xpath('//*[@id="wap-section-9019"]/div[2]/div/div[1]/div[2]/div')).getText()];
                case 8:
                    infoInfo = _a.sent();
                    infoArr = {
                        heading: infoHeading,
                        host: infoHost,
                        dateOfEvent: infoDateOfEvent,
                        info: infoInfo,
                        URL: url
                    };
                    //Returns the text of the element
                    return [2 /*return*/, infoArr];
                case 9: return [4 /*yield*/, driver.quit()];
                case 10:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.getInfoFromLink = getInfoFromLink;
/**
 * Take a URL of the site we want to scrape and stores the information we have specified into a file using selenium-webdriver
 * @param {string} url - URL of the site we want to scrape
 * @param {string} filename - The name of the file we want to store the data we have scraped in
 */
function scrapeSite(url, filename) {
    return __awaiter(this, void 0, void 0, function () {
        var options, driver, button1, button2, button3, button4, path, links, allInfo, i, hrefElement, href, info;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = new chrome_1.Options();
                    options.addArguments("--headless"); // Run Chrome in headless mode
                    options.addArguments("--disable-blink-features=AutomationControlled");
                    return [4 /*yield*/, new selenium_webdriver_1.Builder()
                            .forBrowser("chrome")
                            .setChromeOptions(options)
                            .build()];
                case 1:
                    driver = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, , 20, 22]);
                    // Navigate to the site
                    return [4 /*yield*/, driver.get(url)];
                case 3:
                    // Navigate to the site
                    _a.sent();
                    return [4 /*yield*/, driver.findElement(selenium_webdriver_1.By.css("#datepicker-9018"))];
                case 4:
                    button1 = _a.sent();
                    return [4 /*yield*/, button1.click()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, driver.findElement(selenium_webdriver_1.By.css("#datepicker-conatainer-9018 > div > div.filter-options > div.drp-calendar.left > div.calendar-table > table > tbody > tr > td.today.active.start-date.available"))];
                case 6:
                    button2 = _a.sent();
                    return [4 /*yield*/, button2.click()];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, driver.findElement(selenium_webdriver_1.By.css("#datepicker-conatainer-9018 > div > div.filter-options > div.drp-calendar.right > div.calendar-table > table > tbody > tr:nth-child(6) > td:nth-child(8)"))];
                case 8:
                    button3 = _a.sent();
                    return [4 /*yield*/, button3.click()];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, driver.findElement(selenium_webdriver_1.By.css("#datepicker-conatainer-9018 > div > div.drp-buttons.filter-footer > div > div.btn-group.do-filter > button"))];
                case 10:
                    button4 = _a.sent();
                    return [4 /*yield*/, button4.click()];
                case 11:
                    _a.sent();
                    // Wait for the page to load after the button click
                    return [4 /*yield*/, driver.sleep(10000)];
                case 12:
                    // Wait for the page to load after the button click
                    _a.sent();
                    path = '//*[@id="event-category-4"]/li' //Path to gasque events
                    ;
                    return [4 /*yield*/, driver.findElements(selenium_webdriver_1.By.xpath(path))];
                case 13:
                    links = _a.sent();
                    console.log(links.length); //links is array
                    allInfo = [];
                    i = 1;
                    _a.label = 14;
                case 14:
                    if (!(i <= links.length)) return [3 /*break*/, 19];
                    return [4 /*yield*/, driver.findElement(selenium_webdriver_1.By.xpath(path + '[' + i + ']/div/a'))];
                case 15:
                    hrefElement = _a.sent();
                    return [4 /*yield*/, hrefElement.getAttribute("href")];
                case 16:
                    href = _a.sent();
                    console.log(href);
                    return [4 /*yield*/, getInfoFromLink(href)];
                case 17:
                    info = _a.sent();
                    console.log(info);
                    allInfo.push(info); //Adds event info to the previous empty array
                    _a.label = 18;
                case 18:
                    i++;
                    return [3 /*break*/, 14];
                case 19:
                    console.log(allInfo);
                    //Saves the data to a textfile (turns the array into a string (keeps "[]""))
                    saveData(JSON.stringify(allInfo), filename);
                    return [3 /*break*/, 22];
                case 20: return [4 /*yield*/, driver.quit()];
                case 21:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 22: return [2 /*return*/];
            }
        });
    });
}
exports.scrapeSite = scrapeSite;
var url = "https://nationsguiden.se";
var filename = "natguiden-gasque";
scrapeSite(url, filename);
