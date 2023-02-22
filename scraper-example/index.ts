import { existsSync, mkdirSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import axios, { AxiosError } from 'axios';
import { JSDOM } from 'jsdom';

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
    if (!ignoreCache){//&& !(HTMLData === undefined)) {
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
  const writingLinks: HTMLAnchorElement[] | HTMLParagraphElement[] = Array.from(
    document.querySelectorAll('p'),
  );
  //return writingLinks;
  return writingLinks.map(link => {
    return {
      title: link.title,
      text: link.textContent,
      //url: link.href,
    };
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
    'https://en.wikipedia.org/wiki/Web_scraping',
    true,
  );
  const data = extractData(document);
  //console.log(data);
  saveData('wiki-web-scraping', data);
}

getData();
