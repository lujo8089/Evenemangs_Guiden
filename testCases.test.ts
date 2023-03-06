
import { existsSync } from "node:fs";
import { getInfoFromLink } from "./scraper-example/sel-scraper-gasque";
import { saveData } from "./scraper-example/sel-scraper-slapp";
import {expect, jest, test} from '@jest/globals';

saveData("test", "testCaseFile");

test('Does saveData actually save data in a file at correct place', () => {
    expect(existsSync('data/testCaseFile')).toBe(true);
});



test('Does webdriver actually work + is it able to get some information from nationsguiden', async () => {
    const infoFromLink = await getInfoFromLink("https://nationsguiden.se/event/?evid=293819");
    const info = "KROPPKAKEGASQUE + 04-släpp" ; 
    expect(infoFromLink.heading).toEqual(info);
});
