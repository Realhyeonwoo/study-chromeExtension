window.onload = () => {
  const text = document.getElementById("greet");
  const inputName = document.getElementById("name");

  inputName.onkeyup = () => {
    text.innerText = `Hello ${inputName.value}`;
  };
};
