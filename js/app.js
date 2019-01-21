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
let moves = 0;
let hits = 0;
let minutes = 0;
let i = 1;

function timer () {
    if(i < 10){
        $('#seconds').text("0" + i);
    }else{
        $('#seconds').text(i);
    }

    if(minutes < 10){
        $('#minutes').text("0" + minutes);
    }else{
        $('#minutes').text(minutes);
    }
    
    //console.log(minutes + ":" + i);
    i++;
    if(i === 60) {
        i = 0;
        minutes++;   
    }
}

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
let clock = setInterval(timer, 1000);


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
}

function match(){
    if(openedCards[0].children[0].classList[1] === 
    openedCards[1].children[0].classList[1]){
        console.log("cartas iguais");
        $(openedCards[0]).toggleClass("match");
        $(openedCards[1]).toggleClass("match");
        $(openedCards[0]).toggleClass("animated");
        $(openedCards[1]).toggleClass("animated");
        $(openedCards[0]).toggleClass("tada");
        $(openedCards[1]).toggleClass("tada");
        console.log(openedCards);
        openedCards = [];
        console.log(openedCards);
        hits++;
    }else{
        console.log("cartas diferentes");
        $(openedCards[0]).toggleClass("animated");
        $(openedCards[1]).toggleClass("animated");
        $(openedCards[0]).toggleClass("shake");
        $(openedCards[1]).toggleClass("shake");

        setTimeout(function(){
            $(openedCards[0]).toggleClass("open");
            $(openedCards[1]).toggleClass("open");
            $(openedCards[0]).toggleClass("show");
            $(openedCards[1]).toggleClass("show");
            $(openedCards[0]).toggleClass("animated");
            $(openedCards[1]).toggleClass("animated");
            $(openedCards[0]).toggleClass("shake");
            $(openedCards[1]).toggleClass("shake");
            console.log(openedCards);
            openedCards = [];
            console.log(openedCards);
        }, 200);
    }
}

function incrementMoves(){
    moves++;
    if(moves === 1){
        $('.moves').text(moves + " Move");
    }else{
        $('.moves').text(moves + " Moves");
    }
}

function decreaseStar(){
    if(moves > 11){
        $(".stars").find("#star1").remove();
    }
    if(moves > 22){
        $(".stars").find("#star2").remove();
    }
}

function win(){
    if(hits === 8){
        clearInterval(clock);

        let modal = document.getElementById('myModal');
        let btnPlay = document.getElementById('btnPlay');

        modal.style.display = "block";

        let modalTime = $('#minutes').text() + ":" + $('#seconds').text();
        $('#playerTime').text("Your time was " + modalTime);

        let htmlStars = $('.stars').html();
        $('.playerStars').html(htmlStars);
        $('.playerStars').toggleClass("stars-modal");
        $('.modal-body').toggleClass("score-panel-modal");

        btnPlay.onclick = function(){
            modal.style.display ="none";
            restart();
        }
    }
}

function restart(){
    clearInterval(clock);
    i = 1;
    $('#seconds').text("00");
    
    minutes = 0;
    $('#minutes').text("0" + minutes);
    
    clock = setInterval(timer, 1000);

    openedCards = [];

    moves = 0;
    $('.moves').text("0 Moves");

    hits = 0;

    $('.stars').children().remove();
    let codeStars = `
    <li><i class="fa fa-star" id="star1"></i></li>
    <li><i class="fa fa-star" id="star2"></i></li>
    <li><i class="fa fa-star" id="star3"></i></li>`;    
    $('.stars').append(codeStars);

    $('.deck').children().remove();
    displayCards();
}


$('.deck').on('click', function (evt){
    //console.log(evt.target);
    // sometimes click on <li> and another on <i>
    if((evt.target).classList.contains('card')){
        if(!(evt.target).classList.contains('show')){
            turnCard(evt.target);
            addOpenedCard(evt.target);
        }
        if(openedCards.length === 2){
            incrementMoves();
            decreaseStar();
            match();
        }
        win();
    }
});

$('.restart').on('click', restart);