chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){

    var day = 1000*60*60*24;
    var minute = 1000*60;
    if(request.init){
        sessionStorage["hostName_"+sender.tab.id] = request.host;
        sessionStorage["numberOfMods_"+sender.tab.id] = request.badgeText;
        sessionStorage["tomodoMods_"+sender.tab.id] = JSON.stringify(request.mods);
        chrome.browserAction.setBadgeText({text: request.badgeText});

        if(!localStorage['tomodoLastSuggest'] || (new Date - new Date(localStorage['tomodoLastSuggest'])) > 1 * minute){
            localStorage['tomodoLastSuggest'] = new Date;
            sendResponse(true);
        }
        else{
            sendResponse(false);
        }

    }
    else if (request.createMod){
        var target_domain = sessionStorage["hostName_" + request.createMod.forTabId];
        var url = "http://betterinternethome.com:8000/dashboard/createNewMod/?target_domain=" + target_domain;
        chrome.tabs.create({url: url});
    }
    else if(request.getMods){
        sendResponse(JSON.parse( sessionStorage["tomodoMods_" + request.getMods.forTabId]));
    }

});

chrome.tabs.onCreated.addListener(function(options){
    setBadge(options.id);
});

chrome.tabs.onActivated.addListener(function(options){
    setBadge(options.tabId);
});

function setBadge(tabId){
    chrome.browserAction.setBadgeText({text: sessionStorage["numberOfMods_"+tabId] || ""});
}


