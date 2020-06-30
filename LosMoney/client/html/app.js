let money_Bank;
let money_Hand;

if ('alt' in window) {
    alt.on('display:Money', displayMoney);
}

function displayMoney(data) {
    document.getElementById('money_hand').innerHTML =
        '<i class="fa fa-money" aria-hidden="true"></i> ' + data.money_hand + '$';
    document.getElementById('money_bank').innerHTML =
        '<i class="fa fa-credit-card" aria-hidden="true"></i> ' + data.money_bank + '$';
}
