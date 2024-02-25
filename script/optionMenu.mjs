const optionMenu = document.querySelector(".category"),
  selectBtn = optionMenu.querySelector(".select-btn"),
  options = optionMenu.querySelectorAll(".gender"),
  btnText = optionMenu.querySelector(".btn-text");


selectBtn.addEventListener("click", () =>
  optionMenu.classList.toggle("active")
);

options.forEach((Option) => {
  Option.addEventListener("click", () => {
    let selectedOption = Option.querySelector(".gender-text").innerText;
    btnText.innerText = selectedOption;
    optionMenu.classList.toggle("active");
  });
});

export { optionMenu, selectBtn, options, btnText };
