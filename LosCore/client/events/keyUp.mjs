import * as alt from 'alt';

let view = null;

alt.on('keyup', keyup);

function keyup(key) {
    if (key === 112 && alt.gameControlsEnabled()) {
        // Mobile Phone
    } else if (key === 113 && alt.gameControlsEnabled()) {
        //Inventory
    } else if (key === 35) {
        if (!view) {
            view = new alt.WebView('https://pc.copnet.li/?login');
            view.focus();
            view.isVisible = true;
            alt.toggleGameControls(false);
            alt.showCursor(true);
        } else if (view) {
            view.unfocus();
            view.isVisible = false;
            view.destroy();
            view = null;
            alt.toggleGameControls(true);
            alt.showCursor(false);
        } else {
            alt.log('CopNet Error');
        }
    }
}
