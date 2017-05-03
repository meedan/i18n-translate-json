#!/usr/bin/env node

'use strict';

var translate = require("./translate");
var path = require("path");
var getJSON = require("get-json");

var args = process.argv;

if (args.length < 5) {
	throw "not enough arguments: i18n-translate apiKey startDir sourceLang (targetLang1,targetLang2,..) (file1,file2,..)";
}

// get the start directory from parameters
var apiKey = args[2];
var startDir = args[3];
var sourceLang = args[4];
var targetLang = args[5];

// append / at the end of directory
if (startDir[startDir.length - 1] != "/") {
	startDir += "/";
}

// run translation
var run = function() {
  path.resolve(__dirname, startDir);

  translate.run(apiKey, startDir, sourceLang, targetLang, function(err, result) {
  
  	if (err) {
  		console.log("ERROR:");
  		console.log(err);
  		process.exit(0);
  	}
  
  	process.exit(0);
  });
}

// if target languages are not provided, get all languages supported by Google Translate
if (!targetLang) {
  targetLang = [];
  getJSON('https://translation.googleapis.com/language/translate/v2/languages?key=' + apiKey, function(error, response) {
    if (error) {
  		console.log("ERROR:");
  		console.log(error);
  	  process.exit(0);
    }
    else {
      var langs = response.data.languages;
      for (var i = 0; i < langs.length; i++) {
        var lang = langs[i].language;
        if (lang.length === 2) {
          targetLang.push(lang);
        }
      }
      run();
    }
  });
}
else {
  targetLang = targetLang.split(',');
  // trim whitespaces for targetlangs
  for (var i = 0; i < targetLang.length; i++) {
  	targetLang[i] = targetLang[i].trim();
  }
  run();
}
