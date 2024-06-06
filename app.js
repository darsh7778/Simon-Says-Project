let gameSeq = [];
let userSeq = [];

let btns = ["red", "green", "yellow", "blue"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if (started == false) {
        console.log("game is started");
        started = true;

        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 500);
} 

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 100);
} 

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `level ${level}`;

    // Generate a random index between 0 and 3 (inclusive)
    let rndIdx = Math.floor(Math.random() * btns.length); 
    let rndColor = btns[rndIdx];
    let rndBtn = document.querySelector(`.${rndColor}`);
    gameSeq.push(rndColor);
    console.log(gameSeq);
    gameFlash(rndBtn);
}

function checkAns(idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    }  else{
        h2.innerHTML = `Game Over! Your score is ${level} <br> Press any key to restart`;
        document.querySelector("body").style.backgroundColor = "rgb(96, 0, 0)"
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "rgb(120, 84, 123)"
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0
}
