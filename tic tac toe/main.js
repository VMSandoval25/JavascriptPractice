
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

let isGameOver = false; 


function getBox(className){ // gets what box was clicked on and prints either X or O in the box
    if(!isGameOver)
    {
        console.log(isGameOver);
        let changeElement = document.getElementsByClassName(className)[0].getElementsByClassName('xo')[0];
        if(changeElement.innerHTML == ""){
            changeElement.innerHTML += PLAYERS[count % 2];
            updateGame(count%2, className);
            count++;
        }
    }
    
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

}

function gameWinnerAnnoucement(player){ // annouce which player won and update the score on the screen
    console.log("print to web page who won and print the new score");
}

function resetGame(event){
    newGame();
    playerScores = [0, 0] // score is reset
    
}

function newGame(event){
    let elements = document.getElementsByTagName('span');
    for(i in elements){
        elements[i].innerHTML = "";
    }
    count = 0;
    player1Condition = winConditions.map((item) => item.slice());
    player2Condition = winConditions.map((item) => item.slice());
    isGameOver = false;
}


