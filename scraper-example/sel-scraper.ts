
import { existsSync, mkdirSync, writeFile } from "fs";
import { Builder, By, Key, until } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";

function saveData(Data: string, filename: string): void{

    if (!existsSync('data')) {
        mkdirSync('data');
    }
    writeFile(
        'data/'+ filename, 
        Data, 
        err => {
            if (err) {
                return console.error(err);
            }
            console.log("File created!");
        });
}

async function getInfo(url: string){
    const options = new Options();
    options.addArguments("--headless"); // Run Chrome in headless mode
    options.addArguments("--disable-blink-features=AutomationControlled");

    const driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();
    try {
        await driver.get(url);
        await driver.wait(until.urlContains("evid="), 10000);
        const info =  await driver.findElement(By.xpath('//*[@id="wap-section-9019"]/div[2]/div/div[1]/div[2]'))
        
        return await info.getText();

    } finally {
        await driver.quit();
    }
}

async function scrapeSite(url: string, filename: string) {

    
    const options = new Options();
    options.addArguments("--headless"); // Run Chrome in headless mode
    options.addArguments("--disable-blink-features=AutomationControlled");


    const driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();

    try {
        // Navigate to the site
        await driver.get(url);

        // Find and click the button
        const button1 = await driver.findElement(By.css("#datepicker-9018"));//#datepicker-9018
        await button1.click();

        // const button2 = await driver.findElement(By.css("#datepicker-conatainer-9018 > div > div.filter-actions.filter-actions-ranges > div > ul > li:nth-child(3)"));//#datepicker-conatainer-9018 > div > div.filter-actions.filter-actions-ranges > div > ul > li:nth-child(3)
        // await button2.click();
        
        const button2 = await driver.findElement(By.css("#datepicker-conatainer-9018 > div > div.filter-options > div.drp-calendar.left > div.calendar-table > table > tbody > tr > td.today.active.start-date.available"));
        await button2.click();
        const button3 = await driver.findElement(By.css("#datepicker-conatainer-9018 > div > div.filter-options > div.drp-calendar.right > div.calendar-table > table > tbody > tr:nth-child(6) > td:nth-child(8)"));
        await button3.click();
        const button4 = await driver.findElement(By.css("#datepicker-conatainer-9018 > div > div.drp-buttons.filter-footer > div > div.btn-group.do-filter > button"));
        await button4.click();

        // Wait for the page to load after the button click
        
        await driver.sleep(10000);

        //const dateScrape = await driver.findElement(By.xpath('//*[@id="event-category-11"]'));
        //console.log(dateScrape);
        

        // Scrape the data from the page

        //const scrapedData = await driver.findElement(By.css("#event-collection-9018 > div > ul > li.event-category.event-color-5.expanded")).getText();
        //const scrapedData = await driver.findElement(By.css("#event-collection-9018 > div > ul > li.event-category.event-color-11.expanded")).getText();
        //const scrapedData = await driver.findElement(By.xpath('//*[@id="event-category-11"]'));
        //console.log(scrapedData);
       
        const links = await driver.findElements(By.xpath('//*[@id="event-category-11"]/li'));
        //console.log(await links.forEach(link => link.getText()));
        console.log(links.length);
        
        const allInfo: any[] = [];

        for(let i = 1 ; i <= links.length; i++){
            const hrefElement = await driver.findElement(By.xpath('//*[@id="event-category-11"]/li[' + i + ']/div/a'));
            const href = await hrefElement.getAttribute("href");
            console.log(href);

            const info = await getInfo(href);

            console.log(info);
            const infoArr: string[] = [info];
            allInfo.push(infoArr);
        }

        console.log(allInfo);
        

        //saveData(await links[0].getText(), filename);
        saveData(JSON.stringify(allInfo), filename);    
    } finally {
        await driver.quit();
    }
}

const url = "https://nationsguiden.se";
const filename = "natguiden-test";

scrapeSite(url, filename);