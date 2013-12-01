(function(e,b){if(!b.__SV){var a,f,i,g;window.mixpanel=b;a=e.createElement("script");a.type="text/javascript";a.async=!0;a.src="https:" + '//cdn.mxpnl.com/libs/mixpanel-2.2.min.js';f=e.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f);b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2}})(document,window.mixpanel||[]);mixpanel.init("a22a1988b61f58f02f4c26fdcc04e0b7");

var _mods = [];

$(document).ready(function(){
    chrome.tabs.getAllInWindow(function(tabs){
        var tab = tabs.filter(function(tab){return tab.active})[0];
        chrome.runtime.sendMessage({getMods: {forTabId: tab.id}}, function(response){


            console.log('message returned from background');
            console.log(response);

            updateMods(response);
        });
        $('#tomodo .modit').click(function(){
            chrome.runtime.sendMessage({tabId: tab.id}, function(response) {});
            mixpanel.track("say ya!");
        });
    });
});

//chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
//    console.log('bbbajdksal;faksdjfaaskdjfdlka');
//    if(request.mods){
//        console.log('pop on got meaagesssss');
//        console.log(request.mods);
//        _mods = request.mods;
//    }
//});

var updateMods;
function mods($scope){
    $scope._mods = [];

    updateMods = function(mods){
        $scope.$apply(function(){
            $scope._mods = mods;
        });
    };
}



