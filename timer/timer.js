let intervalValue;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.todo === "startTimer") {
    let nowTime = parseInt(request.nowTime);

    intervalValue = setInterval(() => {
      if (nowTime == 0) {
        clearInterval(intervalValue);
        chrome.runtime.sendMessage({ todo: "finishTime" });
        // alert("THE END");

        chrome.windows.create({
          url:
            "https://images.unsplash.com/photo-1522292923399-bf8ddbd6e4e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
          type: "popup",
          top: screen.availHeight / 3,
          left: screen.availWidth / 3,
          width: screen.availWidth / 3,
          height: screen.availHeight / 2
        });

        chrome.storage.sync.set({
          hour: "0",
          minute: "0",
          second: "0",
          isStop: "false"
        });
        // 종료 이미지 출력
      } else {
        nowTime--;

        const hour = Math.floor(nowTime / 3600);
        nowTime %= 3600;
        const minute = Math.floor(nowTime / 60);
        const second = nowTime % 60;

        chrome.runtime.sendMessage({
          todo: "runningTime",
          hour,
          minute,
          second
        });

        nowTime = hour * 60 * 60 + minute * 60 + second;
      }
    }, 1000);
  } else if (request.todo === "stopTimer") {
    clearInterval(intervalValue);
    let stopTime = request.nowTime;
    const hour = Math.floor(stopTime / 3600);
    stopTime %= 3600;
    const minute = Math.floor(stopTime / 60);
    const second = stopTime % 60;

    chrome.storage.sync.set({ hour, minute, second, isStop: "true" });
  }
});
