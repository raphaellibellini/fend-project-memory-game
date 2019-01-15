/*
 * Create a list that holds all of your cards
 */
let cards = [
'fa-diamond', 
'fa-paper-plane-o', 
'fa-anchor', 
'fa-bolt', 
'fa-cube', 
'fa-anchor', 
'fa-leaf', 
'fa-bicycle', 
'fa-diamond', 
'fa-bomb', 
'fa-leaf', 
'fa-bomb', 
'fa-bolt', 
'fa-bicycle', 
'fa-paper-plane-o', 
'fa-cube'
];
let openedCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function displayCards(){
    shuffle(cards);

    // using fragment to improve performance
    const fragment = document.createDocumentFragment();
    for(const card of cards){
        $(fragment).append('<li class="card"><i class="fa ' + card +'"></i></li>');
    }
    $('.deck').append(fragment);
}
displayCards();


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function turnCard(card){
    $(card).toggleClass("open show");
}

function addOpenedCard(card){
    openedCards.push(card);
    //console.log(openedCards);
}

function match(){
    if(openedCards[0].children[0].classList[1] === 
    openedCards[1].children[0].classList[1]){
        console.log("cartas iguais");
        openedCards[0].classList.toggle('open');
        openedCards[1].classList.toggle('open');
        openedCards[0].classList.toggle('show');
        openedCards[1].classList.toggle('show');
        openedCards[0].classList.toggle('match');
        openedCards[1].classList.toggle('match');
        openedCards = [];
    }else{
        console.log("cartas diferentes");
        openedCards[0].classList.toggle('open');
        openedCards[1].classList.toggle('open');
        openedCards[0].classList.toggle('show');
        openedCards[1].classList.toggle('show');
        openedCards = [];
    }
}

$('.deck').on('click', function (evt){
    turnCard(evt.target);
    addOpenedCard(evt.target);
    if(openedCards.length === 2){
        match();
    }
});