const menuItem = {
  id: "wikit",
  title: "Wikit",
  contexts: ["selection"]
};

chrome.contextMenus.create(menuItem);

const fixedEncodeURI = str =>
  encodeURI(str)
    .replace(/%5B/g, "[")
    .replace(/%5D/g, "]");

chrome.contextMenus.onClicked.addListener(clickData => {
  if (clickData.menuItemId == "wikit" && clickData.selectionText) {
    const wikiUrl =
      "https://en.wikipedia.org/wiki/" +
      fixedEncodeURI(clickData.selectionText);
    const createData = {
      url: wikiUrl,
      type: "popup",
      top: 5,
      left: 5,
      width: screen.availWidth / 2,
      height: screen.availHeight / 2
    };
    chrome.windows.create(createData);
  }
});
