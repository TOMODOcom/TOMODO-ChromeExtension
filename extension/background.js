(function(e,b){if(!b.__SV)
{var a,f,i,g;window.mixpanel=b;a=e.createElement("script");a.type="text/javascript";a.async=!0;

    a.src="https:" + '//cdn.mxpnl.com/libs/mixpanel-2.2.min.js';

    f=e.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f);b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==
    typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");for(g=0;g<i.length;g++)f(c,i[g]);
    b._i.push([a,e,d])};b.__SV=1.2}})(document,window.mixpanel||[]);
mixpanel.init("aecabcf1633d428bab0dffd6134ef09a");

//______________________________________________________________________________________________________________________

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){

    var day = 1000*60*60*24;
    var minute = 1000*60;
    var INTERVAL_TO_SUGGEST = 0*day + 2*minute;

    if(request.init){

        // a init request has been sent from content script on page load
        var host = request.url;
        var tabId = sender.tab.id;

        initPopupContent(tabId, host)
        setBadge(tabId);


        // if we haven't suggested at all or haven't suggested in the last INTERVAL_TO_SUGGEST
        if(!localStorage['tomodoLastSuggest'] || (new Date - new Date(localStorage['tomodoLastSuggest'])) > INTERVAL_TO_SUGGEST){
            localStorage['tomodoLastSuggest'] = new Date;
            sendResponse(true);
        }
        else{
            sendResponse(false);
        }
    }
    else if(request.getMods){
//        console.log('get mods');
//        console.log('mods');
//        console.log(JSON.parse( sessionStorage["tomodoMods_" + host]));

        // popup page has asked for the mods data.
        var tabId = request.getMods.forTabId;
        var host = sessionStorage["hostName_" + tabId];
        var mods;

        try{
            mods = JSON.parse( sessionStorage["tomodoMods_" + host]);
        }
        catch (error){
            return;
        }
        sendResponse({
            host: host,
            mods: mods
        });
    }
    else if (request.open && request.open.url){
        chrome.tabs.create({url: request.open.url});
    }
    else if (request.goto && request.goto.url){
        chrome.tabs.update(tabId, {url: request.goto.url});
    }

});

function setBadge(tabId){
    var host = sessionStorage["hostName_"+tabId];
    if(!host){

    }
    else{
        chrome.browserAction.setBadgeText({text: sessionStorage["numberOfMods_" + host], tabId: tabId});
        chrome.browserAction.setBadgeBackgroundColor({color: "#e04242" , tabId: tabId })
    }
}

function initPopupContent(tabId, host){

    host = host.split('.');
    host = host.slice(-2);
    host = host.join('.');

    if(!sessionStorage["numberOfMods_" + host] || !sessionStorage["tomodoMods_" + host]){
        var mods_request = new XMLHttpRequest;
        mods_request.open('get', settings.API_URL + '/v1/getPublishedModsByDomain?targetDomain=' + host, false);
        mods_request.send();
        var mods_data = mods_request.responseText;
        try{
            mods_data = JSON.parse(mods_data);
        }
        catch(error){
            return;
        }

        var count = mods_data.length;
        var badgeText = count > 0 ? count.toLocaleString() : "";
    }


    sessionStorage["hostName_" + tabId] = host;

    if(!sessionStorage["numberOfMods_" + host])
        sessionStorage["numberOfMods_" + host] = badgeText;

    if(!sessionStorage["tomodoMods_" + host])
        sessionStorage["tomodoMods_" + host] = JSON.stringify(mods_data);
}

chrome.runtime.onInstalled.addListener(function(details){
    mixpanel.track('installed');
});


chrome.management.onUninstalled.addListener(function(){
    mixpanel.track("uninstall");
});

























