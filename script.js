const cards = document.querySelectorAll(".card");
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function filpCard(){
    if(lockBoard === true) return;
    if(this === firstCard) return;

    this.classList.add("flip");
    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}


//função que checa se as cartas são iguais
function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unflipCards();
}

//função que desabilita as cartas 
function disableCards(){
    firstCard.removeEventListener('click', filpCard);
    secondCard.removeEventListener('click', filpCard);

    resetBoard();  
}

function unflipCards(){
    lockBoard = true;

    setTimeout(()=>{
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
    }, 1500);
}


function resetBoard(){
    [hasFlippedCard,lockBoard] = [false, false]

    [firstCard,secondCard] = [null, null]
}

(function randomize(){
    cards.forEach((card) =>{
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    });
})();

cards.forEach((card)=> {
    card.addEventListener('click', filpCard);
})

