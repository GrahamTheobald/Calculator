import { Calculator } from "./calculator.js";

// update primary display

const primaryDisplay = document.querySelector(".primary");
const secondaryDisplay = document.querySelector(".secondary");

const inputButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const clearButton = document.querySelector('[data-value="clear"]');
const deleteButton = document.querySelector('[data-value="delete"]');
const equalsButton = document.querySelector('[data-value="="]');
const negButton = document.querySelector("[data-neg]");

const calculator = new Calculator(primaryDisplay, secondaryDisplay);
calculator.populateDisplays();

inputButtons.forEach((element) =>
  element.addEventListener("click", (e) => {
    calculator.numberButton(e.target.dataset.value);
  })
);

operatorButtons.forEach((element) =>
  element.addEventListener("click", (e) => {
    calculator.operatorButton(e.target.dataset.value);
  })
);

clearButton.addEventListener("click", () => calculator.clearButton(true));
deleteButton.addEventListener("click", () => calculator.deleteButton());
equalsButton.addEventListener("click", () => calculator.equalsButton());
negButton.addEventListener("click", () => calculator.negButton());
