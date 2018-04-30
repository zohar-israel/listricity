// optionally call buff up
function checkProbe() {
    if (!$('#chkradio').prop('checked')) return;
    if ($('#queue .vidui.playing').length > 0 && $('#queue .vidui').length > 1) {
        if ($('#queue .vidui.playing').nextAll().length < 4) {
            if (window.probedepth != 1) {
                //if (buffupcurdepth == 0) 
                //setTimeout(function () { window.probedepth = 4 }, 10000);
                addMode = 'radio';
                buffUp(4);
                addMode = 'distribute';
            }
        }
    }
}

// queue a root probe job
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
    lcursubvid = lcurbasevid; 

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

// probe a track
function probe(key, depth, buffup, probedepth, job) {
    probing = true;
    depth = depth || 0;
    if (!key || key.indexOf('undefined') > -1) {
        debugger;
    }


    // search for playlists by track title
    $.ajax({
        cache: false,
        dataType: 'json',
        type: 'GET',
        timeout: 5000,//&order=viewCount
        url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=' + job.v.title + '&topicId=%2Fmusic&type=playlist&key=AIzaSyDzBT7HbodgQ6OT70ExaOvQUpp-Jw5pokM'
    }).done(
        function (res, state) {
            if (state != 'success') {
                console.log('ERR: ' + state);
                debugger;
                setTimeout('researchInProgress=false;', 2000);
                return;
            }
            var nlists = 0;

            // queue list jobs
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

    // search for related videos
    $.ajax({
        cache: false,
        dataType: 'json',
        type: 'GET',
        timeout: 5000,//&order=viewCount &videoEmbeddable=true&videoSyndicated=true
        url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&relatedToVideoId=' + key + '&topicId=%2Fmusic&type=video&videoCategoryId=10&key=AIzaSyDzBT7HbodgQ6OT70ExaOvQUpp-Jw5pokM'
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

            // get tracks info from YT
            $.ajax({
                cache: false,
                dataType: 'json',
                type: 'GET',
                timeout: 5000, //&order=viewCount
                url: 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+contentDetails%2C+status&id=' + ids + '&maxResults=50&key=AIzaSyDzBT7HbodgQ6OT70ExaOvQUpp-Jw5pokM'
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
                        try {

                            basevidtitle = job.v.title 
                            if (basevidtitle.trim() == '')
                                debugger;
                        }
                        catch (e) {
                            debugger;
                        }

                        var ind = 0;
                        var np = '';
                        var vn;
                        var buffed = false;
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


                            // test track
                            vidExists(v, 'up');

                            if (!v.title
                                || !isGoodTitle(title)
                                || deletedtitles.indexOf(title) > -1) {
                                continue;
                            }
                            if ($('#queue .vidui[data-link="' + v.link + '"]').length > 0 || !isGoodVideo(v)) {
                                if (buffup) {
                                    ind++;
                                    buffUp(buffup);
                                    buffed = true;
                                    break;
                                }
                                if (ind == 0) {
                                    //console.log('guessing - ' + ($('#queue .vidui[data-link="' + v.link + '"]').length > 0 ? 'existed ' : 'not good ') + v.title);
                                    continue;
                                }
                            }
                            else {
                                // track is good
                                // first one goes to playlist
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
                                // the rest to suggestions
                                else if (vn) {
                                    vn.sug.push(v);
                                }
                                ind++;
                                allvids.push(v);
                            }



                            if (depth >= probedepth && vn && vn.type == 'up') vn.type = 'list';
                            ui();
                            if (buffup) {
                                //setTimeout('researchInProgress=false;window.probedepth = 4;', 1000);
                                setTimeout('researchInProgress=false;', 1000);
                                break;
                            }

                            if (res.items.length > 0 && nn != '' && depth < probedepth) {
                                // queue job to probe the next level
                                if (vn) cursubvid = vn;
                                researchQueue.unshift({
                                    type: 'probe',
                                    url: np,
                                    depth: (depth + 1),
                                    probedepth: probedepth,
                                    v: job.v
                                });
                            }
                            else {
                                // done probing
                                lastUpNext = np;
                                probing = false;
                                checkProbe();
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

// perform a text search
function dosearch(s, type) {
    try {
        var event = window.event;
        event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
    } catch (e) { }
    type = type || 'all';

    // types:
    // all      - basic text search
    // first    - sub searches
    // genere   - a genre search

    researchInProgress = true;
    $('#mi_root').remove();
    var sq = s;
    basevidtitle = s;

    // clear queues on any user initiated search
    if (type != 'first') {
        researchQueue = [];
        moodProbeQueue = [];
    }
    if (type == 'genere') {
        perspective = 'results';
        pretitle == ''
        showSug();
        $('#stage_sug').children().remove();
        progress(10);
    }
    if (type == 'all') {
        // handle artist searches, search for tracks
        // from auto suggest
        repeats = [];
        progress(30);
        searchsongs = [];
        searchsongsbase = s;
        searchsongsexpected = 0;
        // add sub searches for auto suggestions 
        // if the search term is not a track
        //autocomplete(s, function (r) {
        //    for (var i = 0; i < r.length && i < 10; i++) {
        //        var q = r[i].trim().toLowerCase();
        //        var istrack = false;
        //        for (var i1 = 0; i1 < trackIndicators.length; i1++) {
        //            if (q.indexOf(trackIndicators[i1]) > -1)
        //                istrack = true;
        //        }
        //        if (q != s.trim().toLowerCase() && isGoodTitle(q) && !istrack) {
        //            //console.log('search as: ' + r[i]);
        //            searchsongsexpected++;
        //            setTimeout('dosearch("' + q + '","first")', (i + 1) * 500)
        //        }
        //    }
        //})
    }


    if (type == 'genere') researchInProgress = false;
    else {
        // search for tracks by term
        $.ajax({
            cache: false,
            dataType: 'json',
            type: 'GET',
            timeout: 5000, //&order=viewCount&videoEmbeddable=true&videoSyndicated=true
            url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=' + escape(s) + '&topicId=%2Fmusic&type=video&videoCategoryId=10&key=AIzaSyDzBT7HbodgQ6OT70ExaOvQUpp-Jw5pokM'
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
                var urq = 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+contentDetails%2C+status&id=';
                //if (type == 'all')
                urq = 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+contentDetails%2C+status%2C+topicDetails&id=';
                // get tracks info from YT
                $.ajax({
                    cache: false,
                    dataType: 'json',
                    type: 'GET',
                    timeout: 5000, //&order=viewCount
                    url: urq + ids + '&maxResults=50&key=AIzaSyDzBT7HbodgQ6OT70ExaOvQUpp-Jw5pokM'
                }).done(
                    function (idres, state) {
                        var res = idres;
                        if (state != 'success') {
                            if (type == 'first') searchsongs.push({
                                sug: []
                            })
                            researchInProgress = false;
                            console.log('ERR: ' + state);
                            debugger;
                            return;
                        }

                        var tids = '';
                        for (var i = 0; i < res.items.length; i++) {
                            tids += (res.items[i].id.videoId || res.items[i].id) + ',';
                        }
                        var alltopics = {}, topiccounts = {};
                        function addToAllTopics(tid) {
                            if (typeof tid == 'undefined') return;
                            if (typeof alltopics[tid] == 'undefined') alltopics[tid] = 1;
                            else alltopics[tid]++;
                        }
                        for (var i = 0; i < res.items.length; i++) {
                            if (typeof res.items[i].topicDetails == 'undefined') continue;
                            if (typeof res.items[i].topicDetails.topicIds == 'undefined') continue;
                            for (var i1 = 0; i1 < res.items[i].topicDetails.topicIds.length; i1++) { addToAllTopics(res.items[i].topicDetails.topicIds[i1]); }
                            //for (var i1 = 0; i1 < res.items[i].topicDetails.relevantTopicIds.length; i1++) { addToAllTopics(res.items[i].topicDetails.topicIds[i1]); }
                        }
                        if (Object.keys(alltopics).length == 0) {
                            tids = 'ids=' + tids.replace(/,/gi, '&ids=');

                             researchInProgress = false;
                            //console.log('ERR: ' + state);
                            //debugger;
                           return;
                        }
                        else
                        tids = 'ids=' + (Object.keys(alltopics) + '').replace(/,/gi, '&ids=');
                        // get track topic info from KB
                        $.ajax({
                            cache: false,
                            dataType: 'json',
                            type: 'GET',
                            timeout: 5000, //&order=viewCount
                            url: 'https://kgsearch.googleapis.com/v1/entities:search?' + tids + '&limit=50&fields=context%2CitemListElement%2Ctype&key=AIzaSyDzBT7HbodgQ6OT70ExaOvQUpp-Jw5pokM'
                        }).done(
                            function (reskb, state) {
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
                                // add the data from KB to the track objects
                                for (var vi = 0; vi < res.items.length; vi++) {
                                    if (typeof res.items[vi].topicDetails == 'undefined') continue;
                                    if (typeof res.items[vi].topicDetails.topicIds == 'undefined') continue;
                                    var vo = res.items[vi];
                                    for (var kbi = 0; kbi < reskb.itemListElement.length; kbi++) {
                                        var kb = reskb.itemListElement[kbi];
                                        for (var i1 = 0; i1 < vo.topicDetails.topicIds.length; i1++) {
                                            if (vo.topicDetails.topicIds[i1] == kb.result['@id']); {
                                                if (typeof vo.kbs == 'undefined') vo.kbs = [kb];
                                                else vo.kbs.push(kb);
                                                if (kb.result['@type'].indexOf('MusicGroup') > -1) vo.MusicGroup = kb.result.name;
                                                else if (kb.result['@type'].indexOf('Person') > -1) vo.Person = kb.result.name;
                                                else if (kb.result['@type'].indexOf('MusicRecording') > -1) vo.MusicRecording = kb.result.name;
                                                else if (kb.result['@type'].indexOf('MusicAlbum') > -1) vo.MusicAlbum = kb.result.name;
                                                //else debugger;
                                            }
                                        }

                                    }
                                }
                                //if (type == 'all') {
                                //    var alltopics = {}, topiccounts = {};
                                //    function addToAllTopics(tid) {
                                //        if (typeof tid == 'undefined') return;
                                //        if (typeof alltopics[tid] == 'undefined') alltopics[tid] = 1;
                                //        else alltopics[tid]++;
                                //    }
                                //    for (var i = 0; i < res.items.length; i++) {
                                //        console.log(res.items[i].snippet.title)
                                //        console.log(res.items[i].topicDetails.topicIds)
                                //        console.log(res.items[i].topicDetails.relevantTopicIds)
                                //        for (var i1 = 0; i1 < res.items[i].topicDetails.topicIds.length; i1++) { addToAllTopics(res.items[i].topicDetails.topicIds[i1]); }
                                //        //for (var i1 = 0; i1 < res.items[i].topicDetails.relevantTopicIds.length; i1++) { addToAllTopics(res.items[i].topicDetails.topicIds[i1]); }
                                //    }
                                //    var sortable = [];
                                //    for (var i1 = 0; i1 < Object.keys(alltopics).length; i1++) {
                                //        var tk = Object.keys(alltopics)[i1];
                                //        sortable.push([tk, alltopics[tk]]);
                                //        if (alltopics[tk] > res.items.length / 2) {
                                //        }
                                //    }
                                //    sortable.sort(
                                //        function (a, b) {
                                //            return b[1] - a[1]
                                //        }
                                //    );
                                //    if (sortable.length > 1 && sortable[1] > res.items.length / 2) {
                                //        // 2 ids constantly repeated - artist and track
                                //        debugger;
                                //        researchInProgress = false;
                                //        return;
                                //    }
                                //    else if (sortable.length > 0 && sortable[0] > res.items.length / 2) {
                                //        // 1 id constantly repeated - check if its an artist or a track
                                //        debugger;
                                //        researchInProgress = false;
                                //        return;
                                //    }
                                //}

                                var vids;
                                researchInProgress = false;
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
                                    // filter unwanted tracks

                                    if (typeof vo.MusicRecording == 'undefined'
                                        && (
                                        typeof vo.MusicGroup == 'undefined'
                                        && typeof vo.MusicAlbum == 'undefined'
                                        && typeof vo.Person == 'undefined'
                                        )) {
                                        //console.log('!! not track:' + vo.snippet.title);
                                        vo.MusicRecording = 'none';
                                        if (type != 'all') continue;
                                    }
                                    if (repeats.indexOf(vo.MusicRecording) > -1 && type != 'all') {
                                        // console.log('repeat:' + vo.snippet.title);
                                        //continue;
                                    }
                                    repeats.push(vo.MusicRecording);
                                    var status = vo.status; if (!status.embeddable || status.uploadStatus != "processed" || status.privacyStatus != "public") continue;
                                    if (typeof vo.id == 'undefined' || vo.kind.indexOf('youtube#video') == -1) continue;
                                    var img = vo.snippet.thumbnails.default.url;
                                    var title = vo.snippet.title
                                    if (!isGoodTitle(title)) continue;


                                    // track is good 
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
                                // process filtered suggestions
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
                                                    //if (!vidExists(sv, 'all'))
                                                    {
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
                    });
            })
    }



    // probe playlists
    if (type != 'first') {
        //allvids = [];

        $.ajax({
            cache: false,
            dataType: 'json',
            type: 'GET',
            timeout: 5000, //&order=viewCount
            url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&maxResults=50&q=' + s + '&topicId=%2Fmusic&type=playlist&key=AIzaSyDzBT7HbodgQ6OT70ExaOvQUpp-Jw5pokM'
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


}

// extruct tracks from a playlist
function getList(hr, job) {
    var ljob = job;
    $.ajax({
        cache: false,
        dataType: 'json',
        type: 'GET',
        timeout: 5000, //&order=viewCount
        url: "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=" + hr + "&key=AIzaSyDzBT7HbodgQ6OT70ExaOvQUpp-Jw5pokM",
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
            url: 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+contentDetails%2C+status%2C+topicDetails&id=' + ids + '&maxResults=50&key=AIzaSyDzBT7HbodgQ6OT70ExaOvQUpp-Jw5pokM'
        }).done(


            function (res, state) {
                if (state != 'success') {
                    console.log('ERR: ' + state);
                    debugger;
                    setTimeout('researchInProgress=false;', 2000);
                    return;
                }





                var tids = '';
                for (var i = 0; i < res.items.length; i++) {
                    tids += res.items[i].id.videoId + ',';
                }
                var alltopics = {}, topiccounts = {};
                function addToAllTopics(tid) {
                    if (typeof tid == 'undefined') return;
                    if (typeof alltopics[tid] == 'undefined') alltopics[tid] = 1;
                    else alltopics[tid]++;
                }
                for (var i = 0; i < res.items.length; i++) {
                    if (typeof res.items[i].topicDetails == 'undefined') continue;
                    if (typeof res.items[i].topicDetails.topicIds != 'undefined')
                    for (var i1 = 0; i1 < res.items[i].topicDetails.topicIds.length; i1++) { addToAllTopics(res.items[i].topicDetails.topicIds[i1]); }
                    else if (typeof res.items[i].topicDetails.relevantTopicIds != 'undefined')
                        for (var i1 = 0; i1 < res.items[i].topicDetails.relevantTopicIds.length; i1++) { addToAllTopics(res.items[i].topicDetails.relevantTopicIds[i1]); }
                }

                tids = 'ids=' + (Object.keys(alltopics).slice(0, 50) + '').replace(/,/gi, '&ids=');


                $.ajax({
                    cache: false,
                    dataType: 'json',
                    type: 'GET',
                    timeout: 5000, //&order=viewCount
                    url: 'https://kgsearch.googleapis.com/v1/entities:search?' + tids + '&limit=50&fields=context%2CitemListElement%2Ctype&key=AIzaSyDzBT7HbodgQ6OT70ExaOvQUpp-Jw5pokM'
                }).done(
                    function (reskb, state) {
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






                        for (var vi = 0; vi < res.items.length; vi++) {
                            if (typeof res.items[vi].topicDetails == 'undefined') continue;
                            if (typeof res.items[vi].topicDetails.topicIds == 'undefined') continue;
                            var vo = res.items[vi];
                            for (var kbi = 0; kbi < reskb.itemListElement.length; kbi++) {
                                var kb = reskb.itemListElement[kbi];
                                for (var i1 = 0; i1 < vo.topicDetails.topicIds.length; i1++) {
                                    if (vo.topicDetails.topicIds[i1] == kb.result['@id']); {
                                        if (typeof vo.kbs == 'undefined') vo.kbs = [kb];
                                        else vo.kbs.push(kb);
                                        if (kb.result['@type'].indexOf('MusicGroup') > -1) vo.MusicGroup = kb.result.name;
                                        else if (kb.result['@type'].indexOf('Person') > -1) vo.Person = kb.result.name;
                                        else if (kb.result['@type'].indexOf('MusicRecording') > -1) vo.MusicRecording = kb.result.name;
                                        else if (kb.result['@type'].indexOf('MusicAlbum') > -1) vo.MusicAlbum = kb.result.name;
                                        //else debugger;
                                    }
                                }

                            }
                        }


                        var listvn;
                        var listind = 0;

                        for (var i = 0; i < res.items.length; i++) {

                            var vo = res.items[i];
                            var status = vo.status; if (!status.embeddable || status.uploadStatus != "processed" || status.privacyStatus != "public") continue;
                            if (typeof vo.id == 'undefined' || vo.kind.indexOf('youtube#video') == -1 || typeof vo.snippet.thumbnails == 'undefined') continue;

                            if (typeof vo.MusicRecording == 'undefined'
                                                               && (
                                                               typeof vo.MusicGroup == 'undefined'
                                                               && typeof vo.MusicAlbum == 'undefined'
                                                               && typeof vo.Person == 'undefined'
                                                               )) {
                                //vo.MusicRecording = 'none';
                                //console.log('!! not track:' + vo.snippet.title);
                                //continue;
                            }
                            if (repeats.indexOf(vo.MusicRecording) > -1) {
                                //console.log('repeat:!' + vo.MusicRecording+'! '+vo.snippet.title);
                                //continue;
                            }
                            //console.log('NO repeat:' + vo.MusicRecording + ' ' + vo.snippet.title);

                            repeats.push(vo.MusicRecording);

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

                            if (//!vidExists(listv, 'all') &&
                                listv.title) {
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
            });
    })
}

// find more tracks based on the listed tracks
function buffUp(c) {
    buffupcurdepth = c;
    if (c == 0) {
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
        // see if there are existing unused suggestions
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
                // no existing suggestions
                // find track to probe
                done = true;
                var ql = $('#queue .vidui').length;
                wizmodebuff = true;
                while (i++ < ql && i < c / 2) {
                    var bid = $($('#queue .vidui')[radiobuffind++ % ql]).attr('id');
                    window.probedepth = 1;
                    var v = getVidById(bid);
                    basekey = v.link.split('=')[1];
                    probemain(v);
                    resize();
                    //$($('#queue .vidui')[radiobuffind++ % ql]).find('.addwiz').click();
                }
                wizmodebuff = false;

                break;
            } // exhosted

            // us the existing suggestion
            bufv = bufv.friends.shift();
            if (deletedtitles.indexOf(bufv.title) > -1) {
            }
            else if ($('#queue .vidui[data-link="' + bufv.link + '"]').length == 0 && isGoodVideo(bufv)) {
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

// process the research queue
function research() {
    try {
        // make sure player is inited
        if (typeof player != 'undefined' && typeof player.getPlayerState != 'undefined') {
            if (player.getPlayerState() == YT.PlayerState.PLAYING
                && player.getCurrentTime() - player.getDuration() > -5
                && player.getDuration() > 0) // anti repeat hack - any event in the last 5 seconds is ENDED
            {
                var timeleft = player.getDuration() - player.getCurrentTime();
                if (forcedendtimer) clearTimeout(forcedendtimer);
                forcedendtimer = setTimeout(function () {
                    forcedendtimer = false;
                    //console.log('ENDDED FORCED:' + player.getCurrentTime() + ' - ' + player.getDuration() + ' ' + new Date());
                    onPlayerStateChange({ "data": YT.PlayerState.ENDED });
                }, timeleft * 1000 - 400);
            }
            else if (forcedendtimer) clearTimeout(forcedendtimer);
        }
        // check for jobs in queue
        if (researchQueue && researchQueue.length == 0 || researchInProgress) {
            if (!researchInProgress) {
                // no items in queue 
                // start second priority jobs
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

                // nothing left to process
                else if (iprogress != 0 && iprogress != 100) {
                    window.probedepth = 4;
                    addMode = 'distribute';

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
                // previous job is still in progress
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

        // ready to process the next job
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
