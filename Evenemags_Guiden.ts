

//Första filen

//Selenuim Drivers
const {Builder} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const service = new chrome.ServiceBuilder('/chromedriver');
const driver = new Builder().forBrowser('chrome').setChromeService(service).build();

