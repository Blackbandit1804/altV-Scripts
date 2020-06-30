import * as alt from 'alt';
import * as native from 'natives';

alt.onServer('car:SetInto', SetInto);

function SetInto(vehicle) {
    const localPlayer = alt.Player.local.scriptID;
    alt.setTimeout(() => {
        native.setPedIntoVehicle(localPlayer, vehicle.scriptID, -1);
    }, 200);
}
