import { existsSync, mkdirSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import axios, { AxiosError } from 'axios';
import { JSDOM } from 'jsdom';

interface event{
  title: string | null | undefined,
  //title: Element | null,
  //title: NodeListOf<Element>,
}

function fetchPage(url: string): Promise<string | undefined> { //Ger html
  console.log('Jag kommer in in i fetchPage');
  
  return axios
    .get(url)
    .then(res => res.data)
    .catch((error: AxiosError) => {
      console.error(`There was an error with ${error.config?.url}.`);
      console.error(error.toJSON());
    });

  
}

async function fetchFromWebOrCache(url: string, ignoreCache: boolean) {
  ignoreCache = false;
  // If the cache folder doesn't exist, create it
  if (!existsSync(resolve(__dirname, '.cache'))) {
    mkdirSync('.cache');
  }
  console.log(`Getting data for ${url}...`);
  if (
    !ignoreCache &&
    existsSync(
      resolve(__dirname, `.cache/${Buffer.from(url).toString('base64')}.html`),
    )
  ) {
    console.log(`I read ${url} from cache`);
    const HTMLData = await readFile(
      resolve(__dirname, `.cache/${Buffer.from(url).toString('base64')}.html`),
      { encoding: 'utf8' },
    );
    const dom = new JSDOM(HTMLData);
    return dom.window.document;
  } else {
    console.log(`I fetched ${url} fresh`);
    const HTMLData = await fetchPage(url);
    //console.log('Jag har hämtat HTML datan');
    //console.log(ignoreCache);
    if (!ignoreCache) { //&& !(HTMLData === undefined)) {
      console.log('Kommer in i if satsen');
      writeFile(
        resolve(
          __dirname,
          `.cache/${Buffer.from(url).toString('base64')}.html`,
        ),
        HTMLData as string,
        { encoding: 'utf8' },
      );
    }
    console.log('efter if satsen')
    const dom = new JSDOM(HTMLData);
    return dom.window.document;
  }
}

function extractData(document: Document) {
  console.log('Kommer in i extractData');

  const writingLinks: (HTMLAnchorElement | HTMLParagraphElement | HTMLHeadingElement)[] = Array.from(
    document.querySelectorAll('#datepicker-conatainer-9018 > div > div.filter-actions.filter-actions-ranges > div > ul > li:nth-child(3)').click().querySelectorAll('#event-category-3')

    //document.querySelectorAll('#event-category-3')
  );
  //return writingLinks;
  const events: event[] = [];

  return writingLinks.map(node => {
    return {
      text: node.textContent,
      //url: link.href,
    };
    // const event = {
    //   title: node.querySelector('.event-item-title')?.textContent,
    // };
    
    //events.push(event);
  });
}

function saveData(filename: string, data: any) {
  console.log('Kommer in i saveData');
  console.log(data);
  //console.log(existsSync(resolve(__dirname, 'data')));
  //console.log(JSON.stringify(data));
  if (!existsSync(resolve(__dirname, 'data'))) {
    mkdirSync('data');
  }
  writeFile(
    resolve(
      __dirname, 
      `data/${filename}.json`), 
    JSON.stringify(data), 
    //"test",
    { encoding: 'utf8' });
}

async function getData() {
  const document = await fetchFromWebOrCache(
    'https://nationsguiden.se',
    true,
  );
  const data = extractData(document);
  //console.log(data);
  saveData('natGuide', data);
}

getData();
