var host = location.hostname;
host = host.split('.');
host = host.slice(-2);
host = host.join('.');
chrome.runtime.sendMessage({host:host});