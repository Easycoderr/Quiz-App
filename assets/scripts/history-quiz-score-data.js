import { currentDate, dayOfYear } from "./utils/date-calculation.js";
const historyScoreEl = document.querySelector(".history-quiz-container");
const historyQuizScore =
  JSON.parse(localStorage.getItem("historyScores")) || [];
function saveScoreTolocalStorage() {
  localStorage.setItem("historyScores", JSON.stringify(historyQuizScore));
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

export { historyQuizScore, saveScoreTolocalStorage, displayHistoryScore };
