"use strict";
exports.__esModule = true;
var node_fs_1 = require("node:fs");
function saveData(Data, filename) {
    if (!(0, node_fs_1.existsSync)('data')) {
        (0, node_fs_1.mkdirSync)('data');
    }
    (0, node_fs_1.writeFile)('data/' + filename, JSON.stringify(Data), function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("File created!");
    });
}
function bringBackData(filename) {
    //const str = '{"hello":"world"}';
    //const obj = JSON.parse(str);
    //return obj;
    var fs = require('fs');
    fs.readFile('data/' + filename, 'utf8', function (err, data) {
        if (err) {
            console.error(err);
            return;
        }
        var obj = (data);
    });
}
var arr = [];
var myRecordEvent = { 'hej': 'event info' };
arr.push(myRecordEvent);
//console.log(arr);
//saveData(arr, "test-saveFile");
var text = (0, node_fs_1.readFileSync)('data/test-saveFile', 'utf-8');
var array = JSON.parse(text);
console.log(array[0]['hej']);
//const strRecord = bringBackData("natguiden-test");
//console.log(strRecord[0]);
