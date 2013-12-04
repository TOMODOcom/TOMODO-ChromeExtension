var meta = document.createElement('meta');
meta.content = 'tomodo_extension_installed';
document.head.appendChild(meta);

function pageLoad(){
    var host = location.hostname;

    chrome.runtime.sendMessage({init: true, host: location.hostname}, function(response){
        if(response){
            alert('popup');
        }
    });
}

pageLoad();

chrome.extension.onMessage.addListener(function(request,sender,sendResponse){
    if(request.contentInit){
        pageLoad();
    }
});