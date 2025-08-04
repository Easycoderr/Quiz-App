import { currentDate } from "./utils/date-calculation.js";
import { restartScore } from "./restart-scores.js";
import {
  historyQuizScore,
  saveScoreTolocalStorage,
  displayHistoryScore,
} from "./history-quiz-score-data.js";
import { questions } from "./questions.js";
import { displayTotalScore } from "./total-score.js";
import {
  cheackedAnswear,
  getNextQuestionCount,
  getScore,
  incrementNextQuestionCount,
  resetNextQuestionCount,
  resetScore,
} from "./checking-answer.js";
import {
  questionTimer,
  getQuesTimer,
  resetQuesTimer,
  timer,
} from "./question-timer.js";
const quizContainerEl = document.querySelector(".quiz-container");
const questionEl = document.querySelector("#question");
const answerButtonsEl = document.querySelector("#answer-buttons");
const scoreEl = document.querySelector("#score span");
const nextButtonEl = document.querySelector("#next-btn");
const mainEl = document.querySelector("#main");
const timeEl = document.querySelector("#time span");
const timeProgressEl = document.querySelector("#time");
const restartBtn = document.querySelector("#restart-btn");
const spinnerContainerEl = document.querySelector(".spinner-container");

function startQuiz() {
  spinnerContainerEl.classList.remove("unvisible");
  clearInterval(timer);

  displayScore();
  questionTimer();
  mainEl.classList.add("unvisible");
  quizContainerEl.classList.remove("unvisible");
  showQuestion();
  chooseOption();
  nextButtonEl.addEventListener("click", nextButton);
}

function showQuestion() {
  nextButtonEl.disabled = false;
  timeEl.textContent = getQuesTimer();
  questionEl.textContent = `${questions[getNextQuestionCount()].question}`;
  answerButtonsEl.innerHTML = `
          <button class="btn" >${
            questions[getNextQuestionCount()].options[0]
          }</button>
          <button class="btn">${
            questions[getNextQuestionCount()].options[1]
          }</button>
          <button class="btn">${
            questions[getNextQuestionCount()].options[2]
          }</button>
          <button class="btn">${
            questions[getNextQuestionCount()].options[3]
          }</button>
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
export function displayScore() {
  scoreEl.textContent = getScore();
}

function nextButton() {
  cheackedAnswear(nextQuestion);
}

export function nextQuestion() {
  timeProgressEl.style.width = "100%";
  if (getNextQuestionCount() === questions.length - 1) {
    resetQuesTimer();
    timeProgressEl.style.width = `100%`;
    timeEl.textContent = `${getQuesTimer()}s`;
    gameOver();
    displayScore();
    mainEl.classList.remove("unvisible");
    quizContainerEl.classList.add("unvisible");
  } else {
    incrementNextQuestionCount();
    showQuestion();
    chooseOption();
    clearInterval(timer);
    questionTimer();
  }
}
function gameOver() {
  clearInterval(timer);
  Swal.fire({
    title: `Game Over 
          Score: ${getScore()}`,
    icon: `<span style="color:rgb(242, 210, 4); font-size:2.5rem;"><i class="fa-solid fa-trophy"></i></span>`,
    draggable: true,
  });
  historyQuizScore.push({ date: currentDate, scores: getScore() });
  resetNextQuestionCount();
  resetScore();
  saveScoreTolocalStorage();
  displayTotalScore();
  displayHistoryScore();
}
displayHistoryScore();
displayTotalScore();

document.querySelector("#start-btn").addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartScore);
