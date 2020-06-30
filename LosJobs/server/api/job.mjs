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

export function setJob(player, jobid) {
    var id = player.getMeta('id');
    pool.getConnection(function (err, conn) {
        if (err) throw err;
        conn.execute('SELECT job FROM `character` WHERE guid=?', [id], function (err, res, fields) {
            if (err) throw err;
            conn.execute('SELECT id FROM `jobs` WHERE id=?', [jobid], function (err, res, fields) {
                if (err) throw err;
                if (res.length < 1) {
                    player.send('Diese Job ID konnte nicht in der Datenbank gefunden werden!');
                    return;
                }
                conn.execute('UPDATE `character` SET job=? WHERE guid=?', [jobid, id], function (
                    err,
                    res,
                    fields
                ) {
                    if (err) throw err;
                    pool.releaseConnection(conn);
                    return;
                });
            });
        });
    });
}
