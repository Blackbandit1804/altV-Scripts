import * as alt from 'alt';

alt.onClient('fib:Lobby', fibLobby);
alt.onClient('fib:Floor49', fibFloor49);

function fibLobby(player) {
    player.pos = { x: 136.15383911132812, y: -761.8681030273438, z: 45.7420654296875 };
}

function fibFloor49(player) {
    player.pos = { x: 136.1934051513672, y: -761.8549194335938, z: 242.1435546875 };
}
