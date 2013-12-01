function setNumberOfMod(){

    var host = location.hostname;
    host = host.split('.');
    host = host.slice(-2);
    host = host.join('.');
    var mods_request = new XMLHttpRequest;
    mods_request.open('post', 'http://betterinternethome.com:8080/v1/getPublishedModsByDomain', false);
    var request_data = {target_domain:host}
    request_data = JSON.stringify(request_data);
    mods_request.send(request_data);
    var mods_data = mods_request.responseText;
    mods_data = JSON.parse(mods_data);
    var count = mods_data.length;
    var badgeText = count > 0 ? count.toLocaleString() : "";
    localStorage.badgeText = badgeText;
    chrome.runtime.sendMessage({badgeText : localStorage.badgeText, host: location.hostname, mods: mods_data });
}

setNumberOfMod();