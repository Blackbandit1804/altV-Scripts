import * as alt from 'alt';
import job from 'LosJobs';

alt.on('entityEnterColshape', entityEnterColshape);
alt.on('entityLeaveColshape', entityLeaveColshape);

function entityEnterColshape(colshape, entity) {
    if (colshape.name == undefined || colshape.name != 'GarageCubeParkGate') return;

    job.api.setJob(entity, 2);
    alt.emitClient(entity, 'garage:CubeParkGateEnter', entity);
}

function entityLeaveColshape(colshape, entity) {
    if (colshape.name == undefined || colshape.name != 'GarageCubeParkGate') return;

    alt.emitClient(entity, 'garage:CubeParkGateLeave');
}
