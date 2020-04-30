const user_select = document.querySelectorAll('#container_images img');
const reset_btn = document.querySelector('#resetbtn');
var score = [0,0];
var checkWin;
var stop = false;

user_select.forEach((img) =>{
    img.addEventListener('click',(e) =>{
        if (stop==false){
            let user_choice = img.id;
            console.log("User selects:"+user_choice);
            checkWin = game(user_choice);
            score = scoreResults(score,checkWin);
            if (score[0] == 5 || score[1]==5){
                let msg = score[0] == 5 ? "YOU WIN!" : "YOU LOSE! Julianna wins" 
                displayMessageResult(msg,true);
                stop = true;
            }
        } else{
            e.preventDefault();
        }
    })
});

reset_btn.addEventListener('click', function (e) {
    score = FuncReset();
    stop = false;
});


//Return a random choice for computer turn
function computerPlay(){
    var ans=["ROCK","SCISSORS","PAPER"]
    var index =Math.floor(Math.random() * 3)
    return ans[index]
}

//Check and return the result (who wins)
function playRound(playerSelection, computerSelection){
    var ans=["ROCK","SCISSORS","PAPER"]
    var i
    var indexPlayer, indexComputer
    var textToOutput
    for (i = 0; i < ans.length; i++){
        if (playerSelection.toUpperCase() == ans[i]){
            indexPlayer = i;
        }
        if (computerSelection == ans[i]){
            indexComputer = i;
        }
    }
    if (Math.abs(indexPlayer-indexComputer) < 2){    
        if (indexPlayer < indexComputer){
            textToOutput = "You Win! " + ans[indexPlayer] + " beats " + ans[indexComputer];
        } else if (indexPlayer == indexComputer) {
            textToOutput = "It's a tie!";
        } else {
            textToOutput = "You Lose! " + ans[indexComputer] + " beats " + ans[indexPlayer];
        }
    } else if (indexPlayer < indexComputer) {
        textToOutput = "You Lose! " + ans[indexComputer] + " beats " + ans[indexPlayer];
    } else {
        textToOutput = "You Win! " + ans[indexPlayer] + " beats " + ans[indexComputer];
    }
    return textToOutput
}

//Start the game and return the score of the winner (1 for player, -1 for computer)
function game(playerSelection){
    var computerSelection = computerPlay();
    var play = playRound(playerSelection, computerSelection);
    var checkWin;
    var score = 0;
    changeIconComputerPlay(computerSelection); //Change image of Computer Choice
    displayMessageResult(play,false); //Display the message of who wins
    console.log("Player: " + playerSelection);
    console.log("Computer: " + computerSelection);
    console.log(play);
    checkWin = play.slice(4,5);
    if (checkWin =='W'){
        score = 1;
    } else if (checkWin =='L'){
        score = -1;
    } else {
        score = 0;
    }
    return score;
}

//Change the icon of the computer to what it has chosen
function changeIconComputerPlay(computerChoice){
    let computerImage = document.querySelector('#computer_image img');
    let rootpath = 'images/';
    let path = rootpath + computerChoice.toLowerCase() +'.png'
    computerImage.setAttribute('src', path);
}

//Display the message if there is win or tie
function displayMessageResult(message,winMessage){
    let findmessage = document.querySelector('#message');
    findmessage.setAttribute('class', 'center');
    if (winMessage == true){
        //findmessage.setAttribute('style','color: red; font-weight: bold; font-size: large ');
        findmessage.setAttribute('class', 'center win_lose');
    }
    findmessage.textContent = message;
}

//Increment the score of the winner
function scoreResults(score,checkWin){
    if (checkWin == 1){
        score[0] += 1;
        displayResult('user_score',score[0]);
    } else if (checkWin == -1) {
        score[1] += 1;
        displayResult('computer_score',score[1]);
    }
    return score

}

//Display the current score
function displayResult(winner,score){
    let winnerdisplay = document.querySelector('#'+ winner);
    winnerdisplay.textContent = score;
}

//Reseting scores to 0
function FuncReset(){
    score = [0,0];
    displayResult('user_score',0);
    displayResult('computer_score',0);
    displayMessageResult("Your move!",false);
    return score;
}
