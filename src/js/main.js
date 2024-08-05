const yearButton = document.querySelector("#year-button");
const ageButton = document.querySelector("#age-button");
let firstSwitch = true;

yearButton.addEventListener("click", () => {
  yearButton.classList.add("active");
  ageButton.classList.remove("active");
  document.querySelectorAll(".year-mode").forEach((element) => {
    element.classList.remove("hidden");
  });
  document.querySelectorAll(".age-mode").forEach((element) => {
    element.classList.add("hidden");
  });
  dispatchEvent(readyToUpdateWithYear);
});

ageButton.addEventListener("click", () => {
  ageButton.classList.add("active");
  yearButton.classList.remove("active");
  document.querySelectorAll(".age-mode").forEach((element) => {
    element.classList.remove("hidden");
  });
  document.querySelectorAll(".year-mode").forEach((element) => {
    element.classList.add("hidden");
  });
  dispatchEvent(readyToUpdateWithAge);
  if (firstSwitch)
    agePicker.scrollTop =
      agePicker.firstElementChild.clientHeight * (initialAge - 1);
  firstSwitch = false;
});

document.querySelectorAll(".change-value").forEach((element) => {
  element.addEventListener("click", () => {
    const field = document.querySelector(".field:not(.hidden)");
    field.value = parseInt(field.value) + parseInt(element.textContent);
    field.dispatchEvent(new Event("change"));
  });
});
