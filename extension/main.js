var meta = document.createElement('meta');
meta.content = 'tomodo_extension_installed';
document.head.appendChild(meta);

function pageLoad(){
    var host = location.hostname;
    chrome.runtime.sendMessage({init: true, host: host}, function(response){
        if(response){
            alert('popup');
        }
    });
}
pageLoad();
