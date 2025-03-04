
let fledTwice = false;

//Resets game state - need to add to as keep coding (for health etc).//
window.onload = function() {
    resetGame();
}

$("#reset").on("click",function () {
    resetGame();
    console.log("reset clicked");
})

function resetGame () {
    //Reset dungeon
    dungeonDeck = [];
    shuffleDeck();

    //Initial room layout
    fullyPopulateRoom();

    //Reset fled tracker
    fledTwice = false; 
    $("#flee-btn").attr("src", "./images/FleecoinOntest.png");

    //Reset health to full
    $("#health-img").attr("src","./images/Health/20health.png");
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

function refillRoom () { //need to figure out dragging cards triggering this before can fully finish the partial room reloads.

    switch (checkRoomOpenings()) {
        case 1:
            // partiallyPopulateRoom(2, 3, 4);
            removeClassValues();
            room2 = dungeonDeck.shift();
            room3 = dungeonDeck.shift();
            room4 = dungeonDeck.shift();
            break;
            
        case 2:
            // partiallyPopulateRoom(1, 3, 4);
            removeClassValues();
            room1 = dungeonDeck.shift();
            room3 = dungeonDeck.shift();
            room4 = dungeonDeck.shift();
            break;
    
        case 3:
            // partiallyPopulateRoom(1, 2, 4);
            removeClassValues();
            room1 = dungeonDeck.shift();
            room2 = dungeonDeck.shift();
            room4 = dungeonDeck.shift();
            break;
    
        case 4:
            // partiallyPopulateRoom(1, 2, 3);
            removeClassValues();
            room1 = dungeonDeck.shift();
            room2 = dungeonDeck.shift();
            room3 = dungeonDeck.shift();
            break;

        default: console.log ("refillRoom function broken");
    }

    changeRoomImgs();
    updateDungeonCount();
    fledTwice = false;
    $("#flee-btn").attr("src", "./images/FleecoinOntest.png");

    console.log(room1);
    console.log(room2);
    console.log(room3);
    console.log(room4);
    console.log(dungeonDeck);
}

// function partiallyPopulateRoom(fillRoom1, fillRoom2, fillRoom3) { //messed up but close to what i need. fillRoom is a # value that needs to add onto "room" to determine variable change.
//     // fillRoom1 = dungeonDeck.shift();
//     // fillRoom2 = dungeonDeck.shift();
//     // fillRoom3  = dungeonDeck.shift();
// }

function fullyPopulateRoom() {
    removeClassValues();

    room1 = dungeonDeck.shift();
    room2 = dungeonDeck.shift();
    room3 = dungeonDeck.shift();
    room4 = dungeonDeck.shift();
   
    changeRoomImgs();
    updateDungeonCount();

    console.log(room1);
    console.log(room2);
    console.log(room3);
    console.log(room4);
    console.log(dungeonDeck);
    
}

function changeRoomImgs () {

    $("#room-1-img").attr("src","./images/Temp Cards/" + room1 + ".png" );
    $("#room-2-img").attr("src","./images/Temp Cards/" + room2 + ".png" );
    $("#room-3-img").attr("src","./images/Temp Cards/" + room3 + ".png" );
    $("#room-4-img").attr("src","./images/Temp Cards/" + room4 + ".png" );

    document.querySelector("#room-1-img").classList.add(room1);
    document.querySelector("#room-2-img").classList.add(room2);
    document.querySelector("#room-3-img").classList.add(room3);
    document.querySelector("#room-4-img").classList.add(room4);

    console.log(document.querySelector("#room-1-img"));
    console.log(document.querySelector("#room-2-img"));
    console.log(document.querySelector("#room-3-img"));
    console.log(document.querySelector("#room-4-img"));
}

function removeClassValues () {
    document.querySelector("#room-1-img").classList.remove(room1);
    document.querySelector("#room-2-img").classList.remove(room2);
    document.querySelector("#room-3-img").classList.remove(room3);
    document.querySelector("#room-4-img").classList.remove(room4);
}

//Weapon Array

//Discard Array

// Draggable Cards
let dragged;
const dragCard = $(".draggable");
const dropTarget = $(".drop-target")

    //Activates when dragging
dragCard.on("drag", (event) => {
    console.log("dragging");
} );

dragCard.on("dragstart", (event) => {
    /* store a ref. on the dragged elem */
    dragged = event.target;
    event.target.classList.add("dragging");
  });

dragCard.on("dragend", (event) => {
    event.target.classList.remove("dragging");
});

    // Events fired on the drop targets

dropTarget.on("dragover", (event) => {
    /* prevent default to allow drop */
    event.preventDefault();
  },
  false,
);

dropTarget.on("dragenter", (event) => {
    if (event.target.classList.contains("drop-target")) {
      event.target.classList.add("drag-over");
    }
  });

dropTarget.on("dragleave", (event) => {
  if (event.target.classList.contains("drop-target")) {
    event.target.classList.remove("drag-over");
  }
});

dropTarget.on("drop", (event) => {
    /* prevent default action (open as link for some elements) */
    event.preventDefault();
    /* move dragged element to the selected drop target */
    if (event.target.classList.contains("drop-target")) {
      event.target.classList.remove("drag-over");
    
    /* replace target img with new img*/
      event.target.src = dragged.src;
      dragged.src = "./images/Temp Cards/0.png";
    }
  });



//Flee Button


$("#flee").on("click", function flee () {
    if (fledTwice == false && room1 > 0 && room2 > 0 && room3 > 0 && room4 > 0) {
        //Push them back into the dungeonDeck Array on the end.
        dungeonDeck.push(room1);
        dungeonDeck.push(room2);
        dungeonDeck.push(room3);
        dungeonDeck.push(room4);
        
        $("#flee-btn").attr("src", "./images/FleecoinOfftest.png");
        fullyPopulateRoom();
        fledTwice = true;

    } 
    else if (fledTwice == true) {
        alert("Can't flee twice in a row. Clear a room to be able to flee again.");
    } 
    else {
        alert("Can't flee from a room you've interacted with.");
        // Change img to the coin w/ X when this condition occurs. Prob have to do it in whatever funct triggers when a card is dragged out of the room.
    } 
})

//Display cards left in dungeon/deck

function updateDungeonCount () {
    $("#deck-txt").text(dungeonDeck.length + "/44");
}
