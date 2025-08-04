const totalScore = document.querySelector("#total-score span");
import { historyQuizScore } from "./history-quiz-score-data.js";
export function displayTotalScore() {
  const totalQuizScore = historyQuizScore.reduce((total, num) => {
    return total + num.scores;
  }, 0);
  localStorage.setItem("totalScore", totalQuizScore);
  const getTotalScore = localStorage.getItem("totalScore");
  totalScore.textContent = getTotalScore ? getTotalScore : 0;
}
