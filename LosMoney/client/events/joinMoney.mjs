import * as alt from 'alt';

alt.onServer('joinMoney', joinMoney);

function joinMoney(data) {
    alt.setInterval(() => {
        alt.emitServer('joinMoney', data);
    }, 3000);
}
