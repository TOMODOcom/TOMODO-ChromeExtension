(function(e,b){if(!b.__SV){var a,f,i,g;window.mixpanel=b;a=e.createElement("script");a.type="text/javascript";a.async=!0;a.src="https:" + '//cdn.mxpnl.com/libs/mixpanel-2.2.min.js';f=e.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f);b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2}})(document,window.mixpanel||[]);

mixpanel.init("aecabcf1633d428bab0dffd6134ef09a");

//______________________________________________________________________________________________________________________

mixpanel.track('browserActionButton_click');

var host;
var updateMods;

$(document).ready(function(){
    chrome.tabs.query({active: true, currentWindow: true} ,function(tabs){
        var tab = tabs[0];
        chrome.runtime.sendMessage({getMods: {forTabId: tab.id}}, function(response){
            if(response.mods)
                updateMods(response.mods);
            host = response.host;
        });
    });
});

function openUrl(url){
    chrome.runtime.sendMessage({open: {url: url}}, function(response){});
}
function navigateTo(url){
    chrome.runtime.sendMessage({goto: {url: url}}, function(response){});
}

function tomodoControl($scope){
    $scope.state = "mods";
    $scope.mods = [];
    $scope.baseUrl = "http://betterinternethome.com:8000";
    updateMods = function(mods){
        console.log('update mods');
        console.log(mods)
        $scope.$apply(function(){
            $scope.mods = mods.filter(function(mod){
                return mod.modImageXSmall.indexOf("defModImg") == -1;
            })
//                .slice(0,2) //debug!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11
            ;
        });
    };

    $scope.displayMod = function(mod){
//        $scope.mod = mod;
//        $scope.state = 'mod';
    }

    $scope.back = function(){
//        $scope.state = 'mods';
    }

    $scope.openModPage = function(mod){
//        openUrl($scope.baseUrl  + $scope.mod.modPageUrl);
    }

    $scope.openModSite = function(mod){
        if(mod){
            mixpanel.track('mod_navigate', {mod: mod.fullModUrl, orignal_site: mod.fullTargetUrl, original_domain: host})
            navigateTo(mod.fullModUrl);
        }
//        openUrl($scope.mod.fullModUrl);
    }

    $scope.modIt = function(){
//        chrome.runtime.sendMessage({createMod: {forTabId: tab.id}}, function(response) {});

        mixpanel.track('mod_create', {domain: host});
        var url = "http://betterinternethome.com:8000/dashboard/createNewMod/?target_domain=" + host;
        openUrl(url);

    }
}




