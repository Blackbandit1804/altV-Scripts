import * as alt from 'alt';

alt.onClient('car:Spawn', carSpawn);

function carSpawn(player, vehicleName) {
    if (player.lastVehicle && player.lastVehicle.valid) {
        player.lastVehicle.destroy();
    }

    player.lastVehicle = new alt.Vehicle(
        vehicleName,
        222.38241577148438,
        -801.6131591796875,
        30.6614990234375,
        0,
        0,
        -1.95
    );

    player.lastVehicle.rot;

    setTimeout(() => {
        alt.emitClient(player, 'car:SetInto', player.lastVehicle);
    }, 200);
}
