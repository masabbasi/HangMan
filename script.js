const words = ["MASOUD","MILAD","ALI","HOSSEIN","MOHAMMAD","ALIREZA"]

let randomItem = "";
let clicked = [];
let mistakes = 0;
result="";

function setRandomItem () {
    randomItem = words[Math.floor(Math.random()*words.length)];
    console.log(randomItem);
    document.getElementById("letters").addEventListener ('click',buttonHandler);
    window.addEventListener ('keydown',keyHandler);
}

function letterHandler (letter) {
    letter = letter.toUpperCase();
    clicked.indexOf(letter) === -1?clicked.push(letter):null;
    document.getElementById(letter).className="used";
    if (randomItem.indexOf(letter)>=0) {
        setUnderScore ()
        checkWin()
    } else if (randomItem.indexOf(letter) === -1) {
        mistakes++
        checklose()
        updateHangManImage()
    }
}

function buttonHandler (event) {
letterHandler (event.target.id)
}

function keyHandler (event) {
letterHandler (event.key)
}

function setUnderScore () {
    const wordSplit = randomItem.split("");
    const LetterAndUnderScore = wordSplit.map((item)=> (clicked.indexOf(item)>=0?item:"-"))
    result = LetterAndUnderScore.join("");
    document.getElementById("clue").querySelector("p").innerHTML=result;
}

function checkWin() {
    if (randomItem===result) {
    document.getElementById("the-end").querySelector("p").style.display="block";
    document.getElementById("hangman-image").querySelector("img").src=`assets/winner.png`
    }
}

function checklose() {
if (mistakes === 6) {
    document.getElementById("the-end").querySelector("p").style.display="block";
    document.getElementById("clue").querySelector("p").innerHTML=`Word: ${randomItem}`;
    }
}

function updateHangManImage() {
    document.getElementById("hangman-image").querySelector("img").src=`assets/hangman${mistakes}.png`
}

document.querySelector("button").addEventListener("click",function() {
    setRandomItem ();
    setUnderScore ();
    document.getElementById("hangman-image").querySelector("img").src=`assets/hangman0.png`;
    document.getElementById("the-end").querySelector("p").style.display="none";
    document.getElementById("letters").forEach(function(item){
        item.classList.remove('.used');
    })
    mistakes=0;
})

setRandomItem ();
setUnderScore ();