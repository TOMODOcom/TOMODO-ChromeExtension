
$(document).ready(function(){
    $('#tomodo .modit').click(function(){
        chrome.tabs.getAllInWindow(function(tabs){
            var tab = tabs.filter(function(tab){return tab.active})[0];
            console.log('tab id is: ', tab.id);
            chrome.runtime.sendMessage({tabId: tab.id}, function(response) {});
        });
    });
});




