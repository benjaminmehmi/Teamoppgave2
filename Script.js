// Model
const app = document.getElementById("app");
let counter = 0;
let counterInterval;
let menu = []; //meny for å åpne gåten
let setAnswer = "";

// View

function openMenu() { //åpne meny til gåten
    let riddleElement = document.getElementById('riddle');
    riddleElement.classList.toggle('hidden');
    updateView();
        var snd = document.getElementById('audio');    //hent bagrunnslyd og spill den av ved klikk
        setTimeout(function() {
        snd.currentTime=0;   
        snd.play();        // play it through JavaScript
        }, 0.100);
}


function updateView() { //oppdaterer view, inneholder html for innholdet i menyen
    let html = `
    <div id=timer></div>

    <audio id="audio1" src="Audio/Tense Cinematic NoCopyright Background Music Compilation.mp3" preload="auto"></audio> <!--Id for å hente lyd-->

    <h4 class="thin-text">Jeg er så lett som en fjær, men ingen mennesker kan holde meg lenge. Hva er jeg?</h4>
    <input type="text" id="answerInput" oninput="setAnswerValue(this.value)" onkeypress="handleKeyPress(event)">
    <button onclick="CheckAnswer()">Sjekk svar</button>
    `;
    document.getElementById("app").innerHTML = html;
}

// Control
function setAnswerValue(setAnswerInput) {
    setAnswer = setAnswerInput;
}

function CheckAnswer() {
    setAnswer = document.getElementById('answerInput').value;
    stopCounter();
    if (setAnswer === "pust" || setAnswer === "pusten") setTimeout(() => {
        alert("Riktig! Gå videre til neste rom.");
        window.location.href = "Room2.html"; // Gå til neste rom
    } , 100); // Forsink alerten med 100 millisekunder så den kommer før resten av funksjonene kjører
     else {
        alert("Feil svar! Prøv igjen.");
        
        reset();
    }
}

function reset(){
    setAnswer = "";
    updateView();
}

function timerEnd() {
alert("Tiden er ute! Prøv igjen.");
reset(); // Restart the game when the timer ends
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        CheckAnswer();
    }
}

function updateCounterDisplay() {
    document.getElementById('timeLimit').textContent = counter;
}

function addCounter() { // add nummer til counter
    counter++;
    updateCounterDisplay();
    console.log(`Counter: ${counter}`);
}

function resetCounter() { // resette counter
    counter = 0;
    updateCounterDisplay();
    console.log('counter has been reset');
}

function startCounterWithReset(resetTime) { // start counter med reset
    clearInterval(counterInterval);

    counterInterval = setInterval(addCounter, 1000); // add på counter hvert sekund

    setTimeout(() => { // reset counter etter spesifikt antall sekunder
        clearInterval(counterInterval);
        timerEnd(); 
    }, resetTime);
}

function stopCounter() {
    clearInterval(counterInterval);
}

startCounterWithReset(100000); //reset counter etter 100 sekunder