const STORAGE_KEY = "number-guessing-best";
const MIN = 1;
const MAX = 100;

const guessForm = document.getElementById("guessForm");
const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const feedbackText = document.getElementById("feedbackText");
const attemptsCount = document.getElementById("attemptsCount");
const rangeHint = document.getElementById("rangeHint");
const bestScore = document.getElementById("bestScore");
const guessHistory = document.getElementById("guessHistory");
const newGameButton = document.getElementById("newGameButton");

let secret = null;
let attempts = 0;
let lowBound = MIN;
let highBound = MAX;
let guesses = [];
let gameOver = false;
let forcedSecret = null;

function pickSecret() {
  if (forcedSecret !== null) {
    const value = forcedSecret;
    forcedSecret = null;
    return value;
  }
  return Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
}

function loadBest() {
  const saved = Number(localStorage.getItem(STORAGE_KEY));
  bestScore.textContent = Number.isFinite(saved) && saved > 0 ? String(saved) : "-";
}

function saveBest(score) {
  const saved = Number(localStorage.getItem(STORAGE_KEY));
  if (!Number.isFinite(saved) || saved <= 0 || score < saved) {
    localStorage.setItem(STORAGE_KEY, String(score));
  }
  loadBest();
}

function renderStats() {
  attemptsCount.textContent = String(attempts);
  rangeHint.textContent = `${lowBound} - ${highBound}`;
}

function renderHistory() {
  guessHistory.innerHTML = "";
  if (guesses.length === 0) {
    const empty = document.createElement("span");
    empty.className = "empty-note";
    empty.textContent = "None yet";
    guessHistory.appendChild(empty);
    return;
  }
  guesses.forEach((entry) => {
    const chip = document.createElement("span");
    chip.className = `guess-chip ${entry.result}`;
    chip.textContent = String(entry.value);
    guessHistory.appendChild(chip);
  });
}

function setFeedback(message, kind) {
  feedbackText.textContent = message;
  feedbackText.classList.remove("high", "low", "win");
  if (kind) feedbackText.classList.add(kind);
}

function makeGuess(rawValue) {
  if (gameOver) return "over";
  const guess = Number(rawValue);
  if (rawValue === "" || rawValue === null || !Number.isInteger(guess) || guess < MIN || guess > MAX) {
    setFeedback(`Enter a whole number between ${MIN} and ${MAX}.`, null);
    return "invalid";
  }

  attempts += 1;
  let result;
  if (guess < secret) {
    result = "low";
    lowBound = Math.max(lowBound, guess + 1);
    setFeedback(`Too low - aim higher than ${guess}.`, "low");
  } else if (guess > secret) {
    result = "high";
    highBound = Math.min(highBound, guess - 1);
    setFeedback(`Too high - aim lower than ${guess}.`, "high");
  } else {
    result = "win";
    gameOver = true;
    saveBest(attempts);
    setFeedback(`Correct! You got it in ${attempts} attempt${attempts === 1 ? "" : "s"}.`, "win");
  }

  guesses.push({ value: guess, result });
  renderStats();
  renderHistory();
  return result;
}

function newGame() {
  secret = pickSecret();
  attempts = 0;
  lowBound = MIN;
  highBound = MAX;
  guesses = [];
  gameOver = false;
  setFeedback("Make your first guess to begin.", null);
  guessInput.value = "";
  renderStats();
  renderHistory();
  guessInput.focus();
}

guessForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const result = makeGuess(guessInput.value.trim());
  if (result !== "invalid") guessInput.value = "";
  guessInput.focus();
});

newGameButton.addEventListener("click", newGame);

window.guessGame = {
  makeGuess,
  newGame,
  setSecret(value) {
    if (Number.isInteger(value) && value >= MIN && value <= MAX) forcedSecret = value;
  },
  getState() {
    return {
      secret,
      attempts,
      lowBound,
      highBound,
      gameOver,
      guesses: guesses.map((g) => ({ ...g })),
      feedback: feedbackText.textContent,
      best: bestScore.textContent
    };
  }
};

loadBest();
newGame();
