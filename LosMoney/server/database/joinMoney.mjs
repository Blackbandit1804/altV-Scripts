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

alt.onClient('joinMoney', joinMoney);

function joinMoney(player) {
    var id = player.getMeta('id');
    pool.getConnection(function (err, conn) {
        if (err) throw err;
        conn.execute('SELECT money_hand, money_bank FROM `character` WHERE guid=?', [id], function (
            err,
            res,
            fields
        ) {
            if (err) throw err;
            alt.emitClient(player, 'updateWebView', res[0]);
            pool.releaseConnection(conn);
            return;
        });
    });
}
