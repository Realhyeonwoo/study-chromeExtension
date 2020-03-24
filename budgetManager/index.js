window.onload = () => {
  const total = document.getElementById("total");
  const limit = document.getElementById("limit");
  const amount = document.getElementById("amount");
  const spendAmountBtn = document.getElementById("spendAmount");

  chrome.storage.sync.get(["total", "limit"], budget => {
    total.innerText = budget.total == undefined ? "0" : budget.total;
    limit.innerText = budget.limit == undefined ? "unSetting" : budget.limit;
  });

  const plusValue = () => {
    chrome.storage.sync.get(["total", "limit"], budget => {
      let newTotal = 0;

      if (budget.total) {
        newTotal += parseInt(budget.total);
      }

      const newAmount = amount.value;
      if (newAmount !== 0) {
        newTotal += parseInt(newAmount);
      }

      chrome.storage.sync.set({ total: newTotal }, () => {
        if (newAmount && newTotal >= budget.limit) {
          const notifOptions = {
            type: "basic",
            iconUrl: "icon48.png",
            title: "LImit Reached!!",
            message: "Uh oh, look's like you've reached your allowed limit."
          };
          chrome.notifications.create("limitNotif", notifOptions);
        }
      });

      total.innerText = newTotal;
      amount.value = "";
    });
  };

  spendAmountBtn.onclick = plusValue;
  amount.onkeydown = e => {
    if (e.keyCode == 13) {
      plusValue();
    }
  };
};
