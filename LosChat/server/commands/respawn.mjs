import { registerCmd } from '../systems/chat.mjs';

registerCmd('respawn', '/respawn | Respawn the player at spawn.', handleRespawn);
registerCmd('spawn', '/spawn | Respawn the player at spawn.', handleRespawn);

function handleRespawn(player) {
    player.spawn(215.11648559570312, -799.3450317382812, 30.813232421875);
    player.send(`Du bist neugespawnt.`);
}
