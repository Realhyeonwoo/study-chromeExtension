// const btn10min = document.getElementById("btn10min");
// btn10min.onclick = () => alert("yei");
// const btn30min = document.getElementById("btn30min");
// const btn60min = document.getElementById("btn60min");
// const hourText = document.getElementById("hourText");
// const minuteText = document.getElementById("minuteText");
// const secondText = document.getElementById("secondText");
// let startInterval;

// chrome.storage.sync.get(["hour", "minute", "second"], info => {
//   hourText.value = info.hour !== undefined ? info.hour : "";
//   minuteText.value = info.minute !== undefined ? info.minute : "";
//   secondText.value = info.second !== undefined ? info.second : "";

//   const h = hourText.value == "" ? 0 : parseInt(info.hour);
//   const m = minuteText.value == "" ? 0 : parseInt(info.minute);
//   const s = secondText.value == "" ? 0 : parseInt(info.second);
//   let initTime = h * 60 * 60 + m * 60 + s;

//   if (initTime == 0) {
//   } else {
//     stopBtn.classList.remove("hide");
//     startBtn.classList.add("hide");
//     hourText.disabled = true;
//     minuteText.disabled = true;
//     secondText.disabled = true;
//     btn10min.disabled = true;
//     btn30min.disabled = true;
//     btn60min.disabled = true;

//     chrome.runtime.sendMessage({
//       todo: "startTimer",
//       nowTime: initTime
//     });

//     setInterval(() => {
//       chrome.storage.sync.get(["hour", "minute", "second"], info => {
//         if (info.hour == 0 && info.minute == 0 && info.second == 0) {
//           clearInterval(startInterval);
//           startBtn.classList.remove("hide");
//           stopBtn.classList.add("hide");
//           hourText.value = "";
//           minuteText.value = "";
//           secondText.value = "";
//           chrome.storage.sync.set({ hour: "", minute: "", second: "" });

//           hourText.disabled = false;
//           minuteText.disabled = false;
//           secondText.disabled = false;
//           btn10min.disabled = false;
//           btn30min.disabled = false;
//           btn60min.disabled = false;
//           // 종료 시 알람 및 이미지 출력
//           return;
//         }

//         hourText.value = info.hour < 10 ? `0${info.hour}` : info.hour;
//         minuteText.value = info.minute < 10 ? `0${info.minute}` : info.minute;
//         secondText.value = info.second < 10 ? `0${info.second}` : info.second;
//       });
//     }, 1000);
//   }
// });

// const inputOnlyNumber = e => {
//   if (event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;
// };

// const setNumFormat = str => {
//   if (str === "hour") {
//     if (hourText.value.trim() == "" || hourText.value.trim() === "0") {
//       hourText.value = "00";
//     } else if (parseInt(hourText.value) < 10) {
//       hourText.value = `0${parseInt(hourText.value)}`;
//     }
//     chrome.storage.sync.set({ hour: hourText.value });
//   } else if (str === "minute") {
//     if (minuteText.value.trim() == "" || minuteText.value.trim() === "0") {
//       minuteText.value = "00";
//     } else if (parseInt(minuteText.value) < 10) {
//       minuteText.value = `0${parseInt(minuteText.value)}`;
//     } else if (parseInt(minuteText.value) >= 60) {
//       minuteText.value = 59;
//     }
//     chrome.storage.sync.set({ minute: minuteText.value });
//   } else {
//     if (secondText.value.trim() == "" || secondText.value.trim() === "0") {
//       secondText.value = "00";
//     } else if (parseInt(secondText.value) < 10) {
//       secondText.value = `0${parseInt(secondText.value)}`;
//     } else if (parseInt(secondText.value) >= 60) {
//       secondText.value = 59;
//     }
//     chrome.storage.sync.set({ second: secondText.value });
//   }
// };

// hourText.onkeypress = inputOnlyNumber;
// hourText.onblur = () => setNumFormat("hour");
// minuteText.onkeypress = inputOnlyNumber;
// minuteText.onblur = () => setNumFormat("minute");
// secondText.onkeypress = inputOnlyNumber;
// secondText.onblur = () => setNumFormat("second");

// btn10min.onclick = () => {
//   let nowMinute = 10;
//   if (
//     minuteText.value !== "" &&
//     minuteText.value !== "0" &&
//     minuteText.value !== "00"
//   ) {
//     nowMinute = parseInt(minuteText.value) + 10;
//   }
//   if (nowMinute >= 60) {
//     if (parseInt(hourText.value) == 99) {
//       nowMinute -= 10;
//     } else {
//       nowMinute -= 60;
//       hourText.value = parseInt(hourText.value) + 1;
//       setNumFormat("hour");
//     }
//   }
//   minuteText.value = nowMinute;
//   setNumFormat("minute");
// };

// btn30min.onclick = () => {
//   let nowMinute = 30;
//   if (
//     minuteText.value !== "" &&
//     minuteText.value !== "0" &&
//     minuteText.value !== "00"
//   ) {
//     nowMinute = parseInt(minuteText.value) + 30;
//   }
//   if (nowMinute >= 60) {
//     if (parseInt(hourText.value) == 99) {
//       nowMinute -= 30;
//     } else {
//       nowMinute -= 60;
//       hourText.value = parseInt(hourText.value) + 1;
//       setNumFormat("hour");
//     }
//   }
//   minuteText.value = nowMinute;
//   setNumFormat("minute");
// };

// btn60min.onclick = () => {
//   let nowHour = 1;
//   if (
//     hourText.value !== "" &&
//     hourText.value !== "0" &&
//     hourText.value !== "00"
//   ) {
//     nowHour = parseInt(hourText.value) + 1;
//   }
//   if (hourText.value < 99) {
//     hourText.value = nowHour;
//     setNumFormat("hour");
//   }
// };

// const startBtn = document.getElementById("startBtn");
// const stopBtn = document.getElementById("stopBtn");
// const resetBtn = document.getElementById("resetBtn");

// startBtn.onclick = () => {
//   chrome.storage.sync.get(["hour", "minute", "second"], info => {
//     const h = info.hour == "" ? 0 : parseInt(info.hour);
//     const m = info.minute == "" ? 0 : parseInt(info.minute);
//     const s = info.second == "" ? 0 : parseInt(info.second);
//     let nowTime = h * 60 * 60 + m * 60 + s;

//     // START timer
//     chrome.runtime.sendMessage({
//       todo: "startTimer",
//       nowTime
//     });

//     if (nowTime != 0) {
//       // CHANGE startBtn to stopBtn
//       stopBtn.classList.remove("hide");
//       startBtn.classList.add("hide");
//       // LOCK TIME INPUT BOX && TIME BUTTON
//       hourText.disabled = true;
//       minuteText.disabled = true;
//       secondText.disabled = true;
//       btn10min.disabled = true;
//       btn30min.disabled = true;
//       btn60min.disabled = true;
//       // RUNNING
//       startInterval = setInterval(() => {
//         // if (nowTime == 0) {
//         //   clearInterval(startInterval);
//         //   startBtn.classList.remove("hide");
//         //   stopBtn.classList.add("hide");
//         //   hourText.value = "";
//         //   minuteText.value = "";
//         //   secondText.value = "";
//         //   chrome.storage.sync.set({ hour: "", minute: "", second: "" });

//         //   hourText.disabled = false;
//         //   minuteText.disabled = false;
//         //   secondText.disabled = false;
//         //   btn10min.disabled = false;
//         //   btn30min.disabled = false;
//         //   btn60min.disabled = false;
//         //   // 종료 시 알람 및 이미지 출력
//         //   return;
//         // }

//         chrome.storage.sync.get(["hour", "minute", "second"], info => {
//           hourText.value = info.hour < 10 ? `0${info.hour}` : info.hour;
//           minuteText.value = info.minute < 10 ? `0${info.minute}` : info.minute;
//           secondText.value = info.second < 10 ? `0${info.second}` : info.second;
//           if (info.hour == 0 && info.minute == 0 && info.second) {
//             clearInterval(startInterval);
//             startBtn.classList.remove("hide");
//             stopBtn.classList.add("hide");
//             hourText.value = "";
//             minuteText.value = "";
//             secondText.value = "";
//             chrome.storage.sync.set({ hour: "", minute: "", second: "" });

//             hourText.disabled = false;
//             minuteText.disabled = false;
//             secondText.disabled = false;
//             btn10min.disabled = false;
//             btn30min.disabled = false;
//             btn60min.disabled = false;
//             // 종료 시 알람 및 이미지 출력
//             return;
//           }
//         });
//       }, 1000);
//     }
//   });
// };

// stopBtn.onclick = () => {
//   // CHANGE stopBtn to startBtn
//   startBtn.classList.remove("hide");
//   stopBtn.classList.add("hide");

//   // STOP timer
//   clearInterval(startInterval);

//   const hour = hourText.value;
//   const minute = minuteText.value;
//   const second = secondText.value;
//   chrome.storage.sync.set({ hour, minute, second });

//   // chrome.runtime.sendMessage({
//   //   todo: "stopTimer",
//   //   time: "stopTimer"
//   // });
// };

// resetBtn.onclick = () => {
//   clearInterval(startInterval);
//   hourText.value = "";
//   minuteText.value = "";
//   secondText.value = "";

//   // CHANGE startBtn to stopBtn
//   startBtn.classList.remove("hide");
//   stopBtn.classList.add("hide");
//   hourText.disabled = false;
//   minuteText.disabled = false;
//   secondText.disabled = false;
//   btn10min.disabled = false;
//   btn30min.disabled = false;
//   btn60min.disabled = false;

//   chrome.runtime.sendMessage({
//     todo: "resetTimer"
//   });
// };
