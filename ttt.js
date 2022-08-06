const selectBox = document.querySelector(".select-box"),
selectXBtn = selectBox.querySelector(".playerX"),
selectOBtn = selectBox.querySelector(".playerO"),
playBoard = document.querySelector(".gameboard"),
players = document.querySelector(".players"),
slider = document.querySelector(".slider"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button"),
allBoxes = document.querySelectorAll(".gameboard .boxes");

let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerSign = "X";
let runBot = true;

for (let i = 0; i < allBoxes.length; i++) {
    allBoxes[i].setAttribute("onclick", "clickedBox(this)");
}

selectXBtn.onclick = ()=>{
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    players.classList.add("show");
}

selectOBtn.onclick = ()=>{
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    slider.style.left = "50%";
    players.setAttribute("class", "players active player show");
}

// Player Click Gameboard Functionality
function clickedBox(element) {
    if (players.classList.contains("player")) {
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        slider.style.left = "0";
        playerSign = "O";
        element.setAttribute("id", playerSign);
   }
   else {
       element.innerHTML = `<i class="${playerXIcon}"></i>`;
       players.classList.add("active");
       slider.style.left = "50%";
       playerSign = "X";
       element.setAttribute("id", playerSign);
   }
    selectWinner();
    playBoard.style.pointerEvents = "none";
   element.style.pointerEvents = "none";
   let randomDelay = ((Math.random() * 1000) + 200).toFixed();
   setTimeout(()=> {
       bot(runBot);
   }, randomDelay);
}


// Bot Opponent Click Gameboard Functionality
function bot(runBot) {
    if(runBot){
        playerSign = "O"
    let array = []
    for (let i = 0; i < allBoxes.length; i++) {
        if (allBoxes[i].childElementCount == 0) {
            array.push(i);
        }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)];
    console.log(randomBox);
    if (array.length > 0) {
        if (players.classList.contains("player")) {
            allBoxes[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
            slider.style.left = "50%";
            playerSign = "X";
            allBoxes[randomBox].setAttribute("id", playerSign);
       }
       else {
           allBoxes[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
           players.classList.add("active");
            slider.style.left = null;
            playerSign = "O"
            allBoxes[randomBox].setAttribute("id", playerSign)
       }
       selectWinner();
    }
   allBoxes[randomBox].style.pointerEvents = "none";
   playBoard.style.pointerEvents = "auto";
}
}

//Check Winner Functionality
function getId(idname){
    return document.querySelector(".box" + idname).id;
}


function checkIds(value1, value2, value3, sign) {
    if (getId(value1) == sign && getId(value2) == sign && getId(value3) == sign) {
        return true;
    }
}

function selectWinner(){
    if(checkIds(1, 2, 3, playerSign) || checkIds(4, 5, 6, playerSign) || checkIds(7, 8, 9, playerSign) || checkIds(1, 4, 7, playerSign) || checkIds(2, 5, 8, playerSign) || checkIds(3, 6, 9, playerSign) || checkIds(1, 5, 9, playerSign) || checkIds(3, 5, 7, playerSign)) {
        console.log(playerSign + " " + "is the winner!");
        runBot = false;
        bot(runBot);
        setTimeout(()=>{
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
            players.classList.remove("show");
        }, 700);

        wonText.innerHTML = `Player ${playerSign} won the game!`;
    }
    else {
        if(getId(1) != "" && getId(2) != "" && getId(3) != "" && getId(4) != "" && getId(5) != "" && getId(6) != "" && getId(7) != "" && getId(8) != "" && getId(9) != ""){
            runBot = false;
            bot(runBot);
            setTimeout(()=>{
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
            players.classList.remove("show");
        }, 700);

        wonText.textContent = `The match has been drawn!`;
        }
    }
}

//Replay Button Functionality
replayBtn.onclick = ()=>{
    window.location.reload();
}


