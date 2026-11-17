// Each section follows the same 3 steps:
// Step 1: Find the element on the page.
// Step 2: Write a function (the "event handler") that says what should happen.
// Step 3: Connect them with addEventListener("eventName", handler).


// "click" fires when the user clicks the button.
const clickButton = document.querySelector("#click-button");
const clickOutput = document.querySelector("#click-output");
let clickCount = 0;

function handleClick() {
  clickCount = clickCount + 1;
  clickOutput.textContent = clickCount;
}

clickButton.addEventListener("click", handleClick);


// "input" fires on EVERY keystroke while the user types.
const inputBox = document.querySelector("#input-box");
const inputOutput = document.querySelector("#input-output");

function handleInput() {
  inputOutput.textContent = inputBox.value;
}

inputBox.addEventListener("input", handleInput);


// "change" fires ONCE after the user picks a new option.
const changeSelect = document.querySelector("#change-select");
const changeOutput = document.querySelector("#change-output");

function handleChange() {
  changeOutput.textContent = changeSelect.value;
}

changeSelect.addEventListener("change", handleChange);


// "submit" fires when the form is sent.
// We listen on the FORM (not the button) so pressing Enter also works.
const submitForm = document.querySelector("#submit-form");
const emailInput = document.querySelector("#email");
const submitOutput = document.querySelector("#submit-output");

// "event" is an object the browser gives us with details about what happened.
function handleSubmit(event) {
  // By default, submitting a form reloads the page. preventDefault() stops that so we can handle it with JavaScript instead.
  event.preventDefault();

  submitOutput.textContent = "Thanks g, You submitted: " + emailInput.value;
  submitForm.reset();
}

submitForm.addEventListener("submit", handleSubmit);
