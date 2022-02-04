let btnStartGame = document.querySelector("#start-game");
let footer = document.querySelector('#footer');
let btnNewWord = document.querySelector('#new-word');
let inputNewWord = document.querySelector('#input-new-word');
let spanErrorMsg = document.querySelector('.message');
let btnReset = document.querySelector('#reset-game');
let hangedCnv = document.querySelector('#hanged');
let btnModalYes = document.querySelector('#btn-yes');
let btnModalNo = document.querySelector('#btn-no');

let secretsWords = ['ALURA', 'ORACLE', 'PROGRAMADOR', 'CANVAS',
                    'JAVASCRIPT', 'CSS', 'HTML', 'PERRO', 'GATO',
                    'ESTATUA', 'ARGENTINA', 'BRASIL', 'COLOMBIA', 
                    'ECUADOR', 'PERU', 'BOLIVIA', 'PARAGUAY', 'URUGUAY', 
                    'MEXICO', 'PANAMA'];

const POSIBILITIES = 8;
let round = 0;
let secretWord;
let letterPositions = [];
let lettersCheck = [];
let wrongLetters = [];
let isGameFinisehd = false;

// EVENT LISTENER CLICK START GAME BUTTON
btnStartGame.addEventListener("click", () => {
    startGame();
});

// EVENT LISTENER CLICK RESET BUTTON
btnReset.addEventListener('click', ()=> {
    location.reload();
});

// EVENT LISTENER CLICK ADD NEW WORD BUTTON.
btnNewWord.addEventListener("click", addNewWord);

// EVENT LISTENER CLICK YES MODAL WINDOW
btnModalYes.addEventListener('click', () => {
    let chooseWord = secretsWords[secretsWords.length - 1].split('');
    $('#myModal').modal('hide');
    startGame(chooseWord);

});

// EVENT LISTENER CLICK NO MODAL WINDOW
btnModalNo.addEventListener('click', () =>{
    console.log("CLICK NO");
    $("#myModal").modal('hide');
});

// FUNCTION TO START GAME
function startGame(selectedWord = null){
    resetGame();
    clearCanvas();
    createBaseHanged();
    secretWord = selectedWord ?? chooseRandomWord();
    createLinesWord(secretWord);
    document.addEventListener("keyup", detectKeyPress); 
}

// FUNCTION TO ADD NEW WORD. VALIDATE INPUT NEW WORD ONLY LETTERS
function addNewWord(){
    
    spanErrorMsg.classList.remove('error');
    let newWord = inputNewWord.value;
    let reg = /^[A-Za-z]+$/;
    if(!newWord.match(reg)){
        spanErrorMsg.classList.add('error');
        return;
    }
    newWord = newWord.toUpperCase();
    secretsWords.push(newWord);
    inputNewWord.value = '';
    $("#myModal").modal('show');
    console.log(secretsWords); 
}

// FUNCTION TO GENERATE RANDOM NUMBER
function generateRandomNumber(maxArray){
    return Math.floor(Math.random() * maxArray);
}

// FUNCTION TO SELECT WORD FROM ARRAY OF SECRET WORDS
function chooseRandomWord(){
    let randomIndex = generateRandomNumber(secretsWords.length);
    return secretsWords[randomIndex].split("");
}

// FUNCTION TO DETECT KEYPRES
function detectKeyPress(e){  
    if(!validateKey(e.keyCode)){
        return;
    }
    let letterOk = e.key.toUpperCase();
    
    if(isLetterInArray(letterOk, lettersCheck) || isLetterInArray(letterOk, wrongLetters)){
        return;
    }
    let stateFlag = isLetterInSecretWord(letterOk);
    if(!stateFlag){
        wrongChoose(letterOk);
        showWrongLetter(letterOk);
        drawHangedPart(round);
        checkLoose();
        return;
    } 
    showHitLetter(letterOk, letterPositions);
    checkWin();
}

// FUNCTION TO DETECT IF KEY IS A LETTER WITH KEYCODE
function validateKey(letterCode){
    if(letterCode >= 65 && letterCode <= 90 || letterCode == 186){
        return true;
    }
}

// FUNCTION TO CHECK IF THE LETTER IS IN THE SECRETWORD
// IN CASE THE LETTER IS IN SECRETWORD. SAVE LETTER AND THE POSITIONS IN ARRAYS
function isLetterInSecretWord(letter){
    let flag = false;
    letterPositions = [];
    secretWord.forEach((element, index) => {
        if(element == letter){
            flag = true;
            lettersCheck.push(element);
            letterPositions.push(index);  
        }    
    });
    return flag;
} 

// FUNCTION TO VALIDATE IF LETTER IS IN ARRAY
function isLetterInArray(letter, arr){
    if(arr.indexOf(letter) == -1){
        return false;
    }
    return true;
}

// FUNCTION TO INCREMENT ROUND AND SAVE THE WRONG LETTER
function wrongChoose(letter){
    round++;
    wrongLetters.push(letter);
}

// FUNCTION TO CHECK THAT THE USER HAS LOST
function checkLoose(){
    if(round > POSIBILITIES){
        isGameFinisehd = true;
        showLooseMessage(secretWord);
        removeKeyUpListener();
        showBtnReset();
    }
}

// FUNCTION TO CHECK THAT THE USER HAS WON
function checkWin(){
    if(lettersCheck.length == secretWord.length){
        isGameFinisehd = true;
        showWinMessage();
        removeKeyUpListener();
        showBtnReset();
    }
}

// FUNCTION TO REMOVE LISTENER FOR KEYUP EVENT
function removeKeyUpListener(){
    document.removeEventListener('keyup', detectKeyPress);
}

// FUNCTION TO RESET VARIABLES
function resetGame(){
    round = 0;
    secretWord = [];
    letterPositions = [];
    lettersCheck = [];
    wrongLetters = [];
    wrongLettersPositions = [];
    inputNewWord.value = "";
    spanErrorMsg.classList.remove('error');
    btnReset.classList.remove('visible');
    isGameFinisehd = false;
    hangedCnv.classList.add('hanged-visible');
}

// FUNCTION TO SHOW RESET BUTTON WHEN THE GAME IS FINISHED
function showBtnReset(){
    btnReset.classList.add('visible');
}

// FUNCTION TO REMOVE KEYUP LISTENER ON FOCUS IN
function inputFocusIn(){
    removeKeyUpListener();
}

// FUNCTION TO ADD KEYUP LISTENER ON FOCUS OUT
function inputFocusOut(){
    if(!isGameFinisehd){
        document.addEventListener('keyup', detectKeyPress);
    }  
}


// SET FOCUS ON INPUT ADD NEW WORD
window.onload = function() {
    inputNewWord.focus();
};







