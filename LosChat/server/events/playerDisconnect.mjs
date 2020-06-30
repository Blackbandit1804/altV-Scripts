import * as alt from 'alt';

alt.on('playerDisconnect', playerDisconnect);

function playerDisconnect(player) {
    if (!player || !player.valid) {
        return;
    }

    if (player.lastVehicle) {
        player.lastVehicle.destroy();
    }
}
