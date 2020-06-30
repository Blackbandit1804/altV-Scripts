import { registerCmd } from '../systems/chat.mjs';

registerCmd('pos', '/pos | Returns current coordinates to chat and console.', (player) => {
    const coords = player.pos;
    player.send(JSON.stringify(coords));
    console.log(coords);
});

registerCmd('rot', '/rot | Returns current rotation to chat and console.', (player) => {
    const coords = player.rot;
    player.send(JSON.stringify(coords));
    console.log(coords);
});

registerCmd('players', '/players | Returns current player count.', (player) => {
    player.send(`Spieler Anzahl: ${alt.Player.all.length}`);
});
