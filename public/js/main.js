'use strict';
// create windows installer:
// >electron-packager . listricity --platform=win32 --arch=x64 --version=0.35.6 --icon=icon.ico
// change icon:
// rcedit listricity-win32-x64/listricity.exe --set-icon "icon.ico"
var deployversion = "013";
var isWin = /^win/.test(process.platform);

var playedcount = 0;
var cv = false;
var mainmovedtime = new Date();
var savedtop = false;
var forcefFullSceen = false;
var hooked = true;
var titleh = 23;
var titlel = 1;
let mainWindow;
let djWindow;
let webContents;
var realfocused=true;

if (isWin) {
    console.log('windows...');
    titleh = 23;
    titlel = 1;
}

let nextVid;
var eqsetting = '';


exports.getDeployVersion = function() {
    return deployversion;
}

exports.appOnReady = function(app, BrowserWindow, electron, request, cheerio, fs, dj) {
    
    
    djWindow = dj;
    console.log('ready...');
    const ipcMain = electron.ipcMain;
    var titlestate = 'youtube'

    function undock(){
                        console.log('dock un-hooking');
                        hooked = false;
                        webContents.executeJavaScript("document.getElementById('icondock').className='icondock';");
                        djWindow.webContents.executeJavaScript("$('#logo').hide();$('#qcontainer').animate({'top': 0,zIndex:999},'fast')");
        
    }
    function openViewer() {
        if (typeof mainWindow == 'undefined') {
            console.log('open viewer');
            mainWindow = new BrowserWindow({
                width: 291,
                height: 188 - titleh,
                frame: false,
                title: "Listricityn",
                icon: '',
                acceptFirstMouse: true,
                hasShadow: false,
                skipTaskbar: true,
                visible:false
            });
            mainWindow.hide();
            mainWindow.setAlwaysOnTop(true);
            mainWindow.setSkipTaskbar(true);
            chase();
            mainWindow.loadURL('https://www.youtube.com/yt/advertise/medias/images/yt-advertise-home-hero-radial-gradient.png');
            
            
            
            webContents = mainWindow.webContents;

            mainWindow.on('page-title-updated', function(e, cmd) {
                console.log(cmd);
                if(nowloading) {nowloading=false;return;if(playvideotimer) clearTimeout(playvideotimer); playVideo1(); return;}
                titlestate = cmd.toLowerCase();
                mainWindow.setTitle('');
                if (cmd.indexOf('eq:') == 0) {
                    var ma = cmd.replace('eq:', '');
                    eqsetting = ma;
                    djWindow.webContents.executeJavaScript("saveEQ('" + ma + "');");
                }
                else if (cmd.indexOf('eqcustom:') == 0) {
                    var ma = cmd.replace('eqcustom:', '');
                    eqsetting = ma;
                    djWindow.webContents.executeJavaScript("saveEQ('" + ma + "');");
                }
                else if (cmd.indexOf('move') == 0) {
                    var ma = cmd.replace('move:', '').split(',');
                    var ix = parseInt(ma[0]);
                    var iy = parseInt(ma[1]);
                    mainWindow.setSkipTaskbar(true);
                    djWindow.setPosition(mainWindow.getPosition()[0] + ix, mainWindow.getPosition()[1] + iy);
                }
                else if (cmd.indexOf('top') == 0) {
                    savedtop = !mainWindow.isAlwaysOnTop();
                    mainWindow.setAlwaysOnTop(!mainWindow.isAlwaysOnTop());
                }
                else if (cmd.indexOf('full') == 0) {
                    //savedtop=!mainWindow.isAlwaysOnTop();
                    mainWindow.setFullScreen(!mainWindow.isFullScreen());
                }
                else if (cmd.indexOf('ready') == 0) {
                    var djwebContents = djWindow.webContents;
console.log('cmd:'+cmd+'  mainWindow.isVisible:' + mainWindow.isVisible() + ' djWindow.isVisible:'+djWindow.isVisible()+' djWindow.isFocused:'+djWindow.isFocused()+' realfocused:'+realfocused);                    
if (realfocused && !mainWindow.isVisible() && djWindow.isVisible()) mainWindow.show();
                }
                else if (cmd.indexOf('dock') == 0) {
                    //if (new Date() - mainmovedtime < 1000) return;
                    if (!hooked) {
                        console.log('dock hooking');
                        mainmovedtime=new Date();
                        hooked = true;
                        webContents.executeJavaScript("document.getElementById('icondock').className='iconundock';");
                        //webContents.executeJavaScript("document.getElementById('btndock').innerHTML='Un-Dock';");
                        djWindow.webContents.executeJavaScript("$('#logo').show();$('#qcontainer').animate({'top': 188,zIndex:12},'fast')");
                        mainWindow.setSize(291, 188 - titleh);
                        chase();
                    }
                    else {
                        undock();
                        mainWindow.setSize(355, 288 - titleh);
                        mainWindow.setPosition(0, 0);
                    }
                    mainmovedtime = new Date();
                }
                else if (cmd.indexOf('shrink') == 0) {
                    mainWindow.setFullScreen(false);
                }
                else if (cmd.indexOf('mouse out') == 0) {
                    if (!mainWindow.isFullScreen()) {
                        mainWindow.setAlwaysOnTop(true);
                        //djWindow.show();
                        djWindow.focus();
                    }
                    
                }
                else if (cmd.indexOf('mouse in') == 0) {
                    
                }
                else if (cmd.indexOf('done') == 0) {
                    var djwebContents = djWindow.webContents;
                    djwebContents.executeJavaScript('playNext()');
                }
                else if (!mainWindow.isFullScreen() && hooked && cmd.indexOf('dock') == -1) {
                    if (cmd.toLowerCase().indexOf('gradient.png')>-1||cmd.toLowerCase().indexOf('youtube') > -1) {
                        //mainWindow.setSize(293,0);
                        //webContents.executeJavaScript('document.getElementsByTagName("html")[0].style.height="100%"  ;document.getElementsByTagName("html")[0].innerHTML="<body style=\'background-size: 100%;height: 100%;margin:0;padding:0;background-image:url(data:image/png;base64,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);background-position: -3px center;    background-repeat: no-repeat;    background-color: #333333;cursor:pointer;\' ></body>"');
                        webContents.executeJavaScript('document.getElementsByTagName("html")[0].style.height="100%"');
                        playVideo('none');
                        //mainWindow.hide();
                        //				mainWindow.setSize(293,188);
                        //				webContents.executeJavaScript(html_string);
                    }
                    else {
                        if (hooked) {
                            console.log('dock resizing ' + cmd);

                            setTimeout(function() {
                                if (!mainWindow.isVisible() && djWindow.isVisible() && djWindow.isFocused() && realfocused) {
                                    console.log('cmd:'+cmd+'  mainWindow.isVisible:' + mainWindow.isVisible() + ' djWindow.isVisible:'+djWindow.isVisible()+' djWindow.isFocused:'+djWindow.isFocused()+' realfocused:'+realfocused);
                                    mainWindow.show();
                                }
                                //mainWindow.setSize(291, 188 - titleh)
                            }, 500);
                        }

                    }
                }

            });
            mainWindow.on('beforeunload', function(e) {
                console.log('I do not want to be closed');
                e.returnValue = false;
            });
            mainWindow.onbeforeunload = function(e) {
                console.log('I do not want to be closed');
                return false;
            };
            mainWindow.on('focus', function(e, cmd) {
                try {
                    realfocused=true;
                    mainmovedtime=new Date();
                    console.log('v focus');
                    if (!mainWindow.isVisible()) mainWindow.show();
                    // if (playedcount == 0) {
                    //     playNext();
                    // }
                    
                    
                    
                    
                    
                    return;
                    if (!mainWindow.isFullScreen()) {
                        mainWindow.setAlwaysOnTop(true);
                        //djWindow.show();
                        djWindow.focus();
                    }
                }
                catch (e) {
                    console.log(e)
                }
            });
            mainWindow.on('blur', function(e, cmd) {
                //console.log('blur');
                realfocused=false;
                mainWindow.setAlwaysOnTop(savedtop);
                //if(!savedtop && !djWindow.isFocused()
                //) mainWindow.hide();
                mainmovedtime = new Date();
            });

            mainWindow.on('app-command', function(e, cmd) {
                console.log('cmd' + cmd);
                e.returnValue = false;
            });
            mainWindow.on('closed', function() {
                // Dereference the window object, usually you would store windows
                // in an array if your app supports multi windows, this is the time
                // when you should delete the corresponding element.
                console.log('closed');
                if (cv) clearInterval(cv);
                try {
                    djWindow.close();
                    djWindow = null
                }
                catch (e) {}
                mainWindow = null;
                //if (process.platform != 'darwin') {
                app.quit();
                //}
            });


            mainWindow.on('move', function(e, cmd) {
                if (hooked) {
                    var p = mainWindow.getPosition();
                    //djWindow.setPosition(p[0] - 1, p[1] - titleh);
                }
                //return;

                if (new Date() - mainmovedtime > 100 && hooked) {
                    
                    undock();
                    mainmovedtime=new Date();
                    hooked = false;
                }
                return;
            });
              //mainWindow.webContents.openDevTools();
            //
            // 	var html_string='		var request = require( __dirname.substring(0,__dirname.indexOf(\'/node_modules\'))+ \'/node_modules/request/\');'
            // 	html_string+='		var cheerio = require(__dirname.substring(0,__dirname.indexOf(\'/node_modules\'))+ \'/node_modules/cheerio/\');'
            // 	html_string+='		var fs = require("fs");'
            // 	html_string+='		var fss = fs.readFileSync(__dirname.substring(0,__dirname.indexOf(\'/node_modules\'))+\'/index.html\',\'utf8\');';
            // 	html_string+='		document.getElementsByTagName("head")[0].innerHTML=\'\';';
            // 	html_string+='		document.getElementsByTagName("html")[0].innerHTML=fss;';
            // 	webContents.executeJavaScript(html_string);


            cv = setInterval(function() {
                try {
                    //				var html_string="while(document.querySelector('div:not(#body-container):not(#page-container):not(#page):not(#player):not(#theater-background):not(#player-mole-container):not(#player-api):not(.html5-video-player):not(.html5-video-container)')) document.querySelector('div:not(#body-container):not(#page-container):not(#page):not(#player):not(#theater-background):not(#player-mole-container):not(#player-api):not(.html5-video-player):not(.html5-video-container)').outerHTML='';";
                    //				html_string+="while(document.querySelector('form')) document.querySelector('form').outerHTML='';";
                    //				html_string+="while(document.querySelector('script')) document.querySelector('script').outerHTML='';";
                    //				html_string+="while(document.querySelector('iframe')) document.querySelector('iframe').outerHTML='';";
                    //				html_string+="document.querySelector('head').outerHTML='';";

                    webContents.executeJavaScript('try{if (typeof checkstate!="undefined")checkstate();}catch(e){console.log(e.message);}');
                }
                catch (e) {}
            }, 2000);
        }
    }
    function eqDisp(){
var eqHTML='<div class="body" id="equalizer" style="    z-index: 9;">';
eqHTML+='        <style>';
eqHTML+='            .body {display:none;';
eqHTML+='                position: fixed;';
eqHTML+='                margin: 0;top:2px;left:10px;';
eqHTML+='                padding: 0;';
eqHTML+='                box-sizing: border-box;';
eqHTML+='                font-family: "Arial", sans-serif;';
eqHTML+='                font-size: 8px;';
eqHTML+='                color: rgb(50,90,140);';
eqHTML+='            }';
eqHTML+='';
eqHTML+='            .container {';
eqHTML+='                /*-webkit-filter: blur(2px);*/';
eqHTML+='                nwidth: 400px;';
eqHTML+='                padding: 0;';
eqHTML+='                margin: 0;    box-shadow: 0px 0px 5px 1px #333;';
eqHTML+='                background: linear-gradient(to bottom, rgb(239,239,239) 0%,rgb(191, 191, 191) 100%);border-radius: 10px;overflow: hidden;';
eqHTML+='            }.eqclose{right:0;background: #B7423F!important;color: white;width: 16px;text-align: left;height: 16px;padding: 0px!important;position:absolute;top:5px;}';
eqHTML+='            .button {';
eqHTML+='                border-radius: 30px;';
eqHTML+='                border: 1px solid rgb(187,187,187);';
eqHTML+='                height: 20px;';
eqHTML+='                width: 50px;';
eqHTML+='                display: inline-block;';
eqHTML+='                /*background: linear-gradient(to bottom, rgb(249,249,249) 0%,rgb(229,229,229) 100%);*/';
eqHTML+='                background: linear-gradient(to bottom, rgb(239,239,239) 70%,rgb(219,219,219) 100%);';
eqHTML+='                color: rgb(50,90,140);';
eqHTML+='                font-size: 10px;';
eqHTML+='                text-align: center;';
eqHTML+='                line-height: 20px;';
eqHTML+='                text-decoration: none;';
eqHTML+='                position: relative;';
eqHTML+='            }';
eqHTML+='            .button.reset {';
eqHTML+='                position: absolute;';
eqHTML+='                left: 10px;';
eqHTML+='                top: 10px';
eqHTML+='            }';
eqHTML+='            .button.presets select {';
eqHTML+='                /*dont use display:none -> it will not work*/';
eqHTML+='                display: hidden;';
eqHTML+='                height: 0;';
eqHTML+='                width: 0;';
eqHTML+='                border: 0;';
eqHTML+='                padding: 0;';
eqHTML+='                margin: 0;';
eqHTML+='                display: inline;';
eqHTML+='                font-size: 10px;';
eqHTML+='                position: absolute;';
eqHTML+='            }';
eqHTML+='            .button.indicator {';
eqHTML+='                color: rgb(120,120,120);';
eqHTML+='                background: linear-gradient(to bottom, rgb(239,239,239) 70%,rgb(219,219,219) 100%);';
eqHTML+='            }';
eqHTML+='            /* label changes checkbox value, so we can hide the input';
eqHTML+='                    and style the label, sibling selector to change on checked */';
eqHTML+='            .invis {';
eqHTML+='                position: absolute;';
eqHTML+='                width: 1; height: 1;';
eqHTML+='                opacity: 0;';
eqHTML+='            }';
eqHTML+='            input[type=checkbox]:checked ~ .button.indicator{';
eqHTML+='                color: rgb(50,90,140);';
eqHTML+='                background: linear-gradient(to bottom, rgb(226, 207, 73) 0%,rgb(204, 177, 45) 40%);';
eqHTML+='                /*text-shadow:0px 0px 1px rgb(170,170,170);*/';
eqHTML+='            }';
eqHTML+='            .button:hover {';
eqHTML+='                color: rgb(16,49,91);';
eqHTML+='                background-color: rgb(239,239,239);';
eqHTML+='                cursor: hand;';
eqHTML+='            }';
eqHTML+='            .button:focus {';
eqHTML+='                outline: none;';
eqHTML+='            }';
eqHTML+='            /* this extra selector needed to allow :active styling';
eqHTML+='                    on checked label due to too much specificity */';
eqHTML+='            input[type=checkbox]:checked ~ .button:active,';
eqHTML+='            .button:active {';
eqHTML+='                background: linear-gradient(to bottom, rgb(199,199,199) 0%,rgb(249,249,249) 90%);';
eqHTML+='                border: 1px solid rgb(170,170,170);';
eqHTML+='                color: rgb(50,90,140);';
eqHTML+='            }';
eqHTML+='            .controls-main {';
eqHTML+='                position: relative;';
eqHTML+='                height: 44px;';
eqHTML+='                padding: 0;';
eqHTML+='                /*background:linear-gradient(to bottom, rgb(249,249,249) 0%,rgb(239,239,239) 100%);*/';
eqHTML+='                /*border-bottom:1px solid rgb(229,229,229);*/';
eqHTML+='            }';
eqHTML+='            .chart {';
eqHTML+='                position: absolute;';
eqHTML+='                right: 12px;';
eqHTML+='            }';
eqHTML+='            .controls-sliders {';
eqHTML+='                padding-top: 1vh;';
eqHTML+='                padding-bottom: 5px;';
eqHTML+='                padding-left: 10px;';
eqHTML+='                padding-right: 10px;    white-space: nowrap;';
eqHTML+='                /*background:linear-gradient(to bottom, rgb(249,249,249) 0%,rgb(239,239,239) 100%);*/';
eqHTML+='            }';
eqHTML+='            .controls-sliders .slider {';
eqHTML+='                width: 6vw;';
eqHTML+='                padding: 0;';
eqHTML+='                margin: 0;';
eqHTML+='                display: inline-block;';
eqHTML+='                text-align: center;';
eqHTML+='                background-repeat: no-repeat;';
eqHTML+='                background-position:  center;    max-width: 30px;    position: relative;';
eqHTML+='            }';
eqHTML+='            .controls-sliders .slider input {';
eqHTML+='                -webkit-appearance: slider-vertical;';
eqHTML+='                cursor: hand;';
eqHTML+='                height: 37vh;max-height:115px;';
eqHTML+='                max-width: 3px;';
eqHTML+='            }';
eqHTML+='            .controls-sliders .slider label {';
eqHTML+='                width: 100%;';
eqHTML+='                height: 100%;';
eqHTML+='                display: block;';
eqHTML+='                line-height: 16px;';
eqHTML+='                font-size: 10px;position:absolute';
eqHTML+='            }';
eqHTML+='            .controls-sliders .slider.master {';
eqHTML+='                   width: 50px;max-width: 50px;';
eqHTML+='            }';
eqHTML+='            .controls-sliders .slider.empty {';
eqHTML+='                width: 4px;';
eqHTML+='            }';
eqHTML+='            .controls-sliders .sliders {';
eqHTML+='            }';
eqHTML+='            .controls-options {';
eqHTML+='                /*border-top:1px solid rgb(229,229,229);';
eqHTML+='                background:linear-gradient(to bottom, rgb(239,239,239) 0%,rgb(229,229,229) 100%);*/';
eqHTML+='                position: relative;';
eqHTML+='                height: 40px;    margin-top: -5px;';
eqHTML+='            }';
eqHTML+='            .controls-options .left {';
eqHTML+='                position: absolute;';
eqHTML+='                display: inline-block;';
eqHTML+='                left: 10px;';
eqHTML+='                top: 10px';
eqHTML+='            }';
eqHTML+='            .controls-options .right {';
eqHTML+='                position: absolute;';
eqHTML+='                display: inline-block;';
eqHTML+='                right: 10px;';
eqHTML+='                top: 10px';
eqHTML+='            }';
eqHTML+='            .controls-options .preset-name {';
eqHTML+='                font-size: 10px;';
eqHTML+='                height: 20px;';
eqHTML+='                line-height: 20px;';
eqHTML+='                display: inline-block;';
eqHTML+='                padding-right: 5px;';
eqHTML+='                text-align: right;';
eqHTML+='            }div#presetsPanel {position: absolute;top: 0;left:0;width: 96%;z-index: 9;font-size: 12px;text-align: left;padding: 5px;background: linear-gradient(to bottom, rgb(239,239,239) 0%,rgb(191, 191, 191) 100%);height: 95%;border-radius: 10px;vertical-align: bottom;}#presetspanel>div>div {display: inline-block;/* width: 63px; *//* float: left; *//* border: 1px solid #333; */white-space: nowrap;padding-right: 5px;padding-left: 5px;margin: 4px 5px;line-height: 1.6;box-shadow: 0 0 3px -1px #333;border-radius: 13px;font-size: 11px;background: linear-gradient(to bottom, rgb(239,239,239) 70%,rgb(219,219,219) 100%);}';
eqHTML+='            .iconundock{ background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODM4MjU0QUNENkFFMTFFNUE4NkZBNDU3MjJERTlERjAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTVFMEYwQ0NENkFFMTFFNUE4NkZBNDU3MjJERTlERjAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4MzgyNTRBQUQ2QUUxMUU1QTg2RkE0NTcyMkRFOURGMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4MzgyNTRBQkQ2QUUxMUU1QTg2RkE0NTcyMkRFOURGMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmT27fAAAAHQSURBVHja7JYxSMNQEIabEkoRcVIpUhxE6iS4CCK4OTk5qJODiIKIOIiTiuDoUB2UWq3auro7Ojk4OLqJ4iK4OEkpIZTG/+SeHI+8pIlFEPrg46Uvd7m7P/deanmel/jLYbUD/vuAyZZkbVkDYAf0R6oQDhuYhkGDsXlWIwU+wAn8noRfBtM7qIA73Ls0RqSACow1WgrgCIxLH/bLCJsLsAcGdbtvW81xNSDYKchp9vRKSMYZH/s8WNQD2lrB8vcEINkcfnAVDnXIl8b1FBgFWTBvEI9eTwX2Q5hL8H32k3RTZNir3aNklrhSLyJ5U4WOuK6LphjBNAu2YjTxMbjxk1B1oRouB8thWub3q0aRZX4lqUEP2NWedQ5ewAEqc01dui5k6OS1Ev++YhaoUQK6lCiDMb8utQMOgiRLSWtn4BYO1wbZVAW0Dx9BAbZOM/vwp0KxtqI3kM8+zPI2mBRr0/S8KNtCJVQM6wrYvEGNbaqKt80+6AYPiZAAbtzzVEjYxUrRuA87vJNiK/TFjF0zdL1vhfKgnkPQGieR4rlhCFLne2ltvRoWUGZ02IIvV0eYpJRpoYXf20boF5+7zOZkgmRstpk+23+i2gF/Nb4EGABE0mnXa85wvwAAAABJRU5ErkJggg==);height: 26px;display: inline-block;    width: 19px;background-size: 20px;background-position: right;background-repeat: no-repeat;}';
eqHTML+='            .icondock{ background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODM4MjU0QThENkFFMTFFNUE4NkZBNDU3MjJERTlERjAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODM4MjU0QTlENkFFMTFFNUE4NkZBNDU3MjJERTlERjAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4MzgyNTRBNkQ2QUUxMUU1QTg2RkE0NTcyMkRFOURGMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4MzgyNTRBN0Q2QUUxMUU1QTg2RkE0NTcyMkRFOURGMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pgdhc+wAAAIVSURBVHja7JZNaxRBEIZn1nV3jYogiRLwAwTFS45686iHQCAg/oF4CyIhiCAeRdSL3gJ6TPA3COo96C2EkMQPQvw6KCKJupqwmfUpeUfKdnsGTMhpGx66tnum36rq6p5N2+12sp0t7Qp2BTclmKbpON0AZKKqPm81mIG79oN3s38WTNMq462oognm0C7ZUAG3YB8M+veCNQ6rb+QB/TUfPDxaIHYf+uEcvIUdUHHv7nV2T8yhahCw/30GXsBPWJPHFXgAh2AEnpLCk4r6CLapvTMHsZfk2GeE1vhdtz6M8IqL6EAwZ85MwIbmX8Jr2QuwIvsNfIdpmIIhOB5Lqd/D/T5FcL5kf411aMq2gpqHL3AbjnZKac3ZK6o626uDcKeg2t8r4g+wqJTX4RWcNTE4DcuhoC/nzO3rDTgWEXsIjyW4DJ/k4A/t+yPY8yeYIKVjLj0W2U64oMLJx1tBGq/Zc7Gq1Lr12B5edgsNuPFdOg43YU5F0Vb1PouI9Np6Zedw3AlWYt5qP67DJHyEU5YRzadwVakeKzuH62V34e+zlCTPKaZZnb8nlnLGN/RInyuw6aTgoCc62HnbDV873JUW4QkEZrEz+qngkWak6jsK+sv4Igs25URNfSbbbpJh+lXdLi3NNYL1vpUJeo/ubcHXqCcpSGF+Die28POXlX6ASVFDkVdcGv+7sf5q9z9NV3BT7ZcAAwA5i7mmZrHk/QAAAABJRU5ErkJggg==);height: 26px;display: inline-block;width: 19px;background-size: 20px;background-position: right;background-repeat: no-repeat;}';

eqHTML+='           .iconpin {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUM4ODk3MTNENkE4MTFFNUE4NkZBNDU3MjJERTlERjAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUM4ODk3MTRENkE4MTFFNUE4NkZBNDU3MjJERTlERjAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5Qzg4OTcxMUQ2QTgxMUU1QTg2RkE0NTcyMkRFOURGMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5Qzg4OTcxMkQ2QTgxMUU1QTg2RkE0NTcyMkRFOURGMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgX2d+MAAAKmSURBVHja3JZNaxNRFIZz5ysxtWNtPjpSbTFQoaIQCYWIErMUhOAm/yDZ+QfcunPjL5CCIIKrFly4EgR36tJs3cYY05hgotV0xveEd2BqxmmibRe98HCHO/ee99x7zzkzyvO82HE2LXbMzWB/BXwF3w/Zfudvgn3QVUoNZjCmiH9KLvDIuIVdl/Ef3ouYSeR5D/xk7x3FHcraOJgHOXAaJIBOBw5VUPF0kuAseAU2KBqPEtX+UUznbmwKytgTsA5OAYtzZhJUgZ3EKeD3spNFkAYZzkuB5+BCIICmFvSjT7w9Q6NLwCHLREQ2uUtpGdM0X5ZKpTVEqBlqmKG7IjkTSAvFY7G5kwXuznckQWceczepoFHbtr/0er2rePw0bVr492TR+CPej3j3FrwD94JijuN0y+Xy63q9/qLRaPzguskmOwQrYO4PwTiNfQbtQFJPALGdWq32FDbughJYB0u0vY8oQZ2iMt4iE2LpdLpTrVafYf1tsAEughRIziIoY3K/mvR0oEn2CRaLxS3uKg/OUUjn+gnByDxEELlA412u4nki1Dudjhx7l4VaavIu5u2FzY0MmoBQgpE51NAsy2qjiw0GA0mVWLvdvswaKvwSsVm/hypQJ5MUFG8/ZjKZN8Ph8CYElYT+2IA2NmEG1s70AfbFLAoa9LyRzWa3ms3mfZnT7/evy2QEzI5hGH7OatNW/LAxg/0u+JDL5R60Wq2HeB6Bb3K8SOwbrut6+Xx+W44yqpxF5aHv7RyPs1koFO7g3XmwDNJgHtiMyEvMuVWOGSG2I9PCL9aGruvvK5XKNYw7TOIFEBejUidlPlhkzomYJWl0kGBYlI7o6a1A/ZQjk3I1klRhbrq83xiPUlLIPfDbFvbfITnhHdH/ozrx/6UnX/C3AAMA2nmltzQqTvUAAAAASUVORK5CYII=);'
eqHTML+='           height: 26px;display: inline-block;width: 35px;} .iconfullscreen{     background-position: right;background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODM4MjU0QTRENkFFMTFFNUE4NkZBNDU3MjJERTlERjAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODM4MjU0QTVENkFFMTFFNUE4NkZBNDU3MjJERTlERjAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4MzgyNTRBMkQ2QUUxMUU1QTg2RkE0NTcyMkRFOURGMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4MzgyNTRBM0Q2QUUxMUU1QTg2RkE0NTcyMkRFOURGMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkgNi64AAAF5SURBVHjaYvz//z8DPQHjqIWjFlLFQkZGRjkgFQPEH6FC3FCaBUpvAuq7AlQXCWQbA/F9qDgHlGYG4vVANbcxDAdZiI6BoBEkhQevg6ozwaOmEZvZLDh8/g5KCwAVfcQVPEC5M0BfCgCZH7BI/8SmhwlfeOOzDAlo4BD/SIqF7EQlAEZGZyB1Aoe0MMk+JGCZPZDag0cJST7kIGCZJpA6gEXKAohZoWx+qvkQGLfXgVQGmrALUPwkEP8Bsg2B+CUuzdiyhQ4QL8MmjsYvg2YBN2zmYDWbaIUMDM5Qw7PRxK2xqF0GyqNEWwgECcgaQD5Ay9RlBBwHIlpJsXAKVBMo4s1xlCTmBCzMJ6WkgZWNH3DIe4MSCIG0hTUvs5CRSEGpcS8R6v6SYiGuksaCCJ8xINUYFOfDK0SUQKr4PENqWfoFaKA51OD5QPwfHQOlbpETh+uhcl+hWBaIHwOxFLQOBAXrDCB+hVRm/oHGGx+Uv3q0TTM8LQQIMAAKaZ+XRhewWQAAAABJRU5ErkJggg==);height: 26px;display: inline-block;width: 19px;background-size: 20px;background-position: right;background-repeat: no-repeat;}';

eqHTML+='        </style>';
eqHTML+='		<div class="container" id="content"><div id="presetsPanel" style="display:none;"><div label="Predefined presets" id="presetsSelectPredefined" style="padding-top:10px;"></div></div>';
eqHTML+='			<div class="controls-main">';
eqHTML+='				<a href="#" class="button reset" id="reset">Reset</a>';
eqHTML+='				<canvas class="chart" id="chart"></canvas>';
eqHTML+='			</div>';
eqHTML+='';
eqHTML+='			<div class="controls-sliders">';
eqHTML+='				<div class="slider master">';
eqHTML+='					<input id="ch-eq-slider-0" eq="master" type="range" min="0" step="0.01" max="2" value="1">';
eqHTML+='					<label>Preamp</label>';
eqHTML+='				</div>';
eqHTML+='				<div class="slider empty"></div>';
eqHTML+='				<div class="slider">';
eqHTML+='					<input id="ch-eq-slider-1" eq="32" type="range" min="-12" step="0.01" max="12" value="0">';
eqHTML+='					<label>32</label>';
eqHTML+='				</div>';
eqHTML+='				<div class="slider">';
eqHTML+='					<input id="ch-eq-slider-2" eq="64" type="range" min="-12" step="0.01" max="12" value="0">';
eqHTML+='					<label>64</label>';
eqHTML+='				</div>';
eqHTML+='				<div class="slider">';
eqHTML+='					<input id="ch-eq-slider-3" eq="125" type="range" min="-12" step="0.01" max="12" value="0">';
eqHTML+='					<label>125</label>';
eqHTML+='				</div>';
eqHTML+='				<div class="slider">';
eqHTML+='					<input id="ch-eq-slider-4" eq="250" type="range" min="-12" step="0.01" max="12" value="0">';
eqHTML+='					<label>250</label>';
eqHTML+='				</div>';
eqHTML+='				<div class="slider">';
eqHTML+='					<input id="ch-eq-slider-5" eq="500" type="range" min="-12" step="0.01" max="12" value="0">';
eqHTML+='					<label>500</label>';
eqHTML+='				</div>';
eqHTML+='				<div class="slider">';
eqHTML+='					<input id="ch-eq-slider-6" eq="1000" type="range" min="-12" step="0.01" max="12" value="0">';
eqHTML+='					<label>1k</label>';
eqHTML+='				</div>';
eqHTML+='				<div class="slider">';
eqHTML+='					<input id="ch-eq-slider-7" eq="2000" type="range" min="-12" step="0.01" max="12" value="0">';
eqHTML+='					<label>2k</label>';
eqHTML+='				</div>';
eqHTML+='				<div class="slider">';
eqHTML+='					<input id="ch-eq-slider-8" eq="4000" type="range" min="-12" step="0.01" max="12" value="0">';
eqHTML+='					<label>4k</label>';
eqHTML+='				</div>';
eqHTML+='				<div class="slider">';
eqHTML+='					<input id="ch-eq-slider-9" eq="8000" type="range" min="-12" step="0.01" max="12" value="0">';
eqHTML+='					<label>8k</label>';
eqHTML+='				</div>';
eqHTML+='				<div class="slider">';
eqHTML+='					<input id="ch-eq-slider-10" eq="16000" type="range" min="-12" step="0.01" max="12" value="0">';
eqHTML+='					<label>16k</label>';
eqHTML+='				</div>';
eqHTML+='			</div>';
eqHTML+='			<div class="controls-options">';
eqHTML+='				<div class="left">';
eqHTML+='					<span style="display:none;"> <!--span is a hack to prevent shared siblings-->';
eqHTML+='						<input type="checkbox" id="channels" class="invis" />';
eqHTML+='						<label for="channels" class="button indicator">Mono</label>';
eqHTML+='					</span>';
eqHTML+='					<span>';
eqHTML+='						<input type="checkbox" id="snap" class="invis" />';
eqHTML+='						<span for="snap" class="button indicator" onclick="window.snapClicked()">Snap</span>';
eqHTML+='					</span>';
eqHTML+='				</div>';
eqHTML+='				<div class="right">';
eqHTML+='					<a href="#" onclick="document.getElementById(\\\'presetsPanel\\\').style.display=\\\'inline\\\';" class="button presets" id="presetsnew">Presets';
// eqHTML+='					<select id="presetsSelect">';
// eqHTML+='						<!--<optgroup label="Preset">-->';
// eqHTML+='							<!--<option id="preset_save" value="action::save">Save</option>';
// eqHTML+='							<option id="preset_save_as" value="action::save_as">Save as</option>';
// eqHTML+='							<option id="preset_delete" value="action::delete">Delete</option>';
// eqHTML+='							<option id="preset_reset" value="action::reset">Reset</option>-->';
// eqHTML+='						<!--</optgroup>-->';
// eqHTML+='						<!--<optgroup label="My presets" id="presetsSelectUser"></optgroup>-->';
// eqHTML+='						<optgroup label="Predefined presets" id="presetsSelectPredefined"></optgroup>';
// eqHTML+='						<!--<optgroup label="Presets">';
// eqHTML+='							<option id="preset_reset_all" value="action::reset_all">Reset all to default</option>';
// eqHTML+='						</optgroup>-->';
// eqHTML+='					</select> ';
eqHTML+='				</a><a href="#" onclick="document.getElementById(\\\'equalizer\\\').style.display=\\\'none\\\';event.stopPropagation();return false;" class="button presets" id="presetsnew" style="width: 20px;margin-left: 5px;background: #AD0000;color: white;">x</a></div>';
eqHTML+='			</div>';
eqHTML+='		</div>';
eqHTML+='';
eqHTML+='	</div>';
return eqHTML;

    }
    var nowloading=false;
    var playvideokey='';
    var playvideotimer=false;
    function playVideo(key) {
        playvideokey=key;
        openViewer();
if(key!='none'){
    nowloading=true;
//        	mainWindow.loadURL('https://www.youtube.com/watch?v='+key);
mainWindow.loadURL('https://www.youtube.com/yt/advertise/medias/images/yt-advertise-home-hero-radial-gradient.png');        
if(playvideotimer) clearTimeout(playvideotimer);
setTimeout(playVideo1,1000);
        	return;
}
else{
    playvideokey=key;
    playVideo1()
}
}
    function playVideo1() {
        nowloading=false;
        console.log('play 1');
        playvideotimer=false;
        var key=playvideokey;
// if(key!='none'){
//         nowloading=true;
// mainWindow.loadURL('https://www.youtube.com/yt/advertise/medias/images/yt-advertise-home-hero-radial-gradient.png');        
//}
        var html_string = 'document.getElementsByTagName("html")[0].innerHTML=""; '
        html_string += '		document.getElementsByTagName("html")[0].innerHTML =  (\'';
        if(key=='none'){
            html_string += '	<body style="background-size: 100%;height: 100%;margin:0;padding:0;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAScAAACpCAIAAADm9WwKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEQzMjNEMjBDODlCMTFFNUJFQ0I5QzNFRjQzRDk2NjQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjRDNThENzBDRDFEMTFFNUJFQ0I5QzNFRjQzRDk2NjQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0RDMyM0QxRUM4OUIxMUU1QkVDQjlDM0VGNDNEOTY2NCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0RDMyM0QxRkM4OUIxMUU1QkVDQjlDM0VGNDNEOTY2NCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmDFveMAAB90SURBVHja7J0PUNP3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);background-position: center;    background-repeat: no-repeat;    background-color: #333333;';
            html_string += '	cursor:pointer;"></body>';
        }
        else{
            html_string += '		     <iframe onload="iframeloaded()" id="mplayer" autoplay="1" onended="" width="292" height="100%" style="position: fixed;'
            html_string += '		    top: 0px;'
            html_string += '		    left: 0px;'
            html_string += '		    width: 100%;'
            html_string += '		    height: 100%;'
            html_string += '		    " src="/embed/' + key + '?autoplay=1&disablekb=1&fs=0&iv_load_policy=0&modestbranding=1&rel=0&showinfo" frameborder="0" allowfullscreen>'
            html_string += '		    </iframe>';
        }
        html_string += '		<style>input[type="range"]:after {bottom: 1%;position: absolute;width: 35px;margin-left: -25px;text-align: center;padding: 0px;font-size: 8px;content: attr(title);}input:focus,select:focus,textarea:focus,button:focus {outline: none;}select#cmbpresets {position: absolute;top: 9px;    font-size: 11px;nwidth: 87.2%;background-image: linear-gradient(to bottom, rgb(234, 234, 234), #8E8E8E);text-shadow: 1px 1px 0 rgba(255,255,255,0.26);color: #222;}#nnneqbutton:hover > #equalizer{display:flex!important;};body{background-color:#272727;} button.ytp-fullscreen-button.ytp-button {display: none;}#blocker:hover{opacity:1!important}*{-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;  }#movebutton {    box-shadow: inset 4px 5px 10px -5px white,inset -4px -10px 10px -5px #777;width: 30px;background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAR0lEQVR42mNkoBAwEqHmPz51hAz4T0gtI5GacaqnuRdINuA/qWKMaIKkGApWy4gmQDKgmguoEga4AH2jEZs/8aqnaV4gygsA3oUXELou5xAAAAAASUVORK5CYII=);background-repeat: no-repeat;background-position: center;height: 30px;cursor: move;border-radius: 50px;float: left;line-height: 26px;margin-left: 6px;font-size: 11px;margin-top: 8px;background-color:#ccc;text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.26);color: #222;}';
        if(isWin) html_string+='input[type=range]::-webkit-slider-runnable-track {width:22px;background: -webkit-linear-gradient(left, rgba(248,80,50,0) 0%, rgba(102,104,229,0) 47%, rgba(99,104,232,1) 48%, rgba(93,105,240,0.98) 50%, rgba(12,71,245,0.95) 53%, rgba(24,60,240,0.93) 55%, rgba(29,60,236,0.92) 56%, rgba(33,60,231,0) 57%, rgba(231,56,39,0) 100%);}';
        html_string+='</style><div style="opacity:0;not-webkit-app-region: drag;position:absolute;left:0;top:0;width:100%;bottom:53px;cursor:pointer;background-color:rgba(1,1,1,0.05);outline: none;    box-sizing:border-box;" id="blocker" ';
        html_string += '		    onclick="document.getElementById(\\\'mplayer\\\').contentWindow.document.querySelector(\\\'.ytp-play-button\\\').click()" ondblclick="event.stopPropagation();document.title=\\\'full\\\';document.title=\\\'\\\'">';
        //html_string+='		    <div id="equalizer" style="     display: none;justify-content: space-between;height: 20%;position: fixed;width: 85.5%;top: 30px;padding: 5%;background-color: rgba(51, 51, 51, 0.69);border-radius: 10px;box-shadow: inset 0 0 100px -10px, 0 0 10px 1px #383838;border: 1px solid #848484;left: 2%;padding-top:33px;min-width: 150px;min-height: 83px;-webkit-app-region: no-drag;    max-width: 400px;padding-bottom: 3.5%;"></div></button>';
        html_string+='		    <div id="movebutton" class="" onclick="event.stopPropagation();return false;" style="-webkit-app-region: drag;">&nbsp;';
        html_string+='</div>';

        html_string+='		    <button id="eqbutton" onclick="document.getElementById(\\\'equalizer\\\').style.display=\\\'flex\\\';   event.stopPropagation();return false;" style="border-radius: 50px;float: left;line-height: 25px;margin-left: -30px;width: 29px;background-image: linear-gradient(to bottom, rgb(234, 234, 234), #8E8E8E);text-shadow: 1px 1px 0 rgba(255,255,255,0.26);color: #222;margin-top: 45px;box-shadow: inset 4px 5px 10px -5px white,inset -4px -10px 10px -5px #777;border: none;background-color: #ccc;    font-size: 10px;">EQ';
html_string+=eqDisp()+'</button>';



        html_string += '<div style="cursor:move;height:5px;width:100%;position:absolute;z-index:-1;"></div><button onclick="event.stopPropagation();document.title=\\\'dock\\\';document.title=\\\'\\\'"  id="btndock" style="border-radius: 8px 50px 50px 8px;float: right;  line-height:26px;margin-right: 6px;font-size: 11px;     margin-top: 8px;     background-image: linear-gradient(to bottom, rgb(234, 234, 234), #8E8E8E);     text-shadow: 1px 1px 0 rgba(255,255,255,0.26);     color: #222;border:none;margin-left:1px;"><span id="icondock" class="' + (hooked ? 'iconundock' : 'icondock') + '"></span></button>';
        html_string += '		    <button id="btntop" onclick="event.stopPropagation();if(this.ison){this.ison=false}else{this.ison=true;}document.getElementById(\\\'chkontop\\\').checked = this.ison;document.title=\\\'top\\\';document.title=\\\'\\\'" style="float: right;    border-radius: 2px;line-height:26px;margin-right: 0px;font-size: 11px;     margin-top: 8px;     background-image: linear-gradient(to bottom, rgb(234, 234, 234), #8E8E8E);     text-shadow: 1px 1px 0 rgba(255,255,255,0.26);     color: #222;outline: none;border:none;"><span class="iconpin"></span><input id="chkontop" type="checkbox" style="    position: absolute;margin-left: -9px;margin-top: 8px;"></button>'
        html_string += '		    <button id="btnfull" onclick="event.stopPropagation();document.title=\\\'full\\\';document.title=\\\'\\\'" style="    border-radius: 50px 8px 8px 50px;float: right; line-height:26px;margin-right: 1px;font-size: 11px;     margin-top: 8px;     background-image: linear-gradient(to bottom, rgb(234, 234, 234), #8E8E8E);     text-shadow: 1px 1px 0 rgba(255,255,255,0.26);     color: #222;outline: none;border:none;"><span id="icondock" class="iconfullscreen"></span></button></div>'
html_string += '		\'); '
        
        html_string += '		var v;function iframeloaded(){ ';
        html_string += '		try{ document.title="ready"; '
        html_string += '			v=document.getElementById("mplayer").contentWindow.document.getElementsByTagName("video")[0];if(document.getElementById("mplayer").contentWindow.document.querySelector(".ytp-player-content.ytp-iv-player-content"))document.getElementById("mplayer").contentWindow.document.querySelector(".ytp-player-content.ytp-iv-player-content").style.visibility="hidden";'
        html_string += '			v.onended = function(e) {  document.title="done" };var d=document.getElementById("mplayer").contentWindow.document.querySelector(".ytp-scrubber-button");d.setAttribute("style","-webkit-app-region: no-drag");'
        html_string += '		try{EQ(v);}catch(e){console.log("EQ ERR:"+e);}}catch(e){console.log("retry:"+e);setTimeout(iframeloaded,1000);}'
        html_string += '		}';
        html_string += '		var nonstarter=0;var noplayer=0;function checkstate(){if (typeof v=="undefined" && noplayer++>5){document.title="done - no player";}';
        html_string += '			if(v){var d=document.getElementById("mplayer").contentWindow.document.querySelector(".ytp-volume-panel");d.setAttribute("style","display: inline-block;position:absolute;top:2px;width:55px;");if(v.ended || (v.currentTime==0 && nonstarter++>3) || (!isNaN(v.duration) && (Math.abs(v.currentTime-v.duration)<.2 && nonstarter++>3))){'
        html_string += '				nonstarter=0;document.title="done - timing"; }}};'

        html_string += '	';
        
        var f = function() {
            window.onmouseout = function() {
                var e = e ? e : window.event;
                var from = e.relatedTarget || e.toElement;
                if (!from || from.nodeName == "HTML") {
                    document.title = "mouse out";	
                } 
            }                
            window.onmousemove = function() {document.title = "mouse in";	}
            
            

var init = function (prs) {

	var eq = CONST.EQ;
	var version = CONST.VERSION;
	var config = CONST.CONFIG;

	function getValue(id) {
		return document.getElementById(id).value;
	}

	function setValue(id, val) {
		document.getElementById(id).value = val;
	}

	function setAllEqSliders() {
		for (var i = 0; i < eq.length; i++)
			setValue('ch-eq-slider-' + i, eq[i].gain);
	}

	function getEqIndex(f) {
		for (var i = 0; i < eq.length; i++) {
			if (eq[i].f && eq[i].f + '' === f) {
				return i;
			}
		}
		return false;
	}

	function propagateData() {
		//send message
		// chrome.runtime.sendMessage({
		// 	action: 'set',
		// 	eq: eq,
		// 	config: config,
		// 	selected: presets.getSelected(),
		// 	version: version
		// });
		window.eq.set({config:config,eq:eq});
		if (reportEQtimer) clearTimeout(reportEQtimer);
		reportEQtimer=setTimeout(reportEQ,250);
	}
	var reportEQtimer=false;
    function reportEQ() {
        reportEQtimer=false;
        // if (selectList.value == '0') {
        //     // custom
        //     document.title = 'eqcustom:' + window.presets['Custom'];
        // }
        // else {
        //     document.title = 'eq:' + selectList.options[selectList.selectedIndex].text;
        // }
        document.title = 'eqcustom:' + JSON.stringify({config:config,eq:eq});
        //document.title == '';
    }

	function snapSliders(index, diff) {
		for (var i = 1; i < 10; i++) {
			console.log('snap', i)
			diff = diff / 2;
			if (eq[index - i] && eq[index - i].f) {
				console.log('minus', parseFloat(eq[index - i].gain, 10) + diff)
				eq[index - i].gain = parseFloat(eq[index - i].gain, 10) + diff;
			}
			if (eq[index + i] && eq[index + i].f !== undefined) {
				console.log('plus', parseFloat(eq[index + i].gain, 10) + diff)
				eq[index + i].gain = parseFloat(eq[index + i].gain, 10) + diff;
			}
		}
	}

	function onSliderChange(evt) {
		// console.log('onchange');
		var slider = evt.target.getAttribute('eq');
		if (slider === 'master') {
			eq[0].gain = getValue('ch-eq-slider-0');
		} else {
			//eq settings
			var index = getEqIndex(slider);

			var diff = evt.target.value - eq[index].gain;
			eq[index].gain = evt.target.value;
			if (config.snap)
				snapSliders(index, diff);
			setAllEqSliders();
			chart.prepareChart(eq);
		}
		propagateData();
	}

	var sliderInputs = document.querySelectorAll('input[type="range"]');
	for (var i = 0; i < sliderInputs.length; i++) {
		sliderInputs[i].onchange = onSliderChange;
		sliderInputs[i].oninput = onSliderChange;
	}

	document.getElementById('reset').onclick = function reset() {
		for (var i = 0; i < eq.length; i++) {
			eq[i].gain = 0;
			if (!eq[i].f) {
				eq[i].gain = 1;
				// master
			}
		}
		setAllEqSliders();

		// return to default (stereo)
		config.mono = false;
		document.getElementById('channels').classList.remove('on');

		presets.setSelected();
		chart.prepareChart(eq);
		propagateData();
	};

	document.getElementById('channels').onchange = function (ev) {
		config.mono = ev.target.checked;
		propagateData();
	};

	document.getElementById('snap').onchange = function (ev) {
		config.snap = ev.target.checked;
		propagateData();
	};
    window.snapClicked=function () {
        document.getElementById('snap').checked=!document.getElementById('snap').checked;
		config.snap = document.getElementById('snap').checked;
		propagateData();
	};
	// TODO: Should only need to build this one time,
	//        but will need to append new saved presets.
	document.getElementById('presetsnew').onclick = function (ev) {
		//load EQ presets
		// if (presets.getSelected().default === true) {
		// 	document.getElementById('preset_delete').setAttribute('disabled', 'disabled');
		// } else {
		// 	document.getElementById('preset_delete').removeAttribute('disabled');
		// }

		function appendPreset(preset, presetsSelect, section) {
// 			var option = document.createElement("option");
// 			option.text = preset.name;
// 			option.setAttribute('value', ['preset', section, option.text].join('::'));
// 			if (presets.isSelected(preset)) {
// 				option.setAttribute('selected', 'selected');
// 			}
            // presetsSelect.appendChild(option, null);
			var option = document.createElement("div");
			option.innerHTML = preset.name;
			option.setAttribute('value', ['preset', section, preset.name].join('::'));
			if (presets.isSelected(preset)) {
				option.className += 'selected';
			}
			option.onclick=presetSelected;
			//debugger;
			presetsSelect.appendChild(option, null);
		}

//debugger;
// 		var userPresets = presets.getUsers();
// 		var userPresetsSelect = document.getElementById('presetsSelectUser');
 		var predefinedPresets = presets.getPredefined();
 		var predefinedPresetsSelect = document.getElementById('presetsSelectPredefined');



// 		// userPresetsSelect.innerHTML = '';
// 		for (var i = 0; i < userPresets.length; i++) {
// 			appendPreset(userPresets[i], userPresetsSelect, 'my');
// 		}
 		predefinedPresetsSelect.innerHTML = '';

			var option = document.createElement("div");
			option.innerHTML = '';
			option.onclick=function(){document.getElementById('presetsPanel').style.display='none';};
			option.className+='eqclose';
			predefinedPresetsSelect.appendChild(option, null);

 		for (var i = 0; i < predefinedPresets.length; i++) {
 			appendPreset(predefinedPresets[i], predefinedPresetsSelect, 'default')
 		}
 		
 		
document.getElementById('presetsPanel').style.display='inline';
// 		var mousedownEvent = document.createEvent("MouseEvent");
// 		mousedownEvent.initMouseEvent("mousedown");
//		document.getElementById('presetsSelect').dispatchEvent(mousedownEvent);
		//document.getElementById('presetsPanel').dispatchEvent(mousedownEvent);
	};

	// TODO: This doesn't handle re-selecting the current preset
	//        after making some slider changes.
	//document.getElementById('presetsSelect').onchange = 
	function presetSelected() {
	    var name=this.getAttribute('value');
	    document.getElementById('presetsPanel').style.display='none';
		//console.log('ev.target', ev.target);
		//console.log('val', ev.target.value);
		var selected = presets.getSelected();
		var updateEq = function () {
			for (var i = 0; i < 10; i++) {
				eq[i + 1].gain = selected.gains[i];
			}
			setAllEqSliders();
			chart.prepareChart(eq);
			propagateData();
		};
		switch (name) {
			case 'action::save':
				modal.confirm('Do you want to save "' + selected.name + '" preset?', function () {
					for (var i = 0; i < selected.gains.length; i++) {
						selected.gains[i] = getValue('ch-eq-slider-' + (i + 1));
					}
					console.log('action::save', selected);
					presets.setPreset(selected);
				});

				break;
			case 'action::save_as':
				modal.prompt('New preset name', function (name) {
					if (name && name.length > 0) {
						var preset = JSON.parse(JSON.stringify(selected));
						for (var i = 0; i < preset.gains.length; i++) {
							preset.gains[i] = getValue('ch-eq-slider-' + (i + 1));
						}
						preset.name = name;
						presets.setNewPreset(preset);
						presets.setSelected(name);

					}
				}, function () {
				});
				break;
			case 'action::delete':
				modal.confirm('Do you want to delete "' + selected.name + '" preset?', function () {
					presets.removeByName(selected.name);
				});
				break;
			case 'action::reset':
				modal.confirm('Do you want to reset "' + selected.name + '" preset?', function () {
					presets.reset(selected.name);
					presets.setSelected();
					// setSelected calls getSelected internally, so no need calling again
					updateEq();
				});
				break;
			case 'action::reset_all':
				modal.confirm('Do you want to reset all presets to default state?', function () {
					presets.resetAll();
					presets.setSelected();
					updateEq();
				});
				break;
			default:
				var val = (name).split('::');
				presets.setSelected(val[2]);
				selected = presets.getSelected();
				// chrome.storage.local.set({
				// 	selected: selected.name
				// });
				updateEq();
		}
		// chrome.storage.sync.set({
		// 	presets: presets.getAll()
		// });
	};

	//intialization
	//debugger;
var teq=JSON.parse(window.initEQ);
if(teq.eq){
	eq = teq.eq;
	config = teq.config;
}else{
    eq = CONST.EQ;
    config = CONST.CONFIG;
}
	chart.prepareChart(eq);
	sliders.prepareSliders(eq);

		//eq = CONST.EQ;
		setAllEqSliders();

		//config = CONST.CONFIG;
		document.getElementById('channels').checked = config.mono;
		document.getElementById('snap').checked = config.snap;
		chart.prepareChart(eq);
propagateData();

	// chrome.runtime.sendMessage({
	// 	action: 'get'
	// }, function (response) {
	// 	eq = response.eq;
	// 	setAllEqSliders();

	// 	config = response.config;
	// 	document.getElementById('channels').checked = config.mono;
	// 	document.getElementById('snap').checked = config.snap;
	// 	chart.prepareChart(eq);
	// });
};

//LOAD
// window.addEventListener("load", function () {
//     presets.setAll();
//     init();
// 	// chrome.storage.sync.get('presets', function (data) {
// 	// 	// console.log('popup.js', 'presets', data);
// 	// 	if (data.presets) {
// 	// 		presets.setAll(data.presets);
// 	// 		chrome.storage.local.get('selected', function (data) {
// 	// 			// console.log('popup.js', 'selected', data);
// 	// 			if (data.selected) {
// 	// 				presets.setSelected(data.selected.name);
// 	// 			}
// 	// 		});

// 	// 	} else {
// 	// 		presets.setAll();
// 	// 		//store it for next time
// 	// 		chrome.storage.sync.set({
// 	// 			presets: presets.getAll()
// 	// 		});
// 	// 	}
// 	// 	init();
// 	// });
// });

//request tab capture (needed for background_v2.js)
// chrome.runtime.sendMessage({
// 	action: 'eq-init'
// });













var CONST = {
  VERSION: 1,

  /**
 * EQ default values
 */
  EQ: [
    {
      label : 'master',
      gain : 1
    }, {
      label : '32',
      f : 32,
      gain : 0,
      type : 'lowshelf'
    }, {
      label : '64',
      f : 64,
      gain : 0,
      type : 'peaking'
    }, {
      label : '125',
      f : 125,
      gain : 0,
      type : 'peaking'
    }, {
      label : '250',
      f : 250,
      gain : 0,
      type : 'peaking'
    }, {
      label : '500',
      f : 500,
      gain : 0,
      type : 'peaking'
    }, {
      label : '1k',
      f : 1000,
      gain : 0,
      type : 'peaking'
    }, {
      label : '2k',
      f : 2000,
      gain : 0,
      type : 'peaking'
    }, {
      label : '4k',
      f : 4000,
      gain : 0,
      type : 'peaking'
    }, {
      label : '8k',
      f : 8000,
      gain : 0,
      type : 'peaking'
    }, {
      label : '16k',
      f : 16000,
      gain : 0,
      type : 'highshelf'
    }
  ],


  CONFIG: {
    snap : true,
    mono : false
  },


  //(absolute values for gain +/- 12db, TODO: make it relative)
  PRESETS: [
    {
      name : 'Default',
      default : true,
      gains : [0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000]
    }, {
      name : 'Classical',
      default : true,
      gains : [0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, -4.3200, -4.3200, -4.3200, -5.7600]
    }, {
      name : 'Club',
      default : true,
      gains : [0.0000, 0.0000, 4.8000, 3.3600, 3.3600, 3.3600, 1.9200, 0.0000, 0.0000, 0.0000]
    }, {
      name : 'Dance',
      default : true,
      gains : [5.7600, 4.3200, 1.4400, 0.0000, 0.0000, -3.3600, -4.3200, -4.3200, 0.0000, 0.0000]
    }, {
      name : 'Full Bass',
      default : true,
      gains : [4.8000, 5.7600, 5.7600, 3.3600, 0.9600, -2.4000, -4.8000, -6.2400, -6.7200, -6.7200]
    }, {
      name : 'Full Bass & Treble',
      default : true,
      gains : [4.3200, 3.3600, 0.0000, -4.3200, -2.8800, 0.9600, 4.8000, 6.7200, 7.2000, 7.2000]
    }, {
      name : 'Full Treble',
      default : true,
      gains : [-5.7600, -5.7600, -5.7600, -2.4000, 1.4400, 6.7200, 9.6000, 9.6000, 9.6000, 10.0800]
    }, {
      name : 'Headphones',
      default : true,
      gains : [2.8800, 6.7200, 3.3600, -1.9200, -1.4400, 0.9600, 2.8800, 5.7600, 7.6800, 8.6400]
    }, {
      name : 'Laptop Speakers',
      default : true,
      gains : [2.8800, 6.7200, 3.3600, -1.9200, -1.4400, 0.9600, 2.8800, 5.7600, 7.6800, 8.6400]
    }, {
      name : 'Large Hall',
      default : true,
      gains : [6.2400, 6.2400, 3.3600, 3.3600, 0.0000, -2.8800, -2.8800, -2.8800, 0.0000, 0.0000]
    }, {
      name : 'Live',
      default : true,
      gains : [-2.8800, 0.0000, 2.4000, 3.3600, 3.3600, 3.3600, 2.4000, 1.4400, 1.4400, 1.4400]
    }, {
      name : 'Party',
      default : true,
      gains : [4.3200, 4.3200, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 4.3200, 4.3200]
    }, {
      name : 'Pop',
      default : true,
      gains : [0.9600, 2.8800, 4.3200, 4.8000, 3.3600, 0.0000, -1.4400, -1.4400, 0.9600, 0.9600]
    }, {
      name : 'Reggae',
      default : true,
      gains : [0.0000, 0.0000, 0.0000, -3.3600, 0.0000, 3.8400, 3.8400, 0.0000, 0.0000, 0.0000]
    }, {
      name : 'Rock',
      default : true,
      gains : [4.8000, 2.8800, -3.3600, -4.8000, -1.9200, 2.4000, 5.2800, 6.7200, 6.7200, 6.7200]
    }, {
      name : 'Ska',
      default : true,
      gains : [-1.4400, -2.8800, -2.4000, 0.0000, 2.4000, 3.3600, 5.2800, 5.7600, 6.7200, 5.7600]
    }, {
      name : 'Soft',
      default : true,
      gains : [2.8800, 0.9600, 0.0000, -1.4400, 0.0000, 2.4000, 4.8000, 5.7600, 6.7200, 7.2000]
    }, {
      name : 'Soft rock',
      default : true,
      gains : [2.4000, 2.4000, 1.4400, 0.0000, -2.4000, -3.3600, -1.9200, 0.0000, 1.4400, 5.2800]
    }, {
      name : 'Techno',
      default : true,
      gains : [4.8000, 3.3600, 0.0000, -3.3600, -2.8800, 0.0000, 4.8000, 5.7600, 5.7600, 5.2800]
    }
  ]
};

var presets = (function() {
	'use strict';
	var list = [];
	var selected = false;

	var getByName = function(name, presetList) {
		presetList = presetList ? presetList : list;
		name = (name) ? '' + name : '';
		for (var i = 0, l = presetList.length; i < l; i++) {
			if (presetList[i].name.toLowerCase() === name.toLowerCase()) {
				return presetList[i];
			}
		}
		return false;
	};

	var removeByName = function(name) {
		name = (name) ? '' + name : '';
		for (var i = 0, l = list.length; i < l; i++) {
			if (list[i].name.toLowerCase() === name.toLowerCase() && list[i].default !== true) {
				list.splice(i, 1);
				selected = false;
				getSelected();
				return true;
			}
		}
		return false;
	};

	var setAll = function(p) {
		list = (p) ? JSON.parse(JSON.stringify(p)) : JSON.parse(JSON.stringify(CONST.PRESETS));
		console.log('presets.setAll', list);
	};

	var getSelected = function() {
		if (!selected) {
			selected = getByName('default');
		}
		return selected;
	};
	var isSelected = function(preset) {
		var selected = getSelected();
		if (preset.name == selected.name && preset.default == selected.default) {
			return true;
		}
		return false;
	};

	var setSelected = function(name) {
		selected = getByName(name);
		var ret = getSelected();
		console.log('presets.setSelected', selected, ret);
		return ret;
	};
	var setPreset = function(preset) {
		for (var i = 0, l = list.length; i < l; i++) {
			if (list[i].name == preset.name) {
				list[i] = preset;
			}
		}
	};
	var setNewPreset = function(preset) {
		delete preset['default'];
		list.push(preset);
		console.log(list);
	};
	var getUsers = function() {
		var retList = [];
		for (var i = 0, l = list.length; i < l; i++) {
			if (list[i].default !== true) {
				console.log(i);
				retList.push(list[i]);
			}
		}
		console.log('retList', list, retList);
		return sort(retList);
	};

	var getPredefined = function() {
		var retList = [];
		for (var i = 0, l = list.length; i < l; i++) {
			if (list[i].default === true) {
				retList.push(list[i]);
			}
		}
		return retList;
	};

	var getAll = function(name) {
		return list;
	};

	var reset = function(name) {
		var oldPreset = getByName(name, JSON.parse(JSON.stringify(CONST.PRESETS)));
		//var preset = getByName(name);
		for (var i = 0, l = list.length; i < l; i++) {
			if (list[i].name == name) {
				list[i] = oldPreset;
			}
		}
		return oldPreset;
	};

	var resetAll = function() {
		list = JSON.parse(JSON.stringify(CONST.PRESETS));
		console.log('list', list);
		selected = false;
	};

	var sort = function(list) {
		//sort the presets by name (just because its more fun to do it on every clik... right?)
		list.sort(function(a, b) {
			if (a.name.toLowerCase() > b.name.toLowerCase()) {
				return 1;
			}
			if (a.name.toLowerCase() < b.name.toLowerCase()) {
				return -1;
			}
			return 0;
		});
		return list;
	};
	return {
		getByName : getByName,
		removeByName : removeByName,
		getSelected : getSelected,
		setSelected : setSelected,
		setNewPreset : setNewPreset,
		setPreset : setPreset,
		isSelected : isSelected,
		getUsers : getUsers,
		getPredefined : getPredefined,
		getAll : getAll,
		setAll : setAll,
		reset : reset,
		resetAll : resetAll

	};
})();
var chart = (function () {
	var canvas, context;
	var px = (window.devicePixelRatio > 1) ? 2 : 1;
	var prepareChart = function (eq) {

		canvas = document.getElementById('chart');
		//330x40
		canvas.style.width = 63 + 'vw';
		canvas.style.maxWidth = 315 + 'px';
		canvas.style.maxHeight = 40 + 'px';
		canvas.style.height = 40 + 'px';
		//canvas.style.height= '23vh';
		canvas.width = px * 315;
		canvas.height = px * 40;
		context = canvas.getContext('2d');
		context.beginPath();
		context.moveTo(px * 12, px * 20);
		context.lineTo(px * 300, px * 20);
		context.lineWidth = px * 1;
		context.strokeStyle = 'rgb(229,229,229)';
		context.stroke();
		context.beginPath();
		for (var l = eq.length, i = 0; i < l; i++) {
			context.moveTo(px * ((i * 32) + 12), px * 5);
			context.lineTo(px * ((i * 32) + 12), px * 35);
		}
		context.lineWidth = px * 1;
		context.strokeStyle = 'rgb(229,229,229)';
		context.stroke();
		context.beginPath();
		context.stroke();
		context.font = px * 6 + 'px Arial';
		context.textAlign = 'right';
		context.fillStyle = 'rgb(50,90,140)';
		context.fillText('+12', px * 8, px * (6 + 3));
		context.fillText('-12', px * 8, px * (40 - 3));
		context.textAlign = 'left';
		context.fillText('+12', px * 303, px * (6 + 3));
		context.fillText('-12', px * 303, px * (40 - 3));
		context.closePath();
		refreshChart(eq);
	};

	var refreshChart = function (eq) {
		//------------ line ------------//
		var points = [];
		for (var l = eq.length, i = 1; i < l; i++) {
			points.push({
				x: ((i - 1) * 32) + 12,
				y: 20 - (15 / 12) * eq[i].gain,
				xc: 0,
				xy: 0
			});
		}
		context.beginPath();
		context.moveTo(px * points[0].x, px * points[0].y);
		for (i = 1; i < points.length - 2; i++) {
			var xc = (points[i].x + points[i + 1].x) / 2;
			var yc = (points[i].y + points[i + 1].y) / 2;
			context.quadraticCurveTo(px * points[i].x, px * points[i].y, px * xc, px * yc);
		}
		context.quadraticCurveTo(px * points[i].x, px * points[i].y, px * points[i + 1].x, px * points[i + 1].y);
		context.lineWidth = px * 1;
		context.strokeStyle = 'rgb(50,90,140)';
		context.stroke();

		//------------ gradient ------------//
		var gradiend = context.createLinearGradient(px * 0, px * 0, px * 0, px * 40);
		gradiend.addColorStop(0, "rgba(50,90,140,200)");
		gradiend.addColorStop(0.5, "rgba(255,255,255,0)");
		gradiend.addColorStop(1, "rgba(50,90,140,200)")
		points = [];

		for (var l = eq.length, i = 1; i < l; i++) {
			points.push({
				x: ((i - 1) * 32) + 12,
				y: 20 - (15 / 12) * eq[i].gain,
				xc: 0,
				xy: 0
			});
		}
		context.beginPath();
		context.moveTo(px * 12, px * 20);
		context.lineTo(px * points[0].x, px * points[0].y);
		for (i = 1; i < points.length - 2; i++) {
			var xc = (points[i].x + points[i + 1].x) / 2;
			var yc = (points[i].y + points[i + 1].y) / 2;
			context.quadraticCurveTo(px * points[i].x, px * points[i].y, px * xc, px * yc);
		}
		context.quadraticCurveTo(px * points[i].x, px * points[i].y, px * points[i + 1].x, px * points[i + 1].y);
		context.lineTo(px * 300, px * 20);
		context.closePath();
		context.fillStyle = gradiend;
		context.fill();

	};
	return {
		prepareChart: prepareChart,
		refreshChart: refreshChart
	};
})();

var sliders = (function(eq) {
	var canvas, context;
	var px = (window.devicePixelRatio > 1) ? 2 : 1;
	var prepareSliders = function() {
		canvas = document.createElement('canvas');
		canvas.width = px * 30;
		canvas.height = px * 120;
		context = canvas.getContext('2d');
		context.beginPath();
		context.strokeStyle = 'rgb(128,158,198)';
		//'rgb(170,170,170)';
		context.lineWidth = px * 1;
		var longer = [0, 59, 119];
		var shorter = [10, 20, 30, 40, 50, 70, 80, 90, 100, 110];
    var i;
		for (i = 0; i < longer.length; i++) {
			context.moveTo(px * 2, px * longer[i] + context.lineWidth / 2);
			context.lineTo(px * 10, px * longer[i] + context.lineWidth / 2);
			context.moveTo(px * 20, px * longer[i] + context.lineWidth / 2);
			context.lineTo(px * 28, px * longer[i] + context.lineWidth / 2);
		}
		for (i = 0; i < shorter.length; i++) {
			context.moveTo(px * 7, px * shorter[i] + context.lineWidth / 2);
			context.lineTo(px * 10, px * shorter[i] + context.lineWidth / 2);
			context.moveTo(px * 20, px * shorter[i] + context.lineWidth / 2);
			context.lineTo(px * 23, px * shorter[i] + context.lineWidth / 2);
		}
		context.stroke();
		context.closePath();
		var url = canvas.toDataURL('image/png');
		var head = document.getElementsByTagName('head')[0];
		var style = document.createElement('style');
		style.innerHTML += '.controls-sliders .slider{';
		style.innerHTML += 'background-image: url(' + url + ');';
		style.innerHTML += 'background-size: 30px 88%;';
		style.innerHTML += '}';
		head.appendChild(style);
	};
	return {
		prepareSliders : prepareSliders
	};
})();








var v;
function hookeq(){ 
        try{ 
        			v=document.getElementById("mplayer").contentWindow.document.getElementsByTagName("video")[0];
                    //v=document.getElementsByTagName('video')[0];
                    if (!v) setTimeout(hookeq,1000);//throw 'no vid';
                    //v.play();
                    else onDocLoad(v)
        }catch(e){console.log("retry:"+e);debugger;//setTimeout(hookeq,1000);
        }
}
hookeq();



function onDocLoad(v) {
	'use strict';

	var eqStatus = null;
	try {
		eqStatus = (localStorage ? localStorage.getItem('eq-status') : null);
	} catch (e) {
		//eat it! in case there are issues with allow-same-origin
		//TODO: Maybe I should the blacklistng info to chrome.storage in background.js per domain.
	}
	eqStatus = (eqStatus == null) ? 'enabled' : eqStatus;
	//console.log('EQ init...', document.location.hostname);
	if (eqStatus === 'enabled') {

		window.eq = (function () {
			var audioContext = window.savedaudioContext?window.savedaudioContext: false;
			var targets = [];
			var filters = [];

			var init = function () {
				//collectTargets();
                targets.push(v);
                //debugger;
				if (targets.length > 0 && !audioContext) {
					//As there is a limitation for how many audio context can be run on same page
					//I need to check if there is a need to create on (if there are audio/video elements)
					//it was causing "crack" sound on page load -> https://github.com/ejci/Chrome-Audio-EQ/issues/18
					//alert('ac');
					audioContext = new AudioContext();
					window.savedaudioContext=audioContext;
				}
				if (!audioContext) {
					//no audio context? dont continue...
					//throw new Error("EQ was not initialized correctly!");
					return;
				} else {
					//console.log('Audio EQ init', document.location.hostname, targets);
				}
				filters = [];
				CONST.EQ.forEach(function (node, index) {
					var filter = false;
					if (node.f) {
						// Filter node
						filter = createFilter(node.f, node.type);
					} else {
						// Gain node
						filter = audioContext.createGain();
						filter.gain.value = 1;
						filter.channelCountMode = "explicit";
					}
					filters.push(filter);
				});
				attach();
			};

			function getHostName(url) {
				if ('blob:' == url.substring(0, 5)) {
					url = url.replace('blob:', '');
					url = unescape(url);
				}
				var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
				if (match !== null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
					return match[2];
				} else {
					return null;
				}
			}

			var createFilter = function (freq, type, gainValue) {
				if (!audioContext) {
					return;
				}
				var filter = audioContext.createBiquadFilter();
				filter.type = type || CONST.FT.LOWPASS;
				filter.gain.value = gainValue || 0;
				filter.Q.value = 1;
				filter.frequency.value = freq || 0;
				return filter;
			};

			var attach = function () {
			    
				var source = false;
				if (!audioContext) {
					init();
					//throw new Error("EQ was not initialized correctly!");
				} else {

				}
				//collectTargets();
				targets.forEach(function (target, index) {
					//console.log('target', target, index, target.getAttribute("eq-attached"));
					if (target.getAttribute("eq-attached") !== "true") {
						//this is a nasty hack
						//as some videos dont have crossorigin attribute im forcing the atribute
						//and then I need to force "reload" the src. its f***ed up but (kind off) it works :/
						//of course this will only work if the video src has Access-Control-Allow-Origin header set :(
						//Access-Control-Allow-Origin header is set by extension in headers.js
						//https://code.google.com/p/chromium/issues/detail?id=477364
						//in case media tags are using source tags we need to check for currentSrc instead of src attribute
						var src = (target.src ? target.src : target.currentSrc);

						var crossorigin = target.getAttribute('crossorigin');
						//console.log(target);
						if (1||src) {
							//console.log('src', src);
							//only reload if domains are not the same (so crossorigin attribute can kick in)
							//console.log(src, getHostName(src), document.location.hostname, (crossorigin ? crossorigin : 'anonymous'));
							// if (document.location.hostname != getHostName(src) && 'blob:' != src.substring(0, 5) && !crossorigin) {
							 	//target.setAttribute('crossorigin', (crossorigin ? crossorigin : 'anonymous'));
							// 	//target.setAttribute('preload', 'auto');
							// 	//force "reload" so addedd crossorigin attribute can kick in
							// 	if (target.src) {
							// 		target.src = ''+target.src;
							// 		//target.load();
							// 	} else {
							// 		if (target.currentSrc) {
							// 			target.load();
							// 		}
							// 	}
							// }
							//setTimeout(function(){
							//	console.dir(target);
							//},2000)
							//console.log(target.src)
							//console.log(target.currentSrc)
							//console.dir(target);
							
							source = audioContext.createMediaElementSource(target);
							//read the source channel count
							filters[0]._defaultChannelCount = (source.channelCount) ? source.channelCount : 2;
							source.connect(filters[0]);
							var totalFilters = filters.length;
							var node;
							for (var i = 0; i < totalFilters; i++) {
								node = filters[i + 1];
								if (node) {
									filters[i].connect(node);
								}
							}

							filters[filters.length - 1].connect(audioContext.destination);
							target.setAttribute("eq-attached", "true");
						} else {
							//probably element is not initialized on creation so observer attribute changes
							//vimeo.com works like that. on load ther is only empty video tag <video preload></video>
							//TODO: probably should also destroy the observer once its initialized...
							var elementObserver = new MutationObserver(function (mutations, observer) {
								try {
									eq.attach();
								} catch (e) {
									//do nothing
									console.error(e);
									chrome.runtime.sendMessage({
										action: 'error',
										page: document.location.hostname,
										source: 'page.js',
										error: e
									});

								}
							});
							elementObserver.observe(target, {
								childList: false,
								subtree: false,
								attributes: true,
								characterData: false
							});
						}
					}
				});
			};

			/**
			 * Collect all video and audio tags
			 */
			var collectTargets = function () {
				var videos = document.getElementsByTagName('video');
				var audios = document.getElementsByTagName('audio');

				function collect(total, collection) {

					var index;
					if (total > 0) {
						for (index = 0; index < total; index++) {
							targets.push(collection[index]);
						}
					}
				}

				targets = [];
				collect(videos.length, videos);
				collect(audios.length, audios);

			};

			/**
			 *
			 * @param {Object} options
			 */
			var set = function (options) {
				//return;
				//console.log(filters, options);
				if (filters.length !== 0 && options && options.eq) {
					if (options.config && options.config.mono && options.config.mono === true) {
						filters[0].channelCount = 1;
					} else {
						filters[0].channelCount = (filters[0]._defaultChannelCount) ? filters[0]._defaultChannelCount : 2;
					}
					filters.forEach(function (filter, index) {
						filter.gain.value = options.eq[index].gain;
					});
				}
			};
			init();
			return {
				init: init,
				createFilter: createFilter,
				attach: attach,
				collectTargets: collectTargets,
				set: set
			};
		})();
		//console.log('eqStatus', eqStatus);

		/**
		 * Check for DOM changes
		 */
		try {
			var handleMutation, observer;
			//Get default values
			// chrome.runtime.sendMessage({
			// 	action: 'get'
			// }, function (response) {
			// 	eq.set({
			// 		eq: response.eq,
			// 		config: response.config
			// 	});
			// });
			// //Listen to changes
			// chrome.runtime.onMessage.addListener(function (request, sender, cb) {
			// 	if (request.action == 'set') {
			// 		eq.set({
			// 			eq: request.eq,
			// 			config: request.config
			// 		});
			// 		cb();
			// 	}
			// 	if (request.action == 'enable') {
			// 		localStorage.setItem('eq-status', 'enabled');
			// 		cb();
			// 	}
			// 	if (request.action == 'disable') {
			// 		localStorage.setItem('eq-status', 'disabled');
			// 		cb();
			// 	}
			// });

			/**
			 * Handle DOM mutation
			 * @param {Object} mutations
			 * @param {Object} observer
			 */
			handleMutation = function (mutations, observer) {
				//console.log(mutations[0])
				if (mutations[0].addedNodes.length) {
					try {
						eq.attach();
					} catch (e) {
						//do nothing
						console.error(e);
						chrome.runtime.sendMessage({
							action: 'error',
							page: document.location.hostname,
							source: 'page.js',
							error: e
						});

					}
				}
			};

			observer = new MutationObserver(handleMutation);
			observer.observe((document.body ? document.body : document), {
				childList: true,
				subtree: true,
				attributes: false,
				characterData: false
			});

		} catch (e) {
			//	throw e;
			console.error(e);
			chrome.runtime.sendMessage({
				action: 'error',
				page: document.location.hostname,
				source: 'page.js',
				error: e
			});
		}
	}
}
window.CONST=CONST;
 presets.setAll();
    init();
            
            
            // try {
            //     return;
            //     console.log('EQQ');
            //     window.presets = {
            //         "None": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            //         "Classical": [0, 0, 0, 0, 0, 0, -7.2, -7.2, -7.2, -9.6],
            //         "Club": [0, 0, 8, 5.6, 5.6, 5.6, 3.2, 0, 0, 0],
            //         "Dance": [9.6, 7.2, 2.4, -1.1, -1.1, -5.6, -7.2, -7.2, -1.1, -1.1],
            //         "Full Bass": [-8, 9.6, 9.6, 5.6, 1.6, -4, -8, -10.4, -11.2, -11.2],
            //         "Full Bass and Treble": [7.2, 5.6, -1.1, -7.2, -4.8, 1.6, 8, 11.2, 12, 12],
            //         "Full Treble": [-9.6, -9.6, -9.6, -4, 2.4, 11.2, 11.5, 11.8, 11.8, 12],
            //         "Laptop Speakers and Headphones": [4.8, 11.2, 5.6, -3.2, -2.4, 1.6, 4.8, 9.6, 11.9, 11.9],
            //         "Large Hall": [10.4, 10.4, 5.6, 5.6, -1.1, -4.8, -4.8, -4.8, -1.1, -1.1],
            //         "Live": [-4.8, -1.1, 4, 5.6, 5.6, 5.6, 4, 2.4, 2.4, 2.4],
            //         "Party": [7.2, 7.2, -1.1, -1.1, -1.1, -1.1, -1.1, -1.1, 7.2, 7.2],
            //         "Pop": [-1.6, 4.8, 7.2, 8, 5.6, -1.1, -2.4, -2.4, -1.6, -1.6],
            //         "Reggae": [-1.1, -1.1, -1.1, -5.6, -1.1, 6.4, 6.4, -1.1, -1.1, -1.1],
            //         "Rock": [8, 4.8, -5.6, -8, -3.2, 4, 8.8, 11.2, 11.2, 11.2],
            //         "Ska": [-2.4, -4.8, -4, -1.1, 4, 5.6, 8.8, 9.6, 11.2, 9.6],
            //         "Soft": [4.8, 1.6, -1.1, -2.4, -1.1, 4, 8, 9.6, 11.2, 12, ],
            //         "Soft Rock": [4, 4, 2.4, -1.1, -4, -5.6, -3.2, -1.1, 2.4, 8.8, ],
            //         "Techno": [8, 5.6, -1.1, -5.6, -4.8, -1.1, 8, 9.6, 9.6, 8.8],
            //         "Custom": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            //     };
            //     //return;


            //     var EQ = [{
            //             f: 32,
            //             type: 'lowshelf'
            //         }, {
            //             f: 64,
            //             type: 'peaking'
            //         }, {
            //             f: 125,
            //             type: 'peaking'
            //         }, {
            //             f: 250,
            //             type: 'peaking'
            //         }, {
            //             f: 500,
            //             type: 'peaking'
            //         }, {
            //             f: 1000,
            //             type: 'peaking'
            //         }, {
            //             f: 2000,
            //             type: 'peaking'
            //         }, {
            //             f: 4000,
            //             type: 'highshelf'
            //         } //,
            //         // {
            //         //     f: 8000,
            //         //     type: 'peaking'
            //         // }, {
            //         //     f: 16000,
            //         //     type: 'highshelf'
            //         // }
            //     ];

            //     window.initEQ;
            //     //debugger;
            //     var skipeq = true; //window.initEQ=='None';
            //     window.curpreset = window.presets['None'];
            //     if (window.initEQ.indexOf(',') > -1) {
            //         var ai = initEQ.split(',');
            //         for (var aii = 0; aii < ai.length; aii++) {
            //             window.presets['Custom'][aii] = parseFloat(ai[aii]);
            //         }
            //         window.curpreset = window.presets['Custom'];
            //     }
            //     else if (window.initEQ != '') {
            //         window.curpreset = window.presets[window.initEQ];
            //     }
            //     else window.initEQ = '0,0';
            //     var container = document.querySelector('#equalizer');
            //     var selectList = document.createElement("select");
            //     selectList.id = "cmbpresets";
            //     container.appendChild(selectList);

            //     //Create and append the options
            //     for (var i = 0; i < Object.keys(window.presets).length; i++) {
            //         var option = document.createElement("option");
            //         option.value = Object.keys(window.presets).length - 1 == i ? 0 : window.presets[Object.keys(window.presets)[i]];
            //         option.text = Object.keys(window.presets)[i];
            //         if (window.initEQ == option.text || (window.initEQ.indexOf(',') > 0 && option.text == 'Custom'))
            //             option.selected = true
            //         selectList.appendChild(option);
            //     }
            //     var onPSChange = function(e) {

            //         if (new Date() - window.eqtime < 300) return;
            //         if (0 && skipeq) {
            //             skipeq = false;
            //             connectFilters();
            //             // var lind=0;
            //             // filters.forEach(function (lfilter) {
            //             //   lfilter.gain.value = parseFloat(window.curpreset[lind])*3;
            //             //   lind++;
            //             // });
            //         }

            //         var ps = e.target.value.split(',');
            //         if (e.target.value == '0') ps = window.presets['Custom'];
            //         //debugger;
            //         for (var i = 0; i < EQ.length; i++) {
            //             var elm = document.getElementById('eqs' + i);
            //             elm.value = parseFloat(ps[i] + '') * 3;
            //             var evt = document.createEvent("HTMLEvents");
            //             window.presettime = new Date();
            //             evt.initEvent('change', true, true); // event type,bubbling,cancelable
            //             elm.dispatchEvent(evt);
            //         }
            //     };
            //     selectList.addEventListener('change', onPSChange);


            //     // Create filters
            //     var filters = [];

            //     function connectFilters() {
            //         console.log('connectFilters');
            //         if (!window.context) window.context = new AudioContext();
            //         var mediaElement = v;
            //         var sourceNode = window.context.createMediaElementSource(mediaElement);
            //         var sum = window.context.createGain();
            //         filters = EQ.map(function(band) {
            //             var filter = window.context.createBiquadFilter();
            //             filter.type = band.type;
            //             filter.gain.value = -50.0; //0;
            //             filter.Q.value = 1;
            //             filter.frequency.value = band.f;
            //             sourceNode.connect(filter);
            //             var lGain = window.context.createGain();
            //             filter.connect(lGain);

            //             lGain.connect(sum);

            //             return filter;
            //         });
            //         sum.connect(window.context.destination);

            //         // Bind filters to vertical range sliders

            //         var ind = 0;
            //         window.eqtimer = false;
            //         window.presettime = new Date();
            //         window.eqtime = new Date();

            //         debugger;
            //         filters.forEach(function(filter) {
            //             //return;
            //             var input = document.createElement('input');
            //             input.type = 'range';
            //             input.freq = filter.frequency.value;
            //             input.min = -40;
            //             input.max = 40;
            //             input.value = parseFloat(window.curpreset[ind]) * 3; //Math.sin(ind/Math.PI*2)*30;
            //             if (!skipeq) filter.gain.value = ~~(input.value - 50);
            //             input.title = filter.frequency.value;
            //             input.id = 'eqs' + ind;
            //             ind++;
            //             input.style.display = 'inline-block';
            //             input.setAttribute('orient', 'vertical');
            //             input.style.webkitAppearance = 'slider-vertical';
            //             input.style.width = '15px';
            //             input.style.height = '98%';

            //             container.appendChild(input);

            //             var onChange = function(e) {
            //                 if (skipeq) return;
            //                 filter.gain.value = ~~(e.target.value - 50);
            //                 var eqi = parseInt(this.id.replace('eqs', ''));
            //                 //input.title= Math.round(this.value/3,2);
            //                 if (new Date() - window.presettime > 500) {
            //                     //debugger;
            //                     window.presets['Custom'][eqi] = parseFloat(e.target.value) / 3;
            //                     for (var ie = 0; ie < EQ.length; ie++) {
            //                         window.presets['Custom'][ie] = Math.round(parseFloat(document.getElementById('eqs' + ie).value) / 3, 2);
            //                     }
            //                     selectList.value = 0;
            //                 }
            //                 if (eqtimer) {
            //                     clearTimeout(eqtimer);
            //                     eqtimer = false;
            //                 }
            //                 eqtimer = setTimeout(reportEQ, 1000);
            //             };

            //             input.addEventListener('input', onChange);
            //             input.addEventListener('change', onChange);
            //         });
            //     }


            //     if (!skipeq) {
            //         connectFilters();
            //     }

            //     function reportEQ() {
            //         if (selectList.value == '0') {
            //             // custom
            //             document.title = 'eqcustom:' + window.presets['Custom'];
            //         }
            //         else {
            //             document.title = 'eq:' + selectList.options[selectList.selectedIndex].text;
            //         }
            //         document.title == '';
            //     }

            // }
            // catch (e) {
            //     console.log(e);
            // }
        }
        html_string += ''+(f + '').replace('function ()', 'function EQ()').replace('window.initEQ', '\'' + eqsetting + '\'');
        if (savedtop) {
            html_string += '		document.getElementById("chkontop").checked=true;';
            html_string += '		document.getElementById("btntop").ison=true;';
        }
        //nowloading=false;
        //console.log('mainWindow.isVisible()' + mainWindow.isVisible());
        //if (!mainWindow.isVisible())
        // if (djWindow.isFocused() && djWindow.isVisible())
        //     mainWindow.show();

        if (mainWindow.isFullScreen()) {
            setTimeout(function() {
                //if (!forcefFullSceen)
                mainWindow.setFullScreen(true);
                var fs = 'var e=document.getElementById("mplayer").contentWindow.document.querySelector(".ytp-fullscreen-button");';
                //if (forcefFullSceen){
                //	fs+='var evObj =document.getElementById("mplayer").contentWindow.document.createEvent("Events");';
                //	fs+='evObj.initEvent("click", true, false);'
                //	fs+='e.dispatchEvent(evObj);'
                //}
                //else
                fs += 'e.onclick=function(){document.title="shrink"}';
                forcefFullSceen = true;
                webContents.executeJavaScript(fs);
            }, 3000)
        }
        webContents.executeJavaScript(html_string);

    }

    function chase() {

        //return;
        if (!hooked) return;
        if (mainWindow.isFullScreen()) return;
        var p = djWindow.getPosition();
        var p1 = mainWindow.getPosition();
        if (p1[0] == p[0] && p1[1] == p[1]) return;
        mainWindow.setPosition(parseInt(p[0]) + 0 + titlel, parseInt(p[1]) + titleh);
        if (titlestate.indexOf('youtube') > -1) {
            mainWindow.setAlwaysOnTop(true);
//console.log('CHASE  mainWindow.isVisible:' + mainWindow.isVisible() + ' djWindow.isVisible:'+djWindow.isVisible()+' djWindow.isFocused:'+djWindow.isFocused()+' realfocused:'+realfocused);            if (!mainWindow.isVisible()) mainWindow.showInactive();
        }
        djWindow.show();
        djWindow.focus();
    }


    app.on('window-all-closed', function() {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform != 'darwin') {
            app.quit();
        }
    });


    ipcMain.on('online-status-changed', function(event, status) {
        console.log(status);
        if (status.indexOf('play:') == 0) {
            playVideo(status.replace('play:', ''));
        }
        else if (status.indexOf('close:') == 0) {
            djWindow.close();
            mainWindow.close();
        }
        // else if(status.indexOf('load:')==0){
        //     app.getPath(name)
        // }
        // else if(status.indexOf('save:')==0){
        //     app.getPath(name)
        // }
        //  else if (status.indexOf('next:')==0){
        //  		nextVid=status.replace('next:','');
        //  		if (typeof mainWindow=='undefined') playNext()
        //  }
        else if (status.indexOf('stop:') == 0) {
            mainWindow.webContents.executeJavaScript('v.pause()');
        }
        else if (status.indexOf('eq:') == 0) {
            eqsetting = status.replace('eq:', '');
        }
    });

    openViewer();
    if (typeof mainWindow == 'undefined') {
        return;
    }
    djWindow.on('move', function(e, cmd) {
        if (new Date() - mainmovedtime > 1500) {
            //hooked=true;
        }
        if (!mainWindow.isFullScreen()) {
            mainWindow.setAlwaysOnTop(true);
            djWindow.focus();
        }

        mainmovedtime = new Date();
        chase();
    });
    var lastfs=new Date();
    djWindow.on('focus', function(e, cmd) {
        realfocused=true;
        if (new Date()-lastfs<100) return;
        lastfs=new Date();
        chase();
        if (titlestate.indexOf('youtube') == -1) {
            mainWindow.show();
            mainWindow.setAlwaysOnTop(true);
            console.log('showing');
        }
        if (!mainWindow.isFullScreen()) {
            djWindow.focus();
            mainWindow.setAlwaysOnTop(true);
        }
        console.log('focus sug');
    });
    djWindow.on('blur', function(e, cmd) {
        if (new Date()-mainmovedtime<500) return;
        realfocused=false;
        console.log('blur');
        if(!mainWindow) return;
        mainWindow.setAlwaysOnTop(savedtop);
        if(!savedtop && !djWindow.isFocused() && !mainWindow.isFocused() && !realfocused
        ) mainWindow.hide();
        mainmovedtime = new Date();
        
    });

    djWindow.on('minimize', function(e, cmd) {
        realfocused=false;
        console.log('minimize');
        if(!mainWindow) return;
        mainWindow.setAlwaysOnTop(savedtop);
        if(!savedtop
        ) mainWindow.hide();

    });
    djWindow.on('restore', function(e, cmd) {
        realfocused=true;
        console.log('restore');
        if(!mainWindow) return;
        chase();
        if (titlestate.indexOf('youtube') == -1) {
            mainWindow.show();
            mainWindow.setAlwaysOnTop(true);
            console.log('showing');
        }
        if (!mainWindow.isFullScreen()) {
            djWindow.focus();
            mainWindow.setAlwaysOnTop(true);
        }

    });

    djWindow.on('closed', function() {
        console.log('closed');
        if (cv) clearInterval(cv);
        try {
            mainWindow.close();
            djWindow = null
        }
        catch (e) {}
        //if (process.platform != 'darwin') {
        app.quit();
        //}
    });

    var req = request.defaults({
        rejectUnauthorized: false,
        followAllRedirects: true // allow redirections
    });


    djWindow.loadURL('file://' + __dirname + '/app.html?os=' + (isWin ? 'w' : 'm'));
    djWindow.webContents.executeJavaScript('window.userDataDir="' + app.getPath('userData').replace(new RegExp('\\\\', 'gi'), '/') + '";loadLists();layoutLists();');
    //djWindow.loadURL('https://listricity-zoharisrael.c9users.io/app.html?os=' + (isWin ? 'w' : 'm'))
    //djWindow.webContents.openDevTools();
    setTimeout(function(){
    console.log('loaded');
    djWindow.focus();
    },1000);

}
