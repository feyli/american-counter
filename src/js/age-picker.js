const agePicker = document.querySelector(".age-picker");
const initialAge = 500;
const ageField = document.querySelector("#ageField");

const generateValues = (start, end) => {
  if (start < 0) start = 0;
  const fragment = document.createDocumentFragment();
  for (let element = start; element <= end; element++) {
    const li = document.createElement("li");
    li.textContent = element;
    fragment.appendChild(li);
  }
  return fragment;
};

const addValuesToStart = (fragment) => {
  agePicker.prepend(fragment);
};

const addValuesToEnd = (fragment) => {
  agePicker.appendChild(fragment);
};

const updateValuesAround = () => {
  const selectedValue = getSelectedAge().textContent;
  const elements = document.querySelectorAll(".age-picker li");
  elements.forEach((element) => {
    const value = parseInt(element.textContent);
    if (Math.abs(value - selectedValue) > 500) {
      element.remove();
    }
  });
};

const onAgeScroll = () => {
  const lastValue = parseInt(agePicker.lastElementChild.textContent);
  const scrollTop = agePicker.scrollTop;
  const scrollHeight = agePicker.scrollHeight;

  if (scrollTop + agePicker.clientHeight === scrollHeight) {
    addValuesToEnd(generateValues(lastValue + 1, lastValue + 500));
  }

  const elements = document.querySelectorAll(".age-picker li");
  const selected = getSelectedAge();
  elements.forEach((element) => element.classList.remove("selected"));
  selected.classList.add("selected");
  ageField.value = selected.textContent;
  updateValuesAround();
};

const onAgeChange = () => {
  const newAge = parseInt(ageField.value);
  agePicker.innerHTML = "";
  addValuesToEnd(generateValues(newAge - 500, newAge + 500));
  const elements = document.querySelectorAll(".age-picker li");
  const targetAge = Array.from(elements).find(
    (element) => parseInt(element.textContent) === newAge,
  );
  targetAge.classList.add("selected");
  targetAge.scrollIntoView({ behavior: "instant", block: "center" });
};

const getSelectedAge = () => {
  const elements = document.querySelectorAll(".age-picker li");
  const containerRect = agePicker.getBoundingClientRect();
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

addValuesToStart(generateValues(initialAge - 500, initialAge + 500));
agePicker.addEventListener("scroll", onAgeScroll);
ageField.addEventListener("change", onAgeChange);
