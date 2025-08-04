const nextButtonEl = document.querySelector("#next-btn");
import { questions } from "./questions.js";
import { displayScore, nextQuestion } from "./app.js";
import { getQuesTimer } from "./question-timer.js";
let nextQuestionCount = 0;
let score = 0;
function cheackedAnswear() {
  const buttonsEl = document.querySelectorAll("#answer-buttons .btn");
  let answered = false;
  buttonsEl.forEach((e) => {
    if (e.classList.contains("checked")) {
      answered = true;
      if (e.textContent === questions[getNextQuestionCount()].correctAnswer) {
        e.classList.add("correct");
        incrementScore();
      } else {
        e.classList.add("wrong");
      }
    } else {
      return;
    }
  });
  if (answered) {
    displayScore();
    disableElements();
    setTimeout(() => nextQuestion(), 1000);
  } else {
    nextButtonEl.disabled = false;
    // fix bug: when the time done the Process stuck ,but i add these couple line of code to fix this.
    if (getQuesTimer() <= 0) {
      buttonsEl.forEach((e) => {
        if (e.textContent === questions[getNextQuestionCount()].correctAnswer) {
          e.classList.add("correct");
        }
      });
      setTimeout(() => nextQuestion(), 1500);
    }
  }
}
function disableElements() {
  document.querySelectorAll("#answer-buttons .btn").forEach((e) => {
    e.disabled = true;
  });
  nextButtonEl.disabled = true;
}

export function getNextQuestionCount() {
  return nextQuestionCount;
}
export function incrementNextQuestionCount() {
  nextQuestionCount++;
}
export function resetNextQuestionCount() {
  nextQuestionCount = 0;
}

export function getScore() {
  return score;
}
export function incrementScore() {
  score++;
}
export function resetScore() {
  score = 0;
}
export { nextQuestionCount, cheackedAnswear, score };
