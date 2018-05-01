<%@ Page Language="C#" %>

<!DOCTYPE html>

<script runat="server">

</script>

<html style="padding: 0; margin: 0; background-color: #333">

<head>
    <meta charset="UTF-8">
    <title>Listricity - Online Music Player</title>
    <meta name="Description" content="Free online music player and playlist manager. Create awesome playlists by selecting from YouTube’s mixes and Up-Next suggestions, with a supercool radio mode which buffs up lists with similar tracks.">
    <meta property="og:url" content="http://www.listricity.com">
    <meta property="og:title" content="Listricity - Online Music Player">
    <meta property="og:description" content="Free online music player and playlist manager. Create awesome playlists by selecting from YouTube’s mixes and Up-Next suggestions, with a supercool radio mode which buffs up lists with similar tracks.">
    <meta property="og:image" content="listricity.png">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="listricity">

    <meta name="description" content="listricity is a free online playlist maker and music player. Create music playlists by grading tracks suggestions." />
    <meta name="keywords" content="Online Music Player, free music , music player , free online music , listen free music , music players , digital music player , free music player , get free music , free music players , free music songs , play free music , free music site, on demand music" />
    <meta name="DC.Title" content="istricity - Online Music Player" />
    <meta name="DC.Subject" content="Online" />
    <meta name="DC.Subject" content="Music" />
    <meta name="DC.Subject" content="Player" />
    <meta name="DC.Subject" content="Video" />
    <meta name="DC.Description.abstract" content="Listricity - online music player. Make your online music playlists." />
    <meta name="DC.Type" scheme="DCMIType" content="Sound" />


    <script>
        if (window.screen.availHeight + window.screen.availWidth < 1560) {
            document.location.href = 'mobile.html';
        }

    </script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <script src="/util.js"></script>

    <link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/ui-darkness/jquery-ui.css" rel="stylesheet">
    <script>
        jQuery.MidasInsight = { HandleMissingImage: function () { } }
        function detectIE() {
            var ua = window.navigator.userAgent;

            // Test values; Uncomment to check result …

            // IE 10
            // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

            // IE 11
            // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

            // IE 12 / Spartan
            // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

            // Edge (IE 12+)
            // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

            var msie = ua.indexOf('MSIE ');
            if (msie > 0) {
                // IE 10 or older => return version number
                return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
            }

            var trident = ua.indexOf('Trident/');
            if (trident > 0) {
                // IE 11 => return version number
                var rv = ua.indexOf('rv:');
                return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
            }

            var edge = ua.indexOf('Edge/');
            if (edge > 0) {
                // Edge (IE 12+) => return version number
                return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
            }

            // other browser
            return false;
        }



        function opener(args, options, callback) {
            window.open(args, '_blank');
        }
    </script>

    <script src="extras.js">
    </script>

    <link href="index.css" rel="stylesheet">
    <style>
        #queue .vidui.playing:after {
            display: block;
            z-index: 999;
            position: absolute;
            width: 45px;
            height: auto;
            background-color: rgba(100,100,100,1);
            left: 0px;
            top: 3px;
            bottom: 3px;
            content: "";
            background-image: url(/icons/playicon.png);
            background-size: 35px;
            background-repeat: no-repeat;
            background-position: 3px -4px;
            border-radius: 0 19px 19px 0;
            box-shadow: inset -3px -5px 10px -5px, 3px 5px 10px -5px white;
            BORDER: 1PX SOLID rgba(210,210,210,.52);
            animation: sheen .5s;
            animation-delay: .2s;
            nfilter: invert(1);
            cursor: pointer;
        }


        #queue .vidui:not(.playing):hover:before {
            display: block;
            z-index: 999;
            position: absolute;
            width: 45px;
            height: auto;
            background-color: rgba(200,200,200,.95);
            left: -60px;
            top: 3px;
            bottom: 3px;
            content: "";
            background-image: url(/icons/playicon.png);
            background-size: 35px;
            background-repeat: no-repeat;
            background-position: 3px -4px;
            border-radius: 0 19px 19px 0;
            box-shadow: inset -3px -5px 10px -5px, 3px 5px 10px -5px;
            BORDER: 1PX SOLID rgba(110,110,110,.52);
            animation: sheen .5s forwards;
            animation-delay: .2s;
            cursor: pointer;
        }

        @keyframes sheen {
            100% {
                left: 0px;
                display:none;
            }
        }

        #queue .vidui.new {
            display: inline-block;
            background: #2D2D2D;
            box-shadow: inset 0px 0px 0px 1px rgba(90, 90, 90, 0.72), inset 0px 0px 7px 6px rgba(0, 0, 0, 0.13), 0 0 6px 1px rgb(64, 64, 64);
            box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.51), inset 0px 0px 7px 6px rgba(0, 0, 0, 0.13), 0 0 6px 1px rgba(0, 0, 0, 0.06);
            border-radius: 5px !important;
            color: rgba(218, 218, 218, 0.51);
            border-right-width: 0px !important;
            border-right-style: groove !important;
            border-right-color: transparent;
            border-bottom-width: 0px !important;
            border-bottom-style: groove !important;
            border-bottom-color: transparent;
            background-image: linear-gradient(to left bottom, #403F3F, #2a2a2a) !important;
            background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #403F3F), color-stop(100%, #2a2a2a)) !important;
            color: #000 !important;
            text-shadow: none !important;
            transition: all 1s;
        }

        div#downloadbar {
            cursor: default;
            background-image: url(http://listricity.com/download.png?a=1);
            padding-left: 31px;
            height: 21px;
            background-size: 20px;
            position: fixed;
            left: 30px;
            width: 69px;
            z-index: 999;
            background-repeat: no-repeat;
            background-position: 8px 1px;
            padding-top: 2px;
            text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.37);
            text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.52), 0 0 0 rgba(51, 51, 51, 0.41), -1px -1px 1px rgba(0, 0, 0, 0.42);
            font-size: 11px;
            font-weight: 100;
            color: #ccc;
            line-height: 2;
            border-left: 1px solid #252525;
            border-radius: 20px 5px 20px 5px;
            box-shadow: 2px -1px 4px -2px #aaa,inset 2px 1px 5px -3px #aaa;
            border-right: 1px solid #333;
        }

            div#downloadbar:hover div#downloaddialog {
                opacity: 1;
                max-height: 200px;
                height: 200px;
                visibility: visible;
                transition-delay:.3s;
            }

        div#downloaddialog {
            cursor: default;
            visibility: hidden;
            height: 30px;
            z-index: 999;
            background-image: linear-gradient(to bottom, rgb(117, 117, 117), #585858, rgb(56, 56, 56));
            border-radius: 3px 3px 8px 8px;
            border-top: 0px solid #777;
            border-left: 1px solid #777;
            border-bottom: 1px solid #171717;
            font-weight: 100;
            color: #ccc;
            box-shadow: inset 0 -4px 21px -12px #000,5px 5px 10px -3px #000;
            border-bottom: 1px solid #000;
            margin-left: -30px;
            padding: 20px;
            width: 369px;
            max-height: 3px;
            transition: .2s all;
            opacity: 0;
        }

        #stage span.addbottom.tool {
            background-image: url(/icons/addicon.png);
            height: 17px;
            background-repeat: no-repeat;
            line-height: 23px;
            -webkit-filter: brightness(0.7);
            cursor: pointer;
            background-size: 16px;
            padding-right: 10px;
            border-radius: 5px 5px 0 0;
            background-color: rgba(255,255,255,.15);
            box-shadow: 0 0 1px 0px;
            color: #4a4a4a;
            font-size: 12px;
            width: 11px;
            background-position: 3px 0;
        }

        #stage span.addtop.tool {
            background-image: url(/icons/playicon.png);
            height: 17px;
            background-repeat: no-repeat;
            line-height: 23px;
            -webkit-filter: brightness(0.7);
            cursor: pointer;
            background-size: 16px;
            padding-right: 10px;
            border-radius: 5px 5px 0 0;
            background-color: rgba(255,255,255,.15);
            box-shadow: 0 0 1px 0px;
            color: #4a4a4a;
            font-size: 12px;
            width: 11px;
            background-position: 3px 0;
        }

        #stage span.addwiz.tool {
            background-image: url(/icons/flowericon3.png);
            height: 17px;
            background-repeat: no-repeat;
            line-height: 23px;
            -webkit-filter: brightness(0.7);
            cursor: pointer;
            background-size: 16px;
            padding-right: 10px;
            border-radius: 5px 5px 0 0;
            background-color: rgba(255,255,255,.15);
            box-shadow: 0 0 1px 0px;
            color: #4a4a4a;
            font-size: 12px;
            width: 11px;
            background-position: 3px 1px;
            margin-right: 10px;
        }

        #stage span.del.tool {
            display: none;
        }

        #stage span.tool:hover {
            background-color: #999;
        }


        .genere .diskicon {
            margin-left: auto;
            top: 0;
            color: #cacaca;
            opacity: 0;
            background-color: #5c5c5c;
            nbackground-color: #888888;
        }

        .genere:hover .diskicon {
            opacity: 1;
        }

        .genere .addicon.diskicon {
            right: 93px;
        }

        .genere .playicon.diskicon {
            right: 24px;
        }

        .genere .seedicon.diskicon {
            right: 169px;
            display: none;
        }



        .suglist div.vidui:hover > #smiley {
            opacity: 0;
        }


        .sortcontainer.suglist > .vidui:first-child {
            margin-left: 31px !important;
            nborder: 10px solid red !important;
        }

        #stage_sug > a.mnulink {
            display: none;
        }

        body {
            nwidth: 800px;
            margin: 0 auto;
            background: #898989;
            nfont-family: 'Open Sans', helvetica, sans-serif;
        }

        .boxmood {
            text-shadow: 0 1px 1px #aaa;
            float: right;
            vertical-align: bottom;
            display: inline-block;
            position: relative;
            right: 0;
            font-size: 40px;
            width: auto !important;
            float: none !important;
            clear: both;
            text-align: right;
        }

        #stage_moods > .boxmood {
            margin-right: 30px;
            margin-bottom: 15px;
            min-width: 210px;
            padding-top: 20px;
        }


        .boxmood:before {
            background-image: url(note1.png);
            background-repeat: no-repeat;
            background-size: contain;
            content: "";
            position: absolute;
            background-position: 90% 0px;
            left: -78px;
            top: 0px;
            width: 100%;
            height: 100%;
            max-width: 150px;
            z-index: -1;
            transition: left .3s,opacity 2s;
        }

        .boxmood > .boxmood:before {
            background-position: 45% 0px;
            left: -38px;
            background-image: url(note2.png);
        }

        .boxmood > .boxmood > .boxmood:before {
            background-image: url(note3.png);
        }

        .boxmood > .boxmood > .boxmood > .boxmood:before {
            background-image: url(note1.png);
        }

        .boxmood {
            opacity: .99999;
            font-size: 40px;
            padding: 10px;
            line-height: 75px;
            padding-left: 80px;
            position: relative;
            margin: 5px auto;
            border: 0px;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            -o-border-radius: 5px;
            border-radius: 5px;
            max-height: 78px;
            overflow: hidden;
            background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #565656), color-stop(100%, #2a2a2a));
            background: -moz-linear-gradient(center top, #565656 0%, #2a2a2a 100%);
            -moz-border-radius: 5px;
            border-color: #000000;
            border-width: 1px;
            border-style: solid;
            font-family: Arial;
            cursor: pointer;
            text-shadow: -1px -1px 2px rgba(0, 0, 0, 0.14), 0 0 0 rgba(51, 51, 51, 0.41), -1px -1px 2px rgba(0, 0, 0, 0.26);
            color: rgb(101, 101, 101);
            padding-bottom: 0;
        }

            .boxmood:hover {
                max-height: 1000px;
                nborder: 1px solid gold !important;
                nbackground-color: gold !important;
                box-shadow: 0 0 10px 5px #777 !important;
                color: #eee;
                text-shadow: 1px 1px 2px #000;
            }

        .mainMoodBox > .boxmood:hover {
            box-shadow: 0 0 10px 5px #0e0e0e !important;
        }

        .mainMoodBox {
            max-height: 100px;
            display: block;
            nwidth: 100px;
            nposition: relative;
            nmargin-bottom: 100px;
            z-index: -1;
            ntransition: z-index 10s;
        }

            .mainMoodBox:hover {
                z-index: 9;
                ndisplay: inline-block;
                transition: z-index 100s;
            }

        .boxmood:hover {
            z-index: 10;
            transition: max-height 3s,z-index 0s;
            transition-delay: .2s;
        }

        .boxmood .boxmood:hover {
            transition-delay: .5s;
        }

        .boxmood {
            transition: max-height 1s,z-index 3s;
        }

            .boxmood:hover:before {
                nopacity: 0.15;
                left: -50px;
            }

            .boxmood > .boxmood:hover:before {
                nopacity: .96;
            }

            .boxmood > .boxmood {
                overflow: hidden;
                position: relative;
                width: 400px;
                margin: 5px auto;
                background-color: #fff367;
                background-color: rgba(255,243,103,1);
                padding-left: 70px;
                -webkit-border-radius: 14px;
                -moz-border-radius: 14px;
                -o-border-radius: 14px;
                border-radius: 14px;
                -webkit-box-shadow: #666 0px 2px 3px;
                -moz-box-shadow: #666 0px 2px 3px;
                box-shadow: #666 0px 2px 3px;
            }

                .boxmood > .boxmood > .boxmood {
                    position: relative;
                    width: 300px;
                    margin: 5px auto;
                    background-color: #5af15a;
                    background-color: rgba(90,241,90,1);
                    -webkit-border-radius: 14px;
                    -moz-border-radius: 14px;
                    -o-border-radius: 14px;
                    border-radius: 14px;
                    -webkit-box-shadow: #666 0px 2px 3px;
                    -moz-box-shadow: #666 0px 2px 3px;
                    box-shadow: #666 0px 2px 3px;
                }

                    .boxmood > .boxmood > .boxmood > .boxmood {
                        position: relative;
                        width: 200px;
                        nheight: 200px;
                        margin: 5px auto;
                        background-color: #6593d4;
                        background-color: rgba(101,147,212,1);
                        -webkit-border-radius: 14px;
                        -moz-border-radius: 14px;
                        -o-border-radius: 14px;
                        border-radius: 14px;
                        -webkit-box-shadow: #666 0px 2px 3px;
                        -moz-box-shadow: #666 0px 2px 3px;
                        box-shadow: #666 0px 2px 3px;
                    }

        #logo_inner {
            width: 100% !important;
            height: 100% !important;
        }

        #coverad {
            position: fixed;
            bottom: 48px;
            right: 0px;
            background-color: black;
            height: 96px;
            z-index: 999999;
            left: 294px;
            box-sizing: border-box;
            npointer-events: none;
            color: #777;
            padding-right: 19px;
            font-size: 7vh;
            text-align: right;
            line-height: 96px;
            border-top: 1px solid #333;
            overflow: hidden;
            display: none;
            transition: height .2s, left .2s, bottom .2s;
            cursor: pointer;
        }

            #coverad img {
                height: 100%;
                border: 4px solid black;
                box-sizing: border-box;
                float: left;
                border-radius: 4px;
            }

        .coveradmin img {
            height: 43px !important;
            border: 0px solid black !important;
            margin-top: -13px;
        }

        .coveradmin {
            font-size: 9px !important;
            height: 23px !important;
            border-radius: 1px;
            left: auto !important;
            line-height: 11px !important;
            width: 161px;
            border-top: none !important;
            text-align: left !important;
            padding-right: 0 !important;
            padding-top: 2px;
            padding-bottom: 0;
            margin-bottom: -22px !important;
            bottom: 100vh !important;
            right: 0 !important;
            box-shadow: -1px -1px 1px 0px black;
            padding-bottom: 0;
        }

        .closebg {
            background-image: none !important;
            z-index: 99999;
        }

        #q {
            transition: all .3s;
        }

            #q:focus {
                font-size: 20px !important;
            }

        .clabel {
            display: none;
        }

        @media only screen and (min-width: 1150px) {
            .clabel {
                display: inline-block;
            }
        }

        .logofullview {
            /*left: 350px!important;*/
            right: 0px !important;
            width: auto !important;
            bottom: 0px !important;
            height: auto !important;
            z-index: 9999 !important;
            top: 23px !important;
            box-shadow: none !important;
        }

        .faqgroup {
            padding: 10px;
            background: rgb(139, 138, 134);
            border-radius: 10px;
        }

        span.faqq {
            font-size: 30px;
            font-style: italic;
            font-weight: bolder;
            margin-left: -34px;
            background-color: rgb(139, 138, 134);
            border-radius: 5px 0 0 5px;
            padding: 2px 14px 10px 10px;
            margin-top: -10px;
            display: inline-block;
            font-family: serif;
            line-height: 1;
        }

        button.playbutton:after {
            margin-right: 6px;
            border-top: 17px solid transparent;
            border-bottom: 17px solid transparent;
            border-left: 6px solid #C1C1C1;
            content: "";
            position: absolute;
            margin-left: 9px;
            margin-top: -4px;
        }

        .suglist > .vidui:hover {
            transition: box-shadow 0.3s ease-in-out;
            nbox-shadow: 0 0 30px #000;
            box-shadow: 0 0 30px -10px #000000;
        }

        #logo {
            background-size: contain;
            background-position: center;
            box-shadow: inset -3px 0px 0px -1px, 2px 0px 1px -1px;
            background-color: black;
        }

        #queue .vidui.new div.title,
        .suglist .vidui div.title {
            color: rgba(218, 218, 218, 0.51);
            text-shadow: 1px 1px 1px rgb(16, 16, 16);
            text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.24), 0 0 0 rgba(51, 51, 51, 0.41), -1px -1px 1px rgba(0, 0, 0, 0.41);
            padding-left: 1;
            max-height: 70px;
        }

        .searchheader {
            margin-top: 2px;
        }

        #queue {
            nleft: -12px;
        }

            #queue .vidui .tools {
                transition: none;
                nwidth: 273px;
            }

        .playing {
            transition: none !important;
            transform: none;
            margin-top: 17px !important;
            margin-bottom: 0px !important;
        }

        .titlebar {
            -webkit-user-select: none;
            -webkit-app-region: drag;
            text-align: left;
            padding-left: 27px;
            line-height: 2;
            text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.37);
            text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.52), 0 0 0 rgba(51, 51, 51, 0.41), -1px -1px 1px rgba(0, 0, 0, 0.42);
            font-size: 11px;
            height: 23px;
            top: 0px;
            position: fixed;
            right: 0px;
            left: 0px;
            z-index: 999;
            background-image: linear-gradient(to bottom, rgb(117, 117, 117), #585858, rgb(56, 56, 56));
            border-radius: 0px 0 0 0;
            border-top: 0px solid #777;
            border-left: 1px solid #777;
            border-bottom: 1px solid #171717;
            cursor: pointer;
            pointer-events: none;
            font-weight: 100;
            color: #ccc;
            box-shadow: inset 0 -4px 21px -12px #000;
            border-bottom: 1px solid #000;
            text-align: center;
        }

        playing:before {
            animation: none;
        }

        #why {
            transition: all .5s;
            font-size: 13px;
            z-index: 99999;
        }

        .closedot:hover #why {
            margin-left: -128px !important;
        }

        .closedot:hover {
            nmargin-right: -4px;
        }
        /*.closedot {*/
        /*    text-decoration: none;*/
        /*    float: right;*/
        /*    width: 171px;*/
        /*    height: 17px;*/
        /*    margin: -4px;*/
        /*    nmargin-right: -50px;*/
        /*    background: #3392de;*/
        /*    background: -webkit-linear-gradient(#51a9ee, #147bcd);*/
        /*    background: linear-gradient(#51a9ee, #147bcd);*/
        /*    border-color: #1482d0;*/
        /*    color: white;*/
        /*    color: #fff;*/
        /*    font-size: 13px;*/
        /*    line-height: 1.54615;*/
        /*    font-weight: 500;*/
        /*    letter-spacing: normal;*/
        /*    padding: 2px 1px 3px;*/
        /*    border: 1px solid #07c;*/
        /*    border-radius: 4px;*/
        /*    color: #fff;*/
        /*    cursor: pointer;*/
        /*    display: inline-block;*/
        /*    text-align: center;*/
        /*    text-shadow: 0 1px 1px rgba(28, 115, 184, 0.64);*/
        /*    white-space: nowrap;*/
        /*}*/

        .titlebar_dock:before {
            background-image: url(dock.png) !important;
        }

        .titlebar:before {
            content: "";
            background-position: right;
            background-image: url(undock.png);
            height: 26px;
            display: inline-block;
            width: 19px;
            background-size: 19px;
            background-position: 0px 5px;
            background-repeat: no-repeat;
            position: absolute;
            left: 3px;
            top: -3px;
            transform: rotate(-5deg);
            transition: transform .5s;
            pointer-events: auto;
        }

        .titlebar:hover:before {
            transform: rotate(12deg) translateY(1px) translateX(1px);
        }

        .closedot {
            text-decoration: none;
            float: right;
            width: 154px;
            height: 17px;
            margin: -4px;
            nmargin-right: -50px;
            background: #FF7612;
            background: -webkit-linear-gradient(#FF7F0D, #FF5821);
            background: linear-gradient(#696969, #1C191D);
            border-color: #FFC107;
            font-size: 13px;
            line-height: 1.54615;
            font-weight: 100;
            letter-spacing: normal;
            padding: 2px 0px 1px;
            border: none;
            border-radius: 4px;
            color: #fff;
            cursor: pointer;
            display: inline-block;
            text-align: center;
            text-shadow: 0 1px 1px rgba(60, 17, 4, 0.73);
            white-space: nowrap;
            font-size: 11px;
        }

        .sugmore {
            text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.52), 0 0 0 rgba(51, 51, 51, 0.41), -1px -1px 1px rgba(0, 0, 0, 0.42);
        }

            .sugmore:hover {
                text-shadow: none;
            }

        .searchheader {
            text-shadow: -1px -1px 2px rgba(0, 0, 0, 0.14), 0 0 0 rgba(51, 51, 51, 0.41), -1px -1px 2px rgba(0, 0, 0, 0.26);
        }

        div#logo_sizer.init {
            zoom: 1.333; /* IE */
            -moz-transform: scale(1.333); /* Firefox */
            -moz-transform-origin: 0 0;
            -o-transform: scale(1.333); /* Opera */
            -o-transform-origin: 0 0;
            -webkit-transform: scale(1.333); /* Safari And Chrome */
            -webkit-transform-origin: 0 0;
            transform: scale(1.333); /* Standard Property */
            transform-origin: 0 0; /* Standard Property */
            width: 75%;
            height: 75%;
        }

            div#logo_sizer.init:hover {
                zoom: 1; /* IE */
                -moz-transform: scale(1); /* Firefox */
                -moz-transform-origin: 0 0;
                -o-transform: scale(1); /* Opera */
                -o-transform-origin: 0 0;
                -webkit-transform: scale(1); /* Safari And Chrome */
                -webkit-transform-origin: 0 0;
                transform: scale(1); /* Standard Property */
                transform-origin: 0 0; /* Standard Property */
                width: 100%;
                height: 100%;
            }





        .moodtitle:after {
            content: "";
            display: inline-block;
            margin-top: -4px;
            margin-bottom: -12px;
            margin-left: 4px;
            background-size: 20px;
            height: 32px;
            background-position: center 5px;
            background-repeat: no-repeat;
            -webkit-filter: brightness(2) grayscale(1) drop-shadow(-1px -1px 1px black);
        }

        .moodtitlep_waking_up:after {
            width: 32px;
            background-image: url(/icons/Icons140_140_0045_sun.png);
        }

        .moodtitlep_feeling_good:after {
            width: 32px;
            background-image: url(/icons/Icons140_140_0044_sun.png);
        }

        .moodtitlep_party:after {
            width: 32px;
            background-image: url(/icons/Icons140_140_0013_Ellipse_1.png);
        }

        .moodtitlep_energetic:after {
            width: 32px;
            background-image: url(/icons/Icons140_140_0021_Rectangle_4.png?);
        }

        .moodtitlep_sad:after {
            width: 32px;
            background-image: url(/icons/Icons140_140_0032_Shape_52.png);
        }

        .moodtitlep_sensual:after {
            width: 32px;
            background-image: url(/icons/Icons140_140_0035_Ellipse_2.png);
        }

        .moodtitlep_driving:after {
            width: 32px;
            background-image: url(/icons/Icons140_140_0000_Ellipse_7.png);
        }

        .moodtitlep_eating_with_friends:after {
            width: 32px;
            background-image: url(/icons/Icons140_140_0040_Shape_12.png);
        }

        .moodtitlep_studying:after {
            width: 32px;
            background-image: url(/icons/Icons140_140_0037_Shape_14.png);
        }



        .boxmood[mood="Feeling_good"]:before {
            background-image: url(/icons/Icons140_140_0044_sun.png);
            background-position: 80px 0px;
            background-size: contain;
            min-width: 300px !important;
            max-height: 200px !important;
        }

        .boxmood[mood="Feeling_good"]:hover:before {
            opacity: 1;
            left: -100px;
        }

        .boxmood[mood="Party"]:before {
            background-image: url(/icons/Icons140_140_0013_Ellipse_1.png);
            background-position: 80px 0px;
            background-size: contain;
            min-width: 200px !important;
            max-height: 130px !important;
        }

        .boxmood[mood="Party"]:hover:before {
            opacity: 1;
            left: -100px;
        }

        .boxmood[mood="Waking_Up"]:before {
            background-image: url(/icons/Icons140_140_0045_sun.png);
            background-position: 80px 0px;
            background-size: contain;
            min-width: 200px !important;
            transition: height .3s;
        }

        .boxmood[mood="Waking_Up"]:hover:before {
            opacity: 1;
            left: -79px;
            height: 116px;
        }

        .boxmood[mood="Energetic"]:before {
            background-image: url(/icons/Icons140_140_0021_Rectangle_4.png?);
            background-position: 80px 0px;
            background-size: contain;
            min-width: 300px !important;
            max-height: 230px !important;
        }

        .boxmood[mood="Energetic"]:hover:before {
            opacity: 1;
            left: -100px;
        }

        .boxmood[mood="Sad"]:before {
            background-image: url(/icons/Icons140_140_0032_Shape_52.png);
            background-position: 80px 0px;
            background-size: contain;
            min-width: 300px !important;
            nmax-height: 90px !important;
            nmax-width: 90px !important;
        }

        .boxmood[mood="Sad"]:hover:before {
            opacity: 1;
            left: -100px;
        }

        .boxmood[mood="Sensual"]:before {
            background-image: url(/icons/Icons140_140_0035_Ellipse_2.png);
            background-position: 80px 0px;
            background-size: contain;
            min-width: 200px !important;
            max-height: 130px !important;
        }

        .boxmood[mood="Sensual"]:hover:before {
            opacity: 1;
            left: -100px;
        }

        .boxmood[mood="Driving"]:before {
            background-image: url(/icons/Icons140_140_0000_Ellipse_7.png);
            background-position: 80px 0px;
            background-size: contain;
            min-width: 230px !important;
            max-height: 130px !important;
        }

        .boxmood[mood="Driving"]:hover:before {
            opacity: 1;
            left: -100px;
        }

        .mainMoodBox > .boxmood[mood="Eating_with_friends"]:before {
            background-image: url(/icons/Icons140_140_0040_Shape_12.png);
            background-position: 80px 0px;
            background-size: contain;
            min-width: 230px !important;
            max-height: 130px !important;
        }

        .mainMoodBox > .boxmood[mood="Eating_with_friends"]:hover:before {
            opacity: 1;
            left: -100px;
        }

        .boxmood[mood="Studying"]:before {
            background-image: url(/icons/Icons140_140_0037_Shape_14.png);
            background-position: 80px 0px;
            background-size: contain;
            min-width: 230px !important;
            max-height: 130px !important;
        }

        .boxmood[mood="Studying"]:hover:before {
            opacity: 1;
            left: -100px;
        }

        .mainMoodBox > .boxmood:before {
            -webkit-filter: brightness(.5) grayscale(.1) invert(1);
            -webkit-filter: drop-shadow(0px 0px 2px #000) brightness(4.5) grayscale(.1) invert(1);
            max-height: 130px !important;
            margin-left: 10px;
        }

        .mainMoodBox > .boxmood:hover:before {
            -webkit-filter: none;
            -webkit-filter: drop-shadow(0px 0px 2px #000) brightness(2.5) grayscale(.1) invert(1);
        }

        .mainMoodBox > .boxmood {
            color: #aaa;
            min-width: 350px;
            padding-right: 30px;
            padding-bottom: 10px;
            box-sizing: border-box;
            min-height: 92px;
        }

            .mainMoodBox > .boxmood:hover {
                color: #fff;
            }

        a.mnulink {
            height: 110px;
            display: inline-block;
            z-index: 9;
        }




        .suglist .vidui.vis{
    qqtransition:transform .3s;
    qqanimation-name: dropHeader;
    qqanimation-iteration-count: 1;
    qqanimation-timing-function: ease-out;
    qqanimation-duration: 0.6s;
    qqtransform:rotateY(5deg) scale(.95);
    visibility:visible;

}
@keyframes dropHeader {
    0% {
    transform:rotateY(90deg) scale(.9);
    }
    100% {
    transform:rotateY(5deg) scale(.95);
    animation-timing-function: initial;
    animation-duration:initial;
    }
}

.suglist .vidui{
    display: inline-block;
    qqvisibility:hidden;

    padding: 0px;
    background: transparent;
    nbox-shadow: inset 0px 0px 0px 1px rgba(90, 90, 90, 0.72), inset 0px 0px 7px 6px rgba(0, 0, 0, 0.13), 0 0 6px 1px rgb(64, 64, 64);
    nbox-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.51), inset 0px 0px 7px 6px rgba(0, 0, 0, 0.13), 0 0 6px 1px rgba(0, 0, 0, 0.06);
    box-shadow: none;
    border-radius: 5px!important;
    color: rgba(218, 218, 218, 0.51);
    margin: 5px;
    margin-left: 5px;
    border-right-width: 0px!important;
    border-right-style: groove!important;
    border-right-color: transparent;
    border-bottom-width: 0px!important;
    border-bottom-style: groove!important;
    border-bottom-color: transparent;
    padding-right: 10px;
    background-image:none!important;
    transform:scale(.95);
    qqtransform:rotateY(90deg) scale(.9);
    qqtransition:transform 1s;
    qqtransition:transform .3s;
    nanimation-name: dropHeader;
    nanimation-iteration-count: 1;
    nanimation-timing-function: ease-out;
    nanimation-duration: 0.6s;
    ntransform:rotateY(5deg) scale(.9);
    box-shadow: inset 0 0 1px rgba(255,255,255,.21),inset 0 0 0 100px rgba(255,255,255,.02);
    
}
.suglist .vidui:hover {
    transition:transform .4s;
    qqtransform:rotateY(0deg) scale(1.01);
    display: inline-block;
    padding: 0px;
    background: #2D2D2D;
    box-shadow: inset 0px 0px 0px 1px rgba(90, 90, 90, 0.72), inset 0px 0px 7px 6px rgba(0, 0, 0, 0.13), 0 0 6px 1px rgb(64, 64, 64);
    box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.51), inset 0px 0px 7px 6px rgba(0, 0, 0, 0.13), 0 0 6px 1px rgba(0, 0, 0, 0.06);
    border-radius: 5px!important;
    color: rgba(218, 218, 218, 0.51);
    margin: 5px;
    margin-left: 5px;
    border-right-width: 0px!important;
    border-right-style: groove!important;
    border-right-color: transparent;
    border-bottom-width: 0px!important;
    border-bottom-style: groove!important;
    border-bottom-color: transparent;
    background-image: linear-gradient(to left bottom, #403F3F, #2a2a2a) !important;
    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #403F3F), color-stop(100%, #2a2a2a))!important;
    padding-right: 10px;
}
.sugdisk {
            background-image: linear-gradient(to bottom left, rgba(136, 135, 135, 0.2), rgba(74, 74, 74, 0.04));
    background-color: transparent;
    border: none;
    width:770px;
}
.sugdisk .vidui {
    background-color: rgba(30, 27, 30, 0.2);
}
.sugdisk .diskicon {
    color: #abaaaa;
}
.diskmore {
    background-color: transparent;
    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(29, 28, 28, 0.31)), color-stop(100%, rgba(37, 34, 37, 0.47)))!important;
    box-shadow: inset 0 0 1px #484848;
    height: 86px;
    margin-top: 7px;
    max-width: 100px!important;
    min-width: 130px!important;
    line-height: 84px;
    padding-left: 5px;
        float: right;
    margin-right: 12px;
}
        .diskmore:hover {
        
            background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(64, 63, 63, 0.45)), color-stop(100%, rgba(42, 42, 42, 0.4)))!important;
            text-decoration:underline;
        }
    </style>


    <script>
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

        ga('create', 'UA-74159004-1', 'auto');
        ga('send', 'pageview');
        window.gainited = true;
    </script>


</head>

<body style="padding: 0; margin: 0; background-color: #333">
    <div style="display: none">
        <h1>online music player</h1>
        <br />
        <h2>youtube playlist creator</h2>
        <br />
        <h3>listen to music online</h3>
        <br />

    </div>
    <div id="galaxy" style="position: fixed; left: 350px; top: 122px; bottom: 50px; right: 0; background-color: #1C1C1D;">

        <div id="maincontent">


            <canvas style="display: none" id="canvas" width="350" height="150"></canvas>
            <canvas style="display: none" id="canvas3" width="570" height="570"></canvas>
            <canvas id="canvas2" width="570" height="570" style="position: fixed; opacity: .3; z-index: -1; left: 350px; right: 0; bottom: 0px; -webkit-filter: grayscale(.5); top: 122px; width: 100vw; height: 100vh;"></canvas>















        </div>
    </div>

    <div class="titlebar" onclick="if($('#logo').is('.logofullview')){fromFullView();} else {toFullView();}">
    </div>
    <div id="downloadbar" style="z-index: 99999; top: 0px; transition: box-shadow 5s;">
        Download
        <div id="downloaddialog" class="metal" style="line-height: 1.5; font-size: 14px; text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.37); text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.52), 0 0 0 rgba(51, 51, 51, 0.41), -1px -1px 1px rgba(0, 0, 0, 0.42); f;">
            <h3 style="margin-top: 4px;">
                <img src="/mp3.png" style="float: right; width: 77px; margin-left: 0px; -webkit-filter: drop-shadow(-1px -1px 1px #fff) invert(1); margin-top: -8px; margin-right: -4px; opacity: .6; box-shadow: inset 5px -1px 7px -5px #000, -4px 0px 7px -4px #000; border-radius: 41px 15px 48px 76px; border-left: 1px solid rgb(111, 13, 195); padding-bottom: 10px; /* box-sizing: border-box; */
    padding-left: 21px;">Download this playlist as audio</h3>
            To use when Internet is unavailable,
            <br />
            and on your mobile device
            <br>
            <br>
            <span id="downloadinit">This may take a while to complete, so please enter your email and we'll ping you once it's ready.
            <br>
                <br>
                Email:
                <input id="downloademail" style="width: 214px; border-radius: 2px;">
                <button onclick="downloadList()" style="float: right; /* margin-right: 15px; */
    margin-top: -6px; border-radius: 20px;">
                    Start Download</button><br>
            </span>
            <span id="downloadinfo"></span>

        </div>

    </div>
    

    </div>
    <script>
        var iprogress = 0;
        var hto = false;
        var lastscrolltop = 0;
        var scrolltopscount = 0;
        var scolltops = [];
        var lastpeeked = new Date();
        var scrolltimer = false;
        var delspan = '<span class="del" onclick="deleteVid(@id,false);$(this).parent().remove()" style="    background-position: center;background-size: 10px;background-repeat:no-repeat;width: 16px;margin-right:5px;cursor:pointer;height: 16px;display: inline-block;margin-bottom: -4px;    margin-left: -25px;"></span>';

        var researchQueue = [];
        var researchInProgress = false;
        var curlistind = 0;
        var playlists = [];
        var allvids = typeof allvids != 'undefined' ? allvids : [];
        var nh = '';
        var basevidtitle = '';
        var lastUpNext = '';
        var probing = false;
        var cursubvid;
        var cook = '';
        var ref = '//www.youtube.com'
        var isDragging = false;
        var addMode = 'distribute';
        var lasttitle = ''
        var transitiond = 0;
        var searchsongs = [];
        var searchsongsexpected = 0;
        var searchsongsbase = '';
        var hdrs = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36',
            'accept-language': 'en-US,en;q=0.8,he;q=0.6',
            'pragma': 'no-cache',
            'upgrade-insecure-requests': '1',
            'cache-control': 'no-cache',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
        }
        var buffuptime = new Date();
        var buffupcurdepth = 0;
        var vididcounter = 0;
        var peektimer = false;
        var lastatt = new Date();
        var inspoint;
        var basekey = 'OfEBA0kyH-U';
        var colorind = 0;
        //var colors = ['linear-gradient(to bottom left, rgba(234, 234, 255,1), rgba(170,170,255,1)', 'linear-gradient(to bottom left, rgba(255, 234, 234,1), rgba(255,170,170,1)', 'linear-gradient(to bottom left, rgba(234, 255, 234,1), rgba(170,255,170,1)', 'linear-gradient(to bottom left, rgba(234, 255, 255,1), rgba(170,255,255,1)', 'linear-gradient(to bottom left, rgba(255, 255, 234,1), rgba(255,255,170,1)', 'linear-gradient(to bottom left, rgba(255, 234, 255,1), rgba(255,170,255,1)']
        var colors = ['linear-gradient(to bottom left, rgba(134, 134, 155,1), rgba(70,70,155,1)', 'linear-gradient(to bottom left, rgba(155, 134, 134,1), rgba(155,70,70,1)', 'linear-gradient(to bottom left, rgba(134, 155, 134,1), rgba(70,155,70,1)', 'linear-gradient(to bottom left, rgba(134, 155, 155,1), rgba(70,155,155,1)', 'linear-gradient(to bottom left, rgba(155, 155, 134,1), rgba(155,155,70,1)', 'linear-gradient(to bottom left, rgba(155, 134, 155,1), rgba(155,70,155,1)']
        var played = [];
        var curbasevid = {
            id: getVidId('root'),
            link: 'v=' + '',
            title: 'initial',
            type: 'root',
            root: 1,
            sug: []
        };
        var radiobuffind = 0;
        var repeats = [];
        var trackIndicators = ['remix', 'parody', 'vine', 'karaoke', 'lyrics', 'cover', 'live', 'lesson', 'hq', 'accustic', 'original'];
        var probedLists = [];
        var deletedtitles = [];
        var wizmodebuff = false;
        var lastsearchtime = new Date();
        var infid = 0;
        var downloadinterval = false;
        var dialogmode = '';
        var pretitle = '';
        var lastplayedid = '';
        var idleprogress = 0;
        var forcedendtimer = false;
        var genreRepeats = [];
        var perspective = 'init';
        var moodProbeQueue = [];
        var curmood = '';
        var unstartetimer = false;
        var unstartedconcecutives = 0;
        var lastplayednexttime = new Date();
        var logowidth = 338;
        var logoheight = 238;






        function progress(p) {
            if (p >= 100) {
                setTimeout('progress(0)', 1000)
                if ($('#stage .vidui').length > 0) {
                    window.addSearch = false;
                }
            }
            if ($('#stage .vidui').length > 0) {
                if (window.addSearch) {
                    var viduis = $('#stage .vidui');
                    viduis.each(function (ind) {
                        if (Math.random() < .95) return;
                        if (genreRepeats.indexOf($(this).attr('id')) > -1) return;
                        //if(vidExists(v, 'dup'))
                        genreRepeats.push($(this).attr('id'));
                        this.hoverscore = 2;
                        clicked($(this).attr('id'), 'sug', this, 'add', true, true);
                    })
                    if (p >= 100)
                        window.addSearch = false;
                }
            }

            if (p == 0) $('.progress-bar').hide();
            else if (iprogress == 0) $('.progress-bar').show();
            iprogress = p;
            $('.progress-bar').width(p + '%');
            if (p > 25 && p < 40)
                $('.progress-bar').css('background-color', '#86e01e');
            else if (p < 55)
                $('.progress-bar').css('background-color', '#f2d31b');
            else if (p < 65)
                $('.progress-bar').css('background-color', '#f2b01e');
            else if (p < 85)
                $('.progress-bar').css('background-color', '#f27011');
            else if (p > 84)
                $('.progress-bar').css('background-color', '#f63a0f');

        }



        function setHeaders() {
            var lastscrollleft = 0;
            lastscrollleft = window.lsl;
            var nh = $(window).innerHeight() - 100; // $('#scrollspace').scrollTop() + $(window).innerHeight()+200;
            var ww = $('#stage').width();
            var ldo = false;
            if ($('#stage .vidui').length > 300) {
                while ($('#stage .vidui').length > 200) {
                    $('#stage_sug *').first().remove();
                }
            }
            var c = $('#stage .vidui').filter(function () {
                return $(this).offset().top > nh
            }).length;
            if (perspective == 'results') {
                var ddesk = '';
                if (c > 0)
                    ddesk = ('Suggestions ' + (c > 0 ? '(' + c + ')' : ''));
                else if ($('#stage .vidui').length > 0)
                    ddesk = ('Click an item to get related suggestions');
                else if ($('.genere').length > 0)
                    ddesk = ('Start a seach or click a music genere to get related suggestions');
                else
                    ddesk = ('Start a seach or click a the home button to get started');

                if (typeof $('.sugmore').attr('basenote') == 'undefined' || $('.sugmore').attr('basenote') == '')
                    $('.sugmore').html(ddesk);
                else
                    $('.sugmore').attr('basenote', ddesk);

            }
            if ($('#help').is(':visible')) {
                var wh = $(window).height() - 250;
                var oy = $('#helptools').offset().top; //-$('#scrollspace').scrollTop();
                if (oy > wh / 2 && oy < wh && !$('#helptoolsarrow')[0].vis) {
                    $('#helptoolsarrow')[0].vis = true;
                    $('#helptoolsarrow').css('bottom', '40px');
                }
                else if ((oy < wh / 3 || oy > wh) && $('#helptoolsarrow')[0].vis) {
                    $('#helptoolsarrow')[0].vis = false;
                    $('#helptoolsarrow').css('bottom', '-500px'); //.fadeOut();
                }
                oy = $('#savetools').offset().top + 200;
                if (oy > wh / 2 && oy < wh && !$('#helpsavearrow')[0].vis) {
                    $('#helpsavearrow')[0].vis = true;
                    $('#helpsavearrow').css('top', '50px');
                }
                else if ((oy < wh / 3 || oy > wh) && $('#helpsavearrow')[0].vis) {
                    $('#helpsavearrow')[0].vis = false;
                    $('#helpsavearrow').css('top', '-500px'); //.fadeOut();
                }
                oy = $('#helpviewport').offset().top + 200;
                if (oy > wh / 2.8 && oy < wh && !$('#helpsavearrow')[0].vis) {
                    $('#helpviewportarrow')[0].vis = true;
                    $('#helpviewportarrow').css('top', '200px');
                }
                else if ((oy < wh / 2.8 || oy > wh) && $('#helpviewportarrow')[0].vis) {
                    $('#helpviewportarrow')[0].vis = false;
                    $('#helpviewportarrow').css('top', '-500px'); //.fadeOut();
                }


            }
            lastscrolltop = nh;
        }

        window.onbeforeunload = function () {
            try { }
            catch (e) { }
        };


        var fs = {
            readFileSync: function () {
                return localStorage.getItem('playlists')
            },
            writeFile: function (f, s, cb) {
                localStorage.setItem('playlists', s);
                cb()
            }
        }; 


        function loadLists() {
            try {
                var liststext = fs.readFileSync(window.userDataDir + '/lists.txt', 'utf8')
                playlists = JSON.parse(liststext);
                curlistind = playlists.curlistind;
                showMoods();

            }
            catch (e) {
                console.log(e.message);
                window.newlistener = true;
                playlists = {
                    lists: [{
                        title: 'I love MUSIC!!',
                        vids: [{
                            link: '/watch?v=OPf0YbXqDm0',
                            title: 'Mark Ronson - Uptown Funk ft. Bruno Mars',
                            dur: '4:30',
                            img: 'https://i.ytimg.com/vi/OPf0YbXqDm0/mqdefault.jpg'
                        }]
                    }],
                    curlistind: 0
                }
                window.newlistener = true;
            }
            if (typeof playlists.settings == 'undefined') {
                playlists.settings = {
                    optimalLength: {
                        from: 60 * 2,
                        to: 60 * 11
                    },
                    excludes: ['greatest', 'album', 'full', 'cover', 'hits', 'collection', 'intereview', 'tutorial', 'lesson', 'live', 'reaction'],
                    starred: {
                        star1: [],
                        star2: [],
                        star3: [],
                        star4: [],
                        star5: []
                    }
                }
            }
            if (typeof playlists.settings.starred == 'undefined') {
                playlists.settings.starred = {
                    star1: [],
                    star2: [],
                    star3: [],
                    star4: [],
                    star5: []
                }
            }
            if (typeof playlists.settings.guid == 'undefined') {
                playlists.settings.guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0,
                        v = c == 'x' ? r : r & 0x3 | 0x8;
                    return v.toString(16);
                });
                record('New Install', '');
                saveList(true, true);
            }
            else {
                record('App Started', '');
            }
            $("#amount").val(getFromToTimeText(playlists.settings.optimalLength.from, playlists.settings.optimalLength.to));
            $("#slider-range-optimal-length").slider('values', 0, playlists.settings.optimalLength.from);
            $("#slider-range-optimal-length").slider('values', 1, playlists.settings.optimalLength.to);
            $.each(playlists.settings.excludes, function (value) {
                $('#selexclude')
                    .append($("<option></option>")
                        .attr("value", playlists.settings.excludes[value])
                        .text(playlists.settings.excludes[value]));
            });
            if (playlists.settings.starred.star1.length + playlists.settings.starred.star2.length + playlists.settings.starred.star3.length + playlists.settings.starred.star4.length + playlists.settings.starred.star5.length == 0) {
                window.newlistener = true;
            }
        }

        function record(act, data) {
            if (typeof window.gainited == 'undefined' || !window.gainited) {
                setTimeout('record("' + act + '","' + data + '")', 1000);
                return;
            }
            data = data || '';
            if (typeof window.recordimg == 'undefined') {
                window.recordimg = document.createElement('img');
                window.recordimg.style.display = 'none';
                document.body.appendChild(window.recordimg);
            }
            window.recordimg.src = 'http://listricity.com/record.ashx?guid=' + playlists.settings.guid + '&act=Online ' + act + '&data=' + data + '&r=' + Math.random();

            ga('send', {
                hitType: 'event',
                eventCategory: 'Online Player',
                eventAction: act,
                eventLabel: data
            });


            //alert(window.recordimg.src);
        }

        function starred(v, g) {
            try {
                for (var i = 5; i > 0; i--) {
                    for (var i1 = 0; i1 < playlists.settings.starred['star' + i].length; i1++) {
                        var v1 = playlists.settings.starred['star' + i][i1];
                        if (v1.link == v.link) {
                            playlists.settings.starred['star' + i].splice(i1, 1);
                            i1--;
                        }
                    }
                }
                playlists.settings.starred['star' + g].unshift(v);
                saveList(true, true);
            }
            catch (e) {
                debugger;
            }
        }


        


        function autocomplete(s, response) {


            $.getJSON({
                //url: "https://clients1.google.com/complete/search?client=youtube&hl=en&gl=il&gs_rn=23&gs_ri=youtube&ds=yt&cp=5&gs_id=i&q=" + encodeURI(s) + "&callback=google.sbox.p50&gs_gbg=1Qz332c1O53rEdE7l74N",
                url: "http://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&q=" + encodeURI(s) + "&key=<key>&format=5&alt=json&callback=?",
                headers: hdrs
            }, function (resp, body) {
                var r = [];
                for (var i = 0; i < resp[1].length; i++) {
                    r.push(resp[1][i][0]);
                }
                response(r);
            });
        }
        function analyzeSearch(s) {
            $.ajax({
                cache: false,
                dataType: 'json',
                type: 'GET',
                timeout: 5000, //&order=viewCount&videoEmbeddable=true&videoSyndicated=true
                url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=' + escape(s) + '&topicId=%2Fmusic&type=video&videoCategoryId=10&key=AIzaSyDfPNBlO_ji5rnM76q2WQCIOq4AOgBX5kE'
            }).done(
            function (res, state) {
            // debugger;
            if (state != 'success') {
                researchInProgress = false;
                console.log('ERR: ' + state);
                debugger;
                return;
            }
            var ids = '';
            for (var i = 0; i < res.items.length; i++) ids += res.items[i].id.videoId + ',';
            ids = ids.substring(0, ids.length - 1);
            $.ajax({
                cache: false,
                dataType: 'json',
                type: 'GET',
                timeout: 5000, //&order=viewCount
                url: 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+contentDetails%2C+status%2C+topicDetails&id=' + ids + '&maxResults=50&key=AIzaSyDfPNBlO_ji5rnM76q2WQCIOq4AOgBX5kE'
            }).done(
                function (res, state) {
                    for (var i = 0; i < res.items.length; i++) {
                        console.log(res.items[i].snippet.title)
                        console.log(res.items[i].topicDetails.topicIds)
                        console.log(res.items[i].topicDetails.relevantTopicIds)
                    }
                });
        });
        }

        function YTDurationToSeconds(duration) {

            var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)

            var hours = (parseInt(match[1]) || 0);
            var minutes = (parseInt(match[2]) || 0);
            var seconds = (parseInt(match[3]) || 0);

            return (hours > 0 ? hours + ':' : '') + (minutes < 10 && hours > 0 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
            //return (hours>0 ? hours +':' : '') + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds<10 ? '0':'')+seconds;

            var r = duration.replace('PT', '').replace('H', ':').replace('M', ':').replace('S', '')
            if (r.substring(r.length - 1) == ':') r += '00';
            if (r.substring(r.length - 2) == ':') r += '0';
            return r;

            var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)

            var hours = (parseInt(match[1]) || 0);
            var minutes = (parseInt(match[2]) || 0);
            var seconds = (parseInt(match[3]) || 0);

            return hours * 3600 + minutes * 60 + seconds;
        }

        function getVidId(l) {
            return new Date().valueOf() + ++vididcounter;
        }

        function vidExists(v, t) {
            if (deletedtitles.indexOf(v.title) > -1) {
                //console.log('VX not buffing deleted:' + v.title);
                //debugger;
                return true;
            }
            if (!t) t = 'up';
            if (v.link.split('=')[1] == basekey) return true;
            if (t == 'up' || t=='dup') {
                if ($('#queue .title').filter(function () {
                    var s1 = $(this).html();
                    return areDups(s1, v.title);
                }).length > 0) return true;
            }
            if (t == 'dup') return false;
            for (var i = (t = 'recent' ? allvids.length - 10 : 0) ; i < allvids.length; i++) {
                if (i < 0) continue;
                if (allvids[i].link == v.link) {
                    if (t == 'up' && v.type == 'up' && allvids[i].type == 'sug') {
                        $('#' + allvids[i].id).remove();
                        allvids.splice(i, 1);
                    }
                    else return true;
                }
            }
            return false;
        }

        function durationSeconds(hms) {
            if (typeof hms == 'undefined') return 213;
            if (typeof hms.split == 'undefined' || hms.indexOf(':') == -1) return hms;
            var a = hms.split(':'); // split it at the colons
            var seconds;
            if (a.length == 3)
                seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
            else
                seconds = (+a[0]) * 60 + (+a[1]);
            return seconds;
        }

        function sortSuggestions() {
            for (var i = 0; i < allvids.length; i++) {
                transitiond = i / allvids.length * 10;
                if (allvids[i].ui) continue;
                if (allvids[i].sug && allvids[i].sug.length > 0) {
                    var good = [],
                        bad = [];
                    for (var i1 = 0; i1 < allvids[i].sug.length; i1++) {
                        var v = allvids[i].sug[i1];
                        if (isGoodVideo(v)) good.push(v);
                        else bad.push(v);
                    }
                    if (bad.length > 0 && good.length > 0) good.push({
                        type: 'devider',
                        title: 'devider',
                        img: ''
                    });
                    allvids[i].sug = good.concat(bad);
                }
            }
        }

        function isGoodVideo(v) {
            var dur = durationSeconds(v.dur);
            var lv = v;
            if (playlists.settings.starred.star1.filter(function (a) {
                    return a.link == lv.link
            }).length > 0) return false;
            if (playlists.settings.starred.star2.filter(function (a) {
                    return a.link == lv.link
            }).length > 0) return false;
            if (playlists.settings.starred.star3.filter(function (a) {
                    return a.link == lv.link
            }).length > 0) return true;
            if (playlists.settings.starred.star4.filter(function (a) {
                    return a.link == lv.link
            }).length > 0) return true;
            if (playlists.settings.starred.star5.filter(function (a) {
                    return a.link == lv.link
            }).length > 0) return true;

            if (deletedtitles.indexOf(v.title) > -1) {
                //console.log('not buffing deleted:' + v.title);
                //debugger;
                return false;
            }

            var bm = false, br;
            if ($('#queue .title').filter(function () {
                if (bm) return;
                var s1 = $(this).html();
                br = areDups(s1, lv.title);
                if (br) bm = true;
                return br;
            }).length > 0) return false;

            return (isGoodTitle(v.title) &&
                (
            ((v.isgood) ||
            ((typeof dur == 'undefined' || !dur || isNaN(dur)) || (dur >= playlists.settings.optimalLength.from && dur <= playlists.settings.optimalLength.to)))));
        }

        function isGoodTitle(q) {
            if (typeof q == 'undefined') return;
            q = q.toLowerCase().trim();
            if (!(
                //!(new RegExp('\\blive\\b','gi').test(q)) &&
                    q.indexOf('channel') == -1 && q.indexOf('playlist') == -1 && q.indexOf('[private video]') == -1 && q.indexOf('[deleted video]') == -1 && q.match(/\blive\b/i) == null && q.match(/\blesson\b/i) == null
                )) return false;
            for (var i = 0; i < playlists.settings.excludes.length; i++) {
                if (q.indexOf(playlists.settings.excludes[i]) > -1) return false;
            }
            return true;
        }

        function dataCookieToString(dataCookie) {
            var t = "";
            for (var x = 0; x < dataCookie.length; x++) {
                t += ((t != "") ? "; " : "") + dataCookie[x].key + "=" + dataCookie[x].value;
            }
            return t;
        }

        function mkdataCookie(cookie) {
            var t, j;
            cookie = cookie.toString().replace(/,([^ ])/g, ",[12],$1").split(",[12],");
            for (var x = 0; x < cookie.length; x++) {
                cookie[x] = cookie[x].split("; ");
                j = cookie[x][0].split("=");
                t = {
                    key: j[0],
                    value: j[1]
                };
                for (var i = 1; i < cookie[x].length; i++) {
                    j = cookie[x][i].split("=");
                    t[j[0]] = j[1];
                }
                cookie[x] = t;
            }

            return cookie;
        }



        function getVidSug() {
            for (var i = 0; i < allvids.length; i++) {
                var v = allvids[i];
                if (allvids[i].type == 'sug' && !allvids[i].wassug && isGoodVideo(v) && $('#queue .vidui[data-link="' + allvids[i].link + '"]').length == 0) {
                    allvids.splice(i, 1)
                    allvids.push(v);
                    v.wassug = true;
                    return v;
                }
            }
        }

        function ui() {
            if (isDragging) {
                setTimeout(ui, 1000);
                return;
            }
            window.nonIdleLast = new Date();

            if ($('#stage iframe').length > 0) $('#stage').html('');
            inspoint = $('.insetpoint');
            if (inspoint.length == 0) {
                $('<div class="insetpoint"><div class="or-spacer"><div class="mask"></div><span><i>Insert point</i></span></div></div>').prependTo('#queue');
                inspoint = $('.insetpoint');
            }
            //$('.genere, .tabs').remove();

            var h = '';
            var hq = '';
            var newqids = [];
            transitiond = 0;
            addedvis = false;
            addedinvis = 0;
            for (var i = 0; i < allvids.length; i++) {
                transitiond = i / allvids.length * 10;
                if (allvids[i].ui) continue;
                allvids[i].ui = true;



                if (allvids[i].root <= 2 && allvids[i].title != 'initial') {
                    //if (allvids[i].root==2)h+='<div class="searchheader slidein" style="margin-left: -4px;">Related to: '+allvids[i].title+'</div>';
                    //else if(i<+allvids.length-1)
                    //h+='<div class="searchheader slidein">Related to: '+allvids[i].title+'<div onclick="deleteAllVid('+allvids[i].id+');" class="delsearch del"></div></div><div class="spacer"></div>';
                }
                if (allvids[i].sug && allvids[i].sug.length > 0) {
                    if (allvids[i].desc.indexOf('Genere:') == 0) {
                        lasttitle = allvids[i].desc;
                        h += '<div class="searchheader slidein searchtitle" style="display: inline-block;" >' + allvids[i].desc + '<div class="delsearch del" onclick="deleteSegment(this)"></div></div><div class="spacer"></div>';
                    }
                    else if (allvids[i].type == 'search') {
                        lasttitle = allvids[i].desc;
                        h += '<div class="searchheader slidein searchtitle" style="display: inline-block;" >Search: ' + allvids[i].title + '<div class="delsearch del" onclick="deleteSegment(this)"></div></div><div class="spacer"></div>';
                    }
                    else if (allvids[i].sug && allvids[i].sug.length > 0) {
                        lasttitle = allvids[i].desc;
                        h += '<div class="searchheader slidein searchtitle" >' + allvids[i].desc + '<div onclick="deleteSegment(this);" class="delsearch del"></div></div><div class="spacer"></div>';
                    }
                }
                if (allvids[i].type == 'up' || allvids[i].type == 'search' || allvids[i].type == 'list' || allvids[i].type == 'root') {
                    if (typeof allvids[i].sug != 'undefined' && allvids[i].sug.length > 0) {
                        var wrapped = false,
                            devided = false;
                        var rowvids = 3;
                        var ha = [];
                        for (var i1 = 0; i1 < Math.ceil(allvids[i].sug.length / rowvids) ; i1++) ha.push('<div class="sortcontainer suglist slidein" ' + ((allvids[i].type == 'search' || $('.suglist').length == 0 || true) ? ' shown="true" style="display:block;display: flex;"  ' : '') + '>');
                        for (var i1 = 0; i1 < allvids[i].sug.length; i1 += ha.length) {
                            for (var i2 = 0; i2 < ha.length; i2++) {
                                if (allvids[i].sug.length > i1 + i2) {
                                    var th = uivid(allvids[i].sug[i1 + i2], 'sug', devided);
                                    if (allvids[i].sug[i1 + i2].type == 'devider') {
                                        for (var i3 = 0; i3 < ha.length; i3++) {
                                            ha[i3] += th;
                                        }
                                        devided = true;
                                    }
                                    else
                                        ha[i2] += th;
                                }
                            }

                            if ((allvids[i].type == 'search' || $('.suglist').length == 0)) addedvis = true;
                            else addedinvis++;

                        }
                        for (var i1 = 0; i1 < ha.length; i1++) {
                            ha[i1] += '</div>';
                            h += ha[i1];
                        }

                    }
                    if (allvids[i].type == 'up') {
                        if ($('#queue .vidui[data-link="' + allvids[i].link + '"]').length == 0 && isGoodVideo(allvids[i])) {
                            hq += uivid(allvids[i], 'list');
                            if (addMode !== 'add')
                                addInfo(delspan.replace('@id', allvids[i].id) + ' ' + allvids[i].title);
                            newqids.push(allvids[i].id);
                        }
                    }
                }
            }
            //if (perspective == 'results') {
            //$('#scrollspace').removeClass('moodsbg');
            //if (h != '') $('.genere, .tabs').remove();
            var odd = false;
            if (!statichtml) {
                var jsug = $(h);
                var keys = {}
                var insdiskind = 0;
                jsug.find('.vidui').each(function (index) {
                    var src = '', txt = $(this).find('.title').text();
                    //if (txt.toLowerCase().indexOf('andra') == 0) debugger;
                    if (txt.indexOf(' - ')) src = txt.split(' - ')[0] + ' - ';//.attr('src');
                    else if (txt.indexOf('-')) src = txt.split('-')[0] + '-';//.attr('src');
                    else return;
                    var csrc = src.replace(/[^a-zA-Z]/gi, '').toLowerCase().replace('the', '');
                    var ctxt = txt.replace(/[^a-zA-Z]/gi, '').toLowerCase().replace('the', '');
                    if (csrc.length < 4) return;
                    if (typeof searchphrase != 'undefined' && searchphrase.replace(/[^a-zA-Z]/gi, '').toLowerCase().replace('the', '') == csrc) return;
                    var existed = false;
                    var ed = $(jsug).clone().add('#stage_sug');
                    ed = ed.find('.disktitle')
                    .filter(function () {
                        var dt = $(this).text().replace(/[^a-z]/gi, '').toLowerCase().replace('the', '');
                        if (dt.length > 3 && ctxt.indexOf(dt) == 0) {
                            if ($(this).parent().find('.vidui').filter(function () { return $(this).find('.title').text() == txt; }).length > 0) { existed = true; return false; }
                            if ($('#queue').find('.vidui').filter(function () { return $(this).find('.title').text() == txt; }).length > 0) return false;
                            return true;
                        }
                        return false;
                    })
                    if (existed) return;
                    if (ed.length > 0) {
                        var ep = $(this);
                        var box = ed.first().parent();
                        ep.css('display', 'none');
                        box.append($(this));
                        var more = box.find('.diskmore');
                        if (more.length > 0) {
                            var morecount = more.find('.diskmorecount');
                            morecount.html(parseInt(morecount.html()) + 1);
                        }
                        else if (box.find('.vidui').length > 5) {
                            var nc = 1;
                            if (box.find('.vidui').length == 6) { box.find('.vidui').last().prev().hide(); nc = 2; }
                            box.append('<div class="diskmore" onclick="$(this).hide();$(this).parent().find(\'.vidui\').show();"><span class="diskmorecount">' + nc + '</span> more</div>');
                        }
                        else {
                            ep.css('display', 'block');
                            ep.css('max-height', '0px').css('overflow', 'hidden');
                            ep.delay(insdiskind++ * 100).animate({ 'max-height': '90px' }, 1000, function () {
                                $(this).css('overflow', 'initial')
                            });
                        }
                        $('#stage_sug').find('.suglist').filter(function () { return $(this).children().not('.devider').length == 0 }).remove();
                        return;
                    }
                    if (typeof keys[src] == 'undefined') keys[src] = $(this);
                    else {
                        var disk;
                        if (keys[src].disk) disk = keys[src].disk;
                        else {
                            //var odd = ($('.sugdisk').length + jsug.find('.sugdisk').length) % 2 == 0;
                            odd = !odd;
                            var tools = '<div class="addicon diskicon" title="Add all tracks" onclick="addDisk($(this).parent())">Add</div><div class="playicon diskicon" title="Clear the playlist and play all the tracks" onclick="playDisk($(this).parent())">Play</div><div class="seedicon diskicon" title="Seed list using all tracks" onclick="seedDisk($(this).parent())">Seed</div>';
                            disk = $('<div class="sugdisk  ' + (odd ? ' ' : ' sugdiskodd  ') + '">' + tools + '<img src="' + keys[src].find('.vidimgui').attr('src').replace('default', 'hqdefault') + '" class="vidimgui"/><div class="disktitle" style="cursor:pointer;" onclick="dosearch(\'' + src.replace('-', '').trim() + '\',\'genere\');")>' + src.replace('-', '').trim() + '<div class="diskicon dosearch" title="Open ' + src.replace('-', '').trim() + '\'s search page" style="position: absolute;float: right;right: 5px;width: 18px;background-position: 6px 1px;padding-left: 0;margin-right: 1px;border-top-right-radius: 1px;background-image: url(/icons/searchicon.png);top:0;"></div></div></div><!--ph-->');
                            //disk.insertBefore(keys[src]);
                            disk.prependTo(keys[src].parent());
                            keys[src].addClass('diskroot');
                            //keys[src].find('.title').text(keys[src].find('.title').text().replace(src, ''));
                            keys[src].appendTo(disk);
                            keys[src].disk = disk;
                            keys[src].c = 0;
                        }
                        //if (keys[src].c < 7)
                        {
                            // $(this).find('.title').text($(this).find('.title').text().replace(src, ''));
                            $(this).appendTo(disk);
                            keys[src].c++;
                        }
                    }
                })
                jsug.filter(function () { return $(this).children().not('.devider').length == 0 }).remove();
                $('#stage_sug').find('.suglist').filter(function () { return $(this).children().not('.devider').length == 0 }).remove();
                //jsug.remove()
                $('.searchheader').filter(function () { return $(this).next().next().is('.searchheader'); }).remove();
                h = $('<div></div>').append(jsug).html();
                h = h.replace(/<!--ph-->/gi, '</div><div class="sortcontainer suglist ui-sortable" style="display:block;display: flex;"><!--phd-->');
                //$('<br/><div style="width:100%;display:blocl;clear:both:min-width:1000px;"></div>').insertAfter(jsug.find('.sugdisk'));
                if (h != '' && $('#stage_sug').is('.emptyinfo')) $('#stage_sug').html('').removeClass('emptyinfo')
                $(h).appendTo('#stage_sug');
            }
            //}
            if (hq != '') {
                var jq = $(hq);
                if (addMode == 'distribute') {
                    if (window.lastditributed) {
                        var al = window.lastditributed.next().next().next()[0] || $('#queue .vidui').last()[0];
                        if ($(al).next().is('.insetpoint')) al = $(al).next()[0];
                        jq.insertAfter(al)
                        window.lastditributed = $(al).next();
                    }
                    else {
                        var al = $(inspoint).next() || $(inspoint).first();
                        if (al.length > 0) {
                            window.lastditributed = jq.insertAfter(al)
                            //window.lastditributed = al.next();
                        }
                        else {
                            window.lastditributed = jq.appendTo('#queue');
                            //window.lastditributed = jq.next() || jq;
                        }
                    }
                    jq.slideDown();
                }
                else if (addMode == 'distribute')
                    $(jq).appendTo('#queue');
                else
                    $(jq).insertAfter(inspoint);
            }

            $("#queue").sortable({
                axis: "y",
                start: function () {
                    isDragging = true;
                },
                stop: function () {
                    saveListState();
                    isDragging = false;
                    resize();
                }
            });
            $(".suglist").sortable({
                appendTo: 'body',
                containment: 'window',
                scroll: false,
                helper: 'clone',
                connectWith: "#queue",
                items: '.vidui:not(.devider)',
                start: function () {;
                    $('#smiley').appendTo('body');
                    isDragging = true;
                    //$('#scrollspace').css('overflow', 'visible' );
                    //$('#stage_sug>*').not(this).not($(this).parent()).css('visibility', 'hidden')
                    //$(this).css('position', 'fixed');
                },
                stop: function () {
                    isDragging = false;
                    var lelm = $('#queue').find('.vidui[id="' + $(event.srcElement).add($(event.srcElement).parents()).filter('.vidui').attr('id') + '"]')[0];
                    $(lelm).addClass('new');
                    setTimeout(function () {
                        $(lelm).css('transition', 'all 3s');
                        $(lelm).removeClass('new');
                        setTimeout(function () {
                            $(lelm).css('transition', 'none');
                        }, 1000);
                    }, 1000);
                    //$('#scrollspace').css('overflow', 'auto');
                    //$('#stage_sug>*').not(this).not($(this).parent()).css('visibility', 'visible')
                    //$(this).css('position', 'initial');
                    resize();
                }
            });
            $(".sortcontainer").disableSelection();
            resize();
            var e = $('.sugmore').first();

            if (e[0].countsug) e[0].countsug += addedinvis;
            else e[0].countsug = addedinvis;
            if (new Date() - lastatt > 5500) {
                e.removeClass('attention').addClass('attention', 100);
                lastatt = new Date();
            }

            setHeaders(true);
            setTimeout(function () {
                $('.popin').removeClass('popin');
                $('.slidein').removeClass('slidein');
                setHeaders();
            }, 100);
        }

        function uivid(v, t, postdevided) {
            if (v.type == 'devider') {
                var h = '<div class="devider"></div>';
                return h;
            }
            var h = '<div data-link="' + v.link + '" style="' + (postdevided ? 'nopacity:.73;    -webkit-filter: grayscale(1);    nbackground: none;' : '') + ';min-width:' + Math.min(350, 256 + (v.title.length - 50) * 2 + 25) + 'px;    white-space: nowrap;' + vidColor(v) + ';" valign="top" class="vidui popin" id="' + v.id + '" onclick="clicked(' + v.id + ',\'' + t + '\',this,\'main\')">';
            h += '<table style="width: 100%;" cellspacing="0" cellpadding="0"><tr><td width="10"><img onerror="$(this).parents(\'.vidui\').hide()" class="vidimgui" src="https://' + v.img.replace('https://', '') + '"> '; //.replace('.webp','.jpg').replace('_webp/','/') 
            h += '</td><td ><div class="title" >' + (window.newlistener && typeof window.firsttrack == 'undefined' ? 'Click this track to get the party started!!' : v.title) + '</div></td></tr></table>';
            if (v.dur && v.dur != '3:33') h += '<span class="vidtimeui" >' + v.dur + '</span> ';
            h += '<div class="tools">';
            h += '<span class="toolph""></span>';
            h += '<span class="delall tool" title="delete this and all next videos" onclick="deleteAllVid(' + v.id + ');return false;"></span>';
            h += '<span class="del tool" title="delete this video" onclick="deleteVid(' + v.id + ');return false;"></span>'
            //h += '<span class="delwiz tool" title="delete anything like this video" onclick="deleteVid(' + v.id + ',true);return false;"></span>'
            h += '<span class="addwiz tool"  title="add this video and more videos like it" onclick="clicked(' + v.id + ',\'' + t + '\',this.parentNode.parentNode,\'addwiz\');return false;"></span>'
            h += '<span class="addtop tool" title="play this video next" onclick="$(this).parents(\'.vidui\')[0].hoverscore=2; clicked(' + v.id + ',\'' + t + '\',this.parentNode.parentNode,\'play\');return false;"></span>'
            h += '<span class="addbottom tool" title="add this video last" onclick="$(this).parents(\'.vidui\')[0].hoverscore=2; clicked(' + v.id + ',\'' + t + '\',this.parentNode.parentNode,\'addbottom\');return false;"></span>'
            //h += '<span class="playnext tool" title="play this next" onclick="addTop(' + v.id + ',\'' + t + '\',this.parentNode.parentNode);return false;"></span>'
            //h += '<span class="skipto tool" title="skip to this" onclick="clicked(' + v.id + ',\'' + t + '\',this.parentNode.parentNode);return false;"></span>'
            h += '</div></div>';
            window.firsttrack = true;
            return h;
        }



        function clearJobsQueue() {
            $('#queue').children().remove();
            deletedtitles = [];
            researchQueue = [];
            moodProbeQueue = [];
            researchInProgress = false;
        }
        function addDisk(d) {
            var viduis = d.find('.vidui');
            d.find('.diskmore').remove();
            viduis.each(function (ind) {
                this.hoverscore = 2;
                var that = this;
                function delay() {
                    that.hoverscore = 2;
                    clicked($(that).attr('id'), 'sug', that, 'add');
                }
                if (viduis.length < 10)
                    setTimeout(delay, (viduis.length - ind - 1) * 3000 / Math.max(3, viduis.length));
                else clicked($(that).attr('id'), 'sug', that, 'add', true);
            })
            d.find('.vidimgui').first().css('height', 'initial').animate({ width: '152px' });
            return false;
        }
        function playDisk(d) {
            d.find('.diskmore').remove();
            clearJobsQueue();
            var viduis = d.find('.vidui');
            viduis.each(function (ind) {
                this.hoverscore = 1;
                var that = this;
                function delay() {
                    that.hoverscore = 2;
                    clicked($(that).attr('id'), 'sug', that, 'add');
                }
                if (viduis.length < 10)
                    setTimeout(delay, (viduis.length - ind - 1) * 3000 / Math.max(3, viduis.length));
                else clicked($(that).attr('id'), 'sug', that, 'add', true);
            })
            d.find('.vidimgui').first().animate({ width: '152px' });
            return false;
        }
        function seedDisk(d) {
            d.find('.diskmore').remove();
            var viduis = d.find('.vidui');
            viduis.each(function (ind) {
                var that = this;
                function delay() {
                    that.hoverscore = ind < 5 ? 1 : 2;
                    clicked($(that).attr('id'), 'sug', that, 'add');
                }
                if (viduis.length < 10)
                    setTimeout(delay, (viduis.length - ind - 1) * 3000 / Math.max(3, viduis.length));
                else {
                    clicked($(that).attr('id'), 'sug', that, 'add', true);
                }
            })
            d.find('.vidimgui').first().animate({ width: '152px' });
            return false;
        }

        function showSuggestions(depth, fromscorll) {

            $("#scrollspace").animate({
                scrollTop: $("#scrollspace").scrollTop() + $(window).height() - 150
            });


        }

        function peekSuggestions(go) { }

        function vidColor(v) {
            if (v.basevidid && !v.root) {
                var v1 = getVidById(v.basevidid);
                if (v1) {
                    while (!v1.colors && v1.basevidid && v1.type != 'root') v1 = getVidById(v1.basevidid);
                    return 'display: inline-block;nbackground-image:  ' + v1.colors.replace(',1)', ',.4)').replace(',1)', ',.4)') + ');border-radius: 0 8px 8px 0;border-right:4px solid rgba' + v1.colors.split('rgba')[2].replace(',1)', ',.9)') + ';border-bottom:0px solid rgba' + v1.colors.split('rgba')[2].replace(',1)', ',.0)') + ';';
                    return 'background-image:  ' + v1.colors.replace(',1)', ',.7)').replace(',1)', ',.7)') + ');'
                }

            }

            return 'background-image: nlinear-gradient(to bottom left, rgb(234, 234, 234), #8E8E8E);'
        }

        function addTop(id, t, elm) {
            $(elm).slideUp('fast', function () {
                $(this).insertBefore(inspoint).slideDown()
            });
            //$("#queue").animate({ scrollTop: 0 }, "slow");
            event.preventDefault();
            event.cancelBubble = true;
            return false;
        }

        function addBottom(id, t, elm) {
            $(elm).slideUp('fast', function () {
                $(this).appendTo('#queue').slideDown();
            });
            $("#queue").animate({
                scrollTop: $("#queue")[0].scrollHeight
            }, "slow");
            event.preventDefault();
            event.cancelBubble = true;
            return false;
        }

        function deleteSegment(helm) {
            var j = $(helm).parent().next();
            //debugger;
            var i = 10;
            while (i-- > 0 && !j.is('.searchheader')) {
                j.slideUp('fast', function () {
                    $(this).remove();
                });
                j = j.next();
            }
            $(helm).parent().remove();
        }

        function deleteVid(id, related) {
            var v = getVidById(id);
            deletedtitles.push(v.title);
            if ($('#' + id).is('.playing')) { playNext(); }
            if (related) {
                if ($('#' + id).parent().is('#queue')) {
                    var bid = v.root ? v.id : v.basevidid;
                    $('.suglist, #queue').children().each(function () {
                        var cv = getVidById($(this).attr('id'));
                        if (cv.basevidid == bid) {
                            deletedtitles.push(cv.title);
                            
                            $('#' + cv.id).slideUp({
                                duration: 300,
                                complete: function () {
                                    $(this).remove()
                                },
                                queue: false
                            });
                        }
                    });
                }
                else {
                    var helm = $('#' + id).parents('.suglist').prev();
                    var i = 10;
                    while (i-- > 0 && !helm.is('.searchheader') && helm.prev().length > 0) helm = helm.prev();
                    if (helm.is('.searchheader'))
                        deleteSegment(helm.find('.delsearch')[0]);
                }
            }
            $('#' + id).slideUp({
                duration: 300,
                complete: function () {
                    $(this).remove()
                },
                queue: false
            });
            event.preventDefault();
            event.cancelBubble = true;
            return false;
        }

        function deleteAllVid(id) {
            var v = getVidById(id);
            //debugger;
            // if ($('#' + id).parents('.suglist').length > 0)
            //     $('#' + id).parents('.suglist').slideUp({
            //         duration: 300,
            //         complete: function() {
            //             $(this).remove()
            //         },
            //         queue: false
            //     });
            // else {
            $('#' + id).nextAll('.vidui').not('.playing').slideUp({
                duration: 300,
                complete: function () {
                    $(this).remove()
                },
                queue: false
            });
            $('#' + id).remove();
            // }
            event.preventDefault();
            event.cancelBubble = true;
            return false;
        }

        function resize() {
            return;
            $('#queue').height($('#queue')[0].scrollHeight)
            if ($('#queue').height() > $('#stage').height()) $('body').css('height', window.innerHeight + $('#stage').height() - 96 * 2);
            else $('#queue').height($('#stage').height() + 96 * 2);

        }

        function reportNext() {
            return;
            if ($('#queue .vidui').length == 0) return;
            var id = $(inspoint).next().attr('id');
            var v = getVidById(id);
            //ipcRenderer.send('online-status-changed', 'next:' + v.link.split('?v=')[1]);

        }

        function clicked(id, t, elm, main, skipanimation, skipresearch) {
            var linspoint = $('.insetpoint');

            if (linspoint.length == 0) {
                $('<div class="insetpoint"><div class="or-spacer"><div class="mask"></div><span><i>Insert point</i></span></div></div>').prependTo('#queue');
                linspoint = $('.insetpoint');
            }
            if (main == 'addbottom') {
                linspoint = $('#queue').children().last();
            }
            if (elm.parentNode.id == 'queue') {
                if (main == 'main')
                    moveTo(id, elm);
                else if (main == 'addwiz') {
                    window.probedepth = 4;
                    var v = getVidById(id);
                    if (wizmodebuff) window.probedepth = 1;
                    else starred(v, 5);
                    basekey = v.link.split('=')[1];
                    probemain(v);
                    resize();
                }
            }
            else {
                var lid = id,
                    lelm = elm;
                var v = getVidById(id);
                if (!elm.hoverscore) elm.hoverscore = window.lastrateing;
                window.lastclickedrating = elm.hoverscore;
                window.lastditributed = $(elm);
                $(elm).addClass('new');
                setTimeout(function () {
                    $(lelm).css('transition', 'all 1s');
                    $(lelm).removeClass('new');
                    setTimeout(function () {
                        $(lelm).css('transition', 'none');
                    }, 1000);
                }, 1000);
                var lskipanimation = skipanimation;
                if (skipresearch) {
                    $(elm).hide().insertAfter(linspoint).show();
                    if ($('.playing').length == 0) moveTo(lid, lelm);
                    else if (main == 'play') playNext(lid);
                    return;
                }
                function fly() {
                    if (!lskipanimation) {
                        isDragging = true;

                        $('<div style="height:0px;" id="qspacer"></div>').insertAfter(linspoint);
                        $('#qspacer').animate({ height: '50px' })

                        var drgElement = $(elm).clone();
                        drgElement.css('position', 'fixed')
    .css('left', $(elm).offset().left + 'px')
    .css('top', $(elm).offset().top + 'px')
                            .css('z-index', '9998')
    .addClass('vidui_transit')
    .css('transition', 'all .6s')
                        .appendTo('body');
                        var srcTD = $(elm).parents('#stage_sug')

                        $(elm).slideUp(0).insertAfter(linspoint).css('opacity', 0);//.delay(1000).slideDown('slow');
                        $('#qspacer').slideUp('slow', function () { $(this).remove(); })
                        $('#smiley').appendTo('body');


                        var destTD = linspoint;
                        var ol = drgElement.offset().left;
                        drgElement.css('z-index', '298').css({
                            marginLeft: -(drgElement.offset().left - destTD.offset().left - 12) + 'px'
                            , marginTop: -(drgElement.offset().top - Math.max($('#logo').height() + 20, Math.min($(window).height() - 100, destTD.offset().top)) + 20) + 'px'
                            //, maxHeight: '90px'
                            , width: ($('#queue').width() - 20) + 'px'
    , 'transform': 'rotateX(54deg)'
                            //,transform:'scaleY(.1)'
                            //, zoom:.7
                        })
                        //.css('max-height', $(elm).height() + 'px')
                        //.css('overflow','hidden')
                        if (linspoint.is('.insetpoint')) $('.insetpoint').insertAfter(lelm);
                        setTimeout(function () {
                            //$(elm).slideUp('fast', function () {
                            //$(lelm).animate({ 'opacity': 1 }, 300);
                            $(lelm)
                                //.css('margin-left', '-40px')
                                .css('opacity', 1);
                            drgElement
                                .css('transition', 'all 1.5s')
                                .css('opacity', '0')
                                .css('transform', 'rotateX(80)')
    .delay(1000).fadeOut(20, function () {
        $(drgElement).remove()
        isDragging = false;
    });
                            //  if ($('.playing').length == 0) moveTo(lid, lelm);
                            //});


                            //$('#smiley').appendTo('body');
                        }, 800);
                        if ($('.playing').length == 0) moveTo(lid, lelm);
                    }
                    else {
                        $(elm).hide().insertAfter(linspoint).show();
                        if ($('.playing').length == 0) moveTo(lid, lelm);
                        else if (main == 'play') playNext(lid);
                    }

                }
                switch (elm.hoverscore) {
                    case 0:
                        {
                            window.probedepth = 4;
                            starred(v, 5);
                            fly();
                            basekey = getVidById(id).link.split('=')[1];
                            probemain(v);
                            resize();
                            //addToList(id);
                            break;
                        }
                    case 1:
                        {
                            window.probedepth = 2;
                            starred(v, 4);
                            fly();
                            basekey = getVidById(id).link.split('=')[1];
                            probemain(v);
                            resize();

                            break;
                        }
                    case 2:
                        {
                            starred(v, 3);
                            window.probedepth = -1;
                            fly();
                            basekey = getVidById(id).link.split('=')[1];
                            probemain(v);
                            resize();
                            break;
                        }
                    case 3:
                        {
                            starred(v, 2);
                            $(elm).slideUp('fast', function () {
                                $('#smiley').appendTo('body');
                                $(this).remove();
                            });
                            resize();
                            break;
                        }
                    case 4:
                        {
                            starred(v, 1);
                            $('#smiley').appendTo('body');
                            deleteVid(id, true)
                            resize();
                            break;
                        }
                    default:
                        {
                            $('#smiley').appendTo('body');
                        }
                }
            }
            try {
                event.preventDefault();
                event.cancelBubble = true;
            } catch (e) { }
        }

        function moveTo(id, elm) {
            console.log('move to: ' + id);
            if ($(elm).prevAll().length > 0) {
                var tl = $(elm).prevAll().length;
                playNext(id);
                checkProbe();
            }
            else {
                playNext(id);
            }

        }

    </script>
    <div id="topbar" style="width: 100%; height: 100px; top: 22px; position: fixed; display: ; z-index: 12; overflow: auto; box-shadow: inset 0px -4px 2px -3px; padding-left: 361px; overflow: hidden;" class="metal">

        <div id="topbarinner" class="ui-widget" style="margin-right: 398px;">
            <div id="maintools" style="text-align: right; min-width: 610px;">
                <button onclick="stopVid()" style="float: left; margin-right: 0px; border-radius: 0  0; line-height: 26px; width: 41px; margin-right: 6px;">Stop</button>
                <button onclick="playNext()" id="topplay" style="float: left; margin-right: 0px; border-radius: 0 0px 0px 9999px; line-height: 26px; width: 25px; transform: rotateZ(45deg); height: 25px; position: absolute; left: 407px; top: 5px;"></button>
                <button onclick="showSuggestionsPanel()" style="float: left; margin-left: 38px; border-radius: 50px 0 0px 50px; text-align: right; width: 52px; margin-right: 2px; */">
                    &#9836;
                    <br>
                    Home</button>
                <button onclick="settings()" class="btnsettings" style="">
                    Settings
                    <span style="font-size: 12px; top: 2px; position: absolute; left: 3px; height: 14px; box-shadow: none; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUEzOEE0OEMxQzgzMTFFNkJFRDVCNjA3RkQxQjg5ODUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkIyNkNEOUMxRTlFMTFFNkJFRDVCNjA3RkQxQjg5ODUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQTM4QTQ4QTFDODMxMUU2QkVENUI2MDdGRDFCODk4NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQTM4QTQ4QjFDODMxMUU2QkVENUI2MDdGRDFCODk4NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuQ/uaAAAALwSURBVHjaxJjNb01BGMavG0FbrRZBqEooCxJsaBQbGgsaIb4WEjuNDYtGaiXBSiJESZA0kSAkIhEh/AHWFsRnQq+vElrtdSPio/R4XnlOMp3MzJ1z5nAn+S2annfmOWfe95l3bi4XPrrBe/ABnAdjkgRHUTSK0DEBvJN5yWdQHyIoHyhoMqjTBE4JmTBU0ExQo/w9Hkz9F4LkLY+CNWXiVxlypq1MzApwjC/jNaaBe8yJn6DT8XV6lfyJkQRvtsTsAV/53FPQ6JPUxw2LXAHLQDVzZj14ZHgu5gXYBCYxZikrUH/ujI+gtWDYEPwbFECfQ4jpaxUs8wntvmXfmWDRtBw2lb3LxK6C7WXybQg8Aa/BCGgCizwq7Q7YEAvyHbLvPyxv9wrss1TKdNABnltif4HlaZx6HPdfn/A6K9HHNC8a4j+C2jSCqg0JfAOMTeh1l7U5ZJsb0ghax8qKJ3rDt0465Gs8U+aRXNuYVNAs8Fh7s70BJ8JOba5CbJ42QVUU0cKS1x140DNvbGOiYfvl7y4eJY2SIrGgUxRQcnjG3Qz6ppuO+b+Al6BHHix6mNilDASd8FinlPfs8EYyEOTlgHn6injDd8dzTRkImuv4nxhwPx3876hn1reCgzwU1U85ENgJVvF40QvlCFgN5ouluMp+gaHSdgcI2qrNJX34kqTG2M7cUb2jLoUYcfyHmjFuS+PUNYatS1Nt57Q5iqrjJz1cey0W0OB5ZJzN8nBdCL5Z/EJ6oF2WO1gt+6j7lthhtja5pA3aBS7qGm/BA/bQEUtbFptTJk6sZkuSBq3jP7SwXb5b1urYqn72M76LFpkzts6xzUdQtyH4FljJZJZTf7Olm1RvGzvADMZIy3rN8FyPj6DZvMSNuh0YxjzmkL7IJ7DYEnNAuRJJX97sW2XSvJ+kObrGfoOgQ2Vi5N53Oj7bsv45pkVz84gNV8V+junjXV09tQcq+XPMELs9VdBgJQWJPdxmacf9TClkwj8CDABy8ZM6kI0guwAAAABJRU5ErkJggg==); color: transparent; background-size: 11px; background-repeat: no-repeat; display: inline-block; width: 14px;"></span>
                </button>

                <button onclick="help()" id="tophelp" class="btnhelp" style="position: absolute; top: 19px; box-sizing: padding-box;">?</button>
                <span style="float: right; margin-right: -26px; text-align: left; font-size: 12px; line-height: 0; margin-top: -1px; color: black;">
                    <span style="float: left; padding-top: 15px; display: block;">Playlists:</span>
                    <button onclick="renameList()" style="border-radius: 50px; line-height: 7px; width: 64px; float: right; color: ; margin-right: -4px; margin-top: 8px">Rename</button>
                    <button onclick="newList()" style="border-radius: 50px; line-height: 7px; width: 42px; float: right; margin-right: 5px;">New</button>
                    <button onclick="saveList()" style="border-radius: 50px; line-height: 7px; width: 45px; float: right; margin-right: 5px;">Save</button>
                    <button onclick="saveListAs()" style="x; border-radius: 50px; line-height: 7px; width: 60px; float: right; margin-right: 5px;">Save as</button>
                    <button onclick="deleteList()" style="x; border-radius: 50px; line-height: 7px; width: 52px; float: right; margin-right: 5px;">Delete</button>
                    <br>
                    <select id="selplaylists" style="margin-right: -4px; border-radius: 10px; font-size: 11px; width: 387px; background-image: linear-gradient(to bottom, rgb(234, 234, 234), #8E8E8E); text-shadow: 1px 1px 0 rgba(255,255,255,0.26); color: #222; order: 1px groove #888; margin-top: 2px; height: 20px; padding: 0px 10px;">
                    </select>
                </span>


                <table style="width: 100%; height: 50px;">
                    <tbody>
                        <tr>
                            <td style="text-align: left;">
                                <input id="q" tabindex="-1" placeholder="Search for artist name, song title, band ..." style="width: 54vw; font-size: 17px; min-width: 500px;" class="ui-autocomplete-input ui-autocomplete-loading" autocomplete="off">
                            </td>
                            <td id="tdlabel" style="overflow: hidden; padding: 0; margin: 0;">
                                <div class="clabel" style="right: 42px; position: fixed; top: 65px;"
                                    id="clabel">
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>



                <div class="progress">
                    <div class="progress-bar" style="display: none; width: 0%; background-color: rgb(242, 211, 27);"></div>
                </div>
            </div>
        </div>

        <script>
            function removeExclusion() {
                if ($('#selexclude option:selected').length == 0) return;
                var vals = $('#selexclude').val();
                for (var i = 0; i < vals.length; i++) {
                    var s = vals[i];
                    var s = $('#selexclude option[value="' + s + '"]').text();
                    $('#selexclude option[value="' + s + '"]').remove();
                    playlists.settings.excludes = $.grep(playlists.settings.excludes,
                        function (value) {
                            return value != s;
                        });
                }
                saveList(true, true);
            }

            function addExclusion() {
                $("#name").val('')
                $("#dialog").dialog({
                    autoOpen: true,
                    modal: false,
                    resizable: false,
                    title: 'Add track filter',
                    buttons: {
                        Ok: function () {
                            var name = $("#name").val();
                            if (name.length > 0 && $.inArray(playlists.settings.excluds, name)) {
                                playlists.settings.excludes.push(name);
                                $('#selexclude')
                                    .append($("<option></option>")
                                        .attr("value", name)
                                        .text(name));
                                saveList(true, true);

                            }
                            $('.ui-dialog label').html('Playlist Name')
                            $(this).dialog('close');
                        }
                    }
                });
                $('.ui-dialog label').html('Exclude tracks containing:')
            }

            function jsonList() {
                var a = []
                for (var i = 0; i < played.length; i++) {
                    a.push(vidToMinVid(played[i]));
                }
                $('#queue .vidui').each(function () {
                    var v = getVidById(this.id);
                    var tv = vidToMinVid(v);
                    v.type = 'up';
                    a.push(tv);
                });
                return a;
            }

            function vidToMinVid(v) {
                var nv = $.extend(true, {}, v);
                nv.ui = false;
                delete nv.basevidid;
                delete nv.sug;


                return nv;

                return {
                    link: v.link,
                    title: v.title,
                    img: v.img,
                    dur: v.dur
                }
            }
            function downloadList() {
                var s = '';
                if (!$('#downloademail').val().match(/\b[A-Z0-9._%+-]+@[A-Z0-9\.-]+\.[A-Z\.]{2,}\b/gi)) {
                    $('#downloadinfo').html('<span style="color: #de6c6c;font-weight: 700;margin-left: 41px;">Please enter a vaild email</span>')
                    return;
                }
                if ($('#queue .vidui').length == 0) {
                    $('#downloadinfo').html('<span style="color: #de6c6c;font-weight: 700;margin-left: 41px;">Playslist is empty</span>')
                    return;
                }
                $('#downloadinfo').html('<span style="font-weight: 700;background: #aaa;color: black;text-shadow: none;padding: 10px;border-radius: 5px;display: block;">Sending download request...</span>');
                $('#downloadinit').hide();
                $('#queue .vidui').each(function () {
                    var v = getVidById(this.id);
                    s += v.title + '\n' + v.link + '\n';
                });
                $.post("record.ashx", {
                    act: 'Download List',
                    guid: playlists.settings.guid,
                    data: playlists.lists[curlistind].title,
                    vids: s,
                    mail: $('#downloademail').val()
                })
                .done(function (data) {
                    $('#downloadinfo').html('<span style="font-weight: 700;background: #aaa;color: black;text-shadow: none;padding: 10px;border-radius: 5px;display: block;">Download request queued</span>');
                    if (downloadinterval)
                        clearInterval(downloadinterval);
                    downloadinterval = setInterval(function () {

                        var jqxhr = $.get('/jobs/' + playlists.settings.guid + '_res.htm', function (data) {
                            //    $('#downloadinfo').html(data);
                        })
  .done(function (data) {
      var e = '';
      if (data.indexOf('Playlist processing complete') == 0) {

          clearInterval(downloadinterval);
          downloadinterval = false;
          e = '<br/><button onclick="$(this).hide();$(\'#downloadinfo\').html(\'\');$(\'#downloadinit\').show();$(\'#downloadbar\').css(\'box-shadow\', \'2px -1px 4px -2px #aaa,inset 2px 1px 5px -3px #aaa\');" style="float:right;border-radius:10px;">Done</button>';
          $('#downloadbar').css("box-shadow", "2px -1px 4px -2px #aaa,inset 2px 1px 5px -3px #aaa,inset 100px 0 1px -1px rgba(0,255,0,.3)");

      }
      if (data.indexOf('<html') == -1) {
          $('#downloadinfo').html('<span style="background: #aaa;color: black;text-shadow: none;padding: 10px;border-radius: 5px;display: block;">' + data + '</span>' + e);
          if (data.match(/\(\d+ of \d+\)$/)) {
              var xoy = data.match(/\(\d+ of \d+\)$/)[0].replace('(', '').replace(')', '').split(' of ');
              var p = (parseFloat(xoy[0]) - 1) * 100 / parseFloat(xoy[1]);
              $('#downloadbar').css("box-shadow", "2px -1px 4px -2px #aaa,inset 2px 1px 5px -3px #aaa,inset " + p + "px 0 1px -1px rgba(0,255,0,.3)");
          }
      }

  })
  .fail(function () {
      debugger
  })
  .always(function () {
  });

                        jqxhr.always(function () {
                        });
                    }, 10000);

                });

            }
            function renameList() {
                $("#name").val(playlists.lists[curlistind].title)
                $("#dialog").dialog({
                    autoOpen: true,
                    modal: false,
                    resizable: false,
                    title: 'Rename playlist ...',
                    buttons: {
                        Ok: function () {
                            var name = $("#name").val();
                            if (name.length > 0) {
                                playlists.lists[curlistind].title = name;
                                saveList();
                                var l = playlists.lists[curlistind];
                                $('#selplaylists option[value="' + curlistind + '"]').text(name); // + ' (' + l.vids.length + ')');
                            }
                            $(this).dialog('close');
                        } //end function for Ok button
                    } //end buttons
                }); //.dialog('open');


            }

            function newList() {
                $("#name").val('')
                $("#dialog").dialog({
                    autoOpen: true,
                    modal: false,
                    resizable: false,
                    title: 'New playlist name...',
                    buttons: {
                        Ok: function () {
                            var name = $("#name").val();
                            if (name.length > 0) {
                                playlists.lists.push({
                                    title: name,
                                    vids: []
                                });
                                curlistind = playlists.lists.length - 1;
                                $('#queue .vidui').remove();
                                saveList();
                                var l = playlists.lists[curlistind];
                                window.holddefaults = true;
                                $('#selplaylists').append($('<option>', {
                                    value: curlistind,
                                    text: l.title //+ ' (' + l.vids.length + ')'
                                })).val(curlistind);
                                window.holddefaults = false;
                            }
                            $(this).dialog('close');
                        }
                    }
                });
            }

            function shuffleList() {
                progress(0);
                var a = []
                $('#queue .vidui').not('.playing').each(function () {
                    a.push(this);
                });
                if (a.length > 1) {
                    for (var i = 0; i < a.length; i++) {
                        $(a[i]).remove().insertAfter($('#queue .vidui')[Math.floor(Math.random() * (a.length - 1))]);
                    }
                }
                progress(100);
            }
            function saveListState() {
                // current modifyed list
                return;
                var l = jsonList();
                for (var i = 0; i < l.length; i++) {
                    if (typeof l[i].friends != 'undefined') {
                        for (var i1 = 0; i1 < l[i].friends.length; i1++) {
                            delete l[i].friends[i1].friends;
                            delete l[i].friends[i1].sug;
                        }
                    }
                    if (typeof l[i].sug != 'undefined') {
                        for (var i1 = 0; i1 < l[i].sug.length; i1++) {
                            delete l[i].sug[i1].friends;
                            delete l[i].sug[i1].sug;
                        }
                    }
                }
                localStorage.setItem('playliststate', JSON.stringify(l));
            }
            function saveList(skipchanges, skipui) {
                if (!skipui) progress(0);
                if (playlists.lists[curlistind]) {
                    if (!skipchanges) {
                        var l = jsonList();
                        for (var i = 0; i < l.length; i++) {
                            if (typeof l[i].friends != 'undefined') {
                                for (var i1 = 0; i1 < l[i].friends.length; i1++) {
                                    delete l[i].friends[i1].friends;
                                    delete l[i].friends[i1].sug;
                                }
                            }
                            if (typeof l[i].sug != 'undefined') {
                                for (var i1 = 0; i1 < l[i].sug.length; i1++) {
                                    delete l[i].sug[i1].friends;
                                    delete l[i].sug[i1].sug;
                                }
                            }
                        }
                        playlists.lists[curlistind].vids = l;
                        record('Saved List', playlists.lists[curlistind].title + ' (' + playlists.lists[curlistind].vids.length + ')');
                        if (playlists.lists[curlistind].title.indexOf(')') == 0) {
                            $.post("record.ashx", {
                                act: 'Saved List pub',
                                guid: playlists.settings.guid,
                                data: playlists.lists[curlistind].title,
                                vids: JSON.stringify(allvids),
                                html: $('#stage_sug').html().replace('&', ' ') // $('.suglist').html()
                            })
                                .done(function (data) {
                                    alert('page added');
                                    //alert("Data Loaded: " + data);
                                });

                        }
                        if (document.location.href.indexOf('#admin') > -1 && playlists.lists[curlistind].title=='mood'){
                            //[["cool","","Lana Del Rey - West Coast (Official Audio)","","","",""
//,"https://i.ytimg.com/vi/o3SqUUoJjW8/hqdefault.jpg","/watch?v=o3SqUUoJjW8","4:17"]
                            var pl=[];
                            for (var im=l.length-1;im>=0;im--){
pl.push([curmood,'',l[im].title,'','','','',l[im].img,l[im].link,l[im].dur])
                            }
                            $.post("record.ashx", {
                                act: 'Saved Mood pub',
                                data: curmood,
                                vids: JSON.stringify(pl),
                            })
                                .done(function (data) {
                                    alert('mood updated');
                                    //alert("Data Loaded: " + data);
                                });

                            return;
                        } 

                    }
                    playlists.curlistind = curlistind;
                }
                else {
                    playlists.curlistind = Math.max(0, curlistind - 1);
                }

                saveListState();
                var elementPos = playlists.lists.map(function (x) { return x.title; }).indexOf('_modifyed');
                if (elementPos == -1) {
                    playlists.lists.push({ title: '_modifyed' });
                    elementPos = playlists.lists.length - 1;
                }
                playlists.lists[elementPos].vids = l;
                playlists.lists[elementPos].base = playlists.lists[curlistind].title;

                for (var i = 1; i < 6; i++) {
                    if (typeof playlists.settings.starred['star' + i] != 'undefined') {
                        for (var i1 = 0; i1 < playlists.settings.starred['star' + i].length; i1++) {
                            delete playlists.settings.starred['star' + i][i1].friends;
                            delete playlists.settings.starred['star' + i][i1].sug;
                        }
                    }
                }

                fs.writeFile(window.userDataDir + "/lists.txt", JSON.stringify(playlists), function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    if (!skipui) progress(100);
                });
            }

            function saveListAs() {
                dialogmode = 'saveas';
                $("#name").val(playlists.lists[curlistind].title + ' copy')
                $("#dialog").dialog({
                    autoOpen: true,
                    modal: false,
                    resizable: false,
                    title: 'Save playlist as...',
                    buttons: {
                        Ok: function () {
                            var name = $("#name").val();
                            if (name.length > 0) {
                                playlists.lists.push({
                                    title: name,
                                    vids: []
                                });
                                curlistind = playlists.lists.length - 1;
                                saveList();
                                var l = playlists.lists[curlistind];
                                window.holddefaults = true;
                                $('#selplaylists').append($('<option>', {
                                    value: curlistind,
                                    text: l.title //+ ' (' + l.vids.length + ')'
                                })).val(curlistind);
                                window.holddefaults = false;
                            }
                            $(this).dialog('close');
                        }
                    }
                });
            }

            function deleteList() {
                if (playlists.lists.length > 1) {
                    playlists.lists.splice(curlistind, 1);
                    window.holddefaults = true;
                    $('#selplaylists option[value="' + curlistind + '"]').remove();
                    saveList();
                    curlistind = Math.max(0, curlistind - 1);
                    layoutLists();

                    window.holddefaults = false;
                }
            }

            function stopVid() {
                //ipcRenderer.send('online-status-changed', 'stop:');
                if (player.getPlayerState() != 2) {
                    player.pauseVideo();
                    ///$('button[onclick="stopVid()"]').html('Play').addClass('playbutton');
                }
                else {
                    debugger;
                    player.playVideo();
                    //$('button[onclick="stopVid()"]').html('Pause').removeClass('playbutton');
                }
            }

            function clearSug() {
                showSuggestionsPanel();
                if ($('#stage_sug').children(':not(.genere,.spacer,.sugmore)').length == 0 && $('#stage').children('.genere').length > 10) return;

                $('#stage_sug').children().remove();
                $('#stage_sug,#stage').css({
                    opacity: 1
                })
                setup(false);
            }

            function clearQueue() {
                for (var i = 0; i < allvids.length; i++) {
                    if (allvids[i].type = 'up') {
                        allvids[i].type = 'sug';
                        //allvids.splice(i, 1);
                        //i--;
                    }
                }
                $('#queue').parent().attr('lasttop', $('#queue').parent().css('top')).css('top', 90).css('background-size', '0px');
                $('#queue').css({
                    height: '100vh',
                    overflowY: 'hidden'
                });
                $('#queue .vidui').not(':in-viewport').css('visibility', 'hidden');
                $('body').jGravity({
                    target: '#queue .vidui:in-viewport',
                    ignoreClass: 'ignoreMe',
                    weight: 10,
                    depth: 5,
                    drag: false
                });

                setTimeout(function () {
                    $('#queue').children().remove();
                    $('#queue').css({
                        height: 'auto',
                        overflowY: 'auto'
                    });
                    $('#queue').parent().css({
                        backgroundSize: '100px',
                        top: $('#queue').parent().attr('lasttop'),
                        opacity: 1
                    })
                }, 1500);

                //$('#queue').html('');
            }

            $(function () {
                $("#q").focus(function () {
                    $('#tdlabel').css({
                        "max-width": "0"
                    }).stop().fadeOut('fast'); //,display:'none'});
                    $('#q').css({
                        "width": $('#maintools').width() - 32
                    });
                });
                $("#q").blur(function () {
                    $('#tdlabel').css({
                        "max-width": "200"
                    }).stop().fadeIn('slow'); //,display:'inline'});
                    $('#q').css({
                        "width": $('#maintools').width() - 300//'60vw'
                    });
                });
                $("#q").autocomplete({
                    source: function (request, response) {
                        autocomplete(request.term, response);
                    },
                    minLength: 1,
                    select: function (event, ui) {
                        if (new Date() - lastsearchtime < 500) return;
                        lastsearchtime = new Date();
                        event.preventDefault();
                        if (ui.item) {
                            pretitle == ''
                            $('#stage_sug').children().remove();
                            showSug();
                            perspective = 'results';
                            searchphrase = ui.item.value;
                            $("#q").val(searchphrase);
                            researchQueue = [];
                            moodProbeQueue = [];
                            researchInProgress = false;
                            dosearch(ui.item.value);
                        }
                        return false;

                    }
                })
                    .keydown(function (event) {
                        if (event.keyCode == 13) {
                            if ($("#q").val().length > 0) {
                                pretitle == ''
                                showSuggestionsPanel();
                                if (new Date() - lastsearchtime < 500) return;
                                $('.ui-autocomplete').hide();
                                $(".ui-menu-item").hide();
                                lastsearchtime = new Date();
                                researchQueue = [];
                                moodProbeQueue = [];
                                researchInProgress = false;
                                $('#stage_sug').children().remove();
                                showSug();
                                perspective = 'results';
                                searchphrase = $("#q").val();
                                dosearch($("#q").val());
                                event.preventDefault();
                                return false;
                            }
                        }
                    });;
            });

            function removeInfo(infid) {
                if ($('#infos').css('max-height') == '23px')
                    $('#inf_' + infid).slideUp(400, function () {
                        $('#inf_' + infid).remove()
                    })
                else
                    setTimeout("removeInfo('" + infid + "')", 1000);
            }

            function addInfo(s) {
                infid++;
                if ($('#infos').css('max-height') == '23px')
                    $('<div id="inf_' + infid + '" style="display:none;"">' + s + '</div>').prependTo($('#infos')).slideDown();
                else
                    $('<div id="inf_' + infid + '" style="display:none;"">' + s + '</div>').appendTo($('#infos')).slideDown();
                //setTimeout("$('#inf_" + infid + "').slideUp(400,function(){$('#inf_" + infid + "').remove()})", 30000);
                setTimeout("removeInfo('" + infid + "')", 30000);
                if ($('#infos').children().length > 16) $('#infos').children().last().remove(); //.slideUp(400,function(){$(this).remove()});
            }
        </script>


        <span></span>
        <span id="currentlyplaying" style="display: none; padding: 10px;"></span>
    </div>
    <div id="infos" style="width: 200px; position: fixed; right: 12px; z-index: 99; top: 119px; ntransform: rotate(2deg); border-radius: 5px;"></div>
    <div class="queuetools metal">
        <button onclick="clearQueue()" style="float: left; border-radius: 0px 50px 50px 50px; width: 55px; margin: 6px 5px; text-align: right; margin-right: 5px; line-height: 26px; text-align: center;">Clear</button>
        <button onclick="stopVid()" style="float: left; border-radius: 0  0; line-height: 26px; width: 41px; margin: 6px 0;">Stop</button>
        <button onclick="playNext()" style="float: left; margin-right: 0px; border-radius: 0 0px 0px 9999px; line-height: 3px; width: 25px; transform: rotateZ(45deg); left: 108px; height: 25px; position: absolute; top: 3px; f; font-size: 12px;"></button>
        <button onclick="shuffleList()" style="float: left; border-radius: 50px 50px; width: 55px; margin: 6px 5px 0 36px; margin-right: 5px; line-height: 26px; text-align: center;">Shuffle</button>
        <button onclick="buffUp(10)" style="float: left; margin-right: 0px; border-radius: 0 0px 99999px 9999px; line-height: 12px; width: 46px; /* transform: rotateZ(45deg); */height: 32px; height: 36px; text-align: left; px; top: -2px; position: relative; padding: 5px;">
            Buff
            <br />
            up</button>
        <button onclick="if(event.srcElement==this){$('#chkradio').prop('checked',!$('#chkradio').prop('checked')); checkProbe();return false;}" style="float: left; margin-right: 0px; border-radius: 99999px 9999px 0 0px; line-height: 12px; width: 46px; /* transform: rotateZ(45deg); */height: 32px; height: 36px; text-align: right; px; top: -2px; position: absolute; right: 3px; padding: 5px;">
            <input id="chkradio" type="checkbox" checked="checked" onclick="checkProbe()" style="margin-top: -2px; margin-right: -3px;" />Radio
        </button>
    </div>
    <div id="qcontainer" style="direction: rtl; position: fixed; width: 350px; bottom: 49px;background-color: #2F2F2F; overflow-x: hidden; overflow-y: auto; z-index: 12; box-sizing: border-box; min-height: 0; top: 221px; box-shadow: inset -3px 0px 2px -3px, 3px -4px 2px -3px;">
        <div id="queue" style="position: initial; width: 338px;" class="sortcontainer nmetal"></div>
    </div>
    <div id="logo" style="perspective: 1100px;">
        <div id="logo_sizer" onclick="playNext()">
            <div id="logo_inner" style="width: 100%; height: 100%; transform: rotateY( 0deg ); transition: 1.5s;">
            </div>
        </div>











    </div>

    <div id="scrollspace" style="padding-top: 42px; display: none; z-index: 13; overflow: auto; position: fixed; left: 350px; top: 121px; bottom: 50px; right: 0px;">
        <div id="stage" style="padding-top: 20px; padding-left: 10px; padding-bottom: 50px;">
            <!--stage-->

        </div>
        <div id="settings" class="hoverpanel" style="min-width: 600px; display: none; background-color: rgba(255, 255, 255, 0.239216);">
            <h1 style="position: relative;">Listricity Settings
                <div style="position: absolute; right: -32px; width: 100px; height: 100px; background-color: rgba(255, 255, 255, 0.14); top: -30px; border-radius: 50%; box-shadow: 0 0 10px -2px; background-image: url(cog.png); background-position: center 19px; background-repeat: no-repeat; background-size: 76px; font-size: 1px; text-align: center; vertical-align: middle; line-height: 92px;">
            </div>
            </h1>
            <hr>
            <div style="line-height: normal; font-size: 20px; text-align: left; padding-bottom: 16px;">Listricity keeps track of your prefernces, the settings screen is where you can view and edit them</div>
            <h3>Suggestions flags</h3>
            <div style="line-height: normal; font-size: 20px; text-align: left; padding-bottom: 16px;">Listricity promotes tracks that match the following cryteria</div>

            <!--<h5>Optimal length</h5>-->

            <p>
                <label for="amount">Optimal track length:</label>
                <input type="text" id="amount" readonly style="border: 0; color: #0E0E0E; font-weight: bold; font-size: 18px; background: none; width: 300px; text-align: right; float: right;">
            </p>

            <div id="slider-range-optimal-length"></div>
            <br />
            <br />

            <h3>Exclution flags</h3>
            <table>
                <tr>
                    <td style="vertical-align: top; width: 40%; padding: 10px 40px 10px 0px;">
                        <div style="line-height: normal; font-size: 20px; text-align: left; padding-bottom: 16px;">Listricity exclude suggestion for tracks containing the following texts:</div>
                    </td>
                    <td>
                        <select multiple="multiple" style="width: 100%; height: 200px; font-size: 18px; font-family: sans-serif;"
                            id="selexclude">
                        </select>
                        <div style="text-align: center; margin-top: 6px; background: none; box-shadow: none;"
                            class="metal">
                            <button style="margin-right: 4px;" onclick="addExclusion()">Add</button>
                            <button onclick="removeExclusion()" class="" style="">Remove</button>
                        </div>
                    </td>
                </tr>
            </table>
            <br />
            <br />
            <span style="display: none;">
                <h3>Star gradings</h3>
                <div style="line-height: normal; font-size: 20px; text-align: left; padding-bottom: 16px;">
                    The tracks that you star are used to optimize the suggestions and additions made by Listricity. Here you can remove any wrongly starred tracks
                </div>

                <div id="starred">
                </div>

            </span>



            <%--<div style="height: 80vh;"></div>--%>
        </div>





        <div id="help" class="hoverpanel" style="display: inline; min-width: 600px; background-color: rgba(255, 255, 255, 0.44);">




            <div id="helpinit">

                <nav>
                    <div>

                        <div style="height: 90px;">
                            <h2>
                                <img src="listricitywhite2.png" style="margin-left: -9px;">
                            </h2>

                        </div>
                    </div>
                </nav>
                <main>

                    <section>
                        <div>
                            <div>

                                <div>
                                    <h1>Wellcome to the Full-Featured Cloud-Based Online music player</h1>

                                    <p style="background-image: url(intuitive-icon.png); background-repeat: no-repeat; padding-left: 87px; background-size: 64px; min-height: 75px; padding-top: 10px; margin-top: -10px;">
                                        Create and manage your playlists using a smart set of intuitive tools.
                                        <br>
                                        <br>
                                        <span style="white-space: nowrap;">To&nbsp;start,&nbsp;<span onclick="$('#q').focus().css({'width': $('#maintools').width() - 32});" style="background-color: rgb(118, 220, 254); padding: 0 5px; border-radius: 5px; transform: skew(-10deg); display: inline-block; cursor: pointer;">Search&nbsp;for&nbsp;an&nbsp;artist</span>
                                            <img src="bluearrow.png" style="position: absolute; transform: rotate(128deg) scale(-1,1); margin-left: -114px; margin-top: -165px; width: 200px; z-index: -1; height: 122px; opacity: .5;">
                                            &nbsp;or&nbsp;<span style="background-color: #feec76; padding: 0 5px; border-radius: 5px; transform: skew(-10deg); display: inline-block;">Click&nbsp;the&nbsp;mood&nbsp;you're&nbsp;in</span>
                                            <img src="goldarrow.png" style="position: absolute; transform: rotate(-48deg) scale(-1,1); margin-left: -130px; margin-top: -1px; width: 155px; z-index: -1; height: 82px; opacity: .5;">
                                        </span>
                                        <!--<a href="#" onclick="setup()" class="bluebutton">OK, Start the music!</a>-->
                                        <br>
                                    </p>
                                </div>

                            </div>

                            <br />

                            <div id="moodsui" style="ndisplay: none;">
                                <div>
                                    <div class="mainMoodBox">
                                        <div class="boxmood" mood="Feeling_good">
                                            <div class="moodhl">Feeling Good</div>
                                            <br />
                                            <div class="boxmood" mood="Hits">
                                                <div class="moodhlnc">Hits</div>
                                            </div>
                                            <br />
                                            <div class="boxmood" mood="Happy">
                                                <div class="moodhl">Happy</div>
                                                <br />
                                                <div class="boxmood" mood="Sunday_morning">
                                                    <div class="moodhlnc">Sunday Morning</div>
                                                </div>
                                                <br />
                                                <div class="boxmood">
                                                    <div class="moodhl">Dreamy</div>
                                                    <br />
                                                    <div class="boxmood">
                                                        <div class="moodhlnc">Hopeful</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <br />
                                            <div class="boxmood">
                                                <div class="moodhl">Calm</div>
                                                <br />
                                                <div class="boxmood">
                                                    <div class="moodhlnc">Relaxation</div>
                                                    <br />
                                                    <%--        <div class="boxmood"> Easy </div><br/>
        <div class="boxmood"> Tender </div>--%>
                                                </div>
                                            </div>
                                            <br />
                                            <div class="boxmood">
                                                <div class="moodhl">Chillout</div>
                                                <br />
                                                <div class="boxmood">
                                                    <div class="moodhlnc">Cool</div>
                                                </div>
                                            </div>
                                            <br />
                                            <%--<div class="boxmood"> Euphorical </div>--%>
                                        </div>

                                    </div>
                                    <div class="mainMoodBox">

                                        <div class="boxmood" mood="Party">
                                            <div class="moodhl">Party</div>
                                            <br />
                                            <div class="boxmood">
                                                <div class="moodhl">Dance</div>
                                                <br />
                                                <div class="boxmood" mood="Dance_euphorical">
                                                    <div class="moodhlnc">Euphorical</div>
                                                </div>
                                                <br />
                                                <div class="boxmood" mood="Dance_slow">
                                                    <div class="moodhlnc">Slow</div>
                                                </div>
                                            </div>
                                            <br />
                                            <div class="boxmood" mood="Groove">
                                                <div class="moodhlnc">Groove</div>
                                            </div>
                                            <br />
                                        </div>

                                    </div>
                                    <div class="mainMoodBox">

                                        <div class="boxmood" mood="Waking_Up">
                                            <div class="moodhl">Waking Up</div>
                                            <br />
                                            <div class="boxmood">
                                                <div class="moodhlnc" mood="waking_up_slowly">Slowly</div>
                                            </div>
                                            <br />
                                            <div class="boxmood">
                                                <div class="moodhlnc" mood="sleep">Back to sleep</div>
                                            </div>
                                            <br />

                                        </div>
                                    </div>
                                    <div class="mainMoodBox">

                                        <div class="boxmood" mood="Energetic">
                                            <div class="moodhl">Energetic</div>
                                            <br />
                                            <div class="boxmood">
                                                <div class="moodhlnc">Powerful</div>
                                            </div>
                                            <br />
                                            <div class="boxmood">
                                                <div class="moodhlnc">Victorious</div>
                                            </div>
                                            <br />
                                            <div class="boxmood">
                                                <div class="moodhl">Energy Booster</div>
                                                <br />
                                                <div class="boxmood">
                                                    <div class="moodhlnc">Fast</div>
                                                </div>
                                            </div>
                                            <br />
                                            <div class="boxmood">
                                                <div class="moodhl">Gym</div>
                                                <br />
                                                <div class="boxmood" mood="Gym_fast">
                                                    <div class="moodhl">Fast</div>
                                                    <br />
                                                    <div class="boxmood" mood="Gym_very_fast">
                                                        <div class="moodhlnc">Very Fast</div>
                                                    </div>
                                                </div>
                                                <br />
                                                <div class="boxmood" mood="Gym_woman">
                                                    <div class="moodhlnc">Girls</div>
                                                </div>
                                                <br />
                                                <div class="boxmood" mood="Gym_slow">
                                                    <div class="moodhlnc">Slow</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mainMoodBox">

                                        <div class="boxmood" mood="Sad">
                                            <div class="moodhl">Sad</div>
                                            <br />
                                            <div class="boxmood">
                                                <div class="moodhlnc">Sentimental</div>
                                            </div>
                                            <br />
                                            <div class="boxmood">
                                                <div class="moodhlnc">Melancholic</div>
                                            </div>
                                            <br />
                                            <div class="boxmood">
                                                <div class="moodhlnc">Nostalgic</div>
                                            </div>
                                            <br />
                                            <div class="boxmood">
                                                <div class="moodhl">Angry</div>
                                                <br />
                                                <div class="boxmood">
                                                    <div class="moodhlnc">Revolted</div>
                                                </div>
                                                <br />
                                                <div class="boxmood">
                                                    <div class="moodhlnc">Tense</div>
                                                </div>
                                            </div>
                                            <br />
                                            <div class="boxmood">
                                                <div class="moodhlnc">Scared</div>
                                            </div>
                                            <br />
                                            <div class="boxmood">
                                                <div class="moodhlnc">Tormented</div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="mainMoodBox">

                                        <div class="boxmood" mood="Sensual">
                                            <div class="moodhl">Sensual</div>
                                            <br />
                                            <div class="boxmood">
                                                <div class="moodhlnc">Sexual</div>
                                            </div>
                                            <br />
                                            <div class="boxmood">
                                                <div class="moodhlnc">Soft</div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="mainMoodBox">

                                        <div class="boxmood" mood="Driving">
                                            <div class="moodhl">Driving</div>
                                            <br />
                                            <div class="boxmood" mood="Driving_holidays">
                                                <div class="moodhlnc">Holidays</div>
                                            </div>
                                            <br />
                                            <div class="boxmood" mood="Driving_week-end">
                                                <div class="moodhlnc">Week-end</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mainMoodBox">

                                        <div class="boxmood" mood="Eating_with_friends">
                                            <div class="moodhl">Eating</div>
                                            <br />
                                            <div class="boxmood" mood="Eating_with_friends">
                                                <div class="moodhlnc">With Friends</div>
                                            </div>
                                            <br />
                                            <div class="boxmood" mood="Eating_with_myself">
                                                <div class="moodhlnc">With Myself</div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="mainMoodBox">

                                        <div class="boxmood" mood="Studying">
                                            <div class="moodhl">Studying</div>
                                            <br />
                                            <div class="boxmood" mood="Studying_no_vocal">
                                                <div class="moodhlnc">No vocals</div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <!--


                            <a class="mnulink" href="/pop">
                                <div class="searchheadersticky slidein genere" style="white-space:nowrap;cursor:pointer;overflow:hidden;display: inline-block;margin:20px 20px 0px 20px;cursor:pointer; display:inline-block;font-size:30px;padding:10px 15px 10px 30px;" onclick="dosearch('pop music','genere');$('.genere, .tabs').remove();">
                                    <span class="sprite" style="background-position:-630px 5px;width:100px;height:100px; margin-right: 15px;"></span>Pop
                                    <div class="dosearch searchtool"></div>
                                </div>
                            </a>
                            <a class="mnulink" href="/hip+hop">
                                <div class="searchheadersticky slidein genere" style="white-space:nowrap;cursor:pointer;overflow:hidden;display: inline-block;margin:20px 20px 0px 20px;cursor:pointer; display:inline-block;font-size:30px;padding:10px 15px 10px 30px; "
                                onclick="dosearch('hip hop music','genere');$('.genere, .tabs').remove();"><span class="sprite" style="background-position:-840px 5px;width:100px;height:100px; margin-right: 15px;"></span>Hip hop
                                    <div class="dosearch searchtool"></div>
                                </div>
                            </a>
                            <a class="mnulink" href="/disco">
                                <div class="searchheadersticky slidein genere" style="white-space:nowrap;cursor:pointer;overflow:hidden;display: inline-block;margin:20px 20px 0px 20px;cursor:pointer; display:inline-block;font-size:30px;padding:10px 15px 10px 30px; "
                                onclick="dosearch('disco music','genere');$('.genere, .tabs').remove();"><span class="sprite" style="background-position:-1050px 5px;width:100px;height:100px; margin-right: 15px;"></span>Disco
                                    <div class="dosearch searchtool"></div>
                                </div>
                            </a>
                            <a class="mnulink" href="/electro+house">
                                <div class="searchheadersticky slidein genere" style="white-space:nowrap;cursor:pointer;overflow:hidden;display: inline-block;margin:20px 20px 0px 20px;cursor:pointer; display:inline-block;font-size:30px;padding:10px 15px 10px 30px; "
                                onclick="dosearch('electro house music','genere');$('.genere, .tabs').remove();"><span class="sprite" style="background-position:-1260px 5px;width:100px;height:100px; margin-right: 15px;"></span>Electro house
                                    <div class="dosearch searchtool"></div>
                                </div>
                            </a>
                            <a class="mnulink" href="/rhythm+and+blues">
                                <div class="searchheadersticky slidein genere" style="white-space:nowrap;cursor:pointer;overflow:hidden;display: inline-block;margin:20px 20px 0px 20px;cursor:pointer; display:inline-block;font-size:30px;padding:10px 15px 10px 30px; "
                                onclick="dosearch('rhythm and blues music','genere');$('.genere, .tabs').remove();"><span class="sprite" style="background-position:-1470px 5px;width:100px;height:100px; margin-right: 15px;"></span>Rhythm and blues
                                    <div class="dosearch searchtool"></div>
                                </div>
                            </a>
                            <a class="mnulink" href="/latin">
                                <div class="searchheadersticky slidein genere" style="white-space:nowrap;cursor:pointer;overflow:hidden;display: inline-block;margin:20px 20px 0px 20px;cursor:pointer; display:inline-block;font-size:30px;padding:10px 15px 10px 30px; "
                                onclick="dosearch('latin music','genere');$('.genere, .tabs').remove();"><span class="sprite" style="background-position:-1680px 5px;width:100px;height:100px; margin-right: 15px;"></span>Latin
                                    <div class="dosearch searchtool"></div>
                                </div>
                            </a>
                            <a class="mnulink" href="/country">
                                <div class="searchheadersticky slidein genere" style="white-space:nowrap;cursor:pointer;overflow:hidden;display: inline-block;margin:20px 20px 0px 20px;cursor:pointer; display:inline-block;font-size:30px;padding:10px 15px 10px 30px; "
                                onclick="dosearch('country music','genere');$('.genere, .tabs').remove();"><span class="sprite" style="background-position:-1890px 5px;width:100px;height:100px; margin-right: 15px;"></span>Country
                                    <div class="dosearch searchtool"></div>
                                </div>
                            </a>
                            <a class="mnulink" href="/metal">
                                <div class="searchheadersticky slidein genere" style="white-space:nowrap;cursor:pointer;overflow:hidden;display: inline-block;margin:20px 20px 0px 20px;cursor:pointer; display:inline-block;font-size:30px;padding:10px 15px 10px 30px; "
                                onclick="dosearch('metal music','genere');$('.genere, .tabs').remove();"><span class="sprite" style="background-position:-2100px 5px;width:100px;height:100px; margin-right: 15px;"></span>Metal
                                    <div class="dosearch searchtool"></div>
                                </div>
                            </a>
                            <a class="mnulink" href="/rock">
                                <div class="searchheadersticky slidein genere" style="white-space:nowrap;cursor:pointer;overflow:hidden;display: inline-block;margin:20px 20px 0px 20px;cursor:pointer; display:inline-block;font-size:30px;padding:10px 15px 10px 30px; "
                                onclick="dosearch('rock music','genere');$('.genere, .tabs').remove();"><span class="sprite" style="background-position:-2310px 5px;width:100px;height:100px; margin-right: 15px;"></span>Rock
                                    <div class="dosearch searchtool"></div>
                                </div>
                            </a>
                            <a class="mnulink" href="/folk">
                                <div class="searchheadersticky slidein genere" style="white-space:nowrap;cursor:pointer;overflow:hidden;display: inline-block;margin:20px 20px 0px 20px;cursor:pointer; display:inline-block;font-size:30px;padding:10px 15px 10px 30px; "
                                onclick="dosearch('folk music','genere');$('.genere, .tabs').remove();"><span class="sprite" style="background-position:-2520px 5px;width:100px;height:100px; margin-right: 15px;"></span>Folk
                                    <div class="dosearch searchtool"></div>
                                </div>
                            </a>
                            <a class="mnulink" href="/blues">
                                <div class="searchheadersticky slidein genere" style="white-space:nowrap;cursor:pointer;overflow:hidden;display: inline-block;margin:20px 20px 0px 20px;cursor:pointer; display:inline-block;font-size:30px;padding:10px 15px 10px 30px; "
                                onclick="dosearch('blues music','genere');$('.genere, .tabs').remove();"><span class="sprite" style="background-position:-2730px 5px;width:100px;height:100px; margin-right: 15px;"></span>Blues
                                    <div class="dosearch searchtool"></div>
                                </div>
                            </a>
                            <a class="mnulink" href="/reggae">
                                <div class="searchheadersticky slidein genere" style="white-space:nowrap;cursor:pointer;overflow:hidden;display: inline-block;margin:20px 20px 0px 20px;cursor:pointer; display:inline-block;font-size:30px;padding:10px 15px 10px 30px; "
                                onclick="dosearch('reggae music','genere');$('.genere, .tabs').remove();"><span class="sprite" style="background-position:-2940px 5px;width:100px;height:100px; margin-right: 15px;"></span>Reggae
                                    <div class="dosearch searchtool"></div>
                                </div>
                            </a>
                            <a class="mnulink" href="/jazz">
                                <div class="searchheadersticky slidein genere" style="white-space:nowrap;cursor:pointer;overflow:hidden;display: inline-block;margin:20px 20px 0px 20px;cursor:pointer; display:inline-block;font-size:30px;padding:10px 15px 10px 30px; "
                                onclick="dosearch('jazz music','genere');$('.genere, .tabs').remove();"><span class="sprite" style="background-position:-3150px 5px;width:100px;height:100px; margin-right: 15px;"></span>Jazz
                                    <div class="dosearch searchtool"></div>
                                </div>
                            </a>
                            <a class="mnulink" href="/classical">
                                <div class="searchheadersticky slidein genere" style="white-space:nowrap;cursor:pointer;overflow:hidden;display: inline-block;margin:20px 20px 0px 20px;cursor:pointer; display:inline-block;font-size:30px;padding:10px 15px 10px 30px; "
                                onclick="dosearch('classical music','genere');$('.genere, .tabs').remove();"><span class="sprite" style="background-position:-3360px 5px;width:100px;height:100px; margin-right: 15px;"></span>Classical
                                    <div class="dosearch searchtool"></div>
                                </div>
                            </a>
                            <a class="mnulink" href="/world">
                                <div class="searchheadersticky slidein genere" style="white-space:nowrap;cursor:pointer;overflow:hidden;display: inline-block;margin:20px 20px 0px 20px;cursor:pointer; display:inline-block;font-size:30px;padding:10px 15px 10px 30px; "
                                onclick="dosearch('world music','genere');$('.genere, .tabs').remove();"><span class="sprite" style="background-position:-3570px 5px;width:100px;height:100px; margin-right: 15px;"></span>World
                                    <div class="dosearch searchtool"></div>
                                </div>
                            </a>

                                -->


                            <div class="spacer"></div>

                            <br />
                            <br />
                            <br />




                            <div>
                                <div>
                                    <h2>All the tracks from the cloud.
                                        <br>
                                        and the smartest playlist tools
                                    </h2>
                                    <p>
                                        Listricity creates great playlists in minutes by making suggestions according to your searches and selections
                                        <br />
                                        <br />
                                        Manually drag and drop video suggestions into&nbsp;your&nbsp;playlist,
                                        <br />
                                        <b>Or better yet!</b> tell Listricity how much you like (or dislike) a suggestion and have great playlists created for you.

                                        <br>
                                        <br>
                                        <a href="#" onclick="setup()" class=" bluebutton">Start listening now</a>
                                    </p>
                                    <div>
                                        <div>
                                            <div>
                                                <h2 style="">
                                                    <br class="small-hide">
                                                    The&nbsp;world’s<br>
                                                    smartest playlist builder.</h2>
                                                <p style="background-image: url(saas-icon.png); background-repeat: no-repeat; padding-left: 87px; background-size: 64px; padding-top: 10px; margin-top: -10px;">
                                                    Listricity uses dozens of indicators, from the length of a track to the number of likes and views it received, in combination with the most advanced AI methodologies to bring the best suggestions to your searches.
                                                    <br>
                                                    Once you made a few selections, and Listricity gets to know your taste, suggestions and automatic additions to&nbsp;your&nbsp;playlist will be tailor made, just for you.
                                                </p>
                                                <br />
                                                <br />
                                                <p style="" class="more-block"><a href="#" onclick="setup()" class="more bluebutton">Get Started</a></p>
                                                <br />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div>

                            <div class="column large-5 medium-6 small-12">
                                <div>
                                    <div>
                                        <h2 style="">Regain control over your playlists<br class="small-hide">
                                        </h2>
                                        <p style="">
                                            Listricity brings the variety of music from the cloud together with a set of powerful tools, all into a beautiful and interactive application
                                            <br>
                                            <br>
                                            Whether you like to search by artist, band, song name, or music genre, Listricity will be right there next to you reminding you of related beloved tracks
                                        </p>

                                        <p style="" class="more-block">
                                            <a href="#" onclick="setup()" style="" class="bluebutton">Start now</a>
                                            <br />
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>











































                        <center style="margin-bottom: -50px; height: 200px;">
                            <div>
                                <a href="mailto:hi@listricity.com?Subject=Hi%20Listrcicity" target="_blank" style="text-decoration: none;">
                                    <div class="share email">
                                    </div>
                                </a>
                                <div class="share facebook" onclick="window.open('https://www.facebook.com/Listricity-769355723196876/','share')">
                                </div>
                                <div class="share twitter" onclick="window.open('https://twitter.com/listricitymusic','share')">
                                </div>
                            </div>

                        </center>
                    </section>

                </main>

            </div>



            <h1 style="position: relative;">Meet Listricity
                <div style="position: absolute; right: -32px; width: 100px; height: 100px; background-color: rgba(255, 255, 255, 0.14); top: -30px; border-radius: 50%; box-shadow: 0 0 10px -2px; background-image: url(lg1.png); background-position: center; background-repeat: no-repeat; background-size: 86px;"></div>
            </h1>
            <hr>
            <div style="line-height: normal; font-size: 20px; text-align: left; padding-bottom: 16px;">Listricity creates great playlists in minutes by making suggestions according to your searches and selections</div>
            <div style="background-image: url(arrarea.png); width: 100%; height: 332px; background-size: contain; background-repeat: no-repeat; text-align: center; line-height: 53px; font-size: 35px; padding-top: 147px; margin-bottom: 12px; box-sizing: border-box; background-position: center; min-width: 400px;"
                class="">
                Suggestions
                <br>
                Space


            </div>
            <div style="line-height: normal; font-size: 20px; text-align: left;">In the suggestions space you'll find video suggestions based on your recent actions.</div>
            <div style="background-image: url(arrleft.png); width: 100%; height: 150px; background-size: 230px; background-repeat: no-repeat; line-height: 25px; font-size: 35px; padding-left: 13vw; box-sizing: border-box; margin-top: 63px; margin-left: -43px;" class="">
                Playlist
                <br>
                <div style="line-height: normal; font-size: 20px; text-align: left; padding-top: 7vw;">
                    You can drag and drop video suggestions into your playlist
                    <br>
                    <br>
                    But better yet! you can tell Listricity which tracks you like, using the
                    <img style="width: 25px; margin-bottom: -7px;" src="/icons/flowericon3.png" />
                    flower icon, and let listricity do all the heavy lifting
                    <br />
                    <br />
                    <br />
                    <%--But better yet! you can tell Listricity how much you like (or disslike) a suggestion and let it do all the heavy lifting--%>
                </div>
            </div>
            <%--            <div style="line-height: normal;font-size: 20px;text-align: left;margin-top: 124px;padding-bottom: 20px;">Here is how its done
                <br> When you hover your mouse over a suggestion, a set of tools pops up.
            </div>
            <div style="background-image: url(sug.png);width: 100%;height: 136px;background-repeat: no-repeat;line-height: 25px;font-size: 35px;box-sizing: border-box;" class="">
                <div style="height: 89px;"></div>
                <div style="line-height: normal;font-size: 20px;text-align: left;padding-top: 50px;">
                    Use the stars panel to express your feelings regarding a suggestion
                    <ul>

                        <li><b>5 Star</b>
                            <br>
                            <img src="5star.jpg" />
                            <br/>Adds the video to the playlist and many more vidoes like it</li>
                        <li><b>4 Star</b>
                            <br>
                            <img src="4star.jpg" />
                            <br/>Pretty good, add it and a few more</li>
                        <li><b>3 Stars</b>
                            <br>
                            <img src="3star.jpg" />
                            <br/>Well... add just this one</li>
                        <li><b>2 Star</b>
                            <br>
                            <img src="2star.jpg" />
                            <br/>Kinda bad - remove from suggestions and never add automatically
                            <br/>
                        </li>
                        <li><b>1 Star</b>
                            <br>
                            <img src="1star.jpg" />
                            <br/>Sucks big time - don't show again</li>
                    </ul>
                </div>
            </div>
            <div style="height: 500px;"></div>--%>

            <%--<div style="line-height: normal;font-size: 20px;text-align: left;padding-bottom: 20px;">Listricity remembers your choices and tastes.
                <br>When suggestions are made or when the playlist is automatically buffed up, those preferences are used.</div>--%>
            <div style="width: 100%; height: 150px; line-height: 25px; font-size: 35px; padding-left: 100px; box-sizing: border-box; margin-left: -43px; position: fixed; bottom: -500px; padding-top: 64px; display: ; background-image: url(&quot;arrbottomleft.png&quot;); background-size: 230px; background-repeat: no-repeat;"
                class="" id="helptoolsarrow">
                Playlist tools
                <br>
            </div>


            <div style="line-height: normal; font-size: 20px; text-align: left; margin-top: 100px; height: 400px;" id="helptools">
                At the bottom of the playlist youll find your playlist tools
                <br>
                <br>
                Clear the list, stop, play, or shuffle and...
                <div>
                    <div style="padding-left: 280px; right: 0; float: right; margin-top: 24px;">
                        <!--Buff up -->
                        <br>
                        <br>
                        <button onclick="" style="float: left; margin-right: 22px; border-radius: 0 0px 99999px 9999px; line-height: 12px; width: 46px; */height: 32px; height: 36px; text-align: left; px; top: -6px; position: relative;">Buff up</button>
                        This button adds tracks to your playlist based on the current contents of it, and on your previous selections.
                        <br>
                        <br>
                        <!--Radio-->
                        <br>
                        <br>
                        <button style="float: left; margin-right: 22px; border-radius: 99999px 9999px 0 0px; line-height: 12px; width: 46px; height: 36px; text-align: right; px; top: -6px; right: 3px;" onclick="">
                            <input id="chkradio" type="checkbox" onclick="" style="margin-top: -2px; margin-right: -3px;">Radio</button>Checking the radio button automatically adds more tracks to the playlist when the last tracks are played.
                    </div>

                </div>
            </div>


            <div style="line-height: 43px; font-size: 35px; box-sizing: border-box; margin-left: -43px; position: fixed; top: -500px; padding-top: 76px; right: 16px; height: 300px; text-align: left; width: 301px; padding-right: 111px; background-image: url(&quot;arrtopright.png&quot;); background-size: 230px; background-position: 100% 50%; background-repeat: no-repeat;"
                class="" id="helpsavearrow">
                &nbsp;&nbsp;&nbsp;Save it

                <br>
            </div>


            <div style="line-height: normal; font-size: 20px; text-align: left; margin-top: 200px; height: 400px;" id="savetools">
                <h1>Made a great playlist?</h1>
                <br />
                <br />
                On the top right you'll find
                <br />
                everything you need in order to:
                <br />
                <ul>
                    <li>Save your lists</li>
                    <li>Load them again</li>
                    <li>Rename a list</li>
                    <li>Duplicate a list</li>
                    <li>and Delete lists</li>
                </ul>
            </div>







            <div style="line-height: 40px; font-size: 35px; box-sizing: border-box; margin-left: -43px; position: fixed; top: -500px; padding-top: 38px; left: 426px; height: 300px; text-align: right; width: 404px; padding-right: 111px; background-image: url(&quot;arrupright.png&quot;); background-size: 122px; background-repeat: no-repeat;"
                class="" id="helpviewportarrow">
                Resizable
                <!--<br>&amp;-->
                <!--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->
                <!--<br>Detachable-->
                <br>
                Viewport
                <br>
            </div>

            <div style="line-height: normal; font-size: 20px; text-align: left; height: 400px; padding-left: 300px;" id="helpviewport">
                <h1>The viewport area is resizable</h1>
                <br>
                <br>
                Drag it to whatever size you want or use the icon on the top left to toggle between vew states.
                <br>
                <br>
                Double click for full screen
                <br>
                <br>
                And use the video controls, to set the volume and to seek to a point in the track.
                <!--And use the stay-op-top button to keep only the viewport on top of all other windows.-->
            </div>



            <hr>
            <h1>That's it!</h1>
            Click the
            <button onclick="clearSug()" style="top: -7px; position: relative; border-radius: 50px 0 0px 50px; text-align: right; width: 52px; margin-bottom: 2px; */">
                &#9836;
                <br>
                Home</button>
            button to start browsing geners or start a search on the search box
            <br>
            For advanced features and configurations click the
            <button onclick="settings()" class="btnsettings" style="float: none; margin-right: auto;">
                Settings
                <span style="font-size: 15px; top: 0px; position: absolute; left: 1px; height: 16px;">&#9881;</span>
            </button>
            button.


            <div style="height: 100px;"></div>
            <br>
            <br>
            <hr>
            <h1>Drop me a line</h1>
            Listricity is still young and relays on your input to keep improving
            <br>
            So please write an email to <a href="mailto:hi@listricity.com?Subject=Hi%20Listrcicity" target="_blank" style="text-decoration: none; color: white;">hi@listricity.com</a> about any idea, requested feature, found bug, or anything else really.
            <br>
            <br>
            <div style="height: 300px;"></div>
            <div id="socialmentions">
                <%=new System.Net.WebClient().DownloadString("http://json.feelter.com/?q=online music player&format=html&frameElements=[%27nostatsPreview%27,%27noheader%27,%27nomediaPreview%27,%27noshareLinks%27]&columnscount=2&tabs=[%27mentions%27]&noscript=true").Replace("width: 750px", "width:100%") %>
            </div>
            <br>
            <br>
            <hr>
            Still here? ok, let’s do some
            <h1>Frequently Asked Questions</h1>
            <br>
            <div class="faqgroup">
                <span class="faqq">Q</span>What is the meaning of life?
                <br>
                <br>
                <span class="faqq">A</span>Hah! Easy, life is absolutely meaningless, next question.
            </div>
            <br>
            <div class="faqgroup">
                <span class="faqq">Q</span>If Spiderman and Superman were to fight, who would win?
                <br>
                <br>
                <span class="faqq">A</span>Good question! You see, Superman is an alien who can turn back time, so there's no match really.
            </div>
            <br>
            <div class="faqgroup">
                <span class="faqq">Q</span>Where is the music coming from?
                <br>
                <br>
                <span class="faqq">A</span>Wha… What … music in general you mean?
            </div>
            <br>
            <div class="faqgroup">
                <span class="faqq">Q</span>Waidaminute! are you writing those questions yourself?!?
                <br>
                <br>
                <span class="faqq">A</span>OK, out of time, enough questions for now, let’s do this again some time, ha?
            </div>
            <br>


            <div style="height: 300px;"></div>

        </div>





    </div>
    </div>
    <div class="sugmore " onclick="showSuggestions()"><span class="downarrow"></span>Suggestions</div>
    <div width="292" height="193" style="position: fixed; top: 0px; margin-bottom: 10px; left: 0px; width: 292px; height: 193px; display: none; box-shadow: 0 2px 2px 1px white,-1px 2px 1px 1px #333;">
    </div>
    <div class="inittabs" id="inittabs" style="width: 614px; width: 429px; padding-left: 10px; border-bottom: 1px solid rgba(255,255,255,.2); position: absolute; left: 350px; top: 121px; box-shadow: inset 20px -10px 10px rgba(0,0,0,.5); background-image: url(/galaxymenu3.png); white-space: nowrap; z-index: 14; background-position: -10px -8px; background-size: 452px 50px; overflow: hidden; background-repeat: no-repeat; border-radius: 0 0 3px 0;">
        <div onclick="showSug(true)" id="sug_tab">Suggestions</div>
        <div class="selected" onclick="showMoods()" id="mood_tab">Moods</div>
        <div id="genre_tab" onclick="showGenre()" class="" style="border-radius: 0 0 3px 0;">Music Genres</div>
        <%--<div onclick="$('#stage_moods').hide();$('#stage_genres').show();$('.selected').removeClass('selected');$(this).addClass('selected');$('#scrollspace').removeClass('moodsbg'); class="">Saved Playlists</div>--%>
    </div>


    <div id="dialog" title="" style="display: none">
        <div>
            <label>Playlist name:</label>
            <input id="name" name="name" type="text">
        </div>
    </div>
    <div id="emptysug" style="display: none;">
        <div style="background-image: url(arrarea.png); width: 100%; height: 332px; background-size: contain; background-repeat: no-repeat; text-align: center; line-height: 53px; font-size: 35px; padding-top: 147px; margin-bottom: 12px; box-sizing: border-box; background-position: center; min-width: 400px;" class="">
            Suggestions
                <br>
            Space


        </div>
        <h1>No suggestions yet</h1>
        Start a search, select a music genre, or mood to get started<br>
        <br>
    </div>
    <script>
        function showMoods() {
            perspective = 'browse';
            $("#scrollspace").animate({
                scrollTop: 0
            });

            $('.sugmore').htmlReplace('Click the mood you\'re in to start playing a freshly baked, mood-oriented playlist that is <img style="display: inline;width: 121px;vertical-align: middle;margin-right: -11px;" src="/different.png"/> <u>EVERY TIME!</u>');
            $('#stage_genres').hide(); $('#stage_moods').show(); $('.selected').removeClass('selected'); $('#mood_tab').addClass('selected'); $('#scrollspace').addClass('moodsbg');
            $('#stage_sug').hide();
        }
        function showGenre() {
            perspective = 'browse';
            $("#scrollspace").animate({
                scrollTop: 0
            });
            $('.sugmore').htmlReplace('Click a genre to get track suggestions, or click play to ... well, to play');
            $('#stage_moods').hide(); $('#stage_genres').show(); $('.selected').removeClass('selected'); $('#genre_tab').addClass('selected'); $('#scrollspace').removeClass('moodsbg');
            $('#stage_sug').hide();
        }
        function showSug(clicked) {
            $('#socialmentions').remove();

            if ($('#stage_sug').is(':empty') && clicked)
                $('#stage_sug').html('<div class="emptyinfoinner" style="background-image: none;text-align: center;    padding-left: 0;">' + $('#emptysug').clone().css('display', 'inline-block').html() + '</div>').addClass('emptyinfo');

            $('#scrollspace').css('padding-top', '42px');
            perspective = 'results';
            setHeaders();

            $('#stage_moods').hide(); $('#stage_genres').hide(); $('#stage_sug').show(); $('.selected').removeClass('selected');
            $('#sug_tab').addClass('selected');
            $('#scrollspace').removeClass('moodsbg')
        }
        function settings() {
            perspective = 'settings';
            $('#scrollspace').removeClass('moodsbg');

            $('#starred').html('');
            for (var i = 5; i < 0; i--) {
                $('#starred').append('<h3 style="    border-bottom: 3px groove #999;height: 35px;"><img src="' + i + 'star.jpg" style="    vertical-align: bottom;transform: rotate(-' + (i * 24 / 5 - 12) + 'deg);margin-left: -10px;margin-right: 10px;margin-top: 5px;"> Starred - ' + i + '</h3>');
                var h = '<div style="max-height:320px;overflow-y:auto;">';
                for (var i1 = 0; i1 < playlists.settings.starred['star' + i].length; i1++) {
                    var v = playlists.settings.starred['star' + i][i1];
                    if (typeof v == 'undefined') continue;
                    h += '<div data-link="' + v.link + '" style="min-width:243px;white-space: nowrap;min-height: 96px;border: 1px solid;cursor:default;padding: 0;border-radius: 6px;background-color: #aaa;    display: inline-block;margin-right: 10px;margin-bottom:10px;" valign="top" class="vidui starred"><table style="width: 100%;" cellspacing="0" cellpadding="0"><tbody><tr><td width="10"><img class="vidimgui" src="https://' + v.img.replace('https://', '') + '" style="height: 96px;margin-right: 10px;border-radius: 5px 0 0 5px;border-right: 1px solid;">'
                    h += '</td><td><a href="#">' + v.title + '</a></td></tr></tbody></table>';
                    if (v.dur && v.dur != '3:33') h += '<span class="vidtimeui" >' + v.dur + '</span> ';
                    h += '<span class="del tool" title="" onclick="removeStarred(\'' + v.link + '\',' + i + ');$(this).parent().remove();return false;" style="right: 0;top: 0px;position: absolute;"></span></div>';


                }
                h += '</div>';
                $('#starred').append(h);
            }
            $('#canvas2').addClass('hoverstate');
            $('#help').fadeOut();
            $('#stage').fadeOut();
            $('#settings').fadeIn().css('display', 'inline-block');
            $('#inittabs').hide();
            $('#scrollspace').css('padding-top', '0');
        }

        function removeStarred(h, g) {
            for (var i = 5; i > 0; i--) {
                for (var i1 = 0; i1 < playlists.settings.starred['star' + i].length; i1++) {
                    var v1 = playlists.settings.starred['star' + i][i1];
                    if (v1.link == h) {
                        playlists.settings.starred['star' + i].splice(i1, 1);
                        i1--;
                    }
                }
            }
            saveList(true, true);

        }

        function help() {
            perspective = 'help';

            $('#starred').html('');
            $('#canvas2').addClass('hoverstate');
            $('#settings').hide();
            $('#stage').hide();
            $('#help').fadeIn().css('display', 'inline-block')
            $('#inittabs').hide();
            $('#scrollspace').css('padding-top', '0');

        }

        function showSuggestionsPanel() {
            //showSug();
            $('#socialmentions').remove();

            $('#inittabs').show();

            $('#scrollspace').css('padding-top', '42px');

            //if (perspective != 'browse') perspective = 'results';
            $('#scrollspace').removeClass('moodsbg');


            $('#starred').html('');
            $('#canvas2').removeClass('hoverstate');
            $('#settings').fadeOut();
            $('#help').fadeOut();
            $('#stage').fadeIn();
        }

        function saveEQ(eq) {
            playlists.lists[curlistind].eq = eq;
            saveList(true, true);
        }

        function playNext(id) {
            if (new Date() - lastplayednexttime < 2000) {
                console.log('play next canceled - too soon');
                return;
            }
            lastplayednexttime = new Date();
            console.log('play next: ' + id);

            $('#logo_inner').css({
                'transform': 'rotateY( 90deg )  scale(.1) ',
                'opacity': '0'
            });
            $('#logo').css({
                'background-size': '0px'
            });
            setTimeout("$('#logo_inner').css({'transform':'rotateY( 0deg )  scale(1)','opacity':'1'});$('#logo').css({'background-size':'0px'});", 2000);
            //debugger;
            checkProbe();
            var nextinline = false;
            if ($('#queue .vidui').length == 0) return;
            if (typeof id == 'undefined') {
                id = $('#queue .vidui.playing').next().attr('id');
                nextinline = true;
            }
            if (typeof id == 'undefined' && $('#queue .vidui.playing').next().is('.insetpoint')) id = $('#queue .vidui.playing').next().next().attr('id');
            if (typeof id == 'undefined') {
                id = $('#queue .vidui').not('.played, .playing').first().attr('id');
                //console.log('play next: no ins point ' + id);
            }
            if (typeof id == 'undefined') {
                $('#queue .vidui').removeClass('played').removeClass('playing');
                id = $('#queue .vidui').not('.played, .playing').first().attr('id');
                //console.log('play next: no ins point, no unplayed ' + id);
            }
            if (typeof id == 'undefined') return;
            var v = getVidById(id);
            //console.log('[1] play next: ' + v.link.split('?v=')[1]);
            if ($('.playing').nextAll('#queue #' + id).length > 0) nextinline = true;
            $('.playing_next').removeClass('playing_next');
            $('.playing').addClass('played').removeClass('playing');
            $('#queue #' + id).addClass('playing');
            if (nextinline)
                $('#queue #' + id).addClass('playing_next');//.css('animation-name', 'slideplayicon');
            if (!$('#logo').is('.logofullview')) {
                $('#logo_sizer').addClass('init');
                setTimeout(function () {
                    $('#logo_sizer').removeClass('init');
                }, 15000);
            }

            var lid = id;
            setTimeout(function () {
                if ($('#logo').is('.logofullview')) {
                    $('#queue').parent().animate({
                        scrollTop: $('#' + lid).position().top - 47,
                    });
                }
                else {
                    $('#queue').parent().animate({
                        scrollTop: $('#' + lid).position().top - 47 - ($('#logo').height() - 166),
                    });
                }
            }, 1000);
            $('.insetpoint').insertAfter($('#' + id));

            setTimeout(function () {
                //console.log('[2] play next: ' + v.link.split('?v=')[1]);
                document.getElementById('currentlyplaying').innerText = v.title;
                document.title = v.title;
                $('#coverad').html('<img src="https://' + v.img.replace('https://', '') + '"/>' + v.title);
                $('.titlebar').html(pretitle + ' ' + v.title);
                //ipcRenderer.send('online-status-changed', 'play:' + v.link.split('?v=')[1]);

                if (!player) {
                    //debugger;
                    player = new YT.Player('logo_inner', {
                        height: '390',
                        width: '640',
                        //origin: 'http://listricity.com',
                        videoId: v.link.split('?v=')[1],
                        playerVars: {
                            'autoplay': 1,
                            'controls': 1,
                            'autohide': 1,
                            'wmode': 'opaque',
                            'iv_load_policy': 3,
                            'modestbranding': 1,
                            'showinfo': 0,
                            'rel': 0
                        },
                        events: {
                            //'onReady': function(){$('logo_inner').css('width','100%').css('height','100%')},
                            'onStateChange': onPlayerStateChange
                        }
                    });
                }
                else {
                    //console.log('[3] play next: ' + v.link.split('?v=')[1]);
                    if (lastplayedid == v.link.split('?v=')[1]) {
                        debugger;
                    }
                    lastplayedid = v.link.split('?v=')[1];
                    player.loadVideoById(v.link.split('?v=')[1], 0, "default")
                }
                record('Play Track', v.title);
            }, 400);
        }
        function getVidById(id) {
            for (var i = 0; i < allvids.length; i++) {
                if (allvids[i].id == id) return allvids[i];
            }
            for (var i = 0; i < allvids.length; i++) {
                if (allvids[i].sug) {
                    for (var i1 = 0; i1 < allvids[i].sug; i1++) {
                        if (allvids[i].sug[i1].id == id) return allvids[i].sug[i1];
                    }
                }
            }
        }



        function layoutCurList(pos) {
            if (!statichtml)
                allvids = [];
            //else if(allvids.length>0) {
            //    allvids[0].type = 'up';
            //    allvids[0].sug = [];
            //    delete allvids[0].ui;
            //}
            pos = pos || curlistind;
            $('#queue').children().remove();
            if (playlists.lists[pos] && playlists.lists[pos].vids && !statichtml) {
                for (var i = 0; i < playlists.lists[pos].vids.length; i++) {
                    var v = playlists.lists[pos].vids[i];
                    v.type = 'up';
                    v.sug = [];
                    v.id = getVidId(v.link);
                    v.ui = false;
                    allvids.push(v);
                }
                //ipcRenderer.send('online-status-changed', 'eq:' + (playlists.lists[curlistind].eq || ''));

            }
            addMode = 'add';
            if (allvids.length > 0) ui();
            //alert('layoutCurList'+allvide);
            addMode = 'distribute';
        }

        function layoutLists() {

            $('#selplaylists').children().remove();
            for (var i = 0; i < playlists.lists.length; i++) {
                var l = playlists.lists[i];
                if (l.title == '_modifyed') continue;
                $('#selplaylists').append($('<option>', {
                    value: i,
                    text: l.title // + ' (' + l.vids.length + ')'
                }));
            }
            //alert(curlistind);
            $('#selplaylists').val(curlistind);
            layoutCurList();
        }

        $('#selplaylists').change(function () {
            if (!window.holddefaults) {
                curlistind = $('#selplaylists').val();
                layoutCurList();
                saveList(true);
            }
        });

    </script>

    </div>
    <script>
        var cs = ['ext', 'happy', 'mid', 'mad', 'fur'];
        var lastcs = cs[0];

        var fitimer = false;
        var fitimer1 = false;
        window.lastrateing = 1;
        window.lastclickedrating = 1;
        $(function () {
            if (document.location.href.indexOf('?os=w') > -1) {
                $('#qcontainer').addClass('windows');
                $('body').addClass('windows');
            }
            $('.boxmood').not('.moodhooked').click(moodClicked);
            $("#slider-range-optimal-length").slider({
                range: true,
                min: 0,
                max: 5400,
                //values: [ playlists.settings.optimalLength.from, playlists.settings.optimalLength.to ],
                slide: function (event, ui) {
                    if (ui.values[1] - ui.values[0] < 240) return false;
                    $('#amount').val(getFromToTimeText(ui.values[0], ui.values[1]));
                }
            });
            var isChrome = !!window.chrome && !!window.chrome.webstore;

            //$(document.body).on('mousemove', '#stage .vidui', function () {
            //    if (isDragging) {
            //        clearTimeout(fitimer1);
            //        fitimer1 = false;
            //        clearTimeout(fitimer);
            //        fitimer = false;
            //        return;
            //    }
            //    var p;

            //    if ($('#smiley').length == 0) {
            //        $('<div class="smiley-wrap" id="smiley" style=" ' + (isChrome ? 'right: -50px;' : 'width:0px;right: -15px;') + ';  display: block;top: -55px;border-color: rgb(75, 75, 75);"><div class="product-review-stars"><input type="radio" id="star5" name="rating" value="5" class="visuallyhidden" /><label for="star5" ntitle="Rocks! add this and many like it">★</label><input type="radio" id="star4" name="rating" value="4" class="visuallyhidden" /><label for="star4" ntitle="Pretty good, add it and a few more">★</label><input type="radio" id="star3" name="rating" value="3" class="visuallyhidden" /><label for="star3" ntitle="Well... add just this one">★</label><input type="radio" id="star2" name="rating" value="2" class="visuallyhidden" /><label for="star2" ntitle="Kinda bad - remove from suggestions">★</label><input type="radio" id="star1" name="rating" value="1" class="visuallyhidden" /><label for="star1" ntitle="Sucks big time - remove entire suggestion group">★</label></div><div class="head" style="' + (isChrome ? '' : 'display:none;visibility:hidden') + ';"><div class="eye pull-left"><div class="ball"></div></div><div class="eye pull-right"><div class="ball"></div></div></div><div class="smile"></div>').appendTo($('body'));
            //        if (window.lastrateing) $('.visuallyhidden').attr('checked', false); //$('#star'+ ((5-window.lastrateing))).attr('checked', 'unchecked');
            //    }
            //    if ($('#smiley').parent()[0] != this && $('#smiley').parent().parent()[0] != this && $('#smiley').parent().parent().parent()[0] != this) {
            //        if (fitimer) {
            //            clearTimeout(fitimer);
            //            fitimer = false;
            //        }
            //        $('#smiley').hide().delay(100).fadeIn('fast')
            //            .appendTo($(this)); //.find('.ratetools'));
            //        if (typeof window.lastclickedrating != 'undefined') {
            //            if (typeof window.lastclickedrating != 'undefined') $('.visuallyhidden').attr('checked', false); //$('#star'+ ((5-window.lastclickedrating))).attr('checked', 'unchecked');
            //            p = window.lastclickedrating;
            //            this.hoverscore = window.lastclickedrating;
            //        }
            //    }
            //    if (!$(event.srcElement).is('.tool')) {
            //        if (!fitimer1)
            //            fitimer1 = setTimeout(function () {
            //                fitimer1 = false;
            //                if (fitimer) {
            //                    clearTimeout(fitimer);
            //                    fitimer = false;
            //                }
            //                //$('#smiley').fadeIn('fast');
            //            }, 300)
            //        if (fitimer) clearTimeout(fitimer);
            //        fitimer = setTimeout(function () {
            //            //$('#smiley').fadeOut('slow');
            //        }, 1500)
            //    }
            //    else {
            //        clearTimeout(fitimer1);
            //        fitimer1 = false;
            //        clearTimeout(fitimer);
            //        fitimer = false;
            //        //$('#smiley').fadeOut('fast');
            //    }
            //    if ($(event.srcElement).parent().is('.product-review-stars')) {
            //        clearTimeout(fitimer);
            //        fitimer = false;
            //        p = 4 - ($(event.srcElement).nextAll().length) / 2;
            //        //if(p==0)p=5;

            //        $('#smiley').find('.product-review-stars input + label').removeClass('active');
            //    }
            //    else {
            //        p = window.lastclickedrating;
            //    }
            //    // else if(false){
            //    // 	var ll=event.x-$(this).position().left+$('body').scrollLeft();
            //    // 	p=Math.max(0,Math.min(cs.length-1,Math.floor((ll-18)/($(this).width())*5)));
            //    // 	p=4-p;
            //    // 	$('#smiley').find('.product-review-stars input + label').removeClass('active');
            //    // 	//for(var pn=0;pn<=p;pn++)
            //    // 	$('#smiley').find('.product-review-stars input + label:nth-of-type(n+'+(p+1)+')').addClass('active');
            //    // }
            //    //
            //    if (typeof p != 'undefined') {
            //        this.hoverscore = p;
            //        window.lastrateing = p;

            //        //console.log(p+' '+ll+' '+$(this).width())
            //        //ll-=58;
            //        //ll=Math.max(-31,ll);
            //        //ll=Math.min($(this).width()-76,ll);
            //        //console.log(p);
            //        $('#smiley').removeClass(lastcs)
            //            .addClass(cs[Math.round(p)])
            //            //.css({left:Math.min($(this).offset().left+$(this).width()-96,Math.max(event.clientX-58,$(this).offset().left))-6,top:$(this).offset().top-11})
            //            .css({
            //                right: -50,
            //                top: -55
            //                //, 'box-shadow': 'black 0px 0px 10px 0px, rgb(72, 72, 72) 0px 0px 22px 6px inset'
            //                    ,
            //                'border-color': 'rgb(75, 75, 75)'
            //                //,'background-color': 'rgb(183, 183, 183)'
            //            })
            //        lastcs = cs[Math.round(p)];
            //    }
            //})
            $('#scrollspace').scroll(setHeaders);
        });


        function getFromToTimeText(secs1, secs2) {
            return 'between ' + getTimeText(secs1) + ' and ' + getTimeText(secs2);
        }

        function getTimeText(secs) {
            var hours = Math.floor(secs / 60 / 60);
            var minutes = Math.floor(secs / 60 - hours * 60);
            var seconds = secs - (hours * 60 * 60 + minutes * 60);

            var r = '';
            if (hours > 0) r += hours + ':';
            if (minutes.toString().length == 1) minutes = '0' + minutes;
            if (seconds.toString().length == 1) seconds = '0' + seconds;
            r += minutes + ':' + seconds;
            return r;
        }


        var families = {
            "hits": -1,
            "pop": 0,
            "hip hop": 1,
            "disco": 2,
            "electro house": 3,
            "rhythm and blues": 4,
            "latin": 5,
            "country": 6,
            "metal": 7,
            "rock": 8,
            "folk": 9,
            "blues": 10,
            "reggae": 11,
            "jazz": 12,
            "classical": 13,
            "world": 14
        }
        var familiesks = Object.keys(families);

        var statichtml = false;

        function setup(isinit) {
            perspective = 'browse';
            //debugger;
            var bres = '';
            if (statichtml && isinit) {
                $('#help').hide();
                $('#helpinit,#socialmentions').hide();
                bres = $('#stage').html();
                $('#stage').html('');
                $('#stage').show();
                //   $('#inittabs').hide();
            }
            else {
                if ((isinit && (0 || (playlists.settings.starred.star1.length + playlists.settings.starred.star2.length + playlists.settings.starred.star3.length + playlists.settings.starred.star4.length + playlists.settings.starred.star5.length == 0)))) {
                    window.newlistener = true;
                    $('#scrollspace').removeClass('moodsbg');
                    //$('#stage').html('<iframe src="intro.html" style="width: 100%;height: 100%;margin-top: -20px;border: none;position: fixed;right: 8px;left: 295px;padding-right: 295px;box-sizing: border-box;padding-bottom: 171px;"></iframe>');
                    help();
                    //return;

                }
                else {
                    $('#help').hide();
                    $('#helpinit,#socialmentions').hide();
                    $('#stage').show().html(''); //'<div class="tabs"><div class="selected">Generes</div><div>Playlists</div><div>Explore</div><div>Trending</div></div>');
                    $('#inittabs').show();
                    $('#scrollspace').addClass('moodsbg');
                }
            }
            if (isinit) addMode = 'init';
            var pe = $('#stage');
            //if (document.location.href.indexOf('#test') > -1 || window.intest)
            {
                // window.intest = true;
                //$('<div class="inittabs" style="width: 676px;margin-top: -19px;margin-left: -29px;padding-left: 80px;border-bottom:none;"><div onclick="$(\'#stage_moods\').hide();$(\'#stage_genres\').show();$(\'.selected\').removeClass(\'selected\');$(this).addClass(\'selected\');$(\'#scrollspace\').removeClass(\'moodsbg\');">Suggestions</div><div class="selected" onclick="$(\'#stage_genres\').hide();$(\'#stage_moods\').show();$(\'.selected\').removeClass(\'selected\');$(this).addClass(\'selected\');$(\'#scrollspace\').addClass(\'moodsbg\');">Moods</div><div onclick="$(\'#stage_moods\').hide();$(\'#stage_genres\').show();$(\'.selected\').removeClass(\'selected\');$(this).addClass(\'selected\');$(\'#scrollspace\').removeClass(\'moodsbg\');">Music Genres</div><div onclick="$(\'#stage_moods\').hide();$(\'#stage_genres\').show();$(\'.selected\').removeClass(\'selected\');$(this).addClass(\'selected\');$(\'#scrollspace\').removeClass(\'moodsbg\');">Saved Playlists</div></div><br/><div id="stage_moods" style="    width: 80%;padding-left:20px;padding-top:10px;padding-bottom:250px;">' + $('#moodsui').children().first().html() + '</div><div style="display:none;" id="stage_genres"></div>').appendTo('#stage');
                $('<div style="display:none;" id="stage_sug">' + bres + '</div><div style="display:none;" id="stage_genres"></div><div id="stage_moods" style="    width: 80%;padding-left:20px;padding-top:10px;padding-bottom:250px;">' + $('#moodsui').children().first().html() + '</div>').appendTo('#stage');
                $('#stage_moods .boxmood').not('.moodhooked').addClass('moodhooked').click(moodClicked);
                pe = $('#stage_genres');
            }
            if (statichtml && isinit) {
                showSug();
            }
            for (var i = 0; i < familiesks.length; i++) {
                var f = familiesks[i];
                if (i == -2) { //} || i==2){
                    if (isinit) dosearch(f + ' music', 'genere');
                }
                else {
                    var tools = '<div class="addicon diskicon" title="Add ' + f.capitalize() + ' tracks" onclick="addGenre(\'' + f.capitalize() + '\')">Add</div><div class="playicon diskicon" title="Clear the playlist and play ' + f.capitalize() + ' tracks" onclick="playGenre(\'' + f.capitalize() + '\')">Play</div><div class="seedicon diskicon" title="Seed list using all tracks" onclick="seedDisk($(this).parent())">Seed</div>';
                    $('<a class="mnulink" nhref="/' + f.replace(' ', '+') + '" onclick="overrideLink()"><div class="searchheader slidein genere" style="   white-space: nowrap;cursor:pointer;overflow:hidden;display: inline-block;margin: 20px 20px 0px 20px;cursor:pointer;    display: inline-block;font-size: 30px;padding: 10px 15px 10px 30px;' + (i % 3 == -1 ? 'float:right;' : i % 6 < 0 ? 'margin-left:100px;' : '') + ' " onclick="dosearch(\'' + f + ' music\',\'genere\');$(\'.nngenere, .nntabs\').remove();"><span class="sprite" style="background-position:-' + (((i==0?16:i) + 2) * 210) + 'px 5px;width:100px;height:100px; margin-right: 15px;"></span>' + f.capitalize() + tools + '<div class="dosearch searchtool" ></div></div></a>' + (familiesks.length == i + 1 ? '<div class="spacer"></div>' : '')).appendTo(pe);
                }
            }
            $('.tabs>div').click(function () {
                // debugger;
                $('.tabs>div.selected').removeClass('selected');
                $(this).addClass('selected');
            })
            if (isinit) setTimeout(function () {
                addMode = 'distribute';
            }, 6000);

            //history.pushState({
            //    page: '/'
            //}, null, '/');
            bindlinks();

        }

        function addGenre(f) {
            window.addSearch = true;
            genreRepeats = [];
            //window.playSearch = false;
            dosearch(f + ' music', 'genere');
        }

        function playGenre(f) {
            $('#stage .vidui').remove();
            clearQueue();
            window.addSearch = true;
            genreRepeats = [];
            //window.playSearch = true;
            dosearch(f + ' music', 'genere');
        }

        function getMoodIconTitle(elm) {
            if (typeof $(elm).attr('mood') != 'undefined') k = $(elm).attr('mood');
            else if ($(elm).find('[mood]').length > 0) k = $(elm).find('[mood]').attr('mood');
            else k = (elm.textContent.split('\n')[0]).replace(/^\s+|\s+$/g, '');
            var kj = k.toLowerCase().replace(' ', '_').replace(' ', '_').replace(' ', '_');
            var kjp;
            kjp = $(elm).parents('[mood]').length == 0 ? kj : $(elm).parents('[mood]').last().attr('mood').toLowerCase().replace(' ', '_').replace(' ', '_').replace(' ', '_');

            return '<span class="moodtitle_' + kj + ' moodtitlep_' + kjp + ' moodtitle" style="position:relative;padding-left:26px;">' + k.replace('_', ' ').replace('_', ' ') + '</span>';
        }

        function moodClicked(e) {
            e.preventDefault();
            var k = '';
            $('#help').hide();
            $('#helpinit,#socialmentions').hide();
            $('#stage').show();
            $('#inittabs').show();
            showSug();

            perspective = 'results';
            progress(5);
            if (typeof $(this).attr('mood') != 'undefined') k = $(this).attr('mood');
            else if ($(this).find('[mood]').length > 0) k = $(this).find('[mood]').attr('mood');
            else k = (this.textContent.trim().split('\n')[0]).replace(/^\s+|\s+$/g, '');
            var kj = k.toLowerCase().replace(' ', '_').replace(' ', '_').replace(' ', '_');
            var kjp;
            kjp = $(this).parents('[mood]').length == 0 ? kj : $(this).parents('[mood]').last().attr('mood').toLowerCase().replace(' ', '_').replace(' ', '_').replace(' ', '_');

            pretitle = '<span class="moodtitle_' + kj + ' moodtitlep_' + kjp + ' moodtitle">' + k.replace('_', ' ').replace('_', ' ') + '</span>';
            $('#stage_sug').html('<div class="emptyinfoinner"><h1><div id="spinner"><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p></div>Mood suggestions are being generated...</h1><h3>Drag-Drop, Click or Star to <span style="color: goldenrod;">add records to the playlist</span></h3> </div>').addClass('emptyinfo');
            curmood=kj;
            //debugger;
            $.ajax({
                cache: false,
                dataType: 'json',
                type: 'GET',
                timeout: 5000, //&order=viewCount
                url: '/moods/' + kj + '.js'
            }).done(
                function (res, state) {
                    //debugger;
                    if (state != 'success') {
                        console.log('ERR: ' + state);
                        debugger;
                        return;
                    }
                    function shufflearray(a) {
                        var j, x, i;
                        for (i = a.length; i; i--) {
                            j = Math.floor(Math.random() * i);
                            x = a[i - 1];
                            a[i - 1] = a[j];
                            a[j] = x;
                        }
                    }
                    if(document.location.href.indexOf('#admin')==-1)
                        shufflearray(res);

                    $('#queue').children().remove();
                    researchQueue = [];
                    moodProbeQueue = [];
                    researchInProgress = false;
                    //clearQueue();
                    var nlists = 0, nadd = 0;;

                    for (var i = 0; i < res.length; i++) {
                        //if (Math.random() * 100 > res.length * .95) continue;
                        if (nlists > 15 && document.location.href.indexOf('#admin')==-1) break;
                        var hr = res[i]
                        var t = hr[2];
                        if (!isGoodTitle(t)) continue;
                        var l = hr[8].split('?v=')[1];
                        var v = {
                            id: getVidId(l),
                            basevidid: null,
                            subvidid: null,
                            link: hr[8],
                            img: hr[7],
                            title: t,
                            type: 'up',
                            isgood: true,
                            desc: 'Mood: ' + k.replace('_', ' ').replace('_', ' '),
                            dur: hr[9] // YTDurationToSeconds(vo.contentDetails.duration)

                            //views: $($(this).find('.view-count')[0]).text().split(' ')[0]
                        };

                        vidExists(v, 'up');
                        allvids.push(v);
                        addMode = 'add';

                        ui();
                        addMode = 'distribute';
                        if (document.location.href.indexOf('#admin') > -1) continue;
                        if (nlists++ == 0) playNext();
                        //if (Math.random() * 100 > res.length * .95){//1.2) {
                        if (nlists % 3 == 1 && nlists < 18) {
                            //console.log('seeding: ' + hr[1] + ' - ' + hr[2]);
                            moodProbeQueue.push(v);
                            nadd++;


                            //window.probedepth = 3;
                            //researchQueue.unshift({
                            //    type: 'probe',
                            //    url: l,
                            //    depth: 0,
                            //    probedepth: 3,
                            //    v: v
                            //    //v: { title: t}
                            //    //v: job.v
                            //});
                        }
                        //researchQueue.push({
                        //    type: 'list',
                        //    url: hr.id.playlistId,
                        //    title: hr.snippet.title
                        //})
                        //if (++nlists > (type != 'genere' ? 3 : 4)) break;
                        //return;
                    }


                });

            return false;

        }






        function overrideLink(e) {
            //debugger;
            e.preventDefault();
            var href = $(this).attr('href');
            //ajaxLoadPage(href);
            //history.pushState({
            //    page: href
            //}, null, href);
            showSuggestionsPanel();
            return false;
        }

        function bindlinks() {

            // Used to detect initial (useless) popstate.
            // If history.state exists, pushState() has created the current entry so we can
            // assume browser isn't going to fire initial popstate
            var popped = ('state' in window.history && window.history.state !== null),
                initialURL = location.href;

            var content = $('#content');

            var ajaxLoadPage = function (url) {

                //console.log('Loading ' + url + ' fragment');
                content.load(url + '?fragment=true');

            }
            //debugger;
            // Handle click event of all links with href not starting with http, https or #
            $('a.mnulink').on('click', function (e) {
                //debugger;
                e.preventDefault();
                var href = $(this).attr('href');
                //ajaxLoadPage(href);
                history.pushState({
                    page: href
                }, null, href);
                showSuggestionsPanel();

            });

            $(window).bind('popstate', function (event) {

                // Ignore inital popstate that some browsers fire on page load
                var initialPop = !popped && location.href == initialURL;
                popped = true;
                if (initialPop) return;

                //console.log('Popstate');

                // By the time popstate has fired, location.pathname has been changed
                //ajaxLoadPage(location.pathname);

            });

        }


        String.prototype.capitalize = function () {
            return this.charAt(0).toUpperCase() + this.slice(1);
        }

        function showSocial() {
            $('.overlay.launchpad.opaque').fadeIn(10).addClass('active');
        }
    </script>







    <div id="sharebutton" onclick="showSocial()">Share the Love</div>
    <div class="arthref arthrefSocialShare">
        <div class="overlay launchpad opaque" onclick="$(this).removeClass('active').css('display','none')" style="">
            <div class="icon-container">
                <div class="centered">
                    <ul class="active">
                        <li><a href="#" onclick="opener('http://www.facebook.com/sharer.php?u=http://listricity.com#&amp;t=Look%20what%20I%20found')" class="aFacebook"><span></span></a><span>Facebook</span></li>
                        <li><a href="#" onclick="opener('http://twitter.com/home?status=Look%20what%20I%20found%20http://listricity.com#')" class="aTwitter"><span></span></a><span>Twitter</span></li>
                        <li><a href="#" onclick="opener('https://plus.google.com/share?url=http://listricity.com#')" class="aGooglePlus"><span></span></a><span>Google+</span></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>



    <div id="coverad" class="coveradmin" onclick="$(this).toggleClass('coveradmin')"></div>


</body>





<script>
    








    var req = {
        get: function (o, cb) {
            var lcb = cb;
            //console.log(o.url);
            //var lurl=o.url.replace('google.com','google.com.feelter.com').replace('youtube.com','youtube.com.feelter.com').replace('https','http');
            var lurl = o.url.replace('www.youtube.com', 'box.listricity.com').replace('clients1.google.com', 'box1.listricity.com').replace('https', 'http');
            $.getJSON({
                url: lurl,
                // corsSupport: true, // if URL above supports CORS (optional)
                // jsonpSupport: true, // if URL above supports JSONP (optional)

                success: function (data) {
                    //alert('CORS or JSONP! ' + data.awesome);
                    lcb(false, data, data.responseText);
                },

                error: function (data) {
                    //debugger;
                    //alert('CORS or JSONP! ' + data.awesome);
                    lcb(false, data, data.responseText);
                }
            });
            return;
            $.jsonp({
                url: o.url,
                // corsSupport: true, // if URL above supports CORS (optional)
                // jsonpSupport: true, // if URL above supports JSONP (optional)

                success: function (data) {
                    //alert('CORS or JSONP! ' + data.awesome);
                    lcb(false, data, data.responseText);
                },

                error: function (data) {
                    //debugger;
                    //alert('CORS or JSONP! ' + data.awesome);
                    lcb(false, data, data.responseText);
                }
            });

        }
    }
    var isWin = (navigator.appVersion.indexOf("Win") != -1)
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    isWin = !isChrome;

    $(document).ready(function () {

        ; (function ($, win) {
            $.fn.inViewport = function (cb) {
                return this.each(function (i, el) {
                    function visPx() {
                        var H = $(this).height()+200,
                            r = el.getBoundingClientRect(), t = r.top, b = r.bottom;
                        return cb.call(el, Math.max(0, t > -1000 ? H - t : (b < H ? b : H)));
                    } visPx();
                    //$(win).on("scroll", visPx);
                });
            };
            $.fn.htmlReplace = function (s) {
                var ls=s;
                return this.each(function () {
                    if ($(this).text() == $('<a>'+ls+'</a>').text()) return;
                    $(this).find('img, span').stop().fadeOut(150);
                    $(this).stop().css('text-shadow', 'none')
                        .animate({ color: 'transparent' }, { duration: 150, 
                            done: function () { $(this).html(ls);
                                $(this).find('img, span').css('opacity',0);
                                $(this).find('img, span').stop().animate({opacity:1},{duration:300});
                                $(this).animate({ color: '#aaa' }, {
                                    duration: 300, done: function () {
                                        $(this)
                        .css('text-shadow', '-1px -1px 1px rgba(0, 0, 0, 0.52), 0 0 0 rgba(51, 51, 51, 0.41), -1px -1px 1px rgba(0, 0, 0, 0.42)')
                            }}); } });
                });

            }
        }(jQuery, window));

        pauseanimations=false;
        setInterval(function () {
            if (new Date()-window.nonIdleLast<3000 && !pauseanimations){
            $(".suglist .vidui").inViewport(function (px) {
                if (px) {
                    var that = this;
                    setTimeout(function(){$(that).addClass("vis");},Math.random()*500);
                }
                else $(this).removeClass("vis");
            });}
        }, 300)
        //         var IEversion = detectIE();
        // alert(IEversion);
        // if (IEversion !== false) {
        //   document.location.href='download.html';
        // } else {
        //   //document.getElementById('result').innerHTML = 'NOT IE';
        // }

        var lastddesk = '';
        var ddesktimer = false;
        $(document).on({
            mouseenter: function () {
                if (typeof $('.sugmore').attr('basenote') == 'undefined' || $('.sugmore').attr('basenote') == '') {
                    $('.sugmore').attr('basenote', $('.sugmore').html());
                }
                var ddesk = '';

                if ($(this).is('.disktitle')) {
                    ddesk = '<img src="/icons/searchicon.png" style="width: 20px;vertical-align: text-bottom;"> Click search for <b>\'' + $(this).text() + '\'</b> tracks';
                } else if ($(this).is('.diskicon')) {
                    if ($(this).parents('.genere').length > 0) {
                        var g = '<b>' + $(this).parents('.genere').find('.addicon').attr('title').replace('tracks', '').replace('Add', '') + '</b>';
                        if ($(this).is('.seedicon'))
                            ddesk = '<img src="/icons/flowericon3.png" style="width: 20px;vertical-align: text-bottom;"> Click to buff-up the playlist with ' + g + ' tracks';
                        else if ($(this).is('.addicon'))
                            ddesk = '<img src="/icons/addicon.png" style="width: 20px;vertical-align: text-bottom;"> Click to add ' + g + ' tracks to the playlist';
                        else if ($(this).is('.playicon'))
                            ddesk = '<img src="/icons/wend.png" style="width: 15px;vertical-align: text-bottom;"><img src="/icons/playicon.png" style="width: 15px;vertical-align: text-bottom;"> Click to generate and play a ' + g + ' playlist';
                    } else { // disk
                        var g = '<b>' + $(this).parents('.sugdisk').find('.disktitle').text() + '</b>';

                        if ($(this).is('.seedicon'))
                            ddesk = '<img src="/icons/flowericon3.png" style="width: 20px;vertical-align: text-bottom;"> Click to buff-up the playlist with \'' + g + '\' and similar tracks';
                        else if ($(this).is('.addicon'))
                            ddesk = '<img src="/icons/addicon.png" style="width: 20px;vertical-align: text-bottom;"> Click to add \'' + g + '\' tracks to the playlist';
                        else if ($(this).is('.playicon'))
                            ddesk = '<img src="/icons/playicon.png" style="width: 20px;vertical-align: text-bottom;"> Click to play \'' + g + '\' tracks';

                    }
                } else if ($(this).is('.tool')) {
                    if ($(this).is('.addwiz'))
                        ddesk = '<img src="/icons/flowericon3.png" style="width: 20px;vertical-align: text-bottom;"> Click to buff-up the playlist with tracks like this one';
                    else if ($(this).is('.addbottom'))
                        ddesk = '<img src="/icons/addicon.png" style="width: 20px;vertical-align: text-bottom;"> Click to add this track to the end of the playlist';
                    else if ($(this).is('.addtop'))
                        ddesk = '<img src="/icons/playicon.png" style="width: 20px;vertical-align: text-bottom;"> Click to play this track next';
                    else if ($(this).is('.delall'))
                        ddesk = '<img src="/icons/deleteallicon.png" style="width: 13px;vertical-align: text-bottom;"> Click to delete this track and all the next ones from the playlist';
                    else if ($(this).is('.del'))
                        ddesk = '<img src="/icons/deleteicon.png" style="width: 13px;vertical-align: text-bottom;"> Click to delete this track from the playlist';

                } else if ($(this).is('.vidui') || $(this).parents('.vidui').length > 0) {
                    if ($(this).parents('#queue').length > 0)
                        ddesk = '<img src="/icons/playicon.png" style="width: 20px;vertical-align: text-bottom;"> Click to skip to this track, or <img src="/icons/dragupdown.png" style="width: 15px;margin-top: -1px;vertical-align: middle;margin-left: 1px;"> drag to change opsition';
                    else
                        ddesk = '<img src="/icons/dragleft.png" style="width: 20px;vertical-align: middle;"> Drag the track to where you want it in the playlist, or click it to <img src="/icons/addicon.png" style="width: 15px;vertical-align: text-bottom;"> add after the insert point';
                } else if ($(this).is('.boxmood')) {
                    var g = getMoodIconTitle(this);//'<b>' + $(this).find('div').first().text() + '</b>';
                    //console.log('bm '+g);
                    ddesk = '<img src="/icons/wend.png" style="width: 15px;vertical-align: text-bottom;"> Click to generate and play a ' + g + ' playlist';
                } else if ($(this).is('.genere')) {
                    var g = '<b>' + $(this).find('.addicon').attr('title').replace('tracks', '').replace('Add', '') + '</b>';
                    ddesk = '<img src="/icons/searchicon.png" style="width: 20px;vertical-align: text-bottom;"> Click to search for ' + g + ' tracks';
                } else if ($(this).is('.moodhl')) {
                    var g = getMoodIconTitle(this);//'<b>' + $(this).text() + '</b>';
                    //console.log('hl ' + g);
                    //<span class="moodtitle_waking_up moodtitlep_waking_up moodtitle">Waking Up</span>
                    //event.preventDefault();
                    ddesk = '<img src="/icons/wend.png" style="width: 15px;vertical-align: text-bottom;"> Click to generate and play a ' + g + ' playlist';
                }
                if (ddesk != '' && ddesk != lastddesk) {
                    lastddesk = ddesk;
                    if (ddesktimer) clearTimeout(ddesktimer);
                    ddesktimer = setTimeout(function () {
                        ddesktimer == false;
                        //$('.sugmore').css('line-height', '110px')
                        //setTimeout(function () {
                        $('.sugmore').htmlReplace(ddesk);
                        //$('.sugmore').css('transform','rotateX(360deg)')
                        //}, 100);
                    }, 50);
                }
            },
            mouseleave: function () {
                if (typeof $('.sugmore').attr('basenote') != 'undefined' && $('.sugmore').attr('basenote') != ''
                    && !$(event.toElement).is('.tools, .vidui, .boxmood, .genere, .tool, .moodhl, .diskicon, .disktitle')
                    && $('.sugmore').attr('basenote') != lastddesk) {
                    lastddesk = $('.sugmore').attr('basenote');

                    //$('.sugmore').css('line-height', '100px')
                    if (ddesktimer) clearTimeout(ddesktimer);
                    ddesktimer = setTimeout(function () {
                        ddesktimer == false;
                        $('.sugmore').htmlReplace($('.sugmore').attr('basenote'));
                        $('.sugmore').attr('basenote', '');
                        //$('.sugmore').css('transform', 'rotateX(0deg)')

                        //  $('.sugmore').css('line-height', '45px')
                    }, 50);
                } else if (!$(this).is('.moodhl')) {
                    $(event.toElement).trigger('mouseenter');
                }
            }
        }, ".vidui, .boxmood, .genere, .tool, .moodhl, .diskicon, .disktitle");
        jQuery(document).bind('click keyup mousemove scroll', function (event) {
            window.nonIdleLast = new Date();
        });
        bindlinks();

        if (isWin) {
            $('#qcontainer').addClass('windows');
            $('body').addClass('windows');
        }
        loadLists();

        layoutLists();
        //var playliststate=localStorage.getItem('playliststate');
        //if (playliststate && !window.loadstateonce) {
        //    window.loadstateonce = true;
        //    playlists.lists.push(JSON.parse(playliststate));
        //    layoutCurList(playlists.lists.length-1);
        //}
        setup(true);

        $('#scrollspace').fadeIn();
        if (statichtml) {
            statichtml = false;
        }

        var resizetimer = false;
        $("#logo").resizable({
            alsoResize: '#logo_inner',
            autoHide: false,
            minHeight: 166,
            minWidth: 294,
            start: function () {
                $('#logo_inner').hide();
                pauseanimations = true;
            },
            stop: function (event, ui) {
                pauseanimations=false;
                $('#logo_inner').show();
                var levent = event, lui = ui;
                function doresize() {
                    $('#qcontainer').css('top', lui.size.height + 25);
                    if (lui.size.width < 500) {
                        $('#qcontainer').width(lui.size.width);
                        $('#queue').width(lui.size.width-10).css('max-width', lui.size.width-10);
                        $('#scrollspace').css('left', lui.size.width);
                        $('#topbar').css('padding-left', lui.size.width + 10);
                        $('#topbarinner').css('margin-right', lui.size.width + 47);
                        $('#topplay').css('left', lui.size.width + 56);
                        $('#tophelp').css('left', lui.size.width + 149);
                        $('.queuetools').width(lui.size.width);
                        $('#canvas2').css('left', lui.size.width);
                        $('#q').css('left', lui.size.width + 10);
                        $('#q').css('width', $(window).width() - lui.size.width - 200);
                        $('#inittabs').css('left', lui.size.width);
                    }
                }
                doresize();

            },
            resize: function (event, ui) {
                var levent = event, lui = ui;
                function doresize() {
                    $('#qcontainer').css('top', lui.size.height + 25);
                    if (lui.size.width < 500) {
                        $('#qcontainer').width(lui.size.width);
                        $('#queue').width(lui.size.width - 10).css('max-width', lui.size.width - 10);
                        $('#scrollspace').css('left', lui.size.width);
                        $('#topbar').css('padding-left', lui.size.width + 10);
                        $('#topbarinner').css('margin-right', lui.size.width + 47);
                        $('#topplay').css('left', lui.size.width + 56);
                        $('#tophelp').css('left', lui.size.width + 149);
                        $('.queuetools').width(lui.size.width);
                        $('#canvas2').css('left', lui.size.width);
                        $('#q').css('left', lui.size.width + 10);
                        $('#q').css('width', $(window).width() - lui.size.width - 200);
                        $('#inittabs').css('left', lui.size.width);
                    }
                }
                //doresize();
                if (resizetimer) clearTimeout(resizetimer);
                resizetimer=setTimeout(doresize, 100);
            }
        });
    });
    //debugger;




    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;

    function onYouTubeIframeAPIReady() {
        if (!window.newlistener) return;
        if (localStorage.getItem('autoplayed') == 'true') return;
        localStorage.setItem('autoplayed', 'true');
        debugger;
        player = new YT.Player('logo_inner', {
            height: '390',
            width: '640',
            //origin: 'http://listricity.com',
            videoId: 'VSQ_QVsUP7s',
            playerVars: {
                'autoplay': 1,
                'controls': 1,
                'autohide': 1,
                'wmode': 'opaque',
                'iv_load_policy': 3,
                'modestbranding': 1,
                'showinfo': 0,
                'rel': 0
            },
            events: {
                //'onReady': function(){debugger;event.target.playVideo();},
                'onStateChange': onPlayerStateChange
            }
        });


    }

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        // event.target.playVideo();
    }

    function onPlayerStateChange(event) {
        // console.log('onPlayerStateChange:' + player.getCurrentTime() + ' - ' + player.getDuration() + ' ' + event.data + ' ' + new Date());
        setTimeout("$('#logo_inner').css({'transform':'rotateY( 0deg )  scale(1)','opacity':'1','height':'100%','width':'100%'}).attr('width','').attr('height','');$('#logo').css({'background-size':'0px'});", 900);
        player.setLoop(false)
        //$('#logo_inner').css('width','100%').css('height','100%')
        //console.log(event.data);
        if (unstartetimer) clearTimeout(unstartetimer);
        if (event.data == YT.PlayerState.PAUSED) {
            $('button[onclick="stopVid()"]').html('Play').addClass('playbutton');
        }
        if (event.data == YT.PlayerState.UNSTARTED) {
            //console.log('onPlayerStateChange:' + 'unstarted' + ' ' + new Date());
            unstartetimer = setTimeout(function () {
                unstartetimer = false;
                //if (unstartedconcecutives++ < 5);
                console.log('PN onPlayerStateChange:' + 'unstarted' + ' playnext ' + new Date());
                playNext()
            }, 3000);
        }
        if (event.data == YT.PlayerState.ENDED
            || (event.data == YT.PlayerState.BUFFERING && player.getCurrentTime() - player.getDuration() > -5 && player.getDuration() > 0) // anti repeat hack - any event in the last 5 seconds is ENDED
            //|| (event.data == YT.PlayerState.BUFFERING && player.getCurrentTime() < 2 && new Date() - lastplayednexttime > 10000 )
            ) {
            if (window.newlistener) {
                window.newlistener = false
            }
            else if (new Date() - autolastskip > 10000) {
                autolastskip = new Date();
                console.log('PN onPlayerStateChange: new Date() - lastplayednexttime > 10000 ' + (new Date() - lastplayednexttime) + '  ' + player.getCurrentTime() + ' - ' + player.getDuration() + (event.data != YT.PlayerState.ENDED ? 'HACKED' : 'normal') + ' ended' + ' playnext ' + new Date());
                playNext();
            }
        }
        if (event.data == YT.PlayerState.PLAYING) {
            unstartedconcecutives = 0;
            $('button[onclick="stopVid()"]').html('Stop').removeClass('playbutton');
        }
    }
    var autolastskip = new Date();
    function stopVideo() {
        player.stopVideo();
    }

    function toFullView() {
        logowidth = $('#logo').width();
        logoheight = $('#logo').height();
        var ui = { size: { width: 295, height: 188 } };
        $('#qcontainer').css('top', ui.size.height + 25);
        $('#qcontainer').width(ui.size.width);
        $('#queue').width(ui.size.width).css('max-width', ui.size.width);
        $('#scrollspace').css('left', ui.size.width);
        $('#topbar').css('padding-left', ui.size.width + 10);
        $('#topbarinner').css('margin-right', ui.size.width + 47);
        $('#topplay').css('left', ui.size.width + 56);
        $('#tophelp').css('left', ui.size.width + 149);
        $('.queuetools').width(ui.size.width);
        $('#canvas2').css('left', ui.size.width);

        $('.titlebar').addClass('titlebar_dock')
        $('#qcontainer').css({
            top: 22
        });
        $('#logo').addClass('logofullview').css('left', ui.size.width);
        $('#logo_inner').css({
            width: '100%',
            height: '100%'
        });
        $('#coverad').show();
    }

    function fromFullView() {
        $('.titlebar').removeClass('titlebar_dock')
        $('#qcontainer').css({
            top: logoheight+22
        });
        var ui = { size: { width: logowidth, height: logoheight } };

        $('#qcontainer').width(ui.size.width);
        $('#queue').width(ui.size.width).css('max-width', ui.size.width);
        $('#scrollspace').css('left', ui.size.width);
        $('#topbar').css('padding-left', ui.size.width + 10);
        $('#topbarinner').css('margin-right', ui.size.width + 47);
        $('#topplay').css('left', ui.size.width + 56);
        $('#tophelp').css('left', ui.size.width + 149);
        $('.queuetools').width(ui.size.width);
        $('#canvas2').css('left', ui.size.width);


        $('#logo').removeClass('logofullview').css('left', 0);;
        $('#q').css('left', logowidth + 10);
        $('#q').css('width', $(window).width() - logowidth - 200);
        $('#logo').css({
            width: logowidth+'px',
            height: logoheight+'px'
        });
        $('#logo_inner').css({
            width: '100%',
            height: '100%'
        });
        $('#coverad').hide();
    }
</script>


</html>
