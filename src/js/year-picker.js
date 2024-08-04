const yearPicker = document.querySelector(".year-picker");
const initialYear = 1776;
const yearField = document.querySelector("#yearField");

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
  const selectedYear = getSelectedYear().textContent;
  const elements = document.querySelectorAll(".year-picker li");
  elements.forEach((element) => {
    const year = parseInt(element.textContent);
    if (Math.abs(year - selectedYear) > 500) {
      element.remove();
    }
  });
};

const onYearScroll = () => {
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

  const elements = document.querySelectorAll(".year-picker li");
  const selected = getSelectedYear();
  elements.forEach((element) => element.classList.remove("selected"));
  selected.classList.add("selected");
  yearField.value = selected.textContent;
  updateYearsAround();
};

const onYearChange = () => {
  const newYear = parseInt(yearField.value);
  yearPicker.innerHTML = "";
  addYearsToEnd(generateYears(newYear - 500, newYear + 500));
  const elements = document.querySelectorAll(".year-picker li");
  const targetYear = Array.from(elements).find(
    (element) => parseInt(element.textContent) === newYear,
  );
  targetYear.classList.add("selected");
  targetYear.scrollIntoView({ behavior: "instant", block: "center" });
};

const getSelectedYear = () => {
  const elements = document.querySelectorAll(".year-picker li");
  const containerRect = yearPicker.getBoundingClientRect();
  // noinspection DuplicatedCode
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

addYearsToStart(generateYears(initialYear - 500, initialYear + 500));
yearPicker.scrollTop =
  yearPicker.scrollHeight / 2 - yearPicker.clientHeight / 2;
yearPicker.addEventListener("scroll", onYearScroll);
yearField.addEventListener("change", onYearChange);