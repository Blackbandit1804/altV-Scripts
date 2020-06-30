import * as alt from 'alt';
import { logDeath } from '../discord';
import { WEAPON_BY_HASH } from '../gamedata/weapons';

alt.on('playerDeath', playerDeath);

function playerDeath(victim, killer, weaponHash) {
    if (!victim || !victim.valid) {
        return;
    }

    if (killer && WEAPON_BY_HASH[weaponHash]) {
        logDeath(victim.name, killer.name, WEAPON_BY_HASH[weaponHash]);
    }
}
