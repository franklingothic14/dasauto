let current = null;
let correctCount = 0;
let wrongCount = 0;

const nounEl = document.getElementById("noun");
const englishEl = document.getElementById("english");
const feedbackEl = document.getElementById("feedback");
const correctEl = document.getElementById("correct");
const wrongEl = document.getElementById("wrong");

function pickRandomWord() {
  const index = Math.floor(Math.random() * WORDS.length);
  current = WORDS[index];
  nounEl.textContent = current.noun;
  englishEl.textContent = current.english;
  feedbackEl.textContent = "";
}

function handleAnswer(chosenArticle) {
  if (!current) return;
  if (chosenArticle === current.article) {
    correctCount++;
    feedbackEl.textContent = "✔ Richtig: " + current.article + " " + current.noun;
    feedbackEl.style.color = "green";
  } else {
    wrongCount++;
    feedbackEl.textContent =
      "✘ Falsch. Richtige Antwort: " + current.article + " " + current.noun;
    feedbackEl.style.color = "red";
  }
  correctEl.textContent = correctCount;
  wrongEl.textContent = wrongCount;

  setTimeout(pickRandomWord, 800);
}

document.querySelectorAll("#buttons button").forEach(btn => {
  btn.addEventListener("click", () => {
    const chosen = btn.getAttribute("data-article");
    handleAnswer(chosen);
  });
});

pickRandomWord();
