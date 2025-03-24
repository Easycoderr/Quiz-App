const quizContainerEl = document.querySelector(".quiz-container");
const questionEl = document.querySelector("#question");
const answerButtonsEl = document.querySelector("#answer-buttons");
const scoreEl = document.querySelector("#score span");
const nextButtonEl = document.querySelector("#next-btn");
const mainEl = document.querySelector("#main");
const timeEl = document.querySelector("#time span");
const timeProgressEl = document.querySelector("#time");
const totalScore = document.querySelector("#total-score span");
const restartBtn = document.querySelector("#restart-btn");
const historyScoreEl = document.querySelector(".history-quiz-container");
const spinnerContainerEl = document.querySelector(".spinner-container");
const dayOfYear = (date) =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
const currentDate = `${new Date().getUTCFullYear()}/${
  new Date().getUTCMonth() + 1
}/${new Date().getUTCDate()}`;
const historyQuizScore =
  JSON.parse(localStorage.getItem("historyScores")) || [];

let score = 0;
let quesTimer = 0;
let nextQuestionCount = 0;
let timer;

// Questions Array for storing Q

const questions = [
  {
  question: "Which planet is known as the Red Planet?",
  options: ["Earth", "Mars", "Jupiter", "Saturn"],
  correctAnswer: "Mars",
},
{
  question: "What is the largest mammal in the world?",
  options: ["Elephant", "Blue Whale", "Giraffe", "Rhino"],
  correctAnswer: "Blue Whale",
},
{
  question: "Who wrote the play 'Romeo and Juliet'?",
  options: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"],
  correctAnswer: "William Shakespeare",
},
{
  question: "What is the chemical symbol for water?",
  options: ["O2", "H2O", "CO2", "NaCl"],
  correctAnswer: "H2O",
},
{
  question: "Which country hosted the 2020 Summer Olympics?",
  options: ["China", "Brazil", "Japan", "USA"],
  correctAnswer: "Japan",
},
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    question: "Which language runs in the browser?",
    options: ["JavaScript", "Python", "Java", "C++"],
    correctAnswer: "JavaScript",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Colorful Style Sheets",
      "Creative Style Sheets",
      "Cascading Style Sheets",
    ],
    correctAnswer: "Cascading Style Sheets",
  },
];

function saveScoreTolocalStorage() {
  localStorage.setItem("historyScores", JSON.stringify(historyQuizScore));
}
function displayTotalScore() {
  const totalQuizScore = historyQuizScore.reduce((total, num) => {
    return total + num.scores;
  }, 0);
  localStorage.setItem("totalScore", totalQuizScore);
  const getTotalScore = localStorage.getItem("totalScore");
  totalScore.textContent = getTotalScore ? getTotalScore : 0;
}

function startQuiz() {
  spinnerContainerEl.classList.remove("unvisible");
  clearInterval(timer);
  nextQuestionCount = 0;
  score = 0;
  quesTimer = 20;
  displayScore();
  questionTimer();
  mainEl.classList.add("unvisible");
  quizContainerEl.classList.remove("unvisible");
  showQuestion();
  chooseOption();
  nextButtonEl.addEventListener("click", nextButton);
}
function disableElements() {
  document.querySelectorAll("#answer-buttons .btn").forEach((e) => {
    e.disabled = true;
  });
  nextButtonEl.disabled = true;
}
function showQuestion() {
  nextButtonEl.disabled = false;
  timeEl.textContent = quesTimer;
  questionEl.textContent = `${questions[nextQuestionCount].question}`;
  answerButtonsEl.innerHTML = `
          <button class="btn" >${questions[nextQuestionCount].options[0]}</button>
          <button class="btn">${questions[nextQuestionCount].options[1]}</button>
          <button class="btn">${questions[nextQuestionCount].options[2]}</button>
          <button class="btn">${questions[nextQuestionCount].options[3]}</button>
      `;
  spinnerContainerEl.classList.add("unvisible");
}

function chooseOption() {
  const buttonsEl = document.querySelectorAll("#answer-buttons .btn");
  buttonsEl.forEach((btn) => {
    btn.addEventListener("click", (b) => {
      buttonsEl.forEach((e) => {
        e.classList.remove("checked");
        btn.classList.add("checked");
      });
    });
  });
  // for unchecked optons with Double Click on option that checked
  buttonsEl.forEach((btn) => {
    btn.addEventListener("dblclick", (b) => {
      b.target.classList.remove("checked");
    });
  });
}
// for Display score on page
function displayScore() {
  scoreEl.textContent = score;
}
function cheackedAnswear() {
  const buttonsEl = document.querySelectorAll("#answer-buttons .btn");
  let answered = false;
  buttonsEl.forEach((e) => {
    if (e.classList.contains("checked")) {
      answered = true;
      if (e.textContent === questions[nextQuestionCount].correctAnswer) {
        e.classList.add("correct");
        score++;
      } else {
        e.classList.add("wrong");
      }
    }
  });
  if (answered) {
    displayScore();
    disableElements();
    setTimeout(() => nextQuestion(), 1000);
  } else {
    nextButtonEl.disabled = false;
  }
}
function nextButton() {
  cheackedAnswear();
}
function nextQuestion() {
  timeProgressEl.style.width = "100%";
  if (nextQuestionCount === questions.length - 1) {
    quesTimer = 20;
    timeProgressEl.style.width = `100%`;
    timeEl.textContent = `${quesTimer}s`;
    gameOver();
    displayScore();
    mainEl.classList.remove("unvisible");
    quizContainerEl.classList.add("unvisible");
  } else {
    nextQuestionCount++;
    showQuestion();
    chooseOption();
    clearInterval(timer);
    questionTimer();
  }
}
function questionTimer() {
  timeEl.parentElement.style.backgroundColor = "#22c701ac";
  quesTimer = 20;
  timeEl.textContent = `${quesTimer}s`;
  timer = setInterval(() => {
    quesTimer--;
    timeEl.textContent = `${quesTimer}s`;
    timeProgressEl.style.width = `${(100 * quesTimer) / 20}%`;
    if (quesTimer < 15 && quesTimer >= 10) {
      timeEl.parentElement.style.backgroundColor = "#fe5e01ac";
    } else if (quesTimer <= 9 && quesTimer > 4) {
      timeEl.parentElement.style.backgroundColor = "#ff0707ac";
    } else if (quesTimer <= 3) {
      timeEl.parentElement.style.backgroundColor = "#FF0000";
    }
    if (quesTimer <= 0) {
      clearInterval(timer);
      cheackedAnswear();
    }
  }, 1000);
}
function displayHistoryScore() {
  let html = "";
  const historyQuizScoreFiltered = historyQuizScore.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  historyQuizScoreFiltered.forEach((data) => {
    let dateQuiz = "";
    const yesterdayCond =
      dayOfYear(new Date()) - dayOfYear(new Date(data.date));
    if (data.date === currentDate) {
      dateQuiz = "Today";
    } else if (yesterdayCond === 1) {
      dateQuiz = "Yesterday";
    } else {
      dateQuiz = data.date;
    }
    html += `
    <div class="quiz">
          <div class="quiz-score" id="quiz-score"><div>${data.scores}</div> <span style="color:rgb(242, 210, 4);"><i class="fa-solid fa-trophy"></i></span></div>
          <div class="quiz-date"><div>${dateQuiz}</div> <span style="color:rgb(6, 75, 223);"><i class="fa-regular fa-calendar-days"></i></span></div>
        </div>
  `;
  });

  if (html) {
    let containerHeight = 0;
    if (historyQuizScore.length >= 7) {
      containerHeight = 200;
    } else {
      containerHeight = (historyQuizScore.length * 45) / 1;
    }
    historyScoreEl.style.height = `${containerHeight}px`;
    historyScoreEl.style.overflow = "scroll";
    historyScoreEl.innerHTML = html;
  } else {
    historyScoreEl.innerHTML =
      "<h3 style='color:#C0C0C0; text-align:center; font-size:1rem; font-weight:400; margin:0; '>Quiz record not available<h3>";
  }
}
function restartScore() {
  const data = JSON.parse(localStorage.getItem("historyScores"));
  if (data) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete all!",
    }).then((result) => {
      if (result.isConfirmed) {
        historyScoreEl.style.height = "auto";
        historyScoreEl.style.overflow = "auto";
        historyScoreEl.style.display = "flex";
        historyScoreEl.innerHTML =
          "<h3 style='color:#C0C0C0; text-align:center; font-size:1rem; font-weight:400; margin:0; position: absolute; '>Quiz record not available<h3>";
        totalScore.innerHTML = 0;
        localStorage.removeItem("historyScores");
        Swal.fire({
          title: "Restarted!",
          text: "Your records has been deleted!",
          icon: "success",
        });
      }
    });
    //
  }
}

function gameOver() {
  clearInterval(timer);
  Swal.fire({
    title: `Game Over 
          Score: ${score}`,
    icon: `<span style="color:rgb(242, 210, 4); font-size:2.5rem;"><i class="fa-solid fa-trophy"></i></span>`,
    draggable: true,
  });
  historyQuizScore.push({ date: currentDate, scores: score });
  nextQuestionCount = 0;
  score = 0;
  saveScoreTolocalStorage();
  displayTotalScore();
  displayHistoryScore();
}
displayHistoryScore();
displayTotalScore();

document.querySelector("#start-btn").addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartScore);
