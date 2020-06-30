import * as alt from 'alt';
import { registerCmd } from '../systems/chat.mjs';
import { getForwardVectorServer } from '../utility/vector';

registerCmd(
    'vehicle',
    '/vehicle <name> | Summons a vehicle in front of a player.',
    handleAddVehicle
);

function handleAddVehicle(player, args) {
    if (!args || !args[0]) {
        player.send(`/vehicle <name>`);
        return;
    }

    if (player.lastVehicle && player.lastVehicle.valid) {
        player.lastVehicle.destroy();
    }

    const vehicleName = args[0];
    const fwdVector = getForwardVectorServer(player.rot);
    const positionInFront = {
        x: player.pos.x + fwdVector.x * 4,
        y: player.pos.y + fwdVector.y * 4,
        z: player.pos.z,
    };

    try {
        player.lastVehicle = new alt.Vehicle(
            vehicleName,
            positionInFront.x,
            positionInFront.y,
            positionInFront.z,
            0,
            0,
            0
        );

        player.send(`{00FF00}${vehicleName} wurde erfolgreich gespawnt.`);
    } catch (err) {
        player.send(`{FF0000}${vehicleName} ist kein gültiger Fahrzeug Name.`);
    }
}
