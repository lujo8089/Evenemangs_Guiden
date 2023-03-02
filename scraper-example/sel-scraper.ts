import { Builder, By, Key, until } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";


async function scrapeSite() {
  const options = new Options();
  options.addArguments("--headless"); // Run Chrome in headless mode
  options.addArguments("--disable-blink-features=AutomationControlled");


  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    // Navigate to the site
    await driver.get("https://nationsguiden.se");

    // Find and click the button
    const button1 = await driver.findElement(By.css("#datepicker-9018"));
    await button1.click();

    const button2 = await driver.findElement(By.css("#datepicker-conatainer-9018 > div > div.filter-actions.filter-actions-ranges > div > ul > li:nth-child(3)"));
    await button2.click();

    // Wait for the page to load after the button click
    driver.wait(until.urlContains("page-loaded-url"), 10000);

    // Scrape the data from the page
    const scrapedData = await driver.findElement(By.css("#event-category-4")).getText();
    console.log(scrapedData);
  } finally {
    await driver.quit();
  }
}

scrapeSite();