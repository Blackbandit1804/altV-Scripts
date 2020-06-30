import * as alt from 'alt';

alt.on('entityEnterColshape', entityEnterColshape);
alt.on('entityLeaveColshape', entityLeaveColshape);

function entityEnterColshape(colshape, entity) {
    if (colshape.name == undefined || colshape.name != 'GarageCubeParkGate') return;

    alt.emitClient(entity, 'garage:CubeParkGateEnter', entity);
}

function entityLeaveColshape(colshape, entity) {
    if (colshape.name == undefined || colshape.name != 'GarageCubeParkGate') return;

    alt.emitClient(entity, 'garage:CubeParkGateLeave', entity);
}
