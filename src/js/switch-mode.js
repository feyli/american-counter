const yearButton = document.querySelector("#year-button");
const ageButton = document.querySelector("#age-button");
let firstSwitch = true;

yearButton.addEventListener("click", () => {
  yearButton.classList.add("active");
  ageButton.classList.remove("active");
  yearPicker.classList.remove("hidden");
  agePicker.classList.add("hidden");
  yearField.classList.remove("hidden");
  ageField.classList.add("hidden");
});

ageButton.addEventListener("click", () => {
  ageButton.classList.add("active");
  yearButton.classList.remove("active");
  agePicker.classList.remove("hidden");
  yearPicker.classList.add("hidden");
  ageField.classList.remove("hidden");
  yearField.classList.add("hidden");
  if (firstSwitch)
    agePicker.scrollTop =
      agePicker.scrollHeight / 2 - agePicker.clientHeight / 2;
  firstSwitch = false;
});
