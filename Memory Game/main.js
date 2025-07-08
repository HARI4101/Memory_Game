const cardsarray = [
    { name: 'bug', icon: '<i class="fa-solid fa-bugs"></i>' },
    { name: 'dove', icon: '<i class="fa-solid fa-dove"></i>' },
    { name: 'crow', icon: '<i class="fa-solid fa-crow"></i>' },
    { name: 'cat', icon: '<i class="fa-solid fa-cat"></i>' },
    { name: 'horse', icon: '<i class="fa-solid fa-horse"></i>' },
    { name: 'fish', icon: '<i class="fa-solid fa-fish-fins"></i>' },
    { name: 'bug', icon: '<i class="fa-solid fa-bugs"></i>' },
    { name: 'dove', icon: '<i class="fa-solid fa-dove"></i>' },
    { name: 'crow', icon: '<i class="fa-solid fa-crow"></i>' },
    { name: 'cat', icon: '<i class="fa-solid fa-cat"></i>' },
    { name: 'horse', icon: '<i class="fa-solid fa-horse"></i>' },
    { name: 'fish', icon: '<i class="fa-solid fa-fish-fins"></i>' }
];

const gameboard = document.getElementById('gbox');
let flippedcards = [];
let matchedpair = 0;

shufflecards();
displaycards();

function shufflecards() {
    for (let i = cardsarray.length - 1; i >= 0; i--) {
        const randIndex = Math.floor(Math.random() * (i + 1));
        [cardsarray[i], cardsarray[randIndex]] = [cardsarray[randIndex], cardsarray[i]];
    }
}

function displaycards() {
    cardsarray.forEach((curr, index) => {
        const card = document.createElement('div');
        card.setAttribute('id', index);
        card.classList.add('cardback', 'active');
        gameboard.append(card);
        card.addEventListener('click', flipcard);
    });
}

function flipcard() {
    if (flippedcards.length < 2 && this.classList.contains('active')) {
        const cardid = this.getAttribute('id');
        flippedcards.push(this);
        this.classList.remove('cardback');
        this.innerHTML = cardsarray[cardid].icon;

        if (flippedcards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const id1 = flippedcards[0].getAttribute('id');
    const id2 = flippedcards[1].getAttribute('id');

    if (cardsarray[id1].name === cardsarray[id2].name && id1 !== id2) {
        flippedcards[0].style.border = 'none';
        flippedcards[0].style.background = '#a28089';
        flippedcards[0].innerHTML = '';
        flippedcards[0].classList.remove('active');

        flippedcards[1].style.border = 'none';
        flippedcards[1].style.background = '#a28089';
        flippedcards[1].innerHTML = '';
        flippedcards[1].classList.remove('active');

        matchedpair++;
        checkgameover();
    } else {
        flippedcards[0].innerHTML = '';
        flippedcards[0].classList.add('cardback');
        flippedcards[1].innerHTML = '';
        flippedcards[1].classList.add('cardback');
    }

    flippedcards = [];
}

function checkgameover() {
    if (matchedpair === cardsarray.length / 2) {
        const allCards = document.querySelectorAll('.active');
        allCards.forEach(card => {
            card.removeEventListener('click', flipcard);
        });

        gameboard.innerHTML = '<h2>🎉YOU WON</h2>';
        gameboard.classList.remove('game');
        gameboard.classList.add('won');
    }
}
