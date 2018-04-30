'use strict';
 
// create windows installer:
// >electron-packager . listricity --platform=win32 --arch=x64 --version=0.35.6 --icon=icon.ico
// change icon:
// rcedit listricity-win32-x64/listricity.exe --set-icon "icon.ico"
var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var deployversion = "001";
var isWin = /^win/.test(process.platform);

//var app = remote.app;
var electron = require('electron');
//var appDir = jetpack.cwd(app.getAppPath());

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)
//console.log('The author of this app is:', appDir.read('package.json', 'json').author);

//const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
const ipcMain = electron.ipcMain;
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var playedcount = 0;
var cv = false;
var mainmovedtime = new Date();
var savedtop = false;
var forcefFullSceen = false;
var hooked = true;
var titleh = 22;
var titlel = 0;
if(isWin){
  console.log('windows');
    titleh=32;
    titlel=9;
}

function openViewer() {
    if (typeof mainWindow == 'undefined') {
        console.log('open viewer');
        mainWindow = new BrowserWindow({
            width: 291,
            height: 0,
            frame: false,
            title: "Listricityn",
            icon: '',
            acceptFirstMouse: true,
            hasShadow: false,
            skipTaskbar:true
        });
        mainWindow.setAlwaysOnTop(true);
        mainWindow.setSkipTaskbar(true);
        chase();
        mainWindow.loadURL('https://www.youtube.com');
        mainWindow.hide();
        webContents = mainWindow.webContents;

        mainWindow.on('page-title-updated', function(e, cmd) {
            console.log(cmd);
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
                mainWindow.setPosition(mainWindow.getPosition()[0] + ix, mainWindow.getPosition()[1] + iy);
            }
            else if (cmd.indexOf('top') == 0) {
                savedtop = !mainWindow.isAlwaysOnTop();
                mainWindow.setAlwaysOnTop(!mainWindow.isAlwaysOnTop());
            }
            else if (cmd.indexOf('full') == 0) {
                //savedtop=!mainWindow.isAlwaysOnTop();
                mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
            else if (cmd.indexOf('dock') == 0) {
                if (new Date() - mainmovedtime < 1000) return;
                if (!hooked) {
                    console.log('dock hooking');
                    hooked = true;
                    webContents.executeJavaScript("document.getElementById('btndock').innerHTML='Un-Dock';");
                    djWindow.webContents.executeJavaScript("$('#logo').show();$('#qcontainer').animate({'top': 166,zIndex:12},'fast')");
                    mainWindow.setSize(291, 188 - titleh);
                    chase();
                }
                else {
                    console.log('dock un-hooking');
                    hooked = false;
                    mainWindow.setSize(355, 288 - titleh);
                    mainWindow.setPosition(0, 0);
                    webContents.executeJavaScript("document.getElementById('btndock').innerHTML='Dock';");
                    djWindow.webContents.executeJavaScript("$('#logo').hide();$('#qcontainer').animate({'top': 0,zIndex:999},'fast')");
                }
                mainmovedtime = new Date();
            }
            else if (cmd.indexOf('shrink') == 0) {
                mainWindow.setFullScreen(false);
            }
            else if (cmd.indexOf('done') == 0) {
                var djwebContents = djWindow.webContents;
                djwebContents.executeJavaScript('playNext()');
            }
            else if (!mainWindow.isFullScreen() && hooked && cmd.indexOf('dock') == -1) {
                if (cmd.toLowerCase().indexOf('youtube') > -1) {
                    //mainWindow.setSize(293,0);
                    mainWindow.hide();
                    //				mainWindow.setSize(293,188);
                    //				webContents.executeJavaScript(html_string);
                }
                else {
                    if (!mainWindow.isVisible()) mainWindow.show();
                    if (hooked) {
                        console.log('dock resizing '+cmd);

                        setTimeout(function() {
                            mainWindow.setSize(291, 188 - titleh)
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
                console.log('v focus');
                if (!mainWindow.isVisible())mainWindow.show();
                if (playedcount == 0) {
                    playNext();
                }
                if (!mainWindow.isFullScreen()) {
                    mainWindow.setAlwaysOnTop(true);
                    djWindow.focus();
                }
            }
            catch (e) {}
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
            return;

            if (new Date() - mainmovedtime > 1500) {
                //  			mainmovedtime=new Date();
                djWindow.webContents.executeJavaScript("$('#logo').hide();$('#qcontainer').animate({'margin-top': 0,zIndex:999},'fast')");
                hooked = false;
            }
            return;
        });
      //  mainWindow.webContents.openDevTools();
        //webContents.executeJavaScript('document.getElementsByTagName("html")[0].innerHTML="<body style=\'margin:0;padding:0;background-image:url(data:image/png;base64,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);background-position: -3px 0px;    background-repeat: no-repeat;    background-color: #333333;cursor:pointer;\' ></body>"');
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

function playVideo(key) {
    openViewer();
    //	mainWindow.loadURL('https://www.youtube.com/watch?v='+key);
    //	return;
    var html_string = 'document.getElementsByTagName("html")[0].innerHTML=""; '
    html_string += '		document.getElementsByTagName("html")[0].innerHTML =  (\'';
    html_string += '		     <iframe onload="iframeloaded()" id="mplayer" autoplay="1" onended="" width="292" height="100%" style="position: fixed;'
    html_string += '		    top: 0px;'
    html_string += '		    left: 0px;'
    html_string += '		    width: 100%;'
    html_string += '		    height: 100%;'
    html_string += '		    " src="/embed/' + key + '?autoplay=1&disablekb=1&fs=0&iv_load_policy=0&modestbranding=1&rel=0&showinfo" frameborder="0" allowfullscreen>'
    html_string += '		    </iframe><style>input[type="range"]:after {bottom: 1%;position: absolute;width: 35px;margin-left: -25px;text-align: center;padding: 0px;font-size: 8px;content: attr(title);}input:focus,select:focus,textarea:focus,button:focus {outline: none;}select#cmbpresets {position: absolute;top: 9px;    font-size: 11px;nwidth: 87.2%;background-image: linear-gradient(to bottom, rgb(234, 234, 234), #8E8E8E);text-shadow: 1px 1px 0 rgba(255,255,255,0.26);color: #222;}#eqbutton:hover > #equalizer{display:flex!important;};body{background-color:#272727;} button.ytp-fullscreen-button.ytp-button {display: none;}#blocker:hover{opacity:1!important}*{-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;  }</style><div style="opacity:0;not-webkit-app-region: drag;position:absolute;left:0;top:0;width:100%;bottom:53px;cursor:pointer;background-color:rgba(1,1,1,0.05);outline: none;    box-sizing:border-box;" id="blocker" ';
    html_string += '		    onclick="document.getElementById(\\\'mplayer\\\').contentWindow.document.querySelector(\\\'.ytp-play-button\\\').click()" ondblclick="document.title=\\\'full\\\';document.title=\\\'\\\'">';
    //html_string+='		    <button id="eqbutton" style="border-radius: 50px;float: left;  line-height:26px;margin-left: 6px;font-size: 11px;     margin-top: 8px;     background-image: linear-gradient(to bottom, rgb(234, 234, 234), #8E8E8E);     text-shadow: 1px 1px 0 rgba(255,255,255,0.26);     color: #222;">EQ';
    //html_string+='		    <div id="equalizer" style="     display: none;justify-content: space-between;height: 20%;position: fixed;width: 85.5%;top: 30px;padding: 5%;background-color: rgba(51, 51, 51, 0.69);border-radius: 10px;box-shadow: inset 0 0 100px -10px, 0 0 10px 1px #383838;border: 1px solid #848484;left: 2%;padding-top:33px;min-width: 150px;min-height: 83px;-webkit-app-region: no-drag;    max-width: 400px;padding-bottom: 3.5%;"></div></button>';

    html_string += '<div style="-webkit-app-region: drag;cursor:move;height:5px;width:100%;position:absolute;z-index:-1;"></div><button onclick="document.title=\\\'dock\\\';document.title=\\\'\\\'"  id="btndock" style="border-radius: 0 50px 50px 0;float: right;  line-height:26px;margin-right: 6px;font-size: 11px;     margin-top: 8px;     background-image: linear-gradient(to bottom, rgb(234, 234, 234), #8E8E8E);     text-shadow: 1px 1px 0 rgba(255,255,255,0.26);     color: #222;">' + (hooked ? 'Un-Dock' : 'Dock') + '</button>';
    html_string += '		    <button id="btntop" onclick="if(this.ison){this.ison=false}else{this.ison=true;}document.getElementById(\\\'chkontop\\\').checked = this.ison;document.title=\\\'top\\\';document.title=\\\'\\\'" style="float: right;    border-radius: 0  0;line-height:26px;margin-right: 0px;font-size: 11px;     margin-top: 8px;     background-image: linear-gradient(to bottom, rgb(234, 234, 234), #8E8E8E);     text-shadow: 1px 1px 0 rgba(255,255,255,0.26);     color: #222;outline: none;"><input id="chkontop" type="checkbox">Stay on top</button>'
    html_string += '		    <button id="btnfull" onclick="document.title=\\\'full\\\';document.title=\\\'\\\'" style="    border-radius: 50px 0 0 50px;float: right; line-height:26px;margin-right: 0px;font-size: 11px;     margin-top: 8px;     background-image: linear-gradient(to bottom, rgb(234, 234, 234), #8E8E8E);     text-shadow: 1px 1px 0 rgba(255,255,255,0.26);     color: #222;outline: none;">Full screen</button></div>'
    html_string += '		\'); var v;function iframeloaded(){ ';
    html_string += '		try{'
    html_string += '			v=document.getElementById("mplayer").contentWindow.document.getElementsByTagName("video")[0];EQ(v);'
    html_string += '			v.onended = function(e) {  document.title="done" };var d=document.getElementById("mplayer").contentWindow.document.querySelector(".ytp-scrubber-button");d.setAttribute("style","-webkit-app-region: no-drag");'
    html_string += '		}catch(e){console.log("retry:"+e);setTimeout(iframeloaded,1000);}'
    html_string += '		}';
    html_string += '		var nonstarter=0;function checkstate(){';
    html_string += '			if(v){if(v.ended || (v.currentTime==0 && nonstarter++>3)){'
    html_string += '				nonstarter=0;document.title="done - timing"; }}};'

    var f = function() {
        try {
            return;
            console.log('EQQ');
            window.presets = {
                "None": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "Classical": [0, 0, 0, 0, 0, 0, -7.2, -7.2, -7.2, -9.6],
                "Club": [0, 0, 8, 5.6, 5.6, 5.6, 3.2, 0, 0, 0],
                "Dance": [9.6, 7.2, 2.4, -1.1, -1.1, -5.6, -7.2, -7.2, -1.1, -1.1],
                "Full Bass": [-8, 9.6, 9.6, 5.6, 1.6, -4, -8, -10.4, -11.2, -11.2],
                "Full Bass and Treble": [7.2, 5.6, -1.1, -7.2, -4.8, 1.6, 8, 11.2, 12, 12],
                "Full Treble": [-9.6, -9.6, -9.6, -4, 2.4, 11.2, 11.5, 11.8, 11.8, 12],
                "Laptop Speakers and Headphones": [4.8, 11.2, 5.6, -3.2, -2.4, 1.6, 4.8, 9.6, 11.9, 11.9],
                "Large Hall": [10.4, 10.4, 5.6, 5.6, -1.1, -4.8, -4.8, -4.8, -1.1, -1.1],
                "Live": [-4.8, -1.1, 4, 5.6, 5.6, 5.6, 4, 2.4, 2.4, 2.4],
                "Party": [7.2, 7.2, -1.1, -1.1, -1.1, -1.1, -1.1, -1.1, 7.2, 7.2],
                "Pop": [-1.6, 4.8, 7.2, 8, 5.6, -1.1, -2.4, -2.4, -1.6, -1.6],
                "Reggae": [-1.1, -1.1, -1.1, -5.6, -1.1, 6.4, 6.4, -1.1, -1.1, -1.1],
                "Rock": [8, 4.8, -5.6, -8, -3.2, 4, 8.8, 11.2, 11.2, 11.2],
                "Ska": [-2.4, -4.8, -4, -1.1, 4, 5.6, 8.8, 9.6, 11.2, 9.6],
                "Soft": [4.8, 1.6, -1.1, -2.4, -1.1, 4, 8, 9.6, 11.2, 12, ],
                "Soft Rock": [4, 4, 2.4, -1.1, -4, -5.6, -3.2, -1.1, 2.4, 8.8, ],
                "Techno": [8, 5.6, -1.1, -5.6, -4.8, -1.1, 8, 9.6, 9.6, 8.8],
                "Custom": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            };
            //return;


            var EQ = [{
                    f: 32,
                    type: 'lowshelf'
                }, {
                    f: 64,
                    type: 'peaking'
                }, {
                    f: 125,
                    type: 'peaking'
                }, {
                    f: 250,
                    type: 'peaking'
                }, {
                    f: 500,
                    type: 'peaking'
                }, {
                    f: 1000,
                    type: 'peaking'
                }, {
                    f: 2000,
                    type: 'peaking'
                }, {
                    f: 4000,
                    type: 'highshelf'
                } //,
                // {
                //     f: 8000,
                //     type: 'peaking'
                // }, {
                //     f: 16000,
                //     type: 'highshelf'
                // }
            ];

            window.initEQ;
            //debugger;
            var skipeq = true; //window.initEQ=='None';
            window.curpreset = window.presets['None'];
            if (window.initEQ.indexOf(',') > -1) {
                var ai = initEQ.split(',');
                for (var aii = 0; aii < ai.length; aii++) {
                    window.presets['Custom'][aii] = parseFloat(ai[aii]);
                }
                window.curpreset = window.presets['Custom'];
            }
            else if (window.initEQ != '') {
                window.curpreset = window.presets[window.initEQ];
            }
            else window.initEQ = '0,0';
            var container = document.querySelector('#equalizer');
            var selectList = document.createElement("select");
            selectList.id = "cmbpresets";
            container.appendChild(selectList);

            //Create and append the options
            for (var i = 0; i < Object.keys(window.presets).length; i++) {
                var option = document.createElement("option");
                option.value = Object.keys(window.presets).length - 1 == i ? 0 : window.presets[Object.keys(window.presets)[i]];
                option.text = Object.keys(window.presets)[i];
                if (window.initEQ == option.text || (window.initEQ.indexOf(',') > 0 && option.text == 'Custom'))
                    option.selected = true
                selectList.appendChild(option);
            }
            var onPSChange = function(e) {

                if (new Date() - window.eqtime < 300) return;
                if (0 && skipeq) {
                    skipeq = false;
                    connectFilters();
                    // var lind=0;
                    // filters.forEach(function (lfilter) {
                    //   lfilter.gain.value = parseFloat(window.curpreset[lind])*3;
                    //   lind++;
                    // });
                }

                var ps = e.target.value.split(',');
                if (e.target.value == '0') ps = window.presets['Custom'];
                //debugger;
                for (var i = 0; i < EQ.length; i++) {
                    var elm = document.getElementById('eqs' + i);
                    elm.value = parseFloat(ps[i] + '') * 3;
                    var evt = document.createEvent("HTMLEvents");
                    window.presettime = new Date();
                    evt.initEvent('change', true, true); // event type,bubbling,cancelable
                    elm.dispatchEvent(evt);
                }
            };
            selectList.addEventListener('change', onPSChange);


            // Create filters
            var filters = [];

            function connectFilters() {
                console.log('connectFilters');
                if (!window.context) window.context = new AudioContext();
                var mediaElement = v;
                var sourceNode = window.context.createMediaElementSource(mediaElement);
                var sum = window.context.createGain();
                filters = EQ.map(function(band) {
                    var filter = window.context.createBiquadFilter();
                    filter.type = band.type;
                    filter.gain.value = -50.0; //0;
                    filter.Q.value = 1;
                    filter.frequency.value = band.f;
                    sourceNode.connect(filter);
                    var lGain = window.context.createGain();
                    filter.connect(lGain);

                    lGain.connect(sum);

                    return filter;
                });
                sum.connect(window.context.destination);

                // Bind filters to vertical range sliders

                var ind = 0;
                window.eqtimer = false;
                window.presettime = new Date();
                window.eqtime = new Date();

                debugger;
                filters.forEach(function(filter) {
                    //return;
                    var input = document.createElement('input');
                    input.type = 'range';
                    input.freq = filter.frequency.value;
                    input.min = -40;
                    input.max = 40;
                    input.value = parseFloat(window.curpreset[ind]) * 3; //Math.sin(ind/Math.PI*2)*30;
                    if (!skipeq) filter.gain.value = ~~(input.value - 50);
                    input.title = filter.frequency.value;
                    input.id = 'eqs' + ind;
                    ind++;
                    input.style.display = 'inline-block';
                    input.setAttribute('orient', 'vertical');
                    input.style.webkitAppearance = 'slider-vertical';
                    input.style.width = '15px';
                    input.style.height = '98%';

                    container.appendChild(input);

                    var onChange = function(e) {
                        if (skipeq) return;
                        filter.gain.value = ~~(e.target.value - 50);
                        var eqi = parseInt(this.id.replace('eqs', ''));
                        //input.title= Math.round(this.value/3,2);
                        if (new Date() - window.presettime > 500) {
                            //debugger;
                            window.presets['Custom'][eqi] = parseFloat(e.target.value) / 3;
                            for (var ie = 0; ie < EQ.length; ie++) {
                                window.presets['Custom'][ie] = Math.round(parseFloat(document.getElementById('eqs' + ie).value) / 3, 2);
                            }
                            selectList.value = 0;
                        }
                        if (eqtimer) {
                            clearTimeout(eqtimer);
                            eqtimer = false;
                        }
                        eqtimer = setTimeout(reportEQ, 1000);
                    };

                    input.addEventListener('input', onChange);
                    input.addEventListener('change', onChange);
                });
            }


            if (!skipeq) {
                connectFilters();
            }

            function reportEQ() {
                if (selectList.value == '0') {
                    // custom
                    document.title = 'eqcustom:' + window.presets['Custom'];
                }
                else {
                    document.title = 'eq:' + selectList.options[selectList.selectedIndex].text;
                }
                document.title == '';
            }

        }
        catch (e) {
            console.log(e);
        }
    }
    html_string += (f + '').replace('function ()', 'function EQ()').replace('window.initEQ', 'window.initEQ="' + eqsetting + '"');
    if (savedtop) {
        html_string += '		document.getElementById("chkontop").checked=true;';
        html_string += '		document.getElementById("btntop").ison=true;';
    }
    console.log('mainWindow.isVisible()'+mainWindow.isVisible());
    //if (!mainWindow.isVisible())
    if(djWindow.isFocused())
      mainWindow.show();

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
    mainWindow.setPosition(parseInt(p[0]) + 1 +titlel, parseInt(p[1]) + titleh);
    mainWindow.setAlwaysOnTop(true);
    if (!mainWindow.isVisible()) mainWindow.showInactive();
    djWindow.show();
    djWindow.focus();
}
//setInterval(chase,50);
let mainWindow;
let djWindow;
let webContents;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform != 'darwin') {
        app.quit();
    }
});
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
    // Create the browser window.
    //  console.log(screen.width);
    djWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        title: "Listricity",
        icon: 'icon.ico',
        acceptFirstMouse: true,
        //frame: false
    });
    djWindow.setPosition(20, 10)
djWindow.setMenu(null);
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
    djWindow.on('focus', function(e, cmd) {
        if (!mainWindow.isFullScreen()) {
            mainWindow.setAlwaysOnTop(true);
            djWindow.focus();
        }
        console.log('focus sug');
        chase();
    });
    djWindow.on('blur', function(e, cmd) {
        console.log('blur');
        mainWindow.setAlwaysOnTop(savedtop);
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

    var files = {
        "https://listricity-zoharisrael.c9users.io/app.js": "app.js",
        "https://listricity-zoharisrael.c9users.io/app.html": "app.html",
        "https://listricity-zoharisrael.c9users.io/index.css": "index.css"

    };

    var MultiLoader = function(files, finalcb) {

        var load_next_file = function(files) {

            if (Object.keys(files) == 0) {
                //process.exit(1);
                finalcb(null);
                return;
            }

            var nexturl = Object.keys(files)[0];
            var nextfnname = files[nexturl];

            console.log('will load ' + nexturl);
            req.get({
                url: nexturl
            }, function(err, resp, body) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('loaded ' + nexturl);
                    if (0 && nextfnname == "app.js") {

                        var nv = new RegExp('var deployversion="(\\d+)";', 'gi').exec(body);
                        console.log('rx ' + nv.length);
                        if (nv.lenfth == 0 || nv[1] <= deployversion) {
                            console.log('No Update');
                            finalcb(null);
                            return;
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

    };

    MultiLoader(files, function() {
        djWindow.loadURL('file://' + __dirname + '/app.html?os=' + (isWin ? 'w' : 'm'));
        //djWindow.loadURL('https://listricity-zoharisrael.c9users.io/app.html?os=' + (isWin ? 'w' : 'm'))
        djWindow.webContents.executeJavaScript('window.userDataDir="'+app.getPath('userData').replace(new RegExp('\\\\','gi'),'/')+'";loadLists();layoutLists();');
        //djWindow.webContents.openDevTools();
    });

    //djWindow.loadURL('file://' + __dirname + '/app.html?os=' + (isWin ? 'w' : 'm'));
    //djWindow.webContents.executeJavaScript('window.userDataDir="'+app.getPath('userData').replace(new RegExp('\\\\','gi'),'/')+'";loadLists();layoutLists();');
    //djWindow.loadURL('https://listricity-zoharisrael.c9users.io/app.html?os=' + (isWin ? 'w' : 'm'))
    //djWindow.webContents.openDevTools();


});


let nextVid;
var eqsetting = '';

ipcMain.on('online-status-changed', function(event, status) {
    console.log(status);
    if (status.indexOf('play:') == 0) {
        playVideo(status.replace('play:', ''));
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
