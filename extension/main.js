function setNumberOfMod(){
    if(!localStorage.badgeText){
        var host = location.hostname;
        host = host.split('.');
        host = host.slice(-2);
        host = host.join('.');
        mod_request = new XMLHttpRequest;
        mod_request.open('post', 'http://betterinternethome.com:8080/v1/getModData', false);
        var request_data = {target_domain:host}
        request_data = JSON.stringify(request_data);
        mod_request.send(request_data);
        var mod_data = mod_request.responseText;
        mod_data = JSON.parse(mod_data);
        mod_data = JSON.parse(mod_data);
        var badgeText = mod_data.count > 0 ? mod_data.count.toLocaleString() : "";
        localStorage.badgeText = badgeText;
    }

    chrome.runtime.sendMessage({badgeText : localStorage.badgeText, host: location.hostname });
}
setNumberOfMod();