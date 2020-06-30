import * as alt from 'alt';

alt.on('playerDeath', playerDeath);

function playerDeath(victim, killer, weaponHash) {
    if (!victim || !victim.valid) {
        return;
    }

    victim.spawn(215.11648559570312, -799.3450317382812, 30.813232421875);
}
