
//Weapon Array
let weapon = -1;
let defeatedMonsters = [];

//Discard Array
let discardPile = [];

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
    //Reset dungeon deck + rooms + health
    health = 20;
    updateHealth();
    dungeonDeck = [];
    shuffleDeck();
    clearAllArrays();
    
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
    for (let i = 1; i <= 44; i++) {
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
let room1 = [];
let room2 = [];
let room3 = [];
let room4 = [];

function checkRoomOpenings () {
    if (room1.length > 0) {
        return 1;
    }
    if (room2.length > 0) {
        return 2;
    }
    if (room3.length > 0) {
        return 3;
    }
    if (room4.length > 0) {
        return 4;
    }
}

function refillRoom () { //need to figure out dragging cards triggering this before can fully finish the partial room reloads.

    switch (checkRoomOpenings()) {
        case 1:
            // partiallyPopulateRoom(2, 3, 4);
            // removeClassValues();
            room2.push(dungeonDeck.shift());
            room3.push(dungeonDeck.shift());
            room4.push(dungeonDeck.shift());
            break;
            
        case 2:
            // partiallyPopulateRoom(1, 3, 4);
            // removeClassValues();
            room1.push(dungeonDeck.shift());
            room3.push(dungeonDeck.shift());
            room4.push(dungeonDeck.shift());
            break;
    
        case 3:
            // partiallyPopulateRoom(1, 2, 4);
            // removeClassValues();
            room1.push(dungeonDeck.shift());
            room2.push(dungeonDeck.shift());
            room4.push(dungeonDeck.shift());
            break;
    
        case 4:
            // partiallyPopulateRoom(1, 2, 3);
            // removeClassValues();
            room1.push(dungeonDeck.shift());
            room2.push(dungeonDeck.shift());
            room3.push(dungeonDeck.shift());
            break;

        default: console.log ("refillRoom function broken");
    }

    changeRoomImgs();
    // addClassValues();
    updateDungeonCount();
    fledTwice = false;
    $("#flee-btn").attr("src", "./images/FleecoinOntest.png");

    console.log(room1[0]);
    console.log(room2[0]);
    console.log(room3[0]);
    console.log(room4[0]);
    console.log(dungeonDeck);
}

function fullyPopulateRoom() {
    // removeClassValues();
    
    room1.push(dungeonDeck.shift());
    room2.push(dungeonDeck.shift());
    room3.push(dungeonDeck.shift());
    room4.push(dungeonDeck.shift());
   
    changeRoomImgs();
    // addClassValues();
    updateDungeonCount();

    console.log(room1);
    console.log(room2);
    console.log(room3);
    console.log(room4);
    console.log(dungeonDeck);
    
}

function changeRoomImgs () {

    $("#room-1-img").attr("src","./images/Temp Cards/" + room1[0] + ".png" );
    $("#room-2-img").attr("src","./images/Temp Cards/" + room2[0] + ".png" );
    $("#room-3-img").attr("src","./images/Temp Cards/" + room3[0] + ".png" );
    $("#room-4-img").attr("src","./images/Temp Cards/" + room4[0] + ".png" );

    console.log(document.querySelector("#room-1-img"));
    console.log(document.querySelector("#room-2-img"));
    console.log(document.querySelector("#room-3-img"));
    console.log(document.querySelector("#room-4-img"));
}

// Functions for figuring out what img = what card and value

// function addClassValues () {
//     document.querySelector("#room-1-img").classList.add(room1[0]);
//     document.querySelector("#room-2-img").classList.add(room2[0]);
//     document.querySelector("#room-3-img").classList.add(room3[0]);
//     document.querySelector("#room-4-img").classList.add(room4[0]);
// }

// function removeClassValues () {
//     document.querySelector("#room-1-img").classList.remove(room1[0]);
//     document.querySelector("#room-2-img").classList.remove(room2[0]);
//     document.querySelector("#room-3-img").classList.remove(room3[0]);
//     document.querySelector("#room-4-img").classList.remove(room4[0]);
// }



//Checking if room needs refill, then refilling if yes (added onto every drag of a card below)
function refillCheck() {
    if (room1.length == 0 && room2.length == 0 && room3.length == 0 || room2.length == 0 && room3.length == 0 && room4.length == 0 || room1.length == 0 && room3.length == 0 && room4.length == 0 || room1.length == 0 && room2.length == 0 && room4.length == 0 ) {
        refillRoom();
        console.log("room refilled");
    }
    else {
        console.log("no room refill needed");
    }
}

// Draggable Cards

let roomStorage;
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
    dragged.classList.add("dragging");

    /*Ties dragged card to the right # in the right room array */
    if (dragged.id == "room-1-img") {
        roomStorage = room1[0];
        console.log("Room 1: card #" + roomStorage);
    }
    if (dragged.id == "room-2-img") {
        roomStorage = room2[0];
        console.log("Room 2: card #" + roomStorage);
    }
    if (dragged.id == "room-3-img") {
        roomStorage = room3[0];
        console.log("Room 3: card #" + roomStorage);
    }
    if (dragged.id == "room-4-img") {
        roomStorage = room4[0];
        console.log("Room 4: card #" + roomStorage);
    }
  });

dragCard.on("dragend", (event) => {
    dragged.classList.remove("dragging");
});

    // Events fired on the drop targets

dropTarget.on("dragover", (event) => {
    /* prevent default to allow drop */
    event.preventDefault();
  },
  false,
);
    
dropTarget.on("dragenter", (event) => {
    /* Filters which cards can be dragged where (ie hearts cant be "equiped" as weapons)*/
    if (roomStorage > 0 && roomStorage <= 13 && event.target.classList.contains("fight-monster")) {
        event.target.classList.add("drag-over-fight");
        console.log("Monster: Clubs");
    }
    if (roomStorage > 13 && roomStorage <= 22 && event.target.classList.contains("equip-weapon")) {
        event.target.classList.add("drag-over-equip");
        console.log("Weapon: Diamonds");
    }
    if (roomStorage > 22 && roomStorage <= 35 && event.target.classList.contains("fight-monster")) {
        event.target.classList.add("drag-over-fight");
        console.log("Monster: Spades");
    }
    if (roomStorage > 35 && roomStorage <= 44 && event.target.classList.contains("heal-health")) {
        event.target.classList.add("drag-over-heal");
        console.log("Healing: Hearts");
    }
  });

dropTarget.on("dragleave", (event) => {
    if (event.target.classList.contains("equip-weapon")) {
        event.target.classList.remove("drag-over-equip");
    } 
    if (event.target.classList.contains("heal-health")) {
          event.target.classList.remove("drag-over-heal");
    }
    if (event.target.classList.contains("fight-monster")) {
          event.target.classList.remove("drag-over-fight");
    }
});

dropTarget.on("drop", (event) => {
    /* prevent default action (open as link for some elements) */
    event.preventDefault();

    /* Game functionality based on type of card dragged and dropped */
    if (event.target.classList.contains("drop-target")) {

        /* Removes colored border on drop */
        event.target.classList.remove("drag-over-equip");
        event.target.classList.remove("drag-over-heal");
        event.target.classList.remove("drag-over-fight");

        //DIAMONDS FUNCTIONALITY
        if (event.target.classList.contains("equip-weapon") && roomStorage > 13 && roomStorage <= 22) {

            /* Discards prev weaopn (if there was one) and monsters, then adds new Weapon to the "weapon" variable */
            if (weapon == -1) {
                weapon = roomStorage
                assignWeaponDefense();
            }
            else {
                discardPile.push(weapon);
                $("#discard-img").attr("src", "./images/Temp Cards/" + weapon + ".png")
                weapon = roomStorage;
                assignWeaponDefense();
            }

            /*Replaces img*/
            event.target.src = dragged.src;
            dragged.src = "./images/Temp Cards/0.png";

            /*Cleanup*/
            clearDraggedRoom();
            $("#flee-btn").attr("src", "./images/FleecoinOfftest.png");
            refillCheck();
        } 
        //HEARTS FUNCTIONALITY
        if (event.target.classList.contains("heal-health") && roomStorage > 35 && roomStorage <= 44) {

            /*Heals, then goes to discard */
            heal();
            $("#discard-img").attr("src", "./images/Temp Cards/" + roomStorage + ".png");
            dragged.src = "./images/Temp Cards/0.png";
            discardPile.push(roomStorage);

            /*Cleanup*/
            clearDraggedRoom();
            $("#flee-btn").attr("src", "./images/FleecoinOfftest.png");
            refillCheck();
        }
        //CLUBS/SPADES FUNCTIONALITY
        if (event.target.classList.contains("fight-monster") && roomStorage > 0 && roomStorage <= 13 ||event.target.classList.contains("fight-monster") && roomStorage > 22 && roomStorage <= 35) {
            if (event.target.classList.contains("heal-health")) {
                /*does unarmed damage, then discards*/
                unarmedDamage();
                $("#discard-img").attr("src", "./images/Temp Cards/" + roomStorage + ".png");
                discardPile.push(roomStorage);
            }
            else {
                /*does weapon damage or unarmed if none, then added to deafeatedMonsters array*/
                weaponDamage();
                event.target.src = dragged.src;
                defeatedMonsters.push(roomStorage);
            }
             
            dragged.src = "./images/Temp Cards/0.png";

            /*Cleanup*/
            clearDraggedRoom();
            $("#flee-btn").attr("src", "./images/FleecoinOfftest.png");
            refillCheck();
        }
    }
  });

//Function to clear correct room one at a time as dragged away
function clearDraggedRoom() {
    if (dragged.id == "room-1-img") {
        room1 = [];
        console.log("cleared room 1");
    }
    if (dragged.id == "room-2-img") {
        room2 = [];
        console.log("cleared room 2");
    }
    if (dragged.id == "room-3-img") {
        room3 = [];
        console.log("cleared room 3");
    }
    if (dragged.id == "room-4-img") {
        room4 = [];
        console.log("cleared room 4");
    }
}

//Flee Button

$("#flee").on("click", function flee () {
    if (fledTwice == false && room1.length > 0 && room2.length > 0 && room3.length > 0 && room4.length > 0) {
        //Push them back into the dungeonDeck Array on the end.
        dungeonDeck.push(room1[0]);
        dungeonDeck.push(room2[0]);
        dungeonDeck.push(room3[0]);
        dungeonDeck.push(room4[0]);

        //clear room arrays
        clearRoomArrays();
        
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

// Function to easily clear room arrays
function clearRoomArrays() {
    room1 = [];
    room2 = [];
    room3 = [];
    room4 = [];
}

function clearAllArrays() {
    clearRoomArrays();
    weapon = -1
    discardPile = [];
    $("#discard-img").attr("src", "./images/Temp Cards/0.png");
    $("#weapon-img").attr("src", "./images/Unarmed.png");
    $("#fight-img").attr("src", "./images/Unarmed.png");
}

// Health functionality
let health = 20;

function updateHealth () {

    $("#health-txt").text(health + "/20");

    if (health > 18) {
        $("#health-img").attr("src", "./images/Health/20health.png");
    }
    else if (health > 16 ) {
        $("#health-img").attr("src", "./images/Health/18health.png");
    }
    else if (health > 14 ) {
        $("#health-img").attr("src", "./images/Health/16health.png");
    }
    else if (health > 12 ) {
        $("#health-img").attr("src", "./images/Health/14health.png");
    }
    else if (health > 10 ) {
        $("#health-img").attr("src", "./images/Health/12health.png");
    }
    else if (health > 8 ) {
        $("#health-img").attr("src", "./images/Health/10health.png");
    }
    else if (health > 6 ) {
        $("#health-img").attr("src", "./images/Health/8health.png");
    }
    else if (health > 4 ) {
        $("#health-img").attr("src", "./images/Health/6health.png");
    }
    else if (health > 2 ) {
        $("#health-img").attr("src", "./images/Health/4health.png");
    }
    else if (health > 0 ) {
        $("#health-img").attr("src", "./images/Health/2health.png");
    }
    else {
        $("#health-img").attr("src", "./images/Health/0health.png");
        alert("Game Over, Resetting Game");
        resetGame();
    }
}

function heal() {
    switch (roomStorage) {
        case 44:
            health = health + 10;
            break;

        case 43:
            health = health + 9;
            break;

        case 42:
            health = health + 8;
            break;

        case 41:
            health = health + 7;
            break;

        case 40:
            health = health + 6;
            break;

        case 39:
            health = health + 5;
            break;

        case 38:
            health = health + 4;
            break;

        case 37:
            health = health + 3;
            break;

        case 36:
            health = health + 2;
            break;

        default:
            console.log("heal function broken");
    }

    if (health > 20) {
        health = 20;
    }

    updateHealth();
}

function unarmedDamage() {
    switch (roomStorage) {
        case 13:
        case 35:
            health = health - 14;
            break;

        case 12:
        case 34:
            health = health - 13;
            break;

        case 11:
        case 33:
            health = health - 12;
            break;

        case 10:
        case 32:
            health = health - 11;
            break;
        
        case 9:
        case 31:
            health = health - 10;
            break;

        case 8:
        case 30:
            health = health - 9;
            break;

        case 7:
        case 29:
            health = health - 8;
            break;
        
        case 6:
        case 28:
            health = health - 7;
            break;
        
        case 5:
        case 27:
            health = health - 6;
            break;
        
        case 4:
        case 26:
            health = health - 5;
            break;

        case 3:
        case 25:
            health = health - 4;
            break;
        
        case 2:
        case 24:
            health = health - 3;
            break;

        case 1:
        case 23:
            health = health - 2;
            break;

        default:
            console.log("unarmedDamage func broken");
    }

    updateHealth();
}

function weaponDamage() {
    switch (roomStorage) {
        case 13:
        case 35:
            if (weaponDefense > 14) {
                health = health - 0;
            }
            else {
                health = health - (14 - weaponDefense);
            }
            
            break;

        case 12:
        case 34:
            if (weaponDefense > 13) {
                health = health - 0;
            }
            else {
                health = health - (13 - weaponDefense);
            }
            break;

        case 11:
        case 33:
            if (weaponDefense > 12) {
                health = health - 0;
            }
            else {
                health = health - (12 - weaponDefense);
            }
            break;

        case 10:
        case 32:
            if (weaponDefense > 11) {
                health = health - 0;
            }
            else {
                health = health - (11 - weaponDefense);
            }
            break;
        
        case 9:
        case 31:
            if (weaponDefense > 10) {
                health = health - 0;
            }
            else {
                health = health - (10 - weaponDefense);
            }
            break;

        case 8:
        case 30:
            if (weaponDefense > 9) {
                health = health - 0;
            }
            else {
                health = health - (9 - weaponDefense);
            }
            break;

        case 7:
        case 29:
            if (weaponDefense > 8) {
                health = health - 0;
            }
            else {
                health = health - (8 - weaponDefense);
            }
            break;
        
        case 6:
        case 28:
            if (weaponDefense > 7) {
                health = health - 0;
            }
            else {
                health = health - (7 - weaponDefense);
            }
            break;
        
        case 5:
        case 27:
            if (weaponDefense > 6) {
                health = health - 0;
            }
            else {
                health = health - (6 - weaponDefense);
            }
            break;
        
        case 4:
        case 26:
            if (weaponDefense > 5) {
                health = health - 0;
            }
            else {
                health = health - (5 - weaponDefense);
            }
            break;

        case 3:
        case 25:
            if (weaponDefense > 4) {
                health = health - 0;
            }
            else {
                health = health - (4 - weaponDefense);
            }
            break;
        
        case 2:
        case 24:
            if (weaponDefense > 3) {
                health = health - 0;
            }
            else {
                health = health - (3 - weaponDefense);
            }
            break;

        case 1:
        case 23:
            if (weaponDefense > 2) {
                health = health - 0;
            }
            else {
                health = health - (2 - weaponDefense);
            }
            break;

        default:
            console.log("unarmedDamage func broken");
    }

    updateHealth();
}

let weaponDefense = 0;
function assignWeaponDefense () {
    switch(weapon) {
        case 22:
            weaponDefense = 10;
            break;
        
        case 21:
            weaponDefense = 9;
            break;

        case 20: 
            weaponDefense = 8;
            break;

        case 19:
            weaponDefense = 7;
            break;

        case 18:
            weaponDefense = 6;
            break;

        case 17:
            weaponDefense = 5;
            break;

        case 16:
            weaponDefense = 4;
            break;

        case 15:
            weaponDefense = 3;
            break;
        
        case 14:
            weaponDefense = 2;
            break;
    }
}







// Tying classes to the img identification numbers (ie card #1 = "2" "clubs")
//prob dont need? img src changes already. Track that.


// function addCardClasses () {
//     //room1
//     tieNumbtoCardClass(document.querySelector("#room-1-img"));
//     document.querySelector("#room-1-img").classList.add(cardClassAdd);
//     //room2
//     tieNumbtoCardClass(document.querySelector("#room-2-img"));
//     document.querySelector("#room-2-img").classList.add(cardClassAdd);
//     //room3
//     tieNumbtoCardClass(document.querySelector("#room-3-img"));
//     document.querySelector("#room-3-img").classList.add(cardClassAdd);
//     //room4
//     tieNumbtoCardClass(document.querySelector("#room-4-img"));
//     document.querySelector("#room-4-img").classList.add(cardClassAdd);
// }

// function removeCardClasses () {
//     //room1
//     tieNumbtoCardClass(document.querySelector("#room-1-img"));
//     document.querySelector("#room-1-img").classList.remove(cardClassAdd);
//     //room2
//     tieNumbtoCardClass(document.querySelector("#room-2-img"));
//     document.querySelector("#room-2-img").classList.remove(cardClassAdd);
//     //room3
//     tieNumbtoCardClass(document.querySelector("#room-3-img"));
//     document.querySelector("#room-3-img").classList.remove(cardClassAdd);
//     //room4
//     tieNumbtoCardClass(document.querySelector("#room-4-img"));
//     document.querySelector("#room-4-img").classList.remove(cardClassAdd);
// }

// function whichCard(room1t4) {
//     if (room1t4 == "room1") {
//         return room1[0];
//     }
//     else if (room1t4 = "room2") {
//         return room2[0];
//     }
//     else if (room1t4 = "room3") {
//         return room3[0];
//     }
//     else if (room1t4 = "room4") {
//         return room4[0];
//     }
// }

// let cardClassAdd;
// function clubValues(number) {
//     if (number = 1) {
//         cardClassAdd = ("two clubs")
//     }
//     if (number = 2) {
//         cardClassAdd = ("three clubs")
//     }
//     if (number = 3) {
//         cardClassAdd = ("four clubs")
//     }
//     if (number = 4) {
//         cardClassAdd = ("five clubs")
//     }
// }

// function tieNumbtoCardClass(room) {
//     for (let i = 1; i <= 13; i++ ) {
//         cardClassAdd = ("clubs")
//     }
    // if (room.classList[1] == 1) {
    //     cardClassAdd = ("two clubs");
    // }
    // if (room.classList[1] == 2) {
    //     cardClassAdd = ("three clubs");
    // }
    // if (room.classList[1] == 3) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 4) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 5) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 6) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 7) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 8) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 9) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 10) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 11 {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 12) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 13) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 14) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 15) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 16) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 3) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 3) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 3) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 3) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 3) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 3) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 3) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 3) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 3) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 3) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 3) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 3) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 3) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 3) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 3) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 3) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 3) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 3) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 3) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 3) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 3) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 3) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 3) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 3) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 3) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 3) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 3) {
    //     cardClassAdd = ("four clubs");
    // }
    // if (room.classList[1] == 3) {
    //     cardClassAdd = ("four clubs");
    // }
    // else {
    //     console.log("No accepted targets for tieNumbtoCardClass");
    // }
// }


