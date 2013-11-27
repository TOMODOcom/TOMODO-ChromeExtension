chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    var host = request.host;
    mod_request = new XMLHttpRequest;
    mod_request.open('post', 'http://betterinternethome.com:8000/v1/getModData', false);
    var request_data = {target_domain:host}
    request_data = JSON.stringify(request_data);
    mod_request.send(request_data);
    var mod_data = mod_request.responseText;
    mod_data = JSON.parse(mod_data);
    mod_data = JSON.parse(mod_data);
    chrome.browserAction.setBadgeText({text: mod_data.count.toLocaleString()});
});
