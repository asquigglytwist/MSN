var L = L || {};

L.sBlogURL = undefined;
L.sFeedURL = undefined;
L.asKnownOrgNames = ["google", "Lavnok", "microsoft", "yahoo", "bing", "github"];
L.asKnownProfanity = ["fuck", "suck", "shit",
                      "slut", "bitch", "whore", "asshole",
                      "porn", "porno", "pornography"];

/*
GitHub Activity
*/
L.fnGitHubActivity = function (sUserName, iNumReposToList, sDOMEltId) {
    if ((!sUserName) || (!sUserName.trim().length))
        sUserName = 'ASquigglyTwist';
    if ((!iNumReposToList) || (iNumReposToList < 1))
        iNumReposToList = 2;
    if ((!sDOMEltId) || (!sDOMEltId.trim().length))
        sDOMEltId = 'GHActivity';
    var xhr = new XMLHttpRequest(), ndGHActivity = document.getElementById(sDOMEltId);
    xhr.onreadystatechange = function () {
        if ((xhr.readyState == 4) && (xhr.status == 200)) {
            var data = JSON.parse(xhr.response), ndRepos = [];
            data.sort(function (a, b) { return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(); });
            for (var i = 0; (i < iNumReposToList && i < data.length); i++) {
                ndGHActivity.innerHTML += '<p class=\"leftIndent\"><a href=\"' + data[i].html_url + '\">' + data[i].name + ' - ' + data[i].description + '</a></p><p class=\"leftIndent\">Last Updated:&nbsp;&nbsp;' + data[i].pushed_at + '</p>';
            }
        }
    };
    xhr.open("GET", "https://api.github.com/users/" + sUserName + "/repos", true);
    xhr.send();
};

/*
WordPress feeds
*/
L.fnFetchLatestPosts = function (sUrl, sFeedUrl) {
    if ((!sUrl) || (!sUrl.trim().length))
        L.sBlogURL = 'https://lavnok.wordpress.com';
    else
        L.sBlogURL = sUrl;
    if ((!sFeedUrl) || (!sFeedUrl.trim().length))
        L.sFeedURL = '/feed/atom/';
    else
        L.sFeedURL = sFeedUrl;
    google.load("feeds", "1");
    google.setOnLoadCallback(L.fnProcessLatestPosts);
};

L.fnProcessLatestPosts = function () {
    var feed = new google.feeds.Feed(L.sBlogURL + L.sFeedURL);
    feed.setNumEntries(2);
    feed.load(function (result) {
        if (!result.error) {
            var container = document.getElementById("WPFeed");
            for (var i = 0; i < result.feed.entries.length; i++) {
                container.innerHTML += '<p class=\"leftIndent\"><a href=\"' + result.feed.entries[i].link + '\">' + result.feed.entries[i].title + '</a></p><p class=\"leftIndent\">Last Updated:&nbsp;&nbsp;' + result.feed.entries[i].publishedDate + '</p>'; ;
            }
        }
    });
};

/*********************************************************************
*  #### Twitter Post Fetcher v12.0 #### Coded by Jason Mayes 2013. A present to all the developers out there. www.jasonmayes.com. Please keep this disclaimer with my code if you use it. Thanks. :-)
*  Got feedback or questions, ask here: http://www.jasonmayes.com/projects/twitterApi/, Github: https://github.com/jasonmayes/Twitter-Post-Fetcher, Updates will be posted to this site.
*********************************************************************/
var twitterFetcher = function () {
    function w(a) { return a.replace(/<b[^>]*>(.*?)<\/b>/gi, function (a, f) { return f }).replace(/class=".*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi, "") } function m(a, c) { for (var f = [], g = new RegExp("(^| )" + c + "( |$)"), h = a.getElementsByTagName("*"), b = 0, k = h.length; b < k; b++) g.test(h[b].className) && f.push(h[b]); return f } var x = "", k = 20, y = !0, p = [], s = !1, q = !0, r = !0, t = null, u = !0, z = !0, v = null, A = !0, B = !1; return { fetch: function (a) {
        void 0 === a.maxTweets && (a.maxTweets = 20); void 0 === a.enableLinks &&
(a.enableLinks = !0); void 0 === a.showUser && (a.showUser = !0); void 0 === a.showTime && (a.showTime = !0); void 0 === a.dateFunction && (a.dateFunction = "default"); void 0 === a.showRetweet && (a.showRetweet = !0); void 0 === a.customCallback && (a.customCallback = null); void 0 === a.showInteraction && (a.showInteraction = !0); void 0 === a.showImages && (a.showImages = !1); if (s) p.push(a); else {
            s = !0; x = a.domId; k = a.maxTweets; y = a.enableLinks; r = a.showUser; q = a.showTime; z = a.showRetweet; t = a.dateFunction; v = a.customCallback; A = a.showInteraction; B = a.showImages;
            var c = document.createElement("script"); c.type = "text/javascript"; c.src = "//cdn.syndication.twimg.com/widgets/timelines/" + a.id + "?&lang=" + (a.lang || "en") + "&callback=twitterFetcher.callback&suppress_response_codes=true&rnd=" + Math.random(); document.getElementsByTagName("head")[0].appendChild(c)
        }
    }, callback: function (a) {
        var c = document.createElement("div"); c.innerHTML = a.body; "undefined" === typeof c.getElementsByClassName && (u = !1); a = []; var f = [], g = [], h = [], b = [], n = [], e = 0; if (u) for (c = c.getElementsByClassName("tweet"); e <
c.length; ) { 0 < c[e].getElementsByClassName("retweet-credit").length ? b.push(!0) : b.push(!1); if (!b[e] || b[e] && z) a.push(c[e].getElementsByClassName("e-entry-title")[0]), n.push(c[e].getAttribute("data-tweet-id")), f.push(c[e].getElementsByClassName("p-author")[0]), g.push(c[e].getElementsByClassName("dt-updated")[0]), void 0 !== c[e].getElementsByClassName("inline-media")[0] ? h.push(c[e].getElementsByClassName("inline-media")[0]) : h.push(void 0); e++ } else for (c = m(c, "tweet"); e < c.length; ) a.push(m(c[e], "e-entry-title")[0]),
n.push(c[e].getAttribute("data-tweet-id")), f.push(m(c[e], "p-author")[0]), g.push(m(c[e], "dt-updated")[0]), void 0 !== m(c[e], "inline-media")[0] ? h.push(m(c[e], "inline-media")[0]) : h.push(void 0), 0 < m(c[e], "retweet-credit").length ? b.push(!0) : b.push(!1), e++; a.length > k && (a.splice(k, a.length - k), f.splice(k, f.length - k), g.splice(k, g.length - k), b.splice(k, b.length - k), h.splice(k, h.length - k)); c = []; e = a.length; for (b = 0; b < e; ) {
            if ("string" !== typeof t) {
                var d = new Date(g[b].getAttribute("datetime").replace(/-/g, "/").replace("T",
" ").split("+")[0]), d = t(d); g[b].setAttribute("aria-label", d); if (a[b].innerText) if (u) g[b].innerText = d; else { var l = document.createElement("p"), C = document.createTextNode(d); l.appendChild(C); l.setAttribute("aria-label", d); g[b] = l } else g[b].textContent = d
            } d = ""; y ? (r && (d += '<div class="user">' + w(f[b].innerHTML) + "</div>"), d += '<p class="tweet">' + w(a[b].innerHTML) + "</p>", q && (d += '<p class="timePosted">' + g[b].getAttribute("aria-label") + "</p>")) : a[b].innerText ? (r && (d += '<p class="user">' + f[b].innerText + "</p>"), d +=
'<p class="tweet">' + a[b].innerText + "</p>", q && (d += '<p class="timePosted">' + g[b].innerText + "</p>")) : (r && (d += '<p class="user">' + f[b].textContent + "</p>"), d += '<p class="tweet">' + a[b].textContent + "</p>", q && (d += '<p class="timePosted">' + g[b].textContent + "</p>")); A && (d += '<p class="interact"><a href="https://twitter.com/intent/tweet?in_reply_to=' + n[b] + '" class="twitter_reply_icon">Reply</a><a href="https://twitter.com/intent/retweet?tweet_id=' + n[b] + '" class="twitter_retweet_icon">Retweet</a><a href="https://twitter.com/intent/favorite?tweet_id=' +
n[b] + '" class="twitter_fav_icon">Favorite</a></p>'); B && void 0 !== h[b] && (l = h[b], void 0 !== l ? (l = l.innerHTML.match(/data-srcset="([A-z0-9%_\.-]+)/i)[0], l = decodeURIComponent(l).split('"')[1]) : l = void 0, d += '<div class="media"><img src="' + l + '" alt="Image from tweet" /></div>'); c.push(d); b++
        } if (null === v) { a = c.length; f = 0; g = document.getElementById(x); for (h = "<ul>"; f < a; ) h += "<li>" + c[f] + "</li>", f++; g.innerHTML = h + "</ul>" } else v(c); s = !1; 0 < p.length && (twitterFetcher.fetch(p[0]), p.splice(0, 1))
    }
    }
} ();
var lavnoktweets = {
    "id": '550297830410031105',
    "domId": '',
    "maxTweets": 2,
    "enableLinks": true,
    "showUser": false,
    "showTime": true,
    "dateFunction": '',
    "showRetweet": false,
    "customCallback": handleTweets,
    "showInteraction": true
};
function handleTweets(tweets) {
    var x = tweets.length;
    var n = 0;
    var MyTweets = document.getElementById('MyTweets');
    var sGen = '';
    while (n < x) {
        sGen += ('<div>' + tweets[n] + '</div>');
        n++;
    }
    MyTweets.innerHTML += sGen;
}
twitterFetcher.fetch(lavnoktweets);

var iMarginCorrection = 140, iFullHTMLHeight = document.documentElement.clientHeight - iMarginCorrection, iHalfHTMLHeight = iFullHTMLHeight / 2;

var AllNavItems = [], AllNodes = [];
window.onload = function () {
    if (!AllNavItems.length) {
        AllNavItems = document.getElementById('NavBar').children;
    }
    if (!AllNodes.length) {
        AllNodes.push(document.getElementById('Home'));
        AllNodes.push(document.getElementById('About'));
        AllNodes.push(document.getElementById('Work'));
        AllNodes.push(document.getElementById('Contact'));
        for (var i = 0; i < AllNodes.length; i++)
            AllNodes[i].sIDWithHash = ("#" + AllNodes[i].id);
    }
    window.onscroll = function (evt) {
        var iElID = -1, iClosestVis = iFullHTMLHeight;
        iElID = 0;
        for (var i = 0; i < AllNodes.length; i++) {
            AllNavItems[i].classList.remove('currentPage');
            var rctCurBounds = AllNodes[i].getBoundingClientRect(), iCurTop = rctCurBounds.top - iMarginCorrection, iCurBottom = rctCurBounds.bottom, iTemp = 0;
            if (iCurTop > iHalfHTMLHeight || iCurBottom < iMarginCorrection)
                continue;
            if (iCurTop < iHalfHTMLHeight && iCurBottom >= iHalfHTMLHeight)
                iElID = i;
        }
        AllNavItems[iElID].classList.add('currentPage');
        history.pushState(null, null, AllNodes[iElID].sIDWithHash);
        if (iElID != 0)
            AllNavItems[0].classList.remove('currentPage');
    };
    document.getElementById('frmContact').onsubmit = L.fnSubmitFormData;
    window.onscroll();
};
L.fnSubmitFormData = function (evt) {
    evt.preventDefault();
    var ndResponse = document.getElementById("Response");
    ndResponse.style.display = "block";
    var sSeparator = "__||__";
    var asContactFieldNames = ["txtUName", "txtEMail", "txtPhone", "txtOrg", "rdoBudget", "rdoTimeLine", "txtSite", "txaDesc"];
    var aFieldValidators = [L.fnJustValidate, L.fnJustValidate, L.fnJustValidate, L.fnValidateOrg, undefined, undefined, L.fnValidateSite, L.fnValidateDesc];
    var data = "", frmContact = document.forms[0];
    for (var i = 0; i < asContactFieldNames.length; i++) {
        var sVal = frmContact[asContactFieldNames[i]].value;
        sVal = (aFieldValidators[i] ? (aFieldValidators[i](sVal) ? sVal : '') : sVal);
        data += (asContactFieldNames[i] + sSeparator + sVal + sSeparator);
    }
    var asHFCheckBoxes = ["chkHFWeb", "chkHFBrand", "chkHFAndroid", "chkHFDesk"];
    var bCheckBoxChecked = false, bAtLeastOneCheckBoxChecked = false;
    for (var i = 0; i < asHFCheckBoxes.length; i++) {
        bCheckBoxChecked = frmContact[asHFCheckBoxes[i]].checked;
        bAtLeastOneCheckBoxChecked = (bAtLeastOneCheckBoxChecked || bCheckBoxChecked);
        data += (asHFCheckBoxes[i] + sSeparator + (bCheckBoxChecked ? frmContact[asHFCheckBoxes[i]].value : "") + sSeparator);
    }
    if (!bAtLeastOneCheckBoxChecked) {
        //TODO: Indicate that there was an error by either an alert / flashing the container in Red / ...
        ndResponse.innerHTML = "Atleast one checkbox of 'Hiring For' has to be checked."
        return;
    }

    var asPTCheckBoxes = ["chkPTNew", "chkPTRedesign", "chkPTAddition"];
    bCheckBoxChecked = false;
    bAtLeastOneCheckBoxChecked = false;
    for (var i = 0; i < asPTCheckBoxes.length; i++) {
        bCheckBoxChecked = frmContact[asPTCheckBoxes[i]].checked;
        bAtLeastOneCheckBoxChecked = (bAtLeastOneCheckBoxChecked || bCheckBoxChecked);
        data += (asPTCheckBoxes[i] + sSeparator + (bCheckBoxChecked ? frmContact[asPTCheckBoxes[i]].value : "") + sSeparator);
    }
    if (!bAtLeastOneCheckBoxChecked) {
        //TODO: Indicate that there was an error by either an alert / flashing the container in Red / ...
        ndResponse.innerHTML = "Atleast one checkbox of Project Type has to be checked."
        return;
    }
    document.getElementById('AllFormFields').disabled = true;
    /*console.log(data);*/
    var request = new XMLHttpRequest();
    request.open('POST', '/pages/contact.aspx', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            /*Handle form response here.*/
            //frmContact.hidden = true;
            //frmContact.reset();
            ndResponse.innerHTML = L.fnExtractHTMLFromResponse(request.responseText);
        }
    };
    request.send(data);
};
L.fnExtractHTMLFromResponse = function (sResponse) {
    var iStart = sResponse.indexOf('<body') + 6, iEnd = sResponse.indexOf('</body>');
    iStart = sResponse.indexOf('<div', iStart) - 4;
    if (iStart > sResponse.length || iStart < 0 || iEnd > sResponse.length)
        return "";
    console.log(sResponse.substring(iStart, iEnd));
    return sResponse.substring(iStart, iEnd);
};
L.fnJustValidate = function (sValue) {
    if (!sValue)
        return false;
    sValue = sValue.trim();
    if ((!sValue.length) || (sValue.length < 3) || (L.asKnownOrgNames.indexOf(sValue) > -1))
        return false;
    return true;
};
L.fnValidateName = function (sName) {
    return true;
};
L.fnValidateEMail = function (sEMail) {
    return true;
};
L.fnValidatePhone = function (sPhone) {
    return true;
};
L.fnValidateOrg = function (sOrg) {
    // More validation to be added.
    return L.fnJustValidate(sOrg);
};
L.fnValidateSite = function (sSite) {
    if (!L.fnJustValidate(sSite))
        return false;
    var matches = sSite.match(/^https?\:\/\/(?:www\.)?([^\/?#]+)(?:[\/?#]|$)/i), domain = matches && matches[1];
    if ((!domain) || (domain.length) || (L.asKnownOrgNames.indexOf(domain) > -1))
        return false;
    for (var i = 0, iKONLen = L.asKnownOrgNames.length; i < iKONLen; i++) {
        if (domain.indexOf(L.asKnownOrgNames[i]) > -1)
            return false;
    }
    return true;
};
L.fnValidateDesc = function (sDesc) {
    if (!L.fnJustValidate(sDesc))
        return false;
    for (var i = 0, iKPWLen = L.asKnownProfanity.length; i < iKPWLen; i++) {
        if(sDesc.indexOf(L.asKnownProfanity[i]) > -1)
            return false;
    }
    return true;
};