var host = location.hostname;
host = host.split('.');
host = host.slice(-2);
host = host.join('.');

html_request = new XMLHttpRequest;
html_request.open('get', 'https://tomodotion.appspot.com/', false);
html_request.send();
var html = html_request.responseText;
var div = document.createElement('div');
div.innerHTML = html
document.body.appendChild(div);

mod_request = new XMLHttpRequest;
mod_request.open('post', 'http://betterinternethome.com:8000/v1/getModData', false);
var request_data = {target_domain:host}
request_data = JSON.stringify(request_data);
mod_request.send(request_data);	
var mod_data = mod_request.responseText;
mod_data = JSON.parse(mod_data);
mod_data = JSON.parse(mod_data);
document.querySelector('#tomodo .number').innerText = mod_data.count;

url = '/dashboard/createNewMod/';

document.querySelector('#tomodo .modit').onclick = function () {
	console.log('ya click me');
};