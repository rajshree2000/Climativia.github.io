
//declare variables
var btnStart = document.getElementById("btnStart");
var btnSubmit = document.querySelector("button.btnSubmit")
var secondsRemain = (questions.length * 20 + 1);
var timer = document.getElementById("timer");
var submitScore = document.querySelector("#submit-score");
var playerScore = document.getElementById("player-score");
var inputPlayersName;
var questionHeader = document.getElementById("questions");
var questionHeaderFont = document.getElementById("questions");
var answerOptions = document.getElementById("answers");

var questionNumber = -1;
var answer;

//start timer
function startTimer() {
 
    document.getElementById("home").classList.add('d-none');
    document.getElementById("quiz").classList.remove('d-none');

    //call set timer
    setTimer();

    // create questions to display
    makeQuestions();
}

// timer set and begins 120 second countdown
function setTimer() {

    var countdown = setInterval(function () {
        secondsRemain--;
        timer.textContent = "Time: " + secondsRemain;

        if (secondsRemain === 0 || questionNumber === questions.length) {
            clearInterval(countdown);
            setTimeout(displayScore, 500);
        }
    }, 1000);
}

// make questions plus answers
function makeQuestions() {
    questionNumber++;
    answer = questions[questionNumber].answer

    questionHeader.textContent = questions[questionNumber].title;
    answerOptions.innerHTML = "";
    questionHeaderFont = questionHeader.style.fontSize = "x-large";
    
    var options = questions[questionNumber].options;

    for (var q = 0; q < options.length; q++) {
        var nextOption = document.createElement("button");

        nextOption.textContent = options[q]
        btnAnswer = answerOptions.appendChild(nextOption).setAttribute("class", "p-3 m-1 btn btn-light btn-block");
    }
}

// display option to enter name to scoreboard
function displayScore() {
    document.getElementById("quiz").classList.add('d-none');
    document.getElementById("submit-score").classList.remove('d-none');
    playerScore.textContent = "FINAL SCORE: " + secondsRemain + ".";
}

// event Listeners for Main Buttons
btnStart.addEventListener("click", startTimer);
btnSubmit.addEventListener("click", function (event) {
    event.stopPropagation();
    addScore();
    
    window.location.href = './scores.html'
});

//adding score
function addScore () {
    inputPlayersName = document.getElementById("playersName").value
    
    // create a new object with name and score keys
var newScore = {
        name: inputPlayersName,
        score: secondsRemain
    };
    // first check scores in local storage and take its value else make a blank array
    var scores = JSON.parse(localStorage.getItem("scores") || "[]");
    // push object into score array
    scores.push(newScore)
    // turn objects into an array of strings + put it into local storage
    localStorage.setItem("scores", JSON.stringify(scores));
    clearInputName();
}

// hides the results
function hideResults(){
    var pElement = document.getElementsByClassName("results")[0]
    pElement.style.display='none'
}

//show the results
function showResults(){
    var pElement = document.getElementsByClassName("results")[0]
    pElement.removeAttribute('style');
}

//answer options
answerOptions.addEventListener("click", function (event) {
    var pElement = document.getElementsByClassName("results")[0]
    
    // evaluation of user's answer choices & results
    if (answer === event.target.textContent) {   
        pElement.innerHTML = "CORRECT! ✔️";
        setTimeout(hideResults,1225);
        showResults();   
        
    } else {
        pElement.innerHTML = "INCORRECT! ❌";
        setTimeout(hideResults,1225);
        secondsRemain = secondsRemain - 20;
        showResults();
    }    
    //call make question function
    makeQuestions();
});

//clear the input text area
function clearInputName(){
    // clears playersName after score has been added
    document.getElementById("playersName").value = null;
}
