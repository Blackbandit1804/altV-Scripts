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

alt.on('resourceStart', resourceStart);

function resourceStart(errored) {
    if (!errored) {
        pool.getConnection(function (err, conn) {
            if (err) throw err;
            conn.execute(
                'CREATE TABLE IF NOT EXISTS `account` (id int auto_increment primary key,discord text,admin boolean,whitelist boolean)',
                function (err, data, fields) {
                    if (err) throw err;
                }
            );
            conn.execute(
                'CREATE TABLE IF NOT EXISTS `character` (id int auto_increment primary key,guid int not null,position text,money_bank int,money_hand int,job int)',
                function (err, data, fields) {
                    if (err) throw err;
                }
            );
            conn.execute(
                'CREATE TABLE IF NOT EXISTS `jobs` (id int auto_increment primary key,name text,salary float)',
                function (err, data, fields) {
                    if (err) throw err;
                }
            );

            pool.releaseConnection(conn);
        });
    }
}
