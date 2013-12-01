chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){

    if(request.init){
        localStorage["hostName_"+sender.tab.id] = request.host;
        localStorage["numberOfMods_"+sender.tab.id] = request.badgeText;
        localStorage["tomodoMods_"+sender.tab.id] = JSON.stringify(request.mods);
        chrome.browserAction.setBadgeText({text: request.badgeText});
    }
    else if (request.createMod){
        var target_domain = localStorage["hostName_" + request.createMod.forTabId];
        var url = "http://betterinternethome.com:8000/dashboard/createNewMod/?target_domain=" + target_domain;
        chrome.tabs.create({url: url});
    }
    else if(request.getMods){
        sendResponse(JSON.parse( localStorage["tomodoMods_" + request.getMods.forTabId]));
    }

});

chrome.tabs.onCreated.addListener(function(options){
    setBadge(options.id);
});

chrome.tabs.onActivated.addListener(function(options){
    setBadge(options.tabId);
});

function setBadge(tabId){
    chrome.browserAction.setBadgeText({text: localStorage["numberOfMods_"+tabId] || ""});
}


