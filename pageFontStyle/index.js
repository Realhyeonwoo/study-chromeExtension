window.onload = () => {
  const colorText = document.getElementById("fontColor");
  const changeBtn = document.getElementById("btnChange");

  let color = colorText.value;
  const changeColor = () => (color = colorText.value);

  colorText.onchange = changeColor;
  colorText.onpaste = changeColor;
  colorText.onkeyup = changeColor;

  changeBtn.onclick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, {
        todo: "changeColor",
        clickedColor: color
      });
    });
  };
};
