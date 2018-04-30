        var iprogress = 0;

        function progress(p) {
            if (p >= 100) {
                setTimeout('progress(0)', 1000)
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

        var hto = false;
        var lastscrolltop = 0;
        var scrolltopscount = 0;
        var scolltops = [];
        var lastpeeked = new Date();
        var scrolltimer = false;
        var delspan = '<span class="del" onclick="deleteVid(@id,false);$(this).parent().remove()" style="    background-position: center;background-size: 10px;background-repeat:no-repeat;width: 16px;margin-right:5px;cursor:pointer;height: 16px;display: inline-block;margin-bottom: -4px;    margin-left: -25px;"></span>';

        var researchQueue = [];
        var researchInProgress = false;




        var cheerio = $.find; // require('cheerio');
        cheerio.load = $;
        var fs = {
            readFileSync: function() {
                return localStorage.getItem('playlists')
            },
            writeFile: function(f, s, cb) {
                localStorage.setItem('playlists', s);
                cb()
            }
        }; //require('fs');

        var curlistind = 0;
        var playlists = [];

        function loadLists() {
            try {

                var liststext = fs.readFileSync(window.userDataDir + '/lists.txt', 'utf8')
                playlists = JSON.parse(liststext);
                curlistind = playlists.curlistind;
            }
            catch (e) {
                console.log(e.message);
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
                window.newlistener=true;
            }
            if (typeof playlists.settings == 'undefined') {
                playlists.settings = {
                    optimalLength: {
                        from: 60 * 2,
                        to: 60 * 11
                    },
                    excludes: ['greatest', 'album', 'full', 'cover', 'hits', 'collection', 'intereview'],
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
                playlists.settings.guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
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
            $.each(playlists.settings.excludes, function(value) {
                $('#selexclude')
                    .append($("<option></option>")
                        .attr("value", playlists.settings.excludes[value])
                        .text(playlists.settings.excludes[value]));
            });
        }


        function record(act, data) {
            return;

            if (typeof window.gainited == 'undefined' || !window.gainited) {
                setTimout('record("' + act + '","' + data + '")', 1000);
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

        var allvids = typeof allvids != 'undefined' ? allvids : [];

        // req = request.defaults({
        //     rejectUnauthorized: false,
        //     jar: true,
        //     followAllRedirects: true // allow redirections
        // });

        var nh = '';
        var basevidtitle = '';
        var lastUpNext = '';
        var probing = false;
        var cursubvid;
        //var cookieJar = req.jar();
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
        var pretitle = '';

        function areDups(s1, s2) {
            var dupIndics = ['remix', 'kareoke', 'cover', 'live', 'tribute', 'the'];

            function cleanString(s) {
                var r = s.replace(/((\(|\[)[^\)\]]+(\)|\]))|[^\w\s]/gi, ' ').replace(/  +/g, ' ').replace(/^\s+|\s+$/g, '').toLowerCase();
                return r;
            }

            if (s1.indexOf('-') > -1 && s1.split('-')[1].length > 10) s1 = s1.split('-')[1];
            if (s2.indexOf('-') > -1 && s2.split('-')[1].length > 10) s2 = s2.split('-')[1];
            var w1 = cleanString(s1);
            var w2 = cleanString(s2);
            var wa1 = w1.split(' ');
            var wa2 = w2.split(' ');
            if (wa1.length < 1 || wa2.length < 1 || (wa1.length == 1 && wa1[0] == '') || (wa2.length == 1 && wa2[0] == '')) return false;
            for (var i = 0; i < wa1.length; i++) {
                var w = wa1[i];
                w2 = w2.replace(w, '');
            }
            for (var i = 0; i < wa2.length; i++) {
                var w = wa2[i];
                w1 = w1.replace(w, '');
            }
            for (var i = 0; i < dupIndics.length; i++) {
                var w = dupIndics[i];
                w1 = w1.replace(w, '');
                w2 = w2.replace(w, '');
            }

            w2 = w2.replace(/  +/g, ' ').replace(/^\s+|\s+$/g, '');
            w1 = w1.replace(/  +/g, ' ').replace(/^\s+|\s+$/g, '');

            if (w1.length == 0 || w2.length == 0) {
                //console.log('dups:' + s1 + ' | ' + s2);
                return true;
            }
            //console.log('no dups:' + s1 + ' | ' + s2);
            return false;
        }

        function buffUp(c) {
            buffupcurdepth = c;
            if (c == 0) {
                //progress(100);
                return;
            }
            if (new Date() - buffuptime < 1000) {
                setTimeout('buffUp(' + c + ')', 1000);
                return;
            }
            window.lastditributed = $('#queue .vidui').last();//$('.insetpoint');
            buffuptime = new Date();
            for (var i = 0; i < c; i++) {
                var done = false;
                var sf = 99;
                while (!done && sf-- > 0) {
                    var minbuff = 999;
                    var bufv = false;
                    var bufc = false;
                    $('#queue .vidui').each(function () {
                        if (bufv) return;
                        var v = getVidById(this.id);
                        if (typeof v == 'undefined') return;
                        if (v.friends && v.friends.length > 0) {
                            if (!v.buffed) {
                                v.buffed = 1;
                                bufv = v;
                            }
                            else {
                                if (v.buffed < minbuff) {
                                    minbuff = v.buffed;
                                    bufc = v;
                                }
                            }
                        }
                    });
                    if (!bufv) bufv = bufc;
                    if (!bufv) {
                        done = true;
                        break;
                    } // exhosted
                    bufv = bufv.friends.shift();
                    if ($('#queue .vidui[data-link="' + bufv.link + '"]').length == 0 && isGoodVideo(bufv)) {
                        bufv.buffed++;
                        bufv.type = 'up';
                        bufv.ui = false;
                        bufv.sug = [];
                        allvids.push(bufv);
                        done = true;
                        ui();
                    }
                }

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

        var trackIndicators = ['remix', 'parody', 'vine', 'karaoke', 'lyrics'];
        function dosearch(s, type) {
            try {
                var event = window.event;
                event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
            } catch (e) { }
            //console.log('dosearch: ' + s + ',' + type);

            researchInProgress = true;
            $('#mi_root').remove();
            var sq = s;
            basevidtitle = s;
            type = type || 'all';
            if (type != 'first') {
                researchQueue = [];
                moodProbeQueue = [];
            }
            if (type == 'genere') {
                perspective = 'results';
                pretitle == ''
                //showSug();
                $('#stage_sug').children().remove();

                progress(10);
            }
            if (type != 'first') {
                //allvids = [];

                $.ajax({
                    cache: false,
                    dataType: 'json',
                    type: 'GET',
                    timeout: 5000, //&order=viewCount
                    url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&maxResults=50&q=' + s + '&topicId=%2Fmusic&type=playlist&key=AIzaSyDfPNBlO_ji5rnM76q2WQCIOq4AOgBX5kE'
                }).done(
                    function (res, state) {
                        if (state != 'success') {
                            console.log('ERR: ' + state);
                            debugger;
                            setTimeout('researchInProgress=false;', 2000);
                            return;
                        }
                        var nlists = 0;
                        for (var i = 0; i < res.items.length; i++) {
                            var hr = res.items[i]
                            if ($.inArray(hr.id.playlistId, probedLists) > -1 || typeof hr.snippet == 'undefined')
                                continue;
                            probedLists.push(hr.id.playlistId);
                            while (probedLists.length > 10) probedLists.shift();
                            researchQueue.push({
                                type: 'list',
                                url: hr.id.playlistId,
                                title: hr.snippet.title
                            })
                            if (++nlists > (type != 'genere' ? 3 : 4)) break;
                        }


                    });


            }
            if (type == 'all') {
                //if (moodProbeQueue.length == 0)
                progress(30);

                searchsongs = [];
                searchsongsbase = s;
                searchsongsexpected = 0;
                autocomplete(s, function (r) {
                    for (var i = 0; i < r.length && i < 10; i++) {
                        var q = r[i].trim().toLowerCase();
                        var istrack = false;
                        for (var i1 = 0; i1 < trackIndicators.length; i1++) {
                            if (q.indexOf(trackIndicators[i1]) > -1)
                                istrack = true;
                        }
                        if (q != s.trim().toLowerCase() && isGoodTitle(q) && !istrack) {
                            //console.log('search as: ' + r[i]);
                            searchsongsexpected++;
                            setTimeout('dosearch("' + q + '","first")', i * 500)
                        }
                    }
                })
            }


            if (type == 'genere') researchInProgress = false;
            else
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
                            if (type == 'first') searchsongs.push({
                                sug: []
                            })
                            researchInProgress = false;
                            console.log('ERR: ' + state);
                            debugger;
                            return;
                        }
                        var ids = '';
                        for (var i = 0; i < res.items.length; i++) {
                            ids += res.items[i].id.videoId + ',';
                        }
                        ids = ids.substring(0, ids.length - 1);
                        $.ajax({
                            cache: false,
                            dataType: 'json',
                            type: 'GET',
                            timeout: 5000, //&order=viewCount
                            url: 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+contentDetails%2C+status&id=' + ids + '&maxResults=50&key=AIzaSyDfPNBlO_ji5rnM76q2WQCIOq4AOgBX5kE'
                        }).done(
                            function (res, state) {
                                // debugger;
                                if (state != 'success') {
                                    if (type == 'first') searchsongs.push({
                                        sug: []
                                    })
                                    researchInProgress = false;
                                    console.log('ERR: ' + state);
                                    debugger;
                                    return;
                                }


                                var vids;
                                /*
                                //var jq = cheerio.load(body);
                                var ltype = type;
                                if ( //type=='genere' &&
                                    jq.find('.watch-card-list, a[href*="&list="]').length > 0) {
                                    var hr = jq.find('.watch-card-rhs a[href*="&list="]').attr('href');
                                    if (!hr) hr = jq.find('a[href*="&list="]').first().attr('href');
                                    req.get({
                                        url: "https://www.youtube.com/" + hr + '&spf=navigate',
                                        headers: hdrs
                                    }, function(err, resp, body) {
                                        if (err || (typeof body!='undefined' && body.indexOf('<title>404')>-1)) {
                                            console.log('ERR: ' + err);
                                            ui();
                                            return;
                                        }
                                        var jr = resp; //JSON.parse(body);
                                        //var listjq=cheerio.load(jr[3].body['watch7-container']);
                                        var listjq = cheerio.load(jr[3].body['player-playlist']);
    
                                        var listvids = listjq.find('li.yt-uix-scroller-scroll-unit');
                                        if (listvids.length == 0) {
                                            listjq = cheerio.load(jr[3].body['player-playlist'].html);
                                            listvids = listjq.find('li.yt-uix-scroller-scroll-unit');
                                        }
                                        var listvn;
                                        var listind = 0;
                                        //jq=$;
                                        listvids.each(function() {
                                            var l = $($(this).find('a')[0]).attr('href').split('&')[0];
                                            var listv = {
                                                id: getVidId(l),
                                                basevidid: null, //curbasevid.id,
                                                subvidid: cursubvid ? cursubvid.id : null,
                                                link: l,
                                                img: $(this).find('[data-thumb]').attr('data-thumb') || $(this).find('[src]').attr('src'),
                                                title: $($(this).find('a')[0]).attr('title') || $(this).find('.title').html() || $(this).find('h4').html().trim(),
                                                type: listind == 0 ? 'list' : 'sug',
                                                desc: (type == 'genere' ? 'Genere: ' + sq.replace(' music', '') : 'Related to: ' + basevidtitle),
                                                dur: $($(this).find('.accessible-description,.video-time')[0]).text().replace('- Duration: ', '').replace('.', '').trim() || '3:33',
                                                views: $($(this).find('.view-count')[0]).text().split(' ')[0]
                                            };
                                            if (!vidExists(listv, 'all') && listv.title) {
                                                if (!isGoodTitle(listv.title)) return;
                                                allvids.push(listv);
                                                if (listvn) listvn.sug.push(listv);
                                                if (listind == 0) {
                                                    listvn = listv;
                                                    listv.sug = []
                                                };
                                                listind++;
                                            }
                                        })
                                        ui();
                                    });
    
                                    if (type == 'genere') {
                                        researchInProgress = false;
                                        return;
                                    }
                                } */
                                researchInProgress = false;
                                //vids = jq.find('.yt-lockup-video');
                                vids = res.items;
                                var sss = {
                                    sug: []
                                };
                                if (type == 'first') {
                                    searchsongs.push(sss);
                                }
                                else {
                                    var vn = {
                                        id: getVidId(s),
                                        link: '',
                                        img: '',
                                        title: s,
                                        type: 'search',
                                        desc: searchsongsbase
                                    };
                                    vn.sug = []
                                    allvids.push(vn);
                                }

                                for (var vi = 0; vi < res.items.length; vi++) {
                                    var vo = res.items[vi];
                                    var status = vo.status; if (!status.embeddable || status.uploadStatus != "processed" || status.privacyStatus != "public") continue;
                                    if (typeof vo.id == 'undefined' || vo.kind.indexOf('youtube#video') == -1) continue;
                                    var img = vo.snippet.thumbnails.default.url;
                                    var title = vo.snippet.title
                                    if (!isGoodTitle(title)) continue;
                                    var href = '/watch?v=' + vo.id;

                                    var l = href;

                                    var v = {
                                        id: getVidId(l),
                                        link: l,
                                        img: img,
                                        title: title,
                                        type: 'sug',
                                        dur: YTDurationToSeconds(vo.contentDetails.duration)
                                    };
                                    if (!v.title) {
                                        console.log('search title missing');
                                        debugger;
                                    }
                                    if (type == 'first') {
                                        sss.sug.push(v)
                                    }
                                    else {
                                        vn.sug.push(v);
                                        allvids.push(v);
                                    }
                                }
                                if (type != 'first' || searchsongs.length >= searchsongsexpected) {
                                    if (type == 'first' && searchsongs.length >= searchsongsexpected) {
                                        searchsongsexpected = 0;
                                        var vn = {
                                            id: getVidId(searchsongsbase),
                                            link: '',
                                            img: '',
                                            title: searchsongsbase,
                                            type: 'search',
                                            desc: searchsongsbase
                                        };
                                        vn.sug = []
                                        allvids.push(vn);
                                        for (var i = 0; i < searchsongs.length; i++) {
                                            if (searchsongs[i].sug.length > 0) {
                                                for (var i1 = 0; i1 < searchsongs[i].sug.length; i1++) {
                                                    var sv = searchsongs[i].sug[i1];
                                                    if (!vidExists(sv, 'all')) {
                                                        sv.id = getVidId(sv.link);
                                                        vn.sug.push(sv);
                                                        allvids.push(sv);
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    ui();
                                }
                            });
                    })
        }


        function getList(hr, job) {
            var ljob = job;
            $.ajax({
                cache: false,
                dataType: 'json',
                type: 'GET',
                timeout: 5000, //&order=viewCount
                url: "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=" + hr + "&key=AIzaSyDfPNBlO_ji5rnM76q2WQCIOq4AOgBX5kE",
            }).done(function (res, state) {
                if (state != 'success') {
                    console.log('ERR: ' + state);
                    debugger;
                    setTimeout('researchInProgress=false;', 2000);
                    return;
                }


                var ids = '';
                for (var i = 0; i < res.items.length; i++) {
                    ids += res.items[i].snippet.resourceId.videoId + ',';
                }
                ids = ids.substring(0, ids.length - 1);
                $.ajax({
                    cache: false,
                    dataType: 'json',
                    type: 'GET',
                    timeout: 5000,//&order=viewCount
                    url: 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+contentDetails%2C+status&id=' + ids + '&maxResults=50&key=AIzaSyDfPNBlO_ji5rnM76q2WQCIOq4AOgBX5kE'
                }).done(

                    function (res, state) {
                        if (state != 'success') {
                            console.log('ERR: ' + state);
                            debugger;
                            setTimeout('researchInProgress=false;', 2000);
                            return;
                        }


                        var listvn;
                        var listind = 0;

                        for (var i = 0; i < res.items.length; i++) {

                            var vo = res.items[i];
                            var status = vo.status; if (!status.embeddable || status.uploadStatus != "processed" || status.privacyStatus != "public") continue;
                            if (typeof vo.id == 'undefined' || vo.kind.indexOf('youtube#video') == -1 || typeof vo.snippet.thumbnails == 'undefined') continue;
                            var img = vo.snippet.thumbnails.default.url;
                            var title = vo.snippet.title
                            if (!isGoodTitle(title)) continue;
                            var href = '/watch?v=' + vo.id;

                            var l = href;
                            var listv = {
                                id: getVidId(l),
                                basevidid: curbasevid.id,
                                subvidid: cursubvid ? cursubvid.id : null,
                                link: l,
                                img: img,
                                title: title,
                                type: listind == 0 ? 'list' : 'sug',
                                desc: typeof ljob.title == 'undefined' ? 'Suggested for: ' + basevidtitle : ljob.title,
                                dur: YTDurationToSeconds(vo.contentDetails.duration)
                                //views: $($(this).find('.view-count')[0]).text().split(' ')[0]
                            };

                            if (!vidExists(listv, 'all') && listv.title) {
                                allvids.push(listv);
                                if (listvn) listvn.sug.push(listv);
                                if (listind == 0) {
                                    listvn = listv;
                                    listv.sug = []
                                };
                                listind++;
                            }
                        }
                        sortSuggestions();
                        //showSuggestionsPanel();
                        //if (perspective == 'results') 
                        //    $('.genere, .tabs').remove();

                        ui();
                        researchInProgress = false;
                    });
            })
        }


        var probedLists = [];
        function testAvailability(that) {
            return;
            var img = ($(that).attr('src'));
            if (img == 'https://i.ytimg.com/vi/z208p6SzULw/default.jpg' || 1) {
                $.ajax({
                    url: img,
                }).done(
                    function (res, state) {
                    }
                    ).fail(function () {
                        debugger;
                    })
  .always(function () {
      //alert( "complete" );
  });

            }
            return;
            var xhr = new XMLHttpRequest();
            xhr.img = $(that);
            xhr.open("GET", img, true);
            xhr.responseType = "arraybuffer";
            var lthat = that;
            xhr.onreadystatechange = function () {
                if (this.readyState == this.DONE) {
                    if (this.response.byteLength == 8381) {
                        $(lthat).parents('.vidui').hide()
                    }
                    // Here is a good place to measure the byteLength of 
                    // grey images in your requested size  
                }
            };
            xhr.send(null);

        }


        function probe(key, depth, buffup, probedepth, job) {
            probing = true;
            depth = depth || 0;
            if (!key || key.indexOf('undefined') > -1) {
                debugger;
            }
            // req.get({
            //         url: "https://www.youtube.com/watch?v=" + key,
            //         //	headers: hdrs
            //     },

            $.ajax({
                cache: false,
                dataType: 'json',
                type: 'GET',
                timeout: 5000,//&order=viewCount
                url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=' + job.v.title + '&topicId=%2Fmusic&type=playlist&key=AIzaSyDfPNBlO_ji5rnM76q2WQCIOq4AOgBX5kE'
            }).done(
                function (res, state) {
                    if (state != 'success') {
                        console.log('ERR: ' + state);
                        debugger;
                        setTimeout('researchInProgress=false;', 2000);
                        return;
                    }
                    var nlists = 0;

                    for (var i = 0; i < res.items.length; i++) {
                        var hr = res.items[i]
                        if ($.inArray(hr.id.playlistId, probedLists) > -1)
                            continue;
                        probedLists.push(hr.id.playlistId);
                        while (probedLists.length > 10) probedLists.shift();
                        researchQueue.push({
                            type: 'list',
                            url: hr.id.playlistId
                        })
                        if (++nlists > 0) break;
                    }

                });

            $.ajax({
                cache: false,
                dataType: 'json',
                type: 'GET',
                timeout: 5000,//&order=viewCount &videoEmbeddable=true&videoSyndicated=true
                url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&relatedToVideoId=' + key + '&topicId=%2Fmusic&type=video&videoCategoryId=10&key=AIzaSyDfPNBlO_ji5rnM76q2WQCIOq4AOgBX5kE'
            }).done(
                function (res, state) {

                    if (state != 'success') {
                        console.log('ERR: ' + state);
                        debugger;
                        setTimeout('researchInProgress=false;', 2000);
                        return;
                    }

                    var ids = '';
                    for (var i = 0; i < res.items.length; i++) {
                        ids += res.items[i].id.videoId + ',';
                    }
                    ids = ids.substring(0, ids.length - 1);
                    $.ajax({
                        cache: false,
                        dataType: 'json',
                        type: 'GET',
                        timeout: 5000, //&order=viewCount
                        url: 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+contentDetails%2C+status&id=' + ids + '&maxResults=50&key=AIzaSyDfPNBlO_ji5rnM76q2WQCIOq4AOgBX5kE'
                    }).done(

                        function (res, state) {



                            try {
                                if (state != 'success') {
                                    console.log('ERR: ' + state);
                                    debugger;
                                    if (buffup) buffUp(buffup);
                                    setTimeout('researchInProgress=false;', 2000);
                                    return;
                                }
                                ref = "https://www.youtube.com/watch?v=" + key;

                                //var jq = cheerio.load(body);

                                //var vids = jq.find('.video-list').find('.content-wrapper');
                                try {

                                    basevidtitle = job.v.title //jq.find('.watch-title ')[0].children[0].data.trim();
                                    //jq.find('.watch-title ').text();
                                    if (basevidtitle.trim() == '')
                                        debugger;
                                }
                                catch (e) {
                                    debugger;
                                }
                                /*
                                                        var lists = jq.find('.video-list').find('a.related-playlist').first();

                                                        if (!buffup)
                                                            lists.each(function() {
                                                                var hr = $(this).attr('href');
                                                                researchQueue.unshift({
                                                                    type: 'list',
                                                                    url: hr
                                                                })
                                                            })
                                */

                                var ind = 0;
                                var np = '';
                                var vn;
                                var buffed = false;
                                //vids.each(function() 
                                for (var vi = 0; vi < res.items.length; vi++) {
                                    if (buffup && ind > 0) {
                                        break;
                                    }
                                    var nn = '';


                                    var vo = res.items[vi];
                                    var status = vo.status; if (!status.embeddable || status.uploadStatus != "processed" || status.privacyStatus != "public") continue;
                                    if (typeof vo.id == 'undefined' || vo.kind.indexOf('youtube#video') == -1 || typeof vo.snippet.thumbnails == 'undefined') continue;
                                    var img = vo.snippet.thumbnails.default.url;
                                    var title = vo.snippet.title
                                    if (!isGoodTitle(title)) continue;
                                    var href = '/watch?v=' + vo.id;

                                    var l = href;


                                    var v = {
                                        id: getVidId(l),
                                        basevidid: curbasevid.id,
                                        subvidid: cursubvid ? cursubvid.id : null,
                                        link: l,
                                        img: img,
                                        title: title,
                                        type: ind == 0 ? 'up' : 'sug',
                                        desc: 'Suggested for: ' + basevidtitle,
                                        dur: YTDurationToSeconds(vo.contentDetails.duration)
                                        //views: $($(this).find('.view-count')[0]).text().split(' ')[0]
                                    };
                                    if (!v.title) {
                                        console.log('probe title missing');
                                        debugger;
                                    }

                                    vidExists(v, 'up');
                                    if ($('#queue .vidui[data-link="' + v.link + '"]').length > 0 || !isGoodVideo(v) //|| vidExists(v, 'up')
                                        ) {
                                        if (buffup) {
                                            ind++;
                                            buffUp(buffup);
                                            buffed = true;
                                            break;
                                        }
                                        //debugger;
                                        if (ind == 0) {
                                            //console.log('guessing - ' + ($('#queue .vidui[data-link="' + v.link + '"]').length > 0 ? 'existed ' : 'not good ') + v.title);
                                            continue;
                                        }
                                    }
                                    else {
                                        if (ind == 0) {
                                            np = vo.id;
                                            nn = v.title;
                                            v.type = 'up';
                                            v.sug = []
                                            vn = v;
                                        }
                                        else if (buffup) {
                                            ind++;
                                            break;
                                        }
                                        else if (vn) {
                                            vn.sug.push(v);
                                        }
                                        ind++;
                                        allvids.push(v);
                                    }



                                    if (depth >= probedepth && vn && vn.type == 'up') vn.type = 'list';
                                    ui();
                                    if (buffup) {
                                        setTimeout('researchInProgress=false;', 1000);

                                        break;
                                    }

                                    if (res.items.length > 0 && nn != '' && depth < probedepth) {
                                        if (vn) cursubvid = vn;
                                        // {
                                        //     id: getVidId('v=' + basekey),
                                        //     link: 'v=' + basekey,
                                        //     img: '',
                                        //     title: nn,
                                        //     type: 'root',
                                        //     root: depth + 2,
                                        //     sug: []
                                        // };
                                        //allvids.push(cursubvid);
                                        //setTimeout('probe("' + np + '",' + (depth + 1) + ')', 500);
                                        researchQueue.unshift({
                                            type: 'probe',
                                            url: np,
                                            depth: (depth + 1),
                                            probedepth: probedepth,
                                            v: job.v
                                        });
                                    }
                                    else {
                                        lastUpNext = np;
                                        //window.lastditributed = false;
                                        probing = false;
                                        checkProbe();
                                        //progress(100);
                                    }
                                }
                            }
                            catch (ep) {
                                console.log('probe error');
                                debugger;
                            }

                            setTimeout('researchInProgress=false;', 1000);


                        }
                    )
                }
            )
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

        function showSuggestions(depth, fromscorll) {

            $("#scrollspace").animate({
                scrollTop: $("#scrollspace").scrollTop() + $(window).height() - 150
            });


        }

        function peekSuggestions(go) {}





        function addTop(id, t, elm) {
            $(elm).slideUp('fast', function() {
                $(this).insertBefore(inspoint).slideDown()
            });
            //$("#queue").animate({ scrollTop: 0 }, "slow");
            event.preventDefault();
            event.cancelBubble = true;
            return false;
        }

        function addBottom(id, t, elm) {
            $(elm).slideUp('fast', function() {
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
                j.slideUp('fast', function() {
                    $(this).remove();
                });
                j = j.next();
            }
            $(helm).parent().remove();
        }

        function deleteVid(id, related) {
            var v = getVidById(id);
            if ($('#' + id).is('.playing')) playNext();
            if (related) {
                if ($('#' + id).parent().is('#queue')) {
                    var bid = v.root ? v.id : v.basevidid;
                    $('.suglist, #queue').children().each(function() {
                        var cv = getVidById($(this).attr('id'));
                        if (cv.basevidid == bid) {
                            $('#' + cv.id).slideUp({
                                duration: 300,
                                complete: function() {
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
                complete: function() {
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
            if ($('#' + id).parents('.suglist').length > 0)
                $('#' + id).parents('.suglist').slideUp({
                    duration: 300,
                    complete: function() {
                        $(this).remove()
                    },
                    queue: false
                });
            else {
                $('#' + id).nextAll().slideUp({
                    duration: 300,
                    complete: function() {
                        $(this).remove()
                    },
                    queue: false
                });
                $('#' + id).remove();
            }
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

        function clicked(id, t, elm, main) {
            inspoint = $('.insetpoint');
            if (inspoint.length == 0) {
                $('<div class="insetpoint"><div class="or-spacer"><div class="mask"></div><span><i>Insert point</i></span></div></div>').prependTo('#queue');
                inspoint = $('.insetpoint');
            }
            if (elm.parentNode.id == 'queue') {
                if (main == 'main')
                    moveTo(id, elm);
                else if (main == 'addwiz') {
                    window.probedepth = 4;
                    var v = getVidById(id);
                    starred(v, 5);
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
                if (!elm.hoverscore) elm.hoverscore = 1;
                window.lastclickedrating = elm.hoverscore;
                switch (elm.hoverscore) {
                    case 0:
                        {
                            window.probedepth = 4;
                            starred(v, 5);
                            $(elm).slideUp('fast', function() {
                                $(this).insertBefore(inspoint).slideDown();
                                $('#smiley').appendTo('body');
                                if ($('.playing').length == 0) moveTo(lid, lelm);
                                //saveList();
                            });
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
                            $(elm).slideUp('fast', function() {
                                $(this).insertBefore(inspoint).slideDown();
                                $('#smiley').appendTo('body');
                                if ($('.playing').length == 0) moveTo(lid, lelm);
                                //saveList();
                            });
                            basekey = getVidById(id).link.split('=')[1];
                            probemain(v);
                            resize();

                            break;
                        }
                    case 2:
                        {
                            starred(v, 3);
                            window.probedepth = -1;
                            $(elm).slideUp('fast', function() {
                                $(this).insertBefore(inspoint).slideDown();
                                $('#smiley').appendTo('body');
                                if ($('.playing').length == 0) moveTo(lid, lelm);
                                //saveList();
                            });
                            basekey = getVidById(id).link.split('=')[1];
                            probemain(v);
                            resize();
                            break;
                        }
                    case 3:
                        {
                            starred(v, 2);
                            $(elm).slideUp('fast', function() {
                                $('#smiley').appendTo('body');
                                $(this).remove();
                                //saveList();
                            });
                            resize();
                            break;
                        }
                    case 4:
                        {
                            starred(v, 1);
                            $('#smiley').appendTo('body');
                            deleteVid(id, true)
                            //saveList();
                            resize();
                            break;
                        }
                    default:
                        {
                            $('#smiley').appendTo('body');
                        }
                }
            }
            event.preventDefault();
            event.cancelBubble = true;

        }

        function moveTo(id, elm) {
            if ($(elm).prevAll().length > 0) {
                var tl = $(elm).prevAll().length;
                playNext(id);
                checkProbe();
            }
            else {
                playNext(id);
            }

        }

        function probemain(basekey) {

            var v = basekey;
            var lcurbasevid;
            var lcurbasevid;
            if (typeof basekey.id != 'undefined') {
                basekey.root = true;
                basekey.colors = colors[colorind++ % colors.length];
                lcurbasevid = basekey
                $('#' + basekey.id).css({
                    'border-right': '4px solid',
                    'border-right-color': 'rgba' + basekey.colors.split('rgba')[2],
                    'nbackground-image': basekey.colors + ')'
                });
                basekey = basekey.link.split('=')[1];
            }
            else {
                lcurbasevid = {
                    id: getVidId('v=' + basekey),
                    link: 'v=' + basekey,
                    img: '',
                    title: 'initial',
                    type: 'root',
                    root: 1,
                    sug: []
                };
                allvids.push(lcurbasevid);
            }
            lcursubvid = lcurbasevid; // null;
            //probe(basekey);
            researchQueue.push({
                type: 'probe',
                url: basekey,
                depth: 0,
                probedepth: window.probedepth,
                curbasevid: lcurbasevid,
                cursubvid: lcursubvid,
                v: v
            })

            if (moodProbeQueue.length == 0) { progress(Math.round(50 / (researchQueue.length + 2))); }
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

        function getVidId(l) {
            return new Date().valueOf() + ++vididcounter;
        }

        function vidExists(v, t) {
            if (!t) t = 'up';
            if (v.link.split('=')[1] == basekey) return true;
            if (t == 'up') {
                if ($('#queue .title').filter(function () {
                    var s1 = $(this).html();
                    return areDups(s1, v.title);
                }).length > 0) return true;
            }

            for (var i = (t = 'recent' ? allvids.length - 100 : 0) ; i < allvids.length; i++) {
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

            var bm = false, br;
            if ($('#queue .title').filter(function () {
                if (bm) return;
                var s1 = $(this).html();
                br = areDups(s1, lv.title);
                if (br) bm = true;
                return;
            }).length > 0) return false;

            return (isGoodTitle(v.title) &&
                (
            ((v.isgood) ||
            ((typeof dur == 'undefined' || !dur || isNaN(dur)) || (dur >= playlists.settings.optimalLength.from && dur <= playlists.settings.optimalLength.to)))));
        }

        function isGoodTitle(q) {
            q = q.toLowerCase().trim();
            if (!(
                //!(new RegExp('\\blive\\b','gi').test(q)) &&
                    q.indexOf('channel') == -1 && q.indexOf('playlist') == -1 && q.indexOf('[private video]') == -1 && q.indexOf('[deleted video]') == -1
                )) return false;
            for (var i = 0; i < playlists.settings.excludes.length; i++) {
                if (q.indexOf(playlists.settings.excludes[i]) > -1) return false;
            }
            return true;
        }


        function playNext(id) {
            if (new Date() - lastplayednexttime < 1000) {
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
            if ($('#queue .vidui').length == 0) return;
            if (typeof id == 'undefined') id = $('#queue .vidui.playing').next().attr('id');
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

            $('.playing').addClass('played').removeClass('playing');
            $('#queue #' + id).addClass('playing');
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
                //document.getElementById('currentlyplaying').innerText = v.title;
                document.title = v.title;
                $('#coverad').html('<img src="https://' + v.img.replace('https://', '') + '"/>' + v.title);
                $('.titlebar').html(pretitle + ' ' + v.title);
                //ipcRenderer.send('online-status-changed', 'play:' + v.link.split('?v=')[1]);

                if (lastplayedid == 'init') {
                    tabvideo();
                    $('#initvideo').fadeIn();
                    $('#logo').removeClass('initial');
                    $('#arrow').hide();
                }
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

        var lastplayedid = 'init';
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

        function checkProbe() {
            if (!$('#chkradio').prop('checked')) return;
            if ($('#queue .vidui.playing').length > 0 && $('#queue .vidui').length > 4) {
                if ($('#queue .vidui.playing').nextAll().length < 4) {
                    // if (0 && lastUpNext != '') {
                    //     probe(lastUpNext);
                    // }
                    // else 
                    {
                        //if (buffupcurdepth == 0) 
                        addMode = 'radio';
                        buffUp(4);
                        addMode = 'distribute';
                    }
                }
            }
        }


function saveList(skipchanges, skipui) {
    //skipchanges=false;
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
                        record('Saved List', playlists.lists[curlistind].titile + ' (' + playlists.lists[curlistind].vids.length + ')');
                    }
                    playlists.curlistind = curlistind;
                }
                else {
                    playlists.curlistind = Math.max(0, curlistind - 1);
                }

                for (var i = 1; i < 6; i++) {
                    if (typeof playlists.settings.starred['star' + i] != 'undefined') {
                        for (var i1 = 0; i1 < playlists.settings.starred['star' + i].length; i1++) {
                            delete playlists.settings.starred['star' + i][i1].friends;
                            delete playlists.settings.starred['star' + i][i1].sug;
                        }
                    }
                }

                fs.writeFile(window.userDataDir + "/lists.txt", JSON.stringify(playlists), function(err) {
                    if (err) {
                        return console.log(err);
                    }
                    if (!skipui) progress(100);
                });
            }
            
            
            
            
            
var idleprogress = 0;
var forcedendtimer = false;
function research() {
    try {
        if (typeof player != 'undefined' && typeof player.getPlayerState != 'undefined') {
            if (player.getPlayerState() == YT.PlayerState.PLAYING
                && player.getCurrentTime() - player.getDuration() > -5
                && player.getDuration() > 0) // anti repeat hack - any event in the last 5 seconds is ENDED
            {
                var timeleft = player.getDuration() - player.getCurrentTime();
                if (forcedendtimer) clearTimeout(forcedendtimer);
                forcedendtimer = setTimeout(function () {
                    forcedendtimer = false;
                    console.log('ENDDED FORCED:' + player.getCurrentTime() + ' - ' + player.getDuration() + ' ' + new Date());
                    onPlayerStateChange({ "data": YT.PlayerState.ENDED });
                }, timeleft * 1000 - 400);
            }
            else if (forcedendtimer) clearTimeout(forcedendtimer);
        }

        if (researchQueue.length == 0 || researchInProgress) {
            if (!researchInProgress) {
                idleprogress = 0;
                if (moodProbeQueue.length > 0 && researchQueue.length == 0) {
                    window.lastditributed = false;
                    addMode = 'distribute';
                    window.probedepth = 1;
                    var v = moodProbeQueue.shift();
                    moodProbeQueue.unshift({})
                    probemain(v);
                    moodProbeQueue.shift();
                    //resize();
                }

                else if (iprogress != 0 && iprogress != 100) {
                    progress(100);
                    $('#queue .vidui').each(function () {
                        var v = getVidById(this.id);
                        for (var i2 = 0; i2 < allvids.length; i2++) {
                            if (allvids[i2].subvidid == v.id && !allvids[i2].friended) {
                                if (!v.friends) v.friends = [];
                                allvids[i2].friended = true;
                                v.friends.push(allvids[i2]);
                            }
                        }
                    });
                }



            }
            else {
                progress(Math.round(Math.min(99, iprogress + (100 - iprogress) / (10 * Math.min(9, Math.max(1, (researchQueue.length + moodProbeQueue.length)))))));
                if (idleprogress++ > 10) {
                    debugger;
                    idleprogress = 0;
                    console.log('ERR: quiting process!');
                    researchInProgress = false;
                }
            }
            return;
        }
        idleprogress = 0;
        researchInProgress = true;
        var job = researchQueue[0];
        researchQueue.splice(0, 1);
        switch (job.type) {
            case 'list':
                {
                    getList(job.url, job);
                    break;
                }
            case 'probe':
                {
                    if (job.curbasevid) curbasevid = job.curbasevid;
                    if (job.cursubvid) cursubvid = job.cursubvid;
                    probe(job.url, job.depth, false, job.probedepth, job)
                    break;
                }
            case 'buff':
                {
                    probe(job.url, 0, job.depth, job.probedepth)
                    break;
                }
        }
    } catch (e) {
        console.log('research error: ' + e.message);
    }
}
setInterval(research, 500);

            
            
            
            
                        function jsonList() {
                var a = []
                for (var i = 0; i < played.length; i++) {
                    a.push(vidToMinVid(played[i]));
                }
                $('#queue .vidui').each(function() {
                    var v = getVidById(this.id);
                    a.push(vidToMinVid(v));
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



