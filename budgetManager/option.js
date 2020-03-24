window.onload = () => {
  const limit = document.getElementById("limit");
  const saveBtn = document.getElementById("saveLimit");
  const resetBtn = document.getElementById("resetTotal");

  chrome.storage.sync.get("limit", budget => {
    limit.value = budget.limit ? budget.limit : "";
  });

  saveBtn.onclick = () => {
    const limitValue = limit.value;
    if (limitValue) {
      chrome.storage.sync.set({ limit: limitValue }, () => close());
    }
  };

  resetBtn.onclick = () => {
    chrome.storage.sync.set({ total: 0 }, () => {
      var notifOptions = {
        type: "basic",
        iconUrl: "icon48.png",
        title: "Resetting Total",
        message: "Total has been reset to 0."
      };
      chrome.notifications.create("limitNotif", notifOptions);
    });
  };
};
