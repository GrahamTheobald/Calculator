export class Calculator {
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
