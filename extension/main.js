function pageLoad(){

    var host = location.hostname;
    host = host.split('.');
    host = host.slice(-2);
    host = host.join('.');
    var mods_request = new XMLHttpRequest;
    mods_request.open('get', 'http://betterinternethome.com:8080/v1/getPublishedModsByDomain?target_domain=' + host, false);
    mods_request.send();
    var mods_data = mods_request.responseText;
    mods_data = JSON.parse(mods_data);
    var count = mods_data.length;
    var badgeText = count > 0 ? count.toLocaleString() : "";
    chrome.runtime.sendMessage({init: true, badgeText : badgeText, host: location.hostname, mods: mods_data});
}

pageLoad();