let dealerSum = 0;
let dealerAceCount = 0;
let playerSum = 0;
let playerAceCount = 0;
let hiddenCard;
let deck;
let canHit = true;

const dealerCards = document.querySelector('.dealer-cards');
const playerCards = document.querySelector('.player-cards');

window.onload = () => {
    buildDeck()
    shuffleDeck()
    startGame()
}

function reloadPage() {
    location.reload()
}

function buildDeck() {
    const values = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    const types = ['H','S','D','C'];
    deck = [];
    for(let i = 0; i < types.length; i++){
        for(let j = 0; j < values.length; j++){
            deck.push(values[j] + '-' + types[i])
        }
    }
}

function shuffleDeck() {
    for(let i = 0; i < deck.length; i++) {
        const j = Math.floor(Math.random() * deck.length); // 0-1 * 52 = 0-51.999 
        let tmp = deck[i];
        deck[i] = deck[j];
        deck[j] = tmp;
    }
}

function startGame() {
    hiddenCard = deck.pop();
    dealerSum += getValue(hiddenCard);
    dealerAceCount += checkAce(hiddenCard);

    while (dealerSum < 17) {
        let cardImg = document.createElement('img');
        let card = deck.pop();
        cardImg.src = './cards/' + card + '.png';
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        dealerCards.append(cardImg)
    }

    for(let i = 0; i < 2; i++) {
        let cardImg = document.createElement('img');
        let card = deck.pop();
        cardImg.src = `./cards/${card}.png`;
        playerSum += getValue(card);
        playerAceCount += checkAce(card);
        playerCards.append(cardImg);
    }
    document.querySelector('.hit').addEventListener('click', hit);
    document.querySelector('.stand').addEventListener('click', stand);
}

function getValue(card) {
    let data = card.split('-'); // ['5','H']
    let value = data[0];
    if(isNaN(value)){
        if(value === 'A') {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if(card[0] === 'A'){
        return 1;
    }
    return 0;
}

function hit() {
    if(!canHit){
        return;
    }
    let cardImg = document.createElement('img');
    let card = deck.pop();
    cardImg.src = `./cards/${card}.png`;
    playerSum += getValue(card);
    playerAceCount += checkAce(card);
    playerCards.append(cardImg)

    if(decreaseAce(playerSum, playerAceCount) > 21) {
        canHit = false;
    }
}

function stand() {
    dealerSum = decreaseAce(dealerSum, dealerAceCount);
    playerSum = decreaseAce(playerSum, playerAceCount);
    canHit = false;
    document.querySelector('#hidden').src = `./cards/${hiddenCard}.png`;

    let message = '';
    if(dealerSum > 21 && playerSum < 21) {
        message = 'Вы выиграли!';
    } else if (playerSum > 21 && dealerSum <= 21) {
        message = 'Вы проиграли!';
    } else if (dealerSum > playerSum && dealerSum <= 21) {
        message = 'Вы проиграли!';
    } else if (playerSum > dealerSum && playerSum <= 21) {
        message = 'Вы выиграли!';
    } else if (playerSum === dealerSum && playerSum < 21) {
        message = 'Ничья!';
    } else {
        message = 'Ничья!';
    }
    // console.log('dealer:', dealerSum)
    // console.log('player:', playerSum)
    // console.log(message)

    document.querySelector('#dealer').textContent = dealerSum;
    document.querySelector('#player').textContent = playerSum;
    document.querySelector('.res').textContent = message;
}

function decreaseAce(sum, aceCount) {
    while(sum > 21 && aceCount > 0) {
        sum -= 10;
        aceCount -= 1;
    }
    return sum;
}

document.querySelector('.reload-page').addEventListener('click', reloadPage)