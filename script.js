let current = null;
let correctCount = 0;
let wrongCount = 0;
let mistakes = JSON.parse(localStorage.getItem('articleMistakes')) || [];

const nounEl = document.getElementById('noun');
const englishEl = document.getElementById('english');
const feedbackEl = document.getElementById('feedback');
const correctEl = document.getElementById('correct');
const wrongEl = document.getElementById('wrong');
const mistakesEl = document.getElementById('mistakes');
const clearBtn = document.getElementById('clear-mistakes');

function updateMistakes() {
  if (mistakesEl) {
    if (mistakes.length > 0) {
      mistakesEl.innerHTML = `
        <h3>Помилки з артиклями:</h3>
        <ul>${mistakes.map(m => `<li>${m.noun} (${m.english}) — правильно: ${m.article}</li>`).join('')}</ul>
      `;
    } else {
      mistakesEl.innerHTML = '<p>Поки що помилок немає! 👍</p>';
    }
  }
}

function clearMistakes() {
  mistakes = [];
  localStorage.removeItem('articleMistakes');
  updateMistakes();
}

function pickRandomWord() {
  const index = Math.floor(Math.random() * WORDS.length);
  current = WORDS[index];
  nounEl.textContent = current.noun;
  englishEl.textContent = current.english;
  feedbackEl.textContent = '';
  feedbackEl.style.color = '';
}

function handleAnswer(chosenArticle) {
  if (!current) return;

  if (chosenArticle === current.article) {
    correctCount++;
    feedbackEl.textContent = `Richtig! ${current.article} ${current.noun}`;
    feedbackEl.style.color = 'green';
  } else {
    wrongCount++;
    feedbackEl.textContent = `Falsch. Richtige Antwort: ${current.article} ${current.noun}`;
    feedbackEl.style.color = 'red';
    
    // Додаємо помилку до списку
    mistakes.push({ noun: current.noun, english: current.english, article: current.article });
    localStorage.setItem('articleMistakes', JSON.stringify(mistakes));
    updateMistakes();
  }

  correctEl.textContent = `Правильно: ${correctCount}`;
  wrongEl.textContent = `Помилок: ${wrongCount}`;

  setTimeout(pickRandomWord, 1500);
}

// Event listeners
document.querySelectorAll('#buttons button').forEach(btn => {
  btn.addEventListener('click', () => {
    const chosen = btn.getAttribute('data-article');
    handleAnswer(chosen);
  });
});

clearBtn.addEventListener('click', clearMistakes);

// Ініціалізація
pickRandomWord();
updateMistakes();
