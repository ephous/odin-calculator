function addNumbers(a, b) {
  return a + b;
}

function subtractNumbers(a, b) {
  return a - b;
}

function multiplyNumbers(a, b) {
  return a * b;
}

function divideNumbers(a, b) {
  if (b == 0) throw "Division by zero";
  return a / b;
}

function operate(a, op, b) {
  //debugger;
  switch (op) {
    case "add":
      return addNumbers(a, b);
      break;
    case "subtract":
      return subtractNumbers(a, b);
      break;
    case "multiply":
      return multiplyNumbers(a, b);
      break;
    case "divide":
      return divideNumbers(a, b);
      break;
    default:
      return a ?? 0;
  }
}

let firstNumber;
let secondNumber;
let op;
let decimalInUse;
let lastEntryWasOp;

const display = document.querySelector("#display");

function clearData() {
  firstNumber = null;
  secondNumber = null;
  op = null;
  decimalInUse = false;
  lastEntryWasOp = true;
}

function restoreOpButtonClasses() {
    operations.forEach( x => x.className='operation')}

function allClear() {
  display.textContent = "0";
  restoreOpButtonClasses();
  clearData();
  return;
}

function updateDisplay(e) {
  const s = e.target.textContent;

  // clear display
  if (s == "AC") return allClear();
  
  // restore button colors
  restoreOpButtonClasses();

  // handle equals
  if (e.target.id == "equals") {
    lastEntryWasOp = true;
    try {
      let retVal = operate(firstNumber, op, secondNumber);
      let dispVal = String(retVal);
      display.textContent = dispVal.slice(0, 8); // arbitray
      
      // allow for chaining ops...
      firstNumber = retVal;
      op = null;
      secondNumber = null;

      //clearData();
      return;
    } catch {
      display.textContent = "Error";
      return;
    }
  }

  // store operator and leave display as-is
  // overwrites stored operator (if any)
  // uses firstNumber as 0 if display is showing 0
  if (e.target.className.includes("operation")) {
    e.target.className = 'operation-pressed'
    lastEntryWasOp = true;
    firstNumber = firstNumber ?? 0;
    op = e.target.id;
    return;
  }

  if (s == ".") {
    if (decimalInUse) return;
    decimalInUse = true;
    display.textContent = lastEntryWasOp ? '0.' : display.textContent + s;
  } else {
    display.textContent = lastEntryWasOp || display.textContent[0] == 0 ? s : display.textContent + s;
    /*
    if (!decimalInUse && display.textContent[0] == 0) {
      display.textContent = s;
    } else {
      display.textContent = display.textContent + s;
    }
    */
  }

  lastEntryType = "number";
  if (!op) {
    firstNumber = Number(display.textContent);
  } else {
    secondNumber = Number(display.textContent);
  }
  lastEntryWasOp = false;
}

const buttons = document.querySelectorAll("button");
buttons.forEach((x) => x.addEventListener("click", (e) => updateDisplay(e)));

const operations = document.querySelectorAll(".operation");
/*
operations.forEach((x) => x.addEventListener(
    "click", (e) => e.target.className = 'operation-pressed' )
);
*/

allClear(); //call on startup