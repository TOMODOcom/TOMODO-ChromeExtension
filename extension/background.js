chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){

    var day = 1000*60*60*24;
    var minute = 1000*60;
    var INTERVAL_TO_SUGGEST = 0*day + 2*minute;

    if(request.init){

        // a init request has been sent from content script on page load
        var host = request.host;
        var tabId = sender.tab.id;

        setPopupContent(tabId, host)
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
    else if (request.createMod){
        // a new mod creation has been sent from the popup
        var target_domain = sessionStorage["hostName_" + request.createMod.forTabId];
        var url = "http://betterinternethome.com:8000/dashboard/createNewMod/?target_domain=" + target_domain;
        chrome.tabs.create({url: url});
    }
    else if(request.getMods){
        // popup page has asked for the mods data.
        var tabId = request.getMods.forTabId;
        var host = sessionStorage["hostName_" + tabId];
        sendResponse(JSON.parse( sessionStorage["tomodoMods_" + host]));
    }
    else if (request.open && request.open.url){
        chrome.tabs.create({url: request.open.url});
    }
});

chrome.tabs.onCreated.addListener(function(options){
    setBadge(options.id);
    setPopupContent(options.id);
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab){
    setBadge(options.id);
    setPopupContent(options.id);
});

chrome.tabs.onActiveChanged.addListener(function(tabId, selectInfo) {
    setBadge(tabId);
    setPopupContent(tabId);
});

function setBadge(tabId){
    var host = sessionStorage["hostName_"+tabId];
    if(!host){

    }
    else{
        chrome.browserAction.setBadgeText({text: sessionStorage["numberOfMods_" + host], tabId: tabId});
    }
}

function setPopupContent(tabId, host){

    host = host.split('.');
    host = host.slice(-2);
    host = host.join('.');

    if(!sessionStorage["numberOfMods_" + host] || !sessionStorage["tomodoMods_" + host]){
        var mods_request = new XMLHttpRequest;
        mods_request.open('get', 'http://betterinternethome.com:8080/v1/getPublishedModsByDomain?target_domain=' + host, false);
        mods_request.send();
        var mods_data = mods_request.responseText;
        mods_data = JSON.parse(mods_data);
        var count = mods_data.length;
        var badgeText = count > 0 ? count.toLocaleString() : "";
    }


    sessionStorage["hostName_" + tabId] = host;

    if(!sessionStorage["numberOfMods_" + host])
        sessionStorage["numberOfMods_" + host] = badgeText;

    if(!sessionStorage["tomodoMods_" + host])
        sessionStorage["tomodoMods_" + host] = JSON.stringify(mods_data);
}





























