
const PLAYERS = ['X', 'O']; 
let count = 0;
const winConditions = [["one", "two", "three"], ["four", "five", "six"], ["seven", "eight", "nine"],
                        ["one", "four", "seven"], ["two", "five", "eight"], ["three", "six", "nine"],
                        ["one", "five", "nine"], ["three", "five", "seven"]
                    ];
let player1Condition = winConditions.map((item) => item.slice());
let player2Condition = winConditions.map((item) => item.slice());
const winCondition = [-1, -1, -1];
let playerScores= [0,0]; // this keeps track of how many games have been won
let playerMoves = [0, 0];


let possibleMoves = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
let isGameOver = false; 

let isGameStarted = false;

let isClicked = false;

let isBot = false;




function getBox(className){ // gets what box was clicked on and prints either X or O in the box
    if(!isGameOver)
    {
        isGameStarted = true;
        console.log(isGameOver);
        let changeElement = document.getElementsByClassName(className)[0].getElementsByClassName('xo')[0];
        if(changeElement.innerHTML == ""){
            isClicked = true;
            changeElement.innerHTML += PLAYERS[count % 2];
            playerMoves[count%2] = playerMoves[count%2] + 1;
            updateGame(count%2, className);
        }
    }

    setTimeout(function(){

    if(isBot && !isGameOver){
        let isUnique = false;
        while(!isUnique){
            let bot_element = Math.floor(Math.random() * 9);
            let bot_changeElement = document.getElementsByClassName(possibleMoves[bot_element])[0].getElementsByClassName('xo')[0];
            if(bot_changeElement.innerHTML == ""){

                isUnique = true;
                isClicked = true;
                bot_changeElement.innerHTML += PLAYERS[count % 2];
                playerMoves[count%2] = playerMoves[count%2] + 1;
                console.log("Bots: ", player2Condition, " count: ", count%2);
                console.log("p1: ", player1Condition);

                updateGame(count%2, possibleMoves[bot_element]);
            }
        }  
    }

    }, 1000)
    
    
}

function updateGame(player, value){ // keeps track of the board, which boxes have been clicked on by the player
    if(player == 0){
        player1Condition.forEach((combination, i) => {
            combination.forEach((number, j) => {
                if(number == value){
                    player1Condition[i][j] = -1;
                }
            });
        }); 
    }
    else{
        player2Condition.forEach((combination, i) => {
            combination.forEach((number, j) => {
                if(number == value){
                    player2Condition[i][j] = -1;
                }
            });
        }); 
    }
    checkWin(player);

}

function checkWin(player){ // checks if a player has won

    if(player == 0 ){
        player1Condition.forEach((elements) => {
            if(elements.toString() === winCondition.toString()){
                console.log("Game over, player 1 won");
                isGameOver = true;
            }
        });
    }
    else{
        player2Condition.forEach((elements) => {
            if(elements.toString() === winCondition.toString()){
                console.log("Game over, player 2 won");
                isGameOver = true;
            }
        });
    }

    if(isGameOver){
        playerScores[player] = playerScores[player] + 1;
        console.log("This is the score", playerScores);
        gameWinnerAnnoucement(player);
    }
    else if(playerMoves[0] + playerMoves[1] == 9){
        isGameOver=true;
        gameTieAnnoucement();
    }
    else{
        count++;
        document.querySelector(".display_player").innerHTML = PLAYERS[count%2];
    }

}

function gameTieAnnoucement(){
    console.log("No one has won")
    document.querySelector(".result").innerHTML =  `It is a tie! Score stays the same!`;
}

function gameWinnerAnnoucement(player){ // annouce which player won and update the score on the screen
    console.log("print to web page who won and print the new score");
    document.querySelector(".result").innerHTML =  `Player ${PLAYERS[player]} has won!`;
    document.querySelector("#XScore").innerHTML = `X Score: ${playerScores[0]}`;
    document.querySelector("#OScore").innerHTML = `O Score: ${playerScores[1]}`;
}

function resetGame(event){
    newGame();
    playerScores = [0, 0]; // score is reset
    document.querySelector("#XScore").innerHTML = `X Score: ${playerScores[0]}`;
    document.querySelector("#OScore").innerHTML = `O Score: ${playerScores[1]}`;
    
}

function newGame(event){
    let elements = document.getElementsByTagName('span');
    for(i in elements){
        elements[i].innerHTML = "";
    }
    count = 0;
    playerMoves = [0,0];
    player1Condition = winConditions.map((item) => item.slice());
    player2Condition = winConditions.map((item) => item.slice());
    isGameOver = false;
    initialGame();

}

function initialGame(){
    document.querySelector(".display_player").innerHTML = PLAYERS[count%2];
    printPlayerScores();
    console.log( new Date());
    gameTimer();
    playerTimer();
}

function printPlayerScores(){
    document.querySelector("#XScore").innerHTML = `X Score: ${playerScores[0]}`;
    document.querySelector("#OScore").innerHTML = `O Score: ${playerScores[1]}`;
}

function gameTimer(){
    let countDown = new Date().getTime() + 602000; // 10 minutes
    // Update the count down every 1 second
    let x = setInterval(function() {
        let now = new Date().getTime();
        let distance = countDown - now;
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById("gTimer").innerHTML =  "Game Timer: "+minutes + "m " + seconds + "s ";
        if (distance < 0) {
            clearInterval(x);
            isGameOver=true;
            document.getElementById("gTimer").innerHTML = "Time is Up!";
            gameTieAnnoucement();
        }
        else if(isGameOver){
            clearInterval(x);
        }
    }, 1000);
}

function playerTimer(){
    var playerCountDown = new Date().getTime() + 12000; // ten seconds

    let x = setInterval(function() {
        let now = new Date().getTime();
        let distance = playerCountDown - now;
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById("pTimer").innerHTML =  "Player Timer: "+minutes + "m " + seconds + "s ";
        //console.log("Player timer: "+ distance);
        if (distance < 0 ) {
                if(count == 0) count = 1;
                else count--;
                document.querySelector(".display_player").innerHTML = PLAYERS[count%2];
                playerCountDown = new Date().getTime() + 12000;
                //return;
        }
        else if(isClicked == true){
            document.querySelector(".display_player").innerHTML = PLAYERS[count%2];
            isClicked = false;
            clearInterval();
            playerCountDown = new Date().getTime() + 12000;
        }
        if(isGameOver){
            clearInterval(x);
        }
    }, 1000);
    
}



function oneplayer(event){
    isBot=true;
    initialGame();
}

function twoplayers(event){
    //isBot=true;
    isBot = false;
    initialGame();
}

