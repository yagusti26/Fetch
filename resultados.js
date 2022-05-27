// RESULTADOS
const highscores = document.getElementById("highscores");

function createListItem(content) {
    const li = document.createElement("li");

    li.textContent = content;

    return li;
}

let scores = JSON.parse(localStorage.getItem("highscores")) || [];

scores = scores.sort().reverse();

for (let index = 0; index < scores.length; index++) {
   
    const li = createListItem(
        String(index + 1) + ") " + scores[index]
    );

    highscores.appendChild(li);
}