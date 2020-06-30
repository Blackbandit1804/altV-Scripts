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

alt.onClient('joinJob', joinJob);

function joinJob(player) {
    var id = player.getMeta('id');
    pool.getConnection(function (err, conn) {
        if (err) throw err;
        conn.execute('SELECT job FROM `character` WHERE guid=?', [id], function (err, res, fields) {
            if (err) throw err;
            conn.execute('SELECT name, salary FROM `jobs` WHERE id=?', [res[0].job], function (
                err,
                res,
                fields
            ) {
                if (err) throw err;
                player.setMeta('job', res[0].name);
                player.setMeta('salary', res[0].salary);
                pool.releaseConnection(conn);
                return;
            });
        });
    });
}
