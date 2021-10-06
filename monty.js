var wins = [];
var doors = [];
var doorsLeft = [];
var openDoors = [];
var userDoor;
var winningDoor;
var firstDoor;
var secondDoor;

function doorLoad() {
    doorGen();
    winningDoorGen();
    console.log(winningDoor);
    var p2 = document.getElementsByClassName("p2");
    for (let i = 0; i < p2.length; i++) {
        p2[i].style.display = "none";
    }

    var p3 = document.getElementsByClassName("p3");
    for (let i = 0; i < p3.length; i++) {
        p3[i].style.display = "none";
    }
}

function probability() {
    var numerator = 0;
    var denomenator = wins.length;
    var probability;
    for (let i = 0; i < wins.length; i++) {
        numerator += wins[i];
    }
    probability = (numerator/denomenator);
    document.getElementById("prob").innerHTML = probability*100 + "%";
    return probability;
}

function doorGen() {
    for (let i = 0; i < 100; i++) {
        doors[i] = 0;
    }
} 

function winningDoorGen() {
    winningDoor = rndDoor();
    doors[winningDoor] = 1;
}

function remove() {
    var p1 = document.getElementsByClassName("p1");
    var p2 = document.getElementsByClassName("p2");
    for (let i = 0; i < p1.length; i++) {
        p1[i].style.display = 'none';
    }
    for (let i = 0; i < p2.length; i++) {
        p2[i].style.display = "block";
    }
}

function getNum() {
    userDoor = document.getElementById("userDoor").value;
    if(userDoor) {
        remove();
        p2();
        doorsLeftGen();
    }
}

function p2() {
    var text = "You picked door " + userDoor + ". Monty reveals 98 doors that are all not the prize, would you like to stay or change doors?"
    document.getElementById("mainText").innerHTML = text;
}

function doorsLeftGen() {
    var tmpInt = parseInt(userDoor, 10);
    firstDoor = tmpInt;
    if (doors[userDoor] == 1) {
        secondDoor = rndDoor();
        if (secondDoor == userDoor) {
            doorsLeftGen();
        }
    }
    else {
        secondDoor = winningDoor;
    }
    doorsLeft = [firstDoor, secondDoor];
    console.log(doorsLeft);
}

function stay() {
    var text = document.getElementById("winText");
    var p2 = document.getElementsByClassName("p2");
    for (let i = 0; i < p2.length; i++) {
        p2[i].style.display = 'none';
    }
    var p3 = document.getElementsByClassName("p3");
    for (let i = 0; i < p3.length; i++) {
        p3[i].style.display = 'block';
    }

    if (doors[userDoor] == 1) {
        wins.push(1);
        text.innerHTML = "You Win";
        console.log(wins);
        probability();
    }
    else {
        wins.push(0);
        text.innerHTML = "You Lose";
        probability();
    }
}

function change() {
    var text = document.getElementById("winText");
    userDoor = secondDoor;
    var p2 = document.getElementsByClassName("p2");
    for (let i = 0; i < p2.length; i++) {
        p2[i].style.display = 'none';
    }
    var p3 = document.getElementsByClassName("p3");
    for (let i = 0; i < p3.length; i++) {
        p3[i].style.display = 'block';
    }

    if (doors[userDoor] == 1) {
        wins.push(1);
        text.innerHTML = "You Win";
        probability();
    }
    else {
        wins.push(0);
        text.innerHTML = "You Lose";
        probability();
    }
}

function rndDoor() {
    return Math.floor(Math.random() * 100) + 1;
}

function reload() {
    var p1 = document.getElementsByClassName("p1");
    var p2 = document.getElementsByClassName("p2");
    var p3 = document.getElementsByClassName("p3");
    for (let i = 0; i < p1.length; i++) {
        p1[i].style.display = 'block';
    }
    for (let i = 0; i < p2.length; i++) {
        p2[i].style.display = 'none';
    }
    for (let i = 0; i < p3.length; i++) {
        p3[i].style.display = 'none';
    }
}

window.onload = doorLoad;