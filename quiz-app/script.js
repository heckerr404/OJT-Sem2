// script.js - Interactive Quiz App
// Uses only college syllabus topics: arrays of objects, forEach, createElement,
// appendChild, addEventListener, setTimeout, classList, getElementById,
// template literals, if/else, let/const

// Array of 10 quiz question objects
const questions = [
  { question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
  { question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
  { question: "What does 'typeof null' return in JavaScript?",
    options: ["null", "undefined", "object", "string"], answer: "object" },
  { question: "Which method adds an item to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"], answer: "push()" },
  { question: "How many continents are there on Earth?",
    options: ["5", "6", "7", "8"], answer: "7" },
  { question: "Which keyword declares a constant in JavaScript?",
    options: ["var", "let", "const", "def"], answer: "const" },
  { question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" },
  { question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Modern Language",
              "Hyper Transfer Markup Logic", "Home Tool Markup Language"],
    answer: "Hyper Text Markup Language" },
  { question: "Which company created JavaScript?",
    options: ["Microsoft", "Apple", "Netscape", "Google"], answer: "Netscape" },
  { question: "What symbol is used for single-line comments in JavaScript?",
    options: ["#", "//", "/*", "--"], answer: "//" }
];

// State variables — track where we are in the quiz and the current score
let currentIndex = 0;
let score        = 0;
let answered     = false;

// Grab all needed DOM elements once at the top
const questionText   = document.getElementById("question-text");
const optionsDiv     = document.getElementById("options");
const counterEl      = document.getElementById("question-counter");
const scoreEl        = document.getElementById("score-display");
const progressBar    = document.getElementById("progress-bar");
const quizCard       = document.getElementById("quiz-card");
const resultsCard    = document.getElementById("results-card");
const finalScoreEl   = document.getElementById("final-score");
const finalMessageEl = document.getElementById("final-message");

// Displays the current question and its answer buttons
function loadQuestion() {
  answered = false;
  const q  = questions[currentIndex];

  counterEl.textContent    = `Question ${currentIndex + 1} of ${questions.length}`;
  scoreEl.textContent      = `Score: ${score}`;
  questionText.textContent = q.question;
  progressBar.style.width  = `${(currentIndex / questions.length) * 100}%`;

  // Clear old answer buttons before building new ones
  optionsDiv.innerHTML = "";

  q.options.forEach(function (option) {
    const btn       = document.createElement("button");
    btn.className   = "option-btn";
    btn.textContent = option;
    btn.addEventListener("click", function () {
      selectAnswer(btn, option, q.answer);
    });
    optionsDiv.appendChild(btn);
  });
}

// Handles what happens when the user clicks an answer button
function selectAnswer(clickedBtn, selected, correct) {
  if (answered) return; // prevent clicking more than once per question
  answered = true;

  // Disable all option buttons and highlight the correct answer
  document.querySelectorAll(".option-btn").forEach(function (btn) {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.classList.add("correct");
    }
  });

  // Highlight the wrong answer in red if the user picked incorrectly
  if (selected !== correct) {
    clickedBtn.classList.add("wrong");
  } else {
    score++;
  }

  // Wait 1 second then go to next question or show results
  setTimeout(function () {
    currentIndex++;
    if (currentIndex < questions.length) {
      loadQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

// Hides the quiz card and shows the final score results screen
function showResults() {
  quizCard.style.display    = "none";
  resultsCard.style.display = "block";

  finalScoreEl.textContent = `${score} / ${questions.length}`;

  let message = "";
  if (score === questions.length) {
    message = "Perfect score! Outstanding! \uD83C\uDFC6";
  } else if (score >= questions.length * 0.8) {
    message = "Great job! Almost perfect! \uD83C\uDF89";
  } else if (score >= questions.length * 0.5) {
    message = "Good effort! Keep practicing! \uD83D\uDC4D";
  } else {
    message = "Keep going — you'll do better next time! \uD83D\uDCAA";
  }

  finalMessageEl.textContent = `You scored ${score} out of ${questions.length} \u2014 ${message}`;
}

// Resets quiz state and returns to the first question
function restartQuiz() {
  currentIndex = 0;
  score        = 0;
  quizCard.style.display    = "block";
  resultsCard.style.display = "none";
  loadQuestion();
}

// Apply saved theme and load the first question when the page is ready
applyTheme();
loadQuestion();
