import * as alt from 'alt';
import * as game from 'natives';
import * as NativeUI from '../../includes/NativeUI/NativeUI';

const menu = new NativeUI.Menu('Garage', 'Select a Car', new NativeUI.Point(50, 50));

alt.onServer('garage:CubeParkGateEnter', CubeParkEnter);
alt.onServer('garage:CubeParkGateLeave', CubeParkLeave);

function CubeParkEnter(player) {}

function CubeParkLeave() {}

menu.ItemSelect.on((selectedItem, selectedItemIndex) => {
    for (var i = 0; i < selectedItemIndex + 1; i++) {
        alt.emitServer('car:Spawn', selectedItem.Text);
    }
    menu.Close();
});
