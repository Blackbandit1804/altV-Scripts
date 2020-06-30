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

export function addMoneyToBank(player, amount) {
    var id = player.getMeta('id');
    pool.getConnection(function (err, conn) {
        if (err) throw err;
        conn.execute('SELECT money_bank FROM `character` WHERE guid=?', [id], function (
            err,
            res,
            fields
        ) {
            var currentAmount = res[0].money_bank;
            var newAmount = currentAmount + amount;
            conn.execute(
                'UPDATE `character` SET money_bank=? WHERE guid=?',
                [newAmount, id],
                function (err, res, fields) {
                    if (err) throw err;
                    pool.releaseConnection(conn);
                    return;
                }
            );
        });
    });
}

export function addMoneyToHand(player, amount) {
    var id = player.getMeta('id');
    pool.getConnection(function (err, conn) {
        if (err) throw err;
        conn.execute('SELECT money_hand FROM `character` WHERE guid=?', [id], function (
            err,
            res,
            fields
        ) {
            var currentAmount = res[0].money_hand;
            var newAmount = currentAmount + amount;
            conn.execute(
                'UPDATE `character` SET money_hand=? WHERE guid=?',
                [newAmount, id],
                function (err, res, fields) {
                    if (err) throw err;
                    pool.releaseConnection(conn);
                    return;
                }
            );
        });
    });
}

export function removeMoneyFromBank(player, amount) {
    var id = player.getMeta('id');
    pool.getConnection(function (err, conn) {
        if (err) throw err;
        conn.execute('SELECT money_bank FROM `character` WHERE guid=?', [id], function (
            err,
            res,
            fields
        ) {
            var currentAmount = res[0].money_bank;
            if (currentAmount <= amount) {
                player.send('Du hast nicht genug Geld auf der Bank!');
                pool.releaseConnection(conn);
                return;
            }
            var newAmount = currentAmount - amount;
            conn.execute(
                'UPDATE `character` SET money_bank=? WHERE guid=?',
                [newAmount, id],
                function (err, res, fields) {
                    if (err) throw err;
                    pool.releaseConnection(conn);
                    return;
                }
            );
        });
    });
}

export function removeMoneyFromHand(player, amount) {
    var id = player.getMeta('id');
    pool.getConnection(function (err, conn) {
        if (err) throw err;
        conn.execute('SELECT money_hand FROM `character` WHERE guid=?', [id], function (
            err,
            res,
            fields
        ) {
            var currentAmount = res[0].money_hand;
            if (currentAmount <= amount) {
                player.send('Du hast nicht genug Geld dabei!');
                pool.releaseConnection(conn);
                return;
            }
            var newAmount = currentAmount - amount;
            conn.execute(
                'UPDATE `character` SET money_hand=? WHERE guid=?',
                [newAmount, id],
                function (err, res, fields) {
                    if (err) throw err;
                    pool.releaseConnection(conn);
                    return;
                }
            );
        });
    });
}
