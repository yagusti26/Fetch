const startGameButton = document.getElementById("button");
const highScoreButton = document.getElementById("btn-highscore");
const input = document.getElementById("input");
const mainContent = document.getElementById("main-content");
const statContent = document.getElementById("stats");
const OBTENER_CITA_API_URL = 'https://ricardofort.herokuapp.com/all'
const textDisplay = document.getElementById("text-display");
const wpmDisplay = document.getElementById("wpm-display");
const scoreDisplay = document.getElementById("score-display");
const timeDisplay = document.getElementById("time-display");
const form = document.getElementById("form");
const splittedFierro = martinFierro.split(" ");

const state = {
    currentWord: "",
    score: 0,
    timeElapsed: 0,
    gameLength: 30, // 30 sec
};


// Acá es donde me marca el error de [Object Promise] donde debería aparecer el texto a tipear.
function getRandomWord() {
    fetch(OBTENER_CITA_API_URL)
        .then(function (data){
            return data.json();
        }).then(function (contenido){
            let number = Math.floor(Math.random() * contenido.length);
            textDisplay.innerHTML = '<span>"</span>' + contenido[number].textDisplay + '<span>"</span>';
        })
}

function renderStats() {
    timeDisplay.textContent = state.gameLength - state.timeElapsed;
    scoreDisplay.textContent = state.score;
    wpmDisplay.textContent = calcWpm().toFixed(2);
}
// Se que acá puede estar el problema pero no se como resolverlo con el fetch
function nextWord() {
    const word =  getRandomWord();
    textDisplay.textContent = word;
    state.currentWord = word;
}

function calcWpm(){
    return Number(state.score / (state.timeElapsed / 60))
}

function createWordSpan(color, content) {
    const span = document.createElement("span");
    const style = "background-color: " + color;
    span.setAttribute("style", style);
    span.className = "typed-word";

    span.textContent = content;
    return span;
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const userInput = input.value;

    // si no hace nada...
    if (userInput === "") {
        return;
    }

    // si se puso la palabra correcta...
    const isCorrect = userInput === state.currentWord;

 
    let span;
    if (isCorrect) {
    
        span = createWordSpan('greenyellow', userInput);
        state.score += 1;
    } else {
     
        span = createWordSpan('red', userInput);
    }

    mainContent.appendChild(span);

 
    input.value = "";

    
    nextWord();
    renderStats();
});

function startClock() {
  
    setInterval(function () {
        state.timeElapsed += 1;
        renderStats();

        // fin del juego
        if (state.timeElapsed === state.gameLength) {
            swal({
                title: "¡Fin del juego!",
                text: "Tus PPm son: " + wpmDisplay.textContent,
                icon: "success",
        }).then(function(){ 
            location.reload();
   }
);
            const scores = JSON.parse(localStorage.getItem('highscores')) || [];
              
            scores.push(wpmDisplay.textContent);

            
            scores.sort();

            if(scores.length > 10){
                scores.shift();
            }

            localStorage.setItem('highscores', JSON.stringify(scores));
          
            
        }
    }, 1000);
}




startGameButton.addEventListener("click", function (event) {
   
    startGameButton.className = "hide";
  
    input.className = "";
   
    statContent.className = "";
  
    highScoreButton.className = "hide"

   
    input.focus();
    
    nextWord();

    startClock();
});


