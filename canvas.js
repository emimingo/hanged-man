let hanged = document.querySelector("#hanged");
let pincel = hanged.getContext("2d");

let xInicialWrongLetter = 280;
let yInicialWrongLetter = 250;
let indexWrongLetter = 0;

pincel.lineWidth=6;
pincel.fillStyle="black";
pincel.font="bold 18px arial";
pincel.strokeStyle ="black";

// FUNCTION TO CREATE BASE OF HUNGED
function createBaseHanged(){
    pincel.fillStyle='black';
    pincel.beginPath();
    pincel.moveTo(100, 380);
    pincel.lineTo(50, 400);
    pincel.lineTo(150, 400);
    pincel.lineTo(100, 380);
    pincel.fill();
     
}

// FUNCTION TO CREATE LINES OF THE LETTERS OF THE SECRET WORD
function createLinesWord(word){
    let xInicial = 180;
    let yInicial = 400;

    for(let i=0; i < word.length; i++){
        pincel.moveTo(xInicial, yInicial); 
        pincel.lineTo(xInicial + 20, yInicial);
        pincel.stroke();
        xInicial += 30;
    }
}

// FUNCTION TO CLEAR CANVAS
function clearCanvas(){
    pincel.clearRect(0,0,600,400);
    indexWrongLetter = 0;
    hanged.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      });
}

// FUNCTION TO DISPLAY THE CORRECT LETTER ON THE SCREEN
function showHitLetter(letter, arrPositions){
    let yInicial = 395;
    arrPositions.forEach((position) => {
        let xInicial = 183;
        console.log(letter, position);
        xInicial += (30 * position);
        pincel.fillText(letter,xInicial,yInicial);
    });
}

// FUNCTION TO DISPLAY THE WRONG LETTER ON THE SCREEN
function showWrongLetter(wrongLetter){
    xInicialWrongLetter = 280;
    xInicialWrongLetter += (20 * indexWrongLetter);
    pincel.fillText(wrongLetter,xInicialWrongLetter,yInicialWrongLetter);
    indexWrongLetter++;
}

// FUNCTION TO DRAW DIFFERENT PART OF THE HUNGED
function drawHangedPart(round){
    switch(round){
        case 1: 
            onePart();
            break;
        case 2: 
            twoPart();
            break;
        case 3: 
            threePart();
            break;
        case 4: 
            fourPart();
            break;
        case 5: 
            fivePart();
            break;
        case 6: 
            sixPart();
            break;
        case 7: 
            sevenPart();
            break;
        case 8: 
            eightPart();
            break;
        case 9: 
            ninePart();
            break;
    }
}

// FUNCTION TO DRAW PART 1 OF THE HUNGED
function onePart(){
    pincel.moveTo(100,80);
    pincel.lineTo(100,380);
    pincel.stroke();
}

// FUNCTION TO DRAW PART 2 OF THE HUNGED
function twoPart(){
    pincel.moveTo(97,80);
    pincel.lineTo(200,80);
    pincel.stroke();
 }

// FUNCTION TO DRAW PART 3 OF THE HUNGED
function threePart(){
    pincel.moveTo(197, 80);
    pincel.lineTo(197, 120);
    pincel.stroke();
}

// FUNCTION TO DRAW PART 4 OF THE HUNGED
function fourPart(){
    pincel.beginPath();
    pincel.arc(197, 150, 30, 0, 2*Math.PI);
    pincel.stroke();
}

// FUNCTION TO DRAW PART 5 OF THE HUNGED
function fivePart(){
    pincel.moveTo(197,180);
    pincel.lineTo(197,280);
    pincel.stroke();
}

// FUNCTION TO DRAW PART 6 OF THE HUNGED
function sixPart(){
    pincel.moveTo(140,340);
    pincel.lineTo(197,278);
    pincel.stroke();
}

// FUNCTION TO DRAW PART 7 OF THE HUNGED
function sevenPart(){
    pincel.moveTo(254,340);
    pincel.lineTo(197,278);
    pincel.stroke();
}

// FUNCTION TO DRAW PART 8 OF THE HUNGED
function eightPart(){
    pincel.moveTo(140,180);
    pincel.lineTo(197,230);
    pincel.stroke();
}

// FUNCTION TO DRAW PART 9 OF THE HUNGED
function ninePart(){
    pincel.moveTo(254,180);
    pincel.lineTo(197,230);
    pincel.stroke();
}

// FUNCTION TO SHOW MESSAGE IF LOST
function showLooseMessage(secretWord){
    let msgError = "YOU LOST";
    secretWord = secretWord.join('');
    let word = 'THE WORD WAS: ' + secretWord;
    xInicial = 300;
    yInicial = 210;
    pincel.fillStyle="#FF6F59";
    pincel.fillText(msgError,xInicial,yInicial);
    pincel.fillStyle="black"
    pincel.fillText(word,xInicial - 50,yInicial + 80);
}

// FUNCTION TO SHOW MESSAGE IF WON
function showWinMessage(){
    let msgWin = "YOU WON!";
    xInicial = 300;
    yInicial = 200;
    pincel.fillStyle="#89BD9E";
    pincel.fillText(msgWin,xInicial,yInicial);
}