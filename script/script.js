let randomNums = [];   //Random numbers array
let numsID = {};       // Object of array with Id as key
let timeToDissappear = 5; // Time after text dissappear from boxes
let checkBox = 0;
let barValue = 0;
let progressBarTime = 5;   // Time In sec of progress Bar

// Dom Component

let buttonsCont = document.getElementById("buttonCont");
let gameCont = document.getElementById("gameCont");
let gridbox = document.getElementById("grid-box");
let progressBarComponent = document.getElementById("time");


// Audio

var bgmusic = new Audio('music/bgmusic.mp3');
var looseMusic = new Audio('music/loose.mp3');
var winMusic = new Audio('music/won.wav');
var click = new Audio('music/click.wav');




//9 Random Value array Generator in randomNums array

function randomArrGen() {
    while (randomNums.length != 9) {
        let instRandom = Math.floor(Math.random() * 9);
        if (!randomNums.includes(instRandom)) {
            randomNums.push(instRandom);
        }
    }
}

const delay = ms => new Promise(res => setTimeout(res, ms));

// Create 9 Divs inside a grid with random numbers
const createBoxs = async () => {

    randomArrGen();

    for (let i = 1; i < 10; i++) {

        let box = document.createElement("div");
        box.classList.add("item");
        box.classList.add("disableCursor");
        box.id = i;
        box.innerText = randomNums[i - 1];
        numsID[i] = randomNums[i - 1];
        box.setAttribute("onclick", "boxClicked(this.id)");
        box.setAttribute("cursor", "not-allowed");
        box.setAttribute("pointerevents", "none");
        let grid_box = document.getElementById("grid-box");
        await delay(200);
        grid_box.appendChild(box);
    }

};

function unHideBoxNums() {
    for (let i = 0; i < 9; i++) {
        let allBoxes = document.querySelectorAll(".item");
        allBoxes[i].innerText = randomNums[i];
    }
}

//after complete progress hidden numbers in boxes and allow cursor
function progressBar() {
    buttonsCont.style.display = "none";
    createBoxs();
    let time = setInterval(function () {
        progressBarComponent.style.width = barValue + "%";
        barValue += 1;
        if (barValue > 100) {
            clearInterval(time);
            for (let i = 0; i < 9; i++) {
                let allBoxes = document.querySelectorAll(".item");
                allBoxes[i].classList.remove("disableCursor");
                allBoxes[i].classList.add("enableCursor");
                allBoxes[i].innerText = "";
            }

        }

    }, progressBarTime * 10);
}

// Disable cursor of all boxes 
function disableCursor() {
    for (let i = 0; i < 9; i++) {
        let allBoxes = document.querySelectorAll(".item");

        allBoxes[i].classList.remove("enableCursor");
        allBoxes[i].classList.add("disableCursor");

    }
}

// On click function check if correct or not
function boxClicked(id) {
    click.load();
    click.play();
    if (numsID[id] == checkBox) {
        let selectedBox = document.getElementById(id);
        selectedBox.classList.add("right");
        selectedBox.classList.add("disableCursor");
        selectedBox.classList.add("itemSelected");
        selectedBox.innerText = randomNums[id - 1];


        checkBox++;

        if (checkBox > 8) {
            winMusic.play();
            bgmusic.pause();
            setTimeout(won, 1000);
        }
    }
    else {
        let selectedBox = document.getElementById(id);
        selectedBox.classList.add("wrong");
        selectedBox.classList.add("itemSelected");
        selectedBox.innerText = randomNums[id - 1];
        disableCursor();
        bgmusic.pause();
        looseMusic.play();
        unHideBoxNums();
        setTimeout(function () {

            replay();

        }, 2000);
    }
}

// Won Function (call replay() functon)
function won() {
    alert("Congrats you won, party!!");
    replay();
}

// Replay Alerts after game finish
function replay() {
    if (confirm("Replay?")) {
        gameStart();
    } else {
        reset();
    }
}

//Reset All the Values And Open Homepage
function reset() {

    gridbox.innerHTML = "";
    randomNums = [];   //Random numbers array
    numsID = {};       // Object of array with Id as key
    timeToDissappear = 5; // Time after text dissappear from boxes
    checkBox = 0;
    barValue = 0;
    progressBarTime = 5;
  
    progressBarComponent.style.width = "0%";
    gameCont.style.display = "none"
    buttonsCont.style.display = "flex";

}

//Start The Game
function gameStart() {
    bgmusic.load(); 
    click.play();
    bgmusic.play();
    reset();
    progressBarComponent.style.width = "0%";
    buttonsCont.style.display = "none";
    gameCont.style.display = "block";
    progressBar();
}

document.getElementById("play").addEventListener('click', gameStart);