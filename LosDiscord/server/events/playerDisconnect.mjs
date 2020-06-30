import * as alt from 'alt';
import { playerLeft } from '../discord';

alt.on('playerDisconnect', playerDisconnect);

function playerDisconnect(player) {
    if (!player || !player.valid) {
        return;
    }

    playerLeft(player.name);
}
