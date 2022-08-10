const NO_OF_HIGH_SCORES = 10;
const HIGH_SCORES = 'highScores';

var min = 10;
var points = 40;
var ourCards = []; //the cards that will be added into our collection
var placement = 0;

function openFile() {
    var highscore = window.open();
    console.log(highscore);
}

const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3');

var betSlider = document.getElementById("mySlider");
var betDisplay = document.getElementById("betAmountDisplay")
betSlider.min = min
betDisplay.innerHTML = betSlider.value;
betSlider.oninput = function() {
    betDisplay.innerHTML = this.value;
}


var cardAmount = prompt("INPUT PLS YOUR JUDGING CARDS FROM 3-11 (norm=8)");
if (cardAmount == "") {
    cardAmount = 8;
}


var game = {
    'cards': ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
    'cardsMap': {'2': 2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8,'9':9,'10':10,'Q':12,'K':13,'J':11,'A':1},
    'points':0,
}

function randomCard() {
    let randomIndex = Math.floor(Math.random()*game['cards'].length);
    return game['cards'][randomIndex];
}


function GetCards(cardsWanted) {
    //wrap below code into a for loop
    //(taking in parameter when creating function)
    for (let j = -1; j < cardsWanted; j++) {
        let yourCard = randomCard();
        for (let i = 0; i < game['cards'].length; i++) {
            if (game['cards'][i] === yourCard) {
                ourCards.push(yourCard);
                game['cards'].splice(i,1);
                console.log(ourCards);
            }
        }
    }
}

function backCardDisplay() { //function to make the back of cards appear
    for (let i = 0; i < parseInt(cardAmount)+1; i++) {
        console.log("back side of cards")
        let cardImage = document.createElement('img');
        cardImage.src = 'images/back.png';
        cardImage.id = i;    
        document.querySelector('#Cards').appendChild(cardImage);
    }
}

function displayCard(cardPlacement){ //placement is an array
    let currentCard = ourCards[cardPlacement];
    let cardImage = document.getElementById(cardPlacement);
    cardImage.src = `images/${currentCard}.png`;
    hitSound.play();

    if (canPlay()==false){
        endgame();
    }
}

function reset() {
    
    //when reset button pressed
    let prize_img = document.querySelector('#prize-img');
    if (prize_img){
        prize_img.parentNode.removeChild(prize_img);
    }
    document.querySelector('#prize-text').textContent = "";
    
    let allCards = document.querySelector('#Cards').querySelectorAll('img');
    for (i=0; i < allCards.length; i++){
        allCards[i].remove();
    }
    points = 40;
    min = 10
    betDisplay.textContent = min;
    betSlider.min = min
    betSlider.max = points;
    betSlider.value = min;

    document.querySelector("#player-points").textContent = points;
    document.querySelector("#player-points").style.color = 'black';

    placement = 0;
    ourCards = []; //remove cards in beginning
    game['cards'] = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];

    setup();

    // GetCards(cardAmount); //puts all cards in an array (ourCards)
    // console.log("gooteen cards");
    // backCardDisplay();
    // displayCard(placement);
    
}

function canPlay(){
    if (placement < cardAmount){
        return true;
    } else {
        return false;
    }

}

function checkHighScore(ourPoints) {
    const highScoreString = localStorage.getItem(HIGH_SCORES);
    const highScores = JSON.parse(highScoreString) ?? [];
    console.log(ourPoints + " WOWW AMAZING POINTS U GOT THERE");
    const lowestScore = highScores[NO_OF_HIGH_SCORES - 1]?.score ?? 0;

    if (ourPoints > lowestScore){
        saveHighScore(ourPoints, highScores);
        showHighScores(ourPoints);
    }
}

function saveHighScore(score, highScores) {
    const name = prompt('good job on getting high score nerd, pls enter your name!');
    const newScore = {score, name};

    //1.add new hs to list
    highScores.push(newScore);

    //2.sort list
    highScores.sort((a,b) => b.score - a.score);

    //3.select the high score list
    highScores.splice(NO_OF_HIGH_SCORES);

    //4. save to local storage again
    localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));
}

function showHighScores() {
    const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
    const highScoreList = document.getElementById(HIGH_SCORES);
    console.log(highScores);

    highScoreList.innerHTML = highScores.map((score) => `<li>${score.score}-${score.name}`).join('');
}

function clearStorage() {
    localStorage.clear();
}

function higherButton() {
    //betSlider.value
    /*first compare placement to one ahead with card map
    (if no card ahead do endgame function to give prizes in new div)
    */
   if (canPlay()){ //if CAN play
        let currentCard = ourCards[placement];
        let nextCard = ourCards[placement+1];
        let cardValue = game['cardsMap'][currentCard];
        let nextCardValue = game['cardsMap'][nextCard];
        console.log(cardValue);
        console.log(nextCardValue);

        if (cardValue < nextCardValue){
            points += parseInt(betSlider.value);
            min = Math.floor(parseInt(points)*.25);
            document.querySelector("#player-points").textContent = points;
            document.querySelector("#player-points").style.color = 'green';
            betSlider.max = points;
            betSlider.min = min
            betSlider.value = betSlider.min;

        } else { //using else because cards can only appear once
            points -= parseInt(betSlider.value);
            min = Math.floor(parseInt(points)*.25);
            document.querySelector("#player-points").textContent = points;
            document.querySelector("#player-points").style.color = 'red';
            betSlider.max = points;
            betSlider.min = min
            betSlider.value = betSlider.min
            if(points === 0) {
                placement += 1;
                displayCard(placement);
                min = 0;
                endgame();
                placement = cardAmount
                return
            }
        }
        placement += 1;
        betDisplay.textContent = betSlider.min;
        displayCard(placement);
        

   } else {
    endgame();
   }
}

function lowerButton() {
    if (canPlay()){ //if CAN play
        let currentCard = ourCards[placement];
        let nextCard = ourCards[placement+1];
        let cardValue = game['cardsMap'][currentCard];
        let nextCardValue = game['cardsMap'][nextCard];
        console.log(cardValue);
        console.log(nextCardValue);

        if (cardValue > nextCardValue){
            points += parseInt(betSlider.value);
            min = Math.floor(parseInt(points)*.25);
            document.querySelector("#player-points").textContent = points;
            document.querySelector("#player-points").style.color = 'green';
            betSlider.max = points;
            betSlider.min = min
            betSlider.value = betSlider.min

        } else { //using else because cards can only appear once
            points -= parseInt(betSlider.value);
            min = Math.floor(parseInt(points)*.25);
            document.querySelector("#player-points").textContent = points;
            document.querySelector("#player-points").style.color = 'red';
            betSlider.max = points;
            betSlider.min = min
            betSlider.value = betSlider.min
            if(points === 0) {
                placement += 1;
                displayCard(placement);
                endgame();
                placement = cardAmount
                return
            }
        }
        placement += 1;
        betDisplay.textContent = betSlider.min;
        displayCard(placement);

   } else {
    endgame();
   }
}

function endgame(){
    console.log("GAME ENDED")
    getPrize(points);
    



    //check if points/score is greater than saved highscores
    checkHighScore(points);

}

function setup() {
    //Game loop

    //reset everything to normal in beginning (text+text colour, if anything in div remove)
    
    GetCards(cardAmount); //puts all cards in an array (ourCards)

    backCardDisplay();
    displayCard(placement);
    showHighScores();
    //display backs of cards and show player first card
    

    /*
    done: First show first card --use funcction to display ccards in list based on iteration with a var

    done:run higher/lower functions when buttons pressed (while game is on), taking the value from slider 
    and comparing/contrasting with card map value, which sends points up
    also remember to change the "max" aspect of slider to amount of points when buttons pressed,
    and the value to the middle of it

    then when all cards have been played, use if and && to match with prizes
    --game loop ends/gets out of function

    done: when restart button pressed it redo's the gameloop script -- doesn't work cause won't gen new cards :( -- haha works now nerd
    
    done: add highscore txt


    done:make it so getting score of 0 and below ends game

    finish endgame function
        get COOLER prizes
    
    make so AUTOMATICALLY finish game with endgame();- what?
    */

    
}

setup();
document.querySelector('#cardshark-higher').addEventListener('click', higherButton);
document.querySelector('#cardshark-lower').addEventListener('click', lowerButton);
//document.querySelector('#cardshark-reset-button').addEventListener('click', reset);