import * as alt from 'alt';

alt.on('resourceStart', resourceStart);

function resourceStart(errored) {
    if (!errored) {
        import('../discord');
    }
}
