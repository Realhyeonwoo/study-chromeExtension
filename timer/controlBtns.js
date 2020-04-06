const changeToStartUI = () => {
  hourText.disabled = true;
  minuteText.disabled = true;
  secondText.disabled = true;
  btn10min.disabled = true;
  btn30min.disabled = true;
  btn60min.disabled = true;
  startBtn.classList.add("hide");
  stopBtn.classList.remove("hide");
};

const changeToStoptUI = () => {
  hourText.disabled = false;
  minuteText.disabled = false;
  secondText.disabled = false;
  btn10min.disabled = false;
  btn30min.disabled = false;
  btn60min.disabled = false;
  startBtn.classList.remove("hide");
  stopBtn.classList.add("hide");
};

startBtn.onclick = () => {
  const h = hourText.value == "" ? 0 : parseInt(hourText.value);
  const m = minuteText.value == "" ? 0 : parseInt(minuteText.value);
  const s = secondText.value == "" ? 0 : parseInt(secondText.value);
  const nowTime = h * 60 * 60 + m * 60 + s;
  if (nowTime != 0) {
    changeToStartUI();
    chrome.runtime.sendMessage({
      todo: "startTimer",
      nowTime
    });
  }
};

stopBtn.onclick = () => {
  changeToStoptUI();
  const h = hourText.value == "" ? 0 : parseInt(hourText.value);
  const m = minuteText.value == "" ? 0 : parseInt(minuteText.value);
  const s = secondText.value == "" ? 0 : parseInt(secondText.value);
  const nowTime = h * 60 * 60 + m * 60 + s;
  chrome.runtime.sendMessage({
    todo: "stopTimer",
    nowTime
  });
};

resetBtn.onclick = () => {
  if (
    hourText.value != "" ||
    minuteText.value != "" ||
    secondText.value != ""
  ) {
    changeToStoptUI();
    chrome.storage.sync.set({ hour: "", minute: "", second: "" });
    hourText.value = "";
    minuteText.value = "";
    secondText.value = "";

    chrome.runtime.sendMessage({
      todo: "stopTimer"
    });
    chrome.storage.sync.set({ isStop: "false" });
  }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.todo == "finishTime") {
    changeToStoptUI();
    // alert("stop");
    // 종료 이미지 출력
  } else if (request.todo == "runningTime") {
    setTimeText("hour", request.hour);
    setTimeText("minute", request.minute);
    setTimeText("second", request.second);
    chrome.storage.sync.set({ isStop: "false" });
  }
});
