chrome.runtime.sendMessage({ todo: "showPageAction" });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.todo == "changeColor") {
    const addColor = "#" + request.clickedColor;

    document.body.style.background = addColor;
  }
});
