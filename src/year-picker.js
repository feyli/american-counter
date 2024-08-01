const yearPicker = document.getElementById("yearPicker");
let startYear = new Date().getFullYear() - 500;
const endYear = new Date().getFullYear();
const field = document.getElementById("field");

const generateYears = (start, end) => {
  const fragment = document.createDocumentFragment();
  for (let year = start; year <= end; year++) {
    const li = document.createElement("li");
    li.textContent = year;
    fragment.appendChild(li);
  }
  return fragment;
};

const addYearsToStart = () => {
  const firstYear = parseInt(yearPicker.firstElementChild.textContent);
  const newStartYear = firstYear - 500;
  yearPicker.prepend(generateYears(newStartYear, firstYear - 1));
};

const onScroll = () => {
  const scrollTop = yearPicker.scrollTop;
  const scrollHeight = yearPicker.scrollHeight;

  if (scrollTop === 0) {
    const oldHeight = scrollHeight;
    addYearsToStart();
    yearPicker.scrollTop = yearPicker.scrollHeight - oldHeight;
  }

  const elements = document.querySelectorAll(".year-picker-container li");
  const selected = getCurrentlySelected();
  elements.forEach((element) => element.classList.remove("selected"));
  selected.classList.add("selected");
  field.value = selected.textContent;
};

const onChange = () => {
  // stop process if another keystroke within 500ms
  clearTimeout(onChange.timeout);
  onChange.timeout = setTimeout(() => {
    const firstYear = parseInt(yearPicker.firstElementChild.textContent);
    if (field.value < firstYear) {
      let gap = firstYear - field.value;
      while (gap > 0) {
        addYearsToStart();
        gap -= 500;
      }
    } else if (field.value > endYear) field.value = 1776;
    const elements = document.querySelectorAll(".year-picker-container li");
    elements.forEach((element) => element.classList.remove("selected"));
    const selected = Array.from(elements).find(
      (element) => element.textContent === field.value,
    );
    selected.classList.add("selected");
    selected.scrollIntoView({ behavior: "instant", block: "center" });
  }, 500);
};

const getCurrentlySelected = () => {
  const elements = document.querySelectorAll(".year-picker-container li");
  const containerRect = yearPicker.getBoundingClientRect();
  let closestElement = null;
  let closestDistance = Number.POSITIVE_INFINITY;

  elements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const distance = Math.abs(
      containerRect.top +
        containerRect.height / 2 -
        (rect.top + rect.height / 2),
    );
    if (distance < closestDistance) {
      closestDistance = distance;
      closestElement = element;
    }
  });

  return closestElement;
};

yearPicker.appendChild(generateYears(startYear, endYear));
yearPicker.scrollTop =
  yearPicker.scrollHeight -
  yearPicker.firstElementChild.clientHeight * (endYear - 1774);
yearPicker.addEventListener("scroll", onScroll);
field.addEventListener("change", onChange);
