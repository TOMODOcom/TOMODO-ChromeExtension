chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){

    var day = 1000*60*60*24;
    var minute = 1000*60;
    var INTERVAL_TO_SUGGEST = 0*day + 2*minute;

    if(request.init){
        // a init request has been sent from content script on page load
        var host = request.host;
        var tabId = sender.tab.id;

        sessionStorage["hostName_" + tabId] = host;
        sessionStorage["numberOfMods_" + tabId] = request.badgeText;
        sessionStorage["tomodoMods_" + tabId] = JSON.stringify(request.mods);

        // on chrome start-up there maybe a couple of pages loading at once, genrally that loading pages may load in
        // background
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            // so we set the badge with data about the current tab
            if(tabs[0].id == tabId){
                setBadge(tabId);
            }
        });
        //

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
        sendResponse(JSON.parse( sessionStorage["tomodoMods_" + request.getMods.forTabId]));
    }
    else if (request.open && request.open.url){
        chrome.tabs.create({url: request.open.url});
    }
});

chrome.tabs.onCreated.addListener(function(options){
    setBadge(options.id);
});

function setBadge(tabId){
    if(sessionStorage["numberOfMods_"+tabId] || sessionStorage["numberOfMods_"+tabId] == ""){
        chrome.browserAction.setBadgeText({text: sessionStorage["numberOfMods_"+tabId], tabId: tabId});
    }
    else{
        chrome.extension.sendMessage({contentInit:true});
    }
}





























