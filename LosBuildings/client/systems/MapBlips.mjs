import * as alt from 'alt';
import * as native from 'natives';

var fib = native.addBlipForCoord(111.98241424560547, -749.6571655273438, 50.5904541015625);
native.setBlipSprite(fib, 60);
native.setBlipColour(fib, 5);
native.setBlipDisplay(fib, 3);
native.beginTextCommandSetBlipName('STRING');
native.addTextComponentSubstringPlayerName('FIB');
native.endTextCommandSetBlipName(fib);
