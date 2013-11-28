chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.badgeText){
        localStorage["hostName_"+sender.tab.id] = request.host;
        localStorage["numberOfMods_"+sender.tab.id] = request.badgeText;
        chrome.browserAction.setBadgeText({text: request.badgeText});
    }
    else if (request.tabId){
        var target_domain = localStorage["hostName_" + request.tabId];
        var url = "http://betterinternethome.com:8000/dashboard/createNewMod/?target_domain=" + target_domain;
        chrome.tabs.create({url: url});
    }
});

chrome.tabs.onCreated.addListener(function(options){
    setBadge(options.id);
});

chrome.tabs.onUpdated.addListener(function(id){
    setBadge(id);
});

chrome.tabs.onActivated.addListener(function(options){
    setBadge(options.tabId);
});

function setBadge(tabId){
    chrome.browserAction.setBadgeText({text: localStorage["numberOfMods_"+tabId] || ""});
}
