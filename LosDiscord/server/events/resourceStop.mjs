import * as alt from 'alt';
import { stop } from '../discord';

alt.on('anyResourceStop', resourceStop);

function resourceStop(resourceName) {
    stop();
}
