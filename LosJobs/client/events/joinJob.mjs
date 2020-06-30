import * as alt from 'alt';

alt.onServer('joinJob', joinJob);

function joinJob(lul, player) {
    alt.setInterval(() => {
        alt.emitServer('joinJob', player);
    }, 3000);
    alt.setInterval(() => {
        alt.emitServer('salary', player);
    }, 3600000);
}
