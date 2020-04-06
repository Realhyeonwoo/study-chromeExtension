// BUTTON FUNCTION
const setTimeText = (timeSort, value) => {
  switch (timeSort) {
    case "hour":
      hourText.value = parseInt(value) < 10 ? `0${parseInt(value)}` : value;
      chrome.storage.sync.set({ hour: hourText.value });
      break;
    case "minute":
      minuteText.value = parseInt(value) < 10 ? `0${parseInt(value)}` : value;
      chrome.storage.sync.set({ minute: minuteText.value });
      break;
    case "second":
      secondText.value = parseInt(value) < 10 ? `0${parseInt(value)}` : value;
      chrome.storage.sync.set({ second: secondText.value });
      break;
  }
};

btn10min.onclick = () => {
  let newMin = parseInt(minuteText.value == "" ? "0" : minuteText.value) + 10;
  if (newMin >= 60) {
    if (hourText.value < 99) {
      const newHour = parseInt(hourText.value == "" ? "0" : hourText.value) + 1;
      setTimeText("hour", newHour);
      newMin -= 60;
    } else {
      newMin = 59;
    }
  }
  setTimeText("minute", newMin);
};

btn30min.onclick = () => {
  let newMin = parseInt(minuteText.value == "" ? "0" : minuteText.value) + 30;
  if (newMin >= 60) {
    if (hourText.value < 99) {
      const newHour = parseInt(hourText.value == "" ? "0" : hourText.value) + 1;
      setTimeText("hour", newHour);
      newMin -= 60;
    } else {
      newMin = 59;
    }
  }
  setTimeText("minute", newMin);
};

btn60min.onclick = () => {
  let newHour = parseInt(hourText.value == "" ? "0" : hourText.value) + 1;
  if (newHour >= 100) {
    newHour = 99;
  }
  setTimeText("hour", newHour);
};

// TEXT FUNCTION
// 숫자만 입력하게 하는 기능
const numkeyCheck = e => (e.keyCode >= 48 && e.keyCode <= 57 ? true : false);
hourText.onkeypress = numkeyCheck;
minuteText.onkeypress = numkeyCheck;
secondText.onkeypress = numkeyCheck;
// 빈칸 0으로 자동 입력
hourText.onblur = () =>
  setTimeText("hour", hourText.value == "" ? 0 : hourText.value);
minuteText.onblur = () =>
  setTimeText("minute", minuteText.value == "" ? 0 : minuteText.value);
secondText.onblur = () =>
  setTimeText("second", secondText.value == "" ? 0 : secondText.value);
