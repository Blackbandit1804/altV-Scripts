import { registerCmd } from '../systems/chat.mjs';
import mysql from 'mysql2';

var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'altv',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

registerCmd('setadmin', '/respawn | Respawn the player at spawn.', handleRespawn);

function handleRespawn(player) {
    player.spawn(215.11648559570312, -799.3450317382812, 30.813232421875);
    player.send(`Du bist neugespawnt.`);
}
