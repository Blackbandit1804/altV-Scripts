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

alt.onClient('register', register);

function register(player, discordData) {
    if (discordData === null || discordData === undefined) {
        player.setMeta('discord', 'false');
        player.kick('Du musst Discord geöffnet haben! Und alt:V neustarten.');
        return;
    }
    player.setMeta('discord', 'true');
    pool.getConnection(function (err, conn) {
        if (err) throw err;
        conn.execute('SELECT * FROM `account`', function (e, res, fields) {
            if (e) throw e;
            if (res === undefined) {
                conn.execute(
                    'INSERT INTO `account` SET discord=?, admin=?, whitelist=?',
                    [discordData.id, false, false],
                    function (err, res, fields) {
                        if (err) throw err;
                        getChar(player, res.id);
                        pool.releaseConnection(conn);
                    }
                );
                return;
            }

            const account = res.find((acc) => {
                if (acc.discord === discordData.id) return acc;
            });

            if (!account) {
                conn.execute(
                    'INSERT INTO `account` SET discord=?, admin=?, whitelist=?',
                    [discordData.id, false, false],
                    function (err, res, fields) {
                        if (err) throw err;
                        getChar(player, res.insertId);
                        pool.releaseConnection(conn);
                    }
                );
                return;
            }

            getChar(player, account.id);
            pool.releaseConnection(conn);
        });
    });
}

function getChar(player, id) {
    pool.getConnection(function (err, conn) {
        if (err) throw err;
        conn.execute('SELECT * FROM `character` WHERE guid=?', [`${id}`], function (
            err,
            data,
            fields
        ) {
            if (err) throw err;
            if (Array.isArray(data) && data.length >= 1) {
                finishLogin(player, data[0]);
                pool.releaseConnection(conn);
                return;
            }

            conn.execute(
                'INSERT INTO `character` SET guid=?, money_bank=?, money_hand=?, job=?',
                [`${id}`, 0, 5000, 1],
                function (err, res, fields) {
                    if (err) throw err;
                    getChar(player, res.insertId);
                    pool.releaseConnection(conn);
                }
            );
            return;
        });
    });
}

function finishLogin(player, data) {
    pool.getConnection(function (err, conn) {
        if (err) throw err;
        conn.execute('SELECT whitelist FROM `account` WHERE id=?', [data.id], function (
            e,
            res,
            fields
        ) {
            if (res[0].whitelist === 0) {
                player.kick('Du bist nicht gewhitelisted! Bitte gehe im TS in den Verify Channel.');
            }
            pool.releaseConnection(conn);
            return;
        });
    });
    player.data = data;
    player.setMeta('id', data.id);
    player.model = 'mp_m_freemode_01';

    if (!player.data.position) {
        player.spawn(222.38241577148438, -801.6131591796875, 30.6614990234375);
    } else {
        const pos = JSON.parse(player.data.position);
        player.spawn(pos.x, pos.y, pos.z, 0);
    }

    alt.emitClient(player, 'joinMoney');
    alt.emitClient(player, 'joinJob', player);
}
