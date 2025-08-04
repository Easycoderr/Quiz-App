import { cheackedAnswear } from "./checking-answer.js";
const timeEl = document.querySelector("#time span");
const timeProgressEl = document.querySelector("#time");
let timer;
let quesTimer = 0;

function questionTimer() {
  timeElBgColorHandler("#22c701ac");
  // timeEl.parentElement.style.backgroundColor = "#22c701ac";
  quesTimer = 20;
  timeEl.textContent = `${getQuesTimer()}s`;
  timer = setInterval(() => {
    quesTimer--;
    timeEl.textContent = `${getQuesTimer()}s`;
    timeProgressEl.style.width = `${(100 * quesTimer) / 20}%`;
    if (getQuesTimer() < 15 && getQuesTimer() >= 10) {
      timeElBgColorHandler("#fe5e01ac");
      // timeEl.parentElement.style.backgroundColor = ;
    } else if (getQuesTimer() <= 9 && getQuesTimer() > 4) {
      timeElBgColorHandler("#ff0707ac");
      // timeEl.parentElement.style.backgroundColor = ;
    } else if (getQuesTimer() <= 3) {
      timeElBgColorHandler("#FF0000");
      // timeEl.parentElement.style.backgroundColor = ;
    }
    if (getQuesTimer() <= 0) {
      clearInterval(timer);
      cheackedAnswear();
    }
  }, 1000);
}
function timeElBgColorHandler(color) {
  timeEl.parentElement.style.backgroundColor = color;
}
export function getQuesTimer() {
  return quesTimer;
}
export function resetQuesTimer() {
  quesTimer = 20;
}
export function getTimer() {
  return timer;
}
export { questionTimer, quesTimer, timer };
