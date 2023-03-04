
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
    //Set up webdriver
    const options = new Options();
    options.addArguments("--headless"); // Run Chrome in headless mode
    options.addArguments("--disable-blink-features=AutomationControlled");
    const driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();

    try {
        //Go to page
        await driver.get(url);

        //Wait for page to load
        await driver.wait(until.urlContains("evid="), 10000);

        //Find element with event information
        const info =  await driver.findElement(By.xpath('//*[@id="wap-section-9019"]/div[2]/div/div[1]/div[2]'))
        
        //Returns the text of the element
        return await info.getText();

    } finally {
        await driver.quit();
    }
}

async function scrapeSite(url: string, filename: string) {

    //Set up webdriver
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
        // Click "idag"
        const button1 = await driver.findElement(By.css("#datepicker-9018"));
        await button1.click();

        //Clicks todays date
        const button2 = await driver.findElement(By.css("#datepicker-conatainer-9018 > div > div.filter-options > div.drp-calendar.left > div.calendar-table > table > tbody > tr > td.today.active.start-date.available"));
        await button2.click();
        //Clicks last day of next month
        const button3 = await driver.findElement(By.css("#datepicker-conatainer-9018 > div > div.filter-options > div.drp-calendar.right > div.calendar-table > table > tbody > tr:nth-child(6) > td:nth-child(8)"));
        await button3.click();
        //Clicks "Visa resultat"
        const button4 = await driver.findElement(By.css("#datepicker-conatainer-9018 > div > div.drp-buttons.filter-footer > div > div.btn-group.do-filter > button"));
        await button4.click();

        // const button2 = await driver.findElement(By.css("#datepicker-conatainer-9018 > div > div.filter-actions.filter-actions-ranges > div > ul > li:nth-child(3)"));//#datepicker-conatainer-9018 > div > div.filter-actions.filter-actions-ranges > div > ul > li:nth-child(3)
        // await button2.click();


        // Wait for the page to load after the button click
        await driver.sleep(10000);

    
       //Finds all events (This case all "släpp" events)
        const links = await driver.findElements(By.xpath('//*[@id="event-category-11"]/li')); //
        console.log(links.length); //links is array
        

        const allInfo: any[] = []; //Empty array to store all links info

        //Goeas through all links and scrapes each links page for event info
        for(let i = 1 ; i <= links.length; i++){
            //Finds link site of event
            const hrefElement = await driver.findElement(By.xpath('//*[@id="event-category-11"]/li[' + i + ']/div/a'));
            const href = await hrefElement.getAttribute("href");
            console.log(href);

            //Scrape link
            const info = await getInfo(href);
            console.log(info);

            const infoArr: string[] = [info]; //Turns info into array for ease of future use 
            allInfo.push(infoArr);//Adds event info to the previous empty array
        }

        console.log(allInfo);
        
        //Saves the data to a textfile (turns the array into a string (keeps "[]""))
        saveData(JSON.stringify(allInfo), filename);    
    } finally {
        await driver.quit();
    }
}

const url = "https://nationsguiden.se";
const filename = "natguiden-test";

scrapeSite(url, filename);