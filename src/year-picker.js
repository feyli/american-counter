const yearPicker = document.getElementById("yearPicker");
const initialYear = 1776;
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

const addYearsToStart = (fragment) => {
  yearPicker.prepend(fragment);
};

const addYearsToEnd = (fragment) => {
  yearPicker.appendChild(fragment);
};

const updateYearsAround = () => {
  const selectedYear = getCurrentlySelected().textContent;
  const elements = document.querySelectorAll(".year-picker-container li");
  elements.forEach((element) => {
    const year = parseInt(element.textContent);
    if (Math.abs(year - selectedYear) > 1000) {
      element.remove();
    }
  });
};

const onScroll = () => {
  const firstYear = parseInt(yearPicker.firstElementChild.textContent);
  const lastYear = parseInt(yearPicker.lastElementChild.textContent);
  const scrollTop = yearPicker.scrollTop;
  const scrollHeight = yearPicker.scrollHeight;

  if (scrollTop === 0) {
    const oldHeight = scrollHeight;
    addYearsToStart(generateYears(firstYear - 500, firstYear - 1));
    yearPicker.scrollTop = yearPicker.scrollHeight - oldHeight;
  }

  if (scrollTop + yearPicker.clientHeight === scrollHeight) {
    addYearsToEnd(generateYears(lastYear + 1, lastYear + 500));
  }

  const elements = document.querySelectorAll(".year-picker-container li");
  const selected = getCurrentlySelected();
  elements.forEach((element) => element.classList.remove("selected"));
  selected.classList.add("selected");
  field.value = selected.textContent;
  updateYearsAround();
};

const onChange = () => {
  // stop process if another keystroke within 500ms
  clearTimeout(onChange.timeout);
  onChange.timeout = setTimeout(() => {
    const newYear = parseInt(field.value);
    yearPicker.innerHTML = "";
    addYearsToEnd(generateYears(newYear - 1000, newYear + 1000));
    const elements = document.querySelectorAll(".year-picker-container li");
    const targetYear = Array.from(elements).find(
      (element) => parseInt(element.textContent) === newYear,
    );
    targetYear.classList.add("selected");
    targetYear.scrollIntoView({ behavior: "instant", block: "center" });
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

addYearsToStart(generateYears(initialYear - 1000, initialYear + 1000));
yearPicker.scrollTop =
  yearPicker.scrollHeight / 2 - yearPicker.clientHeight / 2;
yearPicker.addEventListener("scroll", onScroll);
field.addEventListener("change", onChange);
