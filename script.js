class Calculator {
  primaryDisplayValue = "0";
  secondaryDisplayValue = "";

  #firstOperand = null;
  #secondOperand = null;
  #operator = null;
  #answer = null;
  #answerState = false;

  constructor(primaryDisplay, secondaryDisplay) {
    this.primaryDisplay = primaryDisplay;
    this.secondaryDisplay = secondaryDisplay;
  }

  numberButton(n) {
    if (this.primaryDisplayValue.includes(".") && n == ".") return;
    if ((this.primaryDisplayValue === "0" && n != ".") || this.#answerState) {
      this.primaryDisplayValue = n;
      this.populateDisplays();
      this.#answerState = false;
      return;
    }

    this.primaryDisplayValue += n;
    this.populateDisplays();
  }

  deleteButton() {
    if (this.primaryDisplayValue.length == 1) {
      this.primaryDisplayValue = "0";
      this.primaryDisplay.innerText = this.primaryDisplayValue;
      return;
    }
    this.primaryDisplayValue = this.primaryDisplayValue.slice(0, -1);
    this.primaryDisplay.innerText = this.primaryDisplayValue;
  }

  operatorButton(o) {
    if (!this.#firstOperand) {
      this.#firstOperand = this.primaryDisplayValue;
      this.#operator = o;
      this.primaryDisplayValue = "0";
      this.populateDisplays();
      return;
    }
    this.equalsButton();
    this.#firstOperand = this.#answer;
    this.#operator = o;
    this.populateDisplays();
  }

  equalsButton() {
    if (this.#answerState || !this.#operator) return;
    this.#secondOperand = this.primaryDisplayValue;
    this.#answer = this.calc();
    this.primaryDisplayValue = this.#answer.toString();
    this.populateDisplays();
    this.clearOperands();
    this.#answerState = true;
  }

  clearButton() {
    this.clearOperands();
    this.#answer = null;
    this.primaryDisplayValue = "0";
    this.populateDisplays();
  }

  negButton() {
    if (this.primaryDisplayValue === "-") return;
    if (this.primaryDisplayValue === "0") {
      this.primaryDisplayValue = "-";
      this.populateDisplays();
      return;
    }
    if (this.#answerState) {
      this.clearOperands();
      this.primaryDisplayValue = "-";
      this.populateDisplays();
      this.#answerState = false;
      return;
    }
    this.primaryDisplayValue = (this.primaryDisplayValue * -1).toString();
    this.populateDisplays();
  }

  clearOperands() {
    this.#firstOperand = null;
    this.#operator = null;
    this.#secondOperand = null;
  }

  calc() {
    switch (this.#operator) {
      case "+":
        return parseFloat(this.#firstOperand) + parseFloat(this.#secondOperand);
      case "-":
        return parseFloat(this.#firstOperand) - parseFloat(this.#secondOperand);
      case "x":
        return parseFloat(this.#firstOperand) * parseFloat(this.#secondOperand);
      case "÷":
        return parseFloat(this.#firstOperand) / parseFloat(this.#secondOperand);
      default:
        break;
    }
  }

  #updateSecondaryDisplay() {
    this.secondaryDisplayValue = "";
    if (this.#firstOperand)
      this.secondaryDisplayValue = `${this.#firstOperand} `;
    if (this.#operator) this.secondaryDisplayValue += `${this.#operator} `;
    if (this.#secondOperand)
      this.secondaryDisplayValue += `${this.#secondOperand} =`;
  }

  populateDisplays() {
    this.#updateSecondaryDisplay();
    this.primaryDisplay.innerText = this.primaryDisplayValue;
    this.secondaryDisplay.innerText = this.secondaryDisplayValue;
  }
}

// update primary display

const primaryDisplay = document.querySelector(".primary");
const secondaryDisplay = document.querySelector(".secondary");

const inputButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const clearButton = document.querySelector('[data-value="clear"]');
const deleteButton = document.querySelector('[data-value="delete"]');
const equalsButton = document.querySelector('[data-value="="]');
const negButton = document.querySelector("[data-neg]");

console.log(negButton);

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
