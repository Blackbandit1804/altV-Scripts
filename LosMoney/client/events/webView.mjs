import * as alt from 'alt';

let webView;
let localData;

alt.onServer('updateWebView', updateWebView);

function updateWebView(data) {
    if (!webView) {
        webView = new alt.WebView('http://resource/client/html/index.html');
    }

    webView.emit('display:Money', data);
}
