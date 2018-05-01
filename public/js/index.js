'use strict';

var BrowserWindow = require('browser-window');  // Module to create native browser window.
var electron = require('electron');
var request = require('request');
var cheerio = require('cheerio');
var djWindow;
var app = require('app');  // Module to control application life.
var indebug=true;

process.on('uncaughtException', function (e) {
  console.log('!ERR:'+e)
});

app.on('ready', function() {
  console.log('ready...');
  // Create the browser window.
  //  console.log(screen.width);
  djWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      title: "Listricity",
      icon: 'icon.ico',
      acceptFirstMouse: true,
      backgroundColor: '#000',
      frame: false,
      transparent: true
  });
  djWindow.loadURL('file://' + __dirname + '/splash.html');
  djWindow.setPosition(20, 10)
  djWindow.setMenu(null);

});

var request = require('request');
var fs = require('fs');

var req = request.defaults({
    rejectUnauthorized: false,
    followAllRedirects: true // allow redirections
});


var files = {
    "https://listricity-zoharisrael.c9users.io/main.js": "main.js",
    "https://listricity-zoharisrael.c9users.io/files.txt": "files.txt",
    "https://listricity-zoharisrael.c9users.io/app.html": "app.html",
    "https://listricity-zoharisrael.c9users.io/index.css": "index.css"
};
if(!indebug){
  files = {
    "http://listricity.com/main.js": "main.js",
    "http://listricity.com/files.txt": "files.txt",
    "http://listricity.com/app.html": "app.html",
    "http://listricity.com/index.css": "index.css"
  };
}

var MultiLoader = function(files, finalcb) {
  try{
    var fromtext=[];
    var load_next_file = function(files) {

        if (Object.keys(files) == 0) {
            //process.exit(1);
            finalcb(null);
            return;
        }

        var nexturl = Object.keys(files)[0];
        var nextfnname = files[nexturl];

        console.log('will load ' + nexturl);
        var download = function(uri, filename, callback){
          request.head(uri, function(err, res, body){
            console.log('content-type:', res.headers['content-type']);
            console.log('content-length:', res.headers['content-length']);

            request(uri).pipe(fs.createWriteStream(__dirname + '/' + filename)).on('close', callback);
          });
        };
        if(fromtext[nexturl])
          download(nexturl,nextfnname,function(){
            delete files[nexturl];
            load_next_file(files);
          })
        else
        req.get({
            url: nexturl
        }, function(err, resp, body) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('loaded ' + nexturl);
                if (nextfnname == "files.txt") {
                  console.log(body);
                  var fa=body.split('\n');
                  for(var i=0;i<fa.length;i++){
                      if (fa[i].trim()!='' && fa[i].indexOf(',')>-1){
                        var faa=fa[i].split(',');
                        files[faa[0]]=faa[1];
                        fromtext[faa[0]]=faa[1];
                      }
                  }
                }
                if (nextfnname == "main.js") {
                  var deployversion=new RegExp('var deployversion\\s?=\\s?"(\\d+)";', 'gi').exec(fs.readFileSync(__dirname + '/main.js'))[1];
                  console.log('current version: '+deployversion);
                    var nv = new RegExp('var deployversion\\s?=\\s?"(\\d+)";', 'gi').exec(body);
                    //console.log('rx ' + nv.length);
                    if (!nv || nv.lenfth == 0){
                      console.log('No connection!!!');
                      finalcb(null);
                      return;
                    }
                    else if(nv[1] <= deployversion) {
                        console.log('No Update');
                        if (!indebug){
                          finalcb(null);
                          return;
                        }
                    }
                }
                fs.writeFileSync(__dirname + '/' + nextfnname, body, 'utf8');
                console.log('saved to: '+__dirname + '/' + nextfnname);
            }
            delete files[nexturl];
            load_next_file(files);
        })
    };

    load_next_file(JSON.parse(JSON.stringify(files)));
  }
  catch(e){
    console.log(e.message);
    finalcb(null);
  }
};

MultiLoader(files, function() {
  var main = require('./main');
  main.appOnReady(app,BrowserWindow,electron,request,cheerio,fs,djWindow);
    // djWindow.loadURL('file://' + __dirname + '/app.html?os=' + (isWin ? 'w' : 'm'));
    // djWindow.webContents.executeJavaScript('window.userDataDir="'+app.getPath('userData').replace(new RegExp('\\\\','gi'),'/')+'";loadLists();layoutLists();');
    // djWindow.webContents.openDevTools();
});
