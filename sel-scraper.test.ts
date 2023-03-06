
import { existsSync } from "node:fs";
import { saveData, scrapeSite, } from "./scraper-example/sel-scraper-slapp";

saveData("test", "testCaseFile");

test('Does saveData actually save data in a file at correct place', () => {
    expect(existsSync('scraper-example/data/testCaseFile')).toBe(true);
});

// test('test', () => {
    
// })
