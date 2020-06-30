import * as alt from 'alt';
import game from 'natives';

let view = null;

alt.on('connectionComplete', connectionComplete);

function connectionComplete() {
    if (!view) {
        view = new alt.WebView('http://resource/client/html/loading/index.html');
        view.focus();
        view.isVisible = true;
        alt.toggleGameControls(false);
        alt.setTimeout(() => {
            view.unfocus();
            view.isVisible = false;
            view.destroy();
            view = null;
            alt.toggleGameControls(true);
        }, 10000);
    }
    alt.emitServer('register', alt.Discord.currentUser);
    alt.setMsPerGameMinute(60000);
    alt.setWeatherSyncActive(true);
}
