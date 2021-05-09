var btnRestart = document.querySelector("button.btnRestart"),
    btnClear = document.querySelector("button.btnClear"),
    // get the highScores list and turn it back into an object
    scores = JSON.parse(localStorage.getItem("scores") || "[]"),
    scoreList = document.getElementById("list-score");

// sort scores from high to low
scores.sort(function (a, b) {
    return b.score - a.score
})

// display the scores in an un-ordered list
for (var s = 0; s < scores.length; s++) {
    var orderList = document.createElement("li")
    orderList.textContent = scores[s].name + " - " + scores[s].score
    scoreList.appendChild(orderList)
}


// click for restarting and clearing the scoreboard
btnClear.addEventListener("click", function () {
    localStorage.clear();
    window.location.replace("./index.html");
    
});
btnRestart.addEventListener("click", function(){
    window.location.replace("./index.html");
});

