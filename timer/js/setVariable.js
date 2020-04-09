window.onload = () => {
  const btn10min = document.getElementById("btn10min");
  const btn30min = document.getElementById("btn30min");
  const btn60min = document.getElementById("btn60min");
  const hourText = document.getElementById("hourText");
  const minuteText = document.getElementById("minuteText");
  const secondText = document.getElementById("secondText");
  const startBtn = document.getElementById("startBtn");
  const stopBtn = document.getElementById("stopBtn");
  const resetBtn = document.getElementById("resetBtn");

  chrome.storage.sync.get(["hour", "minute", "second", "isStop"], (info) => {
    hourText.value =
      info.hour == undefined || isNaN(parseInt(info.hour)) ? "" : info.hour;
    minuteText.value =
      info.minute == undefined || isNaN(parseInt(info.minute))
        ? ""
        : info.minute;
    secondText.value =
      info.second == undefined || isNaN(parseInt(info.second))
        ? ""
        : info.second;

    setTimeText("hour", hourText.value);
    setTimeText("minute", minuteText.value);
    setTimeText("second", secondText.value);

    const h = hourText.value == "" ? 0 : parseInt(hourText.value);
    const m = minuteText.value == "" ? 0 : parseInt(minuteText.value);
    const s = secondText.value == "" ? 0 : parseInt(secondText.value);
    const nowTime = h * 60 * 60 + m * 60 + s;

    // alert(nowTime);
    if (nowTime != 0) {
      // alert(info.isStop);
      if (info.isStop == "false") {
        changeToStartUI();
        // chrome.runtime.sendMessage({
        //   todo: "startTimer",
        //   nowTime
        // });
      } else {
        changeToStoptUI();
      }
    }
  });
};
