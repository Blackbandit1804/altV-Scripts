import * as alt from 'alt';
import * as game from 'natives';
import * as NativeUI from '../../includes/NativeUI/NativeUI';

const menu = new NativeUI.Menu('Elevator', 'Select a Floor', new NativeUI.Point(50, 50));
menu.AddItem(new NativeUI.UIMenuItem('Lobby', ''));
menu.AddItem(new NativeUI.UIMenuItem('Floor 49', ''));

alt.onServer('fib:LobbyElevatorEnter', FIBLobbyElevatorEnter);
alt.onServer('fib:LobbyElevatorLeave', FIBLobbyElevatorLeave);

function FIBLobbyElevatorEnter() {
    menu.Open();
}

function FIBLobbyElevatorLeave() {
    menu.Close();
}

menu.ItemSelect.on((selectedItem, selectedItemIndex) => {
    if (selectedItemIndex == 0) {
        alt.emitServer('fib:Lobby');
    } else if (selectedItemIndex == 1) {
        alt.emitServer('fib:Floor49');
    }
    menu.Close();
});
