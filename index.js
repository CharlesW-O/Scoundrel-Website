// alert("working");

// Sets up initial dungeon/deck array (not randomized).

const dungeonDeck = [];

function reloadDeck() {
    for (i = 1; i <= 44; i++) {
        dungeonDeck.push(i);
    }
}

reloadDeck();

// Randomizes the dungeon/deck
function shuffleDeck() {
    for (let i = 0; i < dungeonDeck.length; i++) {
        let shuffle = Math.floor(Math.random() * (dungeonDeck.length));
        [dungeonDeck[i], dungeonDeck[shuffle]] = [dungeonDeck[shuffle], dungeonDeck[i]];
    }
}