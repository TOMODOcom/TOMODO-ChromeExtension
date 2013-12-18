var meta = document.createElement('meta');
meta.content = 'tomodo_extension_installed';
document.head.appendChild(meta);

function pageLoad(){
    var url = location.hostname;
    chrome.runtime.sendMessage({init: true, url: url}, function(response){
        if(response){
        }
    });
}
pageLoad();
