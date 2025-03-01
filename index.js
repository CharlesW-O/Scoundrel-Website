
//Resets game state - need to add to as keep coding (for health etc).//
window.onload = function() {
    resetGame();
}

$("#reset").on("click",function () {
    resetGame();
    console.log("reset clicked");
})

function resetGame () {
    dungeonDeck = [];
    shuffleDeck();
    fullyPopulateRoom(); 
}

// Sets up initial dungeon/deck array (not randomized). //

let dungeonDeck = [];

function reloadDeck() {
    for (i = 1; i <= 44; i++) {
        dungeonDeck.push(i);
    }
}

// Randomizes the dungeon/deck //
function shuffleDeck() {
    reloadDeck();
    for (let i = 0; i < dungeonDeck.length; i++) {
        let shuffle = Math.floor(Math.random() * (dungeonDeck.length));
        [dungeonDeck[i], dungeonDeck[shuffle]] = [dungeonDeck[shuffle], dungeonDeck[i]];
    }
    console.log(dungeonDeck);
}

// Fills room (4 card slots) out of the dungeon/deck //
let room1 = 1;
let room2 = 2;
let room3 = 3;
let room4 = 4;

function checkRoomOpenings () {
    if (room1 > 0) {
        return 1;
    }
    if (room2 > 0) {
        return 2;
    }
    if (room3 > 0) {
        return 3;
    }
    if (room4 > 0) {
        return 4;
    }
}

function refillRoom () { //need to figure out dragging cards before can finish the partial room reloads.
    switch (checkRoomOpenings()) {
        case 1:
            partiallyPopulateRoom(2, 3, 4);
            break;
            
        case 2:
            partiallyPopulateRoom(1, 3, 4);
            break;
    
        case 3:
            partiallyPopulateRoom(1, 2, 4);
            break;
    
        case 4:
            partiallyPopulateRoom(1, 2, 3);
            break;

        default: console.log ("refillRoom function broken");
    }
}

function partiallyPopulateRoom(fillRoom1, fillRoom2, fillRoom3) { //messed up but close to what i need. fillRoom is a # value that needs to add onto "room" to determine variable change.
    roomfillRoom1 = dungeonDeck.shift();
    room = dungeonDeck.shift();
    room  = dungeonDeck.shift();
    console.log(room);
    console.log(room);
    console.log(room);
    console.log(dungeonDeck);
    fledTwice = false;
}

function fullyPopulateRoom() {
    room1 = dungeonDeck.shift();
    console.log(room1);
    room2 = dungeonDeck.shift();
    console.log(room2);
    room3 = dungeonDeck.shift();
    console.log(room3);
    room4 = dungeonDeck.shift();
    console.log(room4);
    console.log(dungeonDeck);
    changeRoomImgs();
}

function changeRoomImgs () {
    $("#room-1-img").attr("src","./images/Temp Cards/" + room1 + ".png" );
    $("#room-2-img").attr("src","./images/Temp Cards/" + room2 + ".png" );
    $("#room-3-img").attr("src","./images/Temp Cards/" + room3 + ".png" );
    $("#room-4-img").attr("src","./images/Temp Cards/" + room4 + ".png" );
}

//Weapon Array

//Discard Array

//Flee Button
let fledTwice = false;

$("#flee").on("click", function flee () {
    if (fledTwice == false) {
        fullyPopulateRoom();
        fledTwice = true;
        //Add line that changes css for visual indicator. Maybe text turns red or button fades or X'd out.
    } 
    else if (fledTwice == true) {
        alert("Fled too recently. Clear a room first to be able to flee again.");
    }  
})