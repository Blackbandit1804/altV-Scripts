import * as alt from 'alt';
import { playerJoin } from '../discord';

alt.on('playerConnect', playerConnect);

function playerConnect(player) {
    playerJoin(player.name);
}
