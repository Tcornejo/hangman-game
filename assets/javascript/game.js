function resetGame () {
    resetUI();
    gameAnswer = chooseWord();
    gameShownAnswer = blanksFromAnswer(gameAnswer);
    hangmanState = 0;
    drawWord(gameShownAnswer);    
}
$(document).ready(resetGame);
function win () { alert('You win!');  
document.getElementById("logWin").innerHTML="|";
/*I tried to find a way to avoid creating an actual running win/loss tally. I was trying to find a solution with "append" but I got stumped.*/
resetGame() ;}
function lose () { alert('Oh no, you lose!'); 
document.getElementById("logLoss").innerHTML="|";
resetGame(); }
function doKeypress () {
    var tempChar = $('#letter-input').val().toLowerCase();
    var tempString = "";
    $('#letter-input').val("");
    
    tempString = guessLetter( tempChar, gameShownAnswer, gameAnswer );
    if ( tempString != gameShownAnswer ) {
        updateWord( tempString );
        gameShownAnswer = tempString;
        if ( gameShownAnswer === gameAnswer ) {
            win();
        }
    } else {
        wrongLetter(tempChar);
        drawSequence[ hangmanState++ ]();
        if ( hangmanState === drawSequence.length ) {
            lose();
        }
    }  
}
$('#letter-input').keyup( doKeypress );