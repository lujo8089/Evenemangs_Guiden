import { existsSync, mkdirSync, readFile, readFileSync, writeFile } from "node:fs";

function saveData(Data: Record<string,string>[], filename: string): void{

    if (!existsSync('data')) {
        mkdirSync('data');
    }
    writeFile(
        'data/'+ filename, 
        JSON.stringify(Data), 
        err => {
            if (err) {
                return console.error(err);
            }
            console.log("File created!");
        });
}

function bringBackData(filename: string){
        //const str = '{"hello":"world"}';
        //const obj = JSON.parse(str);
        //return obj;
        const fs = require('fs');

        fs.readFile('data/' + filename, 'utf8', (err: string, data: string) => {
        if (err) {
            console.error(err);
            return;
        }
        const obj = (data);
        });
    
}

const arr: Record<string,string>[]= []

const myRecordEvent = { 'hej' : 'event info'};
arr.push(myRecordEvent);



//console.log(arr);




//saveData(arr, "test-saveFile");


const text = readFileSync('data/test-saveFile', 'utf-8');
const array = JSON.parse(text);
console.log(array[0]['hej']);

//const strRecord = bringBackData("natguiden-test");

//console.log(strRecord[0]);