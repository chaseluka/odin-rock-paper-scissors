let playerScore = 0;
let computerScore = 0;
let playerWins = 0;
let computerWins = 0;
let plyMatchWins = 0;
let cpuMatchWins = 0;
let playerSelection = '';
let computerSelection = '';
let rnd = 0;
let rock = 0;
let paper = 0;
let scissors = 0;
const plyScore = document.querySelector('.plyscore');
const cpuScore = document.querySelector('.cpuscore');
const scsAudio = document.querySelector('#scsaudio');
const rckAudio = document.querySelector('#rckaudio');
const pprAudio = document.querySelector('#ppraudio');
const winAudio = document.querySelector('#winaudio');
const loseAudio = document.querySelector('#loseaudio');
const btnRock = document.querySelector('#rock');
const btnPaper = document.querySelector('#paper');
const btnScissors = document.querySelector('#scissors');
const rndPly = document.querySelector('.round');
const plyWins = document.querySelector('.plywins');
const cpuWins = document.querySelector('.cpuwins');
const wnPrct = document.querySelector('.wn-prct');
const rckSelect = document.querySelector('.rck-select');
const pprSelect = document.querySelector('.ppr-select');
const scsSelect = document.querySelector('.scs-select');
const plyMtchWn = document.querySelector('.match-won-ply');
const cpuMtchWn = document.querySelector('.match-won-cpu');
const draws = document.querySelector('.draws');

function stats() {
    rndPly.textContent = "Rounds Played: " + (`${rnd}`);
    plyWins.textContent = "Player Fights Won: " + (`${playerWins}`);
    cpuWins.textContent =  "CPU Fights Won: " + (`${computerWins}`);
    wnPrct.textContent = "Percent of Fights Won: " + (((`${playerWins}`)/(`${rnd}`)) *100).toFixed(1) + "%";
    plyMtchWn.textContent = "Player Matches Won: " + (`${plyMatchWins}`);
    cpuMtchWn.textContent = "CPU Matches Won: " + (`${cpuMatchWins}`);
    rckSelect.textContent = "Rock: " + (((`${rock}`)/(`${rnd}`)) * 100).toFixed(1) + "%";
    pprSelect.textContent = "Paper: " + (((`${paper}`)/(`${rnd}`)) * 100).toFixed(1) + "%";
    scsSelect.textContent = "Scissors: " + (((`${scissors}`)/(`${rnd}`)) * 100).toFixed(1) + "%";
    draws.textContent = "Draws: " + (((`${rnd}`)*1) - (((`${playerWins}`)*1) + ((`${computerWins}`)*1)));
}
stats();

function score(){
    plyScore.textContent = (`${playerScore}`);
    cpuScore.textContent = (`${computerScore}`);
};
score()

function on() {
    document.getElementById("overlay").style.display = "block";
};

function off() {
    document.getElementById("overlay").style.display = "none";
};

function statsOn() {
    document.getElementById("stats").style.display = "block";
};

function statsOff() {
    document.getElementById("stats").style.display = "none";
};

function gameOver() {
    document.getElementById("game-over").style.display = "block";
};

function reset(){
    playerScore = 0;
    computerScore = 0;
    document.getElementById("game-over").style.display = "none";
    score();
};

btnRock.addEventListener('click', function(e) {
    playerSelection = 'rock';
    match();
    score();
    rckAudio.currentTime = 0;
    rckAudio.play();
});

btnPaper.addEventListener('click', function (e) {
    playerSelection = 'paper';
    match();
    score();
    pprAudio.currentTime = 0;
    pprAudio.play();
});


btnScissors.addEventListener('click', function (e) {
    playerSelection = 'scissors';
    match();
    score();
    scsAudio.currentTime = 0;
    scsAudio.play();
});

function match (){

    function computerPlay (){
        let randomNumber = Math.random()*3;
        
        if (randomNumber <= 1){
            return ('Rock');
        }
        else if (randomNumber <= 2){
            return ('Paper');
        }
        else if (randomNumber <= 3)
            return ('Scissors');
        else;
    };

    let computerSelection = computerPlay();

    function round (computerSelection, playerSelection){
        
        ++rnd;

        if (playerSelection === 'rock' && computerSelection === 'Paper'){ 
            ++computerScore;
            ++computerWins;
            ++rock;
            return ('You lose! Paper beats Rock');
        }
        else if (playerSelection === 'rock' && computerSelection === 'Scissors'){
            ++playerScore;
            ++playerWins;
            ++rock;
            return ('You win! Rock beats Scissors');
        }
        else if (playerSelection === 'rock' && computerSelection === 'Rock'){
            ++rock;
            return ('You tie! Rock cancels out Rock');
        }
        else if (playerSelection === 'paper' && computerSelection === 'Paper'){
            ++paper;
            return ('You tie! Paper cancels out Paper');
        }
        else if (playerSelection === 'paper' && computerSelection === 'Scissors'){
            ++computerScore;
            ++computerWins;
            ++paper;
            return ('You lose! Scissors beat Paper');
        }
        else if (playerSelection === 'paper' && computerSelection === 'Rock'){
            ++playerScore;
            ++playerWins;
            ++paper;
            return ('You win! Paper beats Rock');
        }
        else if (playerSelection === 'scissors' && computerSelection === 'Paper'){
            ++playerScore;
            ++playerWins;
            ++scissors;
            return ('You win! Scissors beats Paper');
        }
        else if (playerSelection === 'scissors' && computerSelection === 'Scissors'){
            ++scissors;
            return ('You Tie! Scissors cancels out Scissors');
        }
        else if (playerSelection === 'scissors' && computerSelection === 'Rock'){
            ++computerScore;
            ++computerWins;
            ++scissors;
            return ('You lose! Rock beats Scissors');
        }

    };

    const results = document.querySelector('.results');
    results.textContent = round(computerSelection, playerSelection);

    if (playerScore === 5){
        gameOver ();
        const win = document.querySelector('.game-over-text');
        win.textContent = 'You Won!';
        ++plyMatchWins;
        winAudio.currentTime = 0;
        winAudio.play();
    }
    else if (computerScore === 5){
        gameOver ();
        const lose = document.querySelector('.game-over-text');
        lose.textContent = 'You Lost!';
        ++cpuMatchWins;
        loseAudio.currentTime = 0;
        loseAudio.play();
    };

    stats();

};