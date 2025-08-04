const historyScoreEl = document.querySelector(".history-quiz-container");
const totalScore = document.querySelector("#total-score span");
export function restartScore() {
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
  }
}
