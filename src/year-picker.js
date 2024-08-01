const yearPicker = document.getElementById("yearPicker");
let startYear = new Date().getFullYear() - 500;
let endYear = new Date().getFullYear();

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
  elements.forEach(element => element.classList.remove("selected"));
  selected.classList.add("selected");
};

const getCurrentlySelected = () => {
  const elements = document.querySelectorAll(".year-picker-container li");
  const containerRect = yearPicker.getBoundingClientRect();
  let closestElement = null;
  let closestDistance = Number.POSITIVE_INFINITY;

  elements.forEach(element => {
    const rect = element.getBoundingClientRect();
    const distance = Math.abs(containerRect.top + containerRect.height / 2 - (rect.top + rect.height / 2));
    if (distance < closestDistance) {
      closestDistance = distance;
      closestElement = element;
    }
  });

  return closestElement;
};

yearPicker.appendChild(generateYears(startYear, endYear));
yearPicker.scrollTop = yearPicker.scrollHeight;
yearPicker.addEventListener("scroll", onScroll);
