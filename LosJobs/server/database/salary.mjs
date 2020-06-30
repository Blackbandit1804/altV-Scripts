import * as alt from 'alt';
import money from 'LosMoney';

alt.onClient('salary', salary);

function salary(player) {
    money.api.addMoneyToBank(player, player.getMeta('salary'));
}
