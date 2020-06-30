import * as alt from 'alt';

var date = new Date();

alt.on('playerConnect', playerConnect);

function playerConnect(player) {
    if (!player || !player.valid) {
        return;
    }

    if (player.name === 'Player') {
        setTimeout(() => {
            player.kick('Bitte ändere deinen Nutzernamen unter Einstellungen->Nutzername');
        }, 500);
        return;
    }
    alt.emitClient(player, 'chat:Init');
    alt.emit('PlayerLoggedIn', player, player.name);
    player.setDateTime(
        date.getDate(),
        date.getMonth(),
        date.getFullYear(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
    );
    alt.setInterval(() => {
        if (!player || !player.valid) {
            return;
        }

        player.setDateTime(
            date.getDate(),
            date.getMonth(),
            date.getFullYear(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds()
        );
    }, 900000);
}
