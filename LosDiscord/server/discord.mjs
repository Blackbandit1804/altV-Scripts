'use strict';
import Discord from 'discord.js';
import * as alt from 'alt';
const client = new Discord.Client({
    restRequestTimeout: 5000,
    presence: { status: 'online', activity: { name: 'LosSantos-Paradise', type: 'WATCHING' } },
});

client.on('ready', ready);
client.on('message', message);

function ready() {
    console.log(`Logged in as ${client.user.tag}!`);
    client.channels.fetch('718106647897047130').then((channel) => {
        const embed = new Discord.MessageEmbed()
            .setTitle('LosSantos-Paradise.de')
            .setColor([204, 126, 0])
            .setDescription('LosSantos-Paradise wird gestartet. Bitte habe noch etwas Geduld!');

        channel.send(embed);
    });
}

function message(msg) {
    if (msg.channel.id === '718106647897047130') {
        if (msg.content === '/status') {
            const embed = new Discord.MessageEmbed()
                .setTitle('Aktueller Status')
                .setColor([23, 194, 4])
                .setDescription(
                    'Status: ' +
                        'Online\n' +
                        'Players: ' +
                        alt.Player.all.length +
                        '\n' +
                        'Uptime: ' +
                        getTime(alt.getNetTime())
                );

            msg.channel.send(embed);
        }
    }
}

function getTime(second) {
    var seconds = second / 1000;
    function pad(s) {
        return (s < 10 ? '0' : '') + s;
    }
    var hours = Math.floor(seconds / (60 * 60));
    var minutes = Math.floor((seconds % (60 * 60)) / 60);
    var seconds = Math.floor(seconds % 60);
    return pad(hours) + 'Stunden, ' + pad(minutes) + 'Minuten, ' + pad(seconds) + 'Sekunden';
}

export function playerJoin(name) {
    client.channels.fetch('718504709819858975').then((channel) => {
        channel.send('```' + name + ' ist dem Server beigetreten!```');
    });
}

export function playerLeft(name) {
    client.channels.fetch('718504709819858975').then((channel) => {
        channel.send('```' + name + ' hat den Server verlassen!```');
    });
}

export function stop() {
    client.channels.fetch('718106647897047130').then((channel) => {
        const embed = new Discord.MessageEmbed()
            .setTitle('LosSantos-Paradise.de')
            .setColor([255, 0, 0])
            .setDescription('LosSantos-Paradise wurde gestoppt!');

        channel.send(embed);
    });
    client.setTimeout(() => {
        client.destroy();
    }, 5);
}

export function logCommand(name, cmd) {
    client.channels.fetch('718504709819858975').then((channel) => {
        channel.send('**[Command]** ' + name + ': ' + cmd);
    });
}

export function logDeath(victim, killer, weapon) {
    client.channels.fetch('718545816570298440').then((channel) => {
        channel.send(
            '**[Kill]** Victim: ' + victim + ' | Killer: ' + killer + ' | Weapon: ' + weapon
        );
    });
}

export default { playerJoin, playerLeft, stop, logCommand, logDeath };

client.login('');
