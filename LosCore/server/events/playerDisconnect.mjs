import * as alt from 'alt';
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

alt.on('playerDisconnect', playerDisconnect);

function playerDisconnect(player) {
    if (!player || !player.valid) {
        return;
    }

    if (player.name === 'Player' || player.getMeta('discord') === 'false') {
        return;
    }

    pool.execute(
        'UPDATE `character` SET position=? WHERE guid=?',
        [JSON.stringify(player.pos), player.data.id],
        function (err, res, fields) {
            if (err) throw err;
        }
    );
}
