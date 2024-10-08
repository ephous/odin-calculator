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
  console.log(a, op, b)
;  switch (op) {
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
let evaluated;
let makeNextNumberNegative;

const display = document.querySelector("#display");

function clearData() {
  firstNumber = null;
  secondNumber = null;
  op = null;
  decimalInUse = false;
  lastEntryWasOp = true;
  makeNextNumberNegative = false;
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
    evaluated = true;
    try {
      secondNumber = secondNumber ?? firstNumber;
      let retVal = operate(firstNumber, op, secondNumber);
      let dispVal = String(retVal);
      display.textContent = dispVal.slice(0, 8); // arbitray
      
      // allow for chaining ops...
      firstNumber = retVal;
      
      return;
      
    } catch {
        
      display.textContent = "Error";
      return;
      
    }
  }
  
  if (e.target.id == "flipsign") {
    if (evaluated) {
        firstNumber = -1*firstNumber;
        dispVal = String(firstNumber);
    } else if ( (firstNumber===null) || (lastEntryWasOp)){
        makeNextNumberNegative = makeNextNumberNegative ? false : true;
        dispVal = makeNextNumberNegative ? "-0" : "0";
    } else if (secondNumber===null) {
        firstNumber = -1*firstNumber;
        dispVal = String(firstNumber);
    } else {
        secondNumber = -1*secondNumber;
        dispVal = String(secondNumber);
    }
    
    display.textContent = dispVal;
    return;
  }

  if (e.target.id == "percent") {
    if (firstNumber===null) {
        return;
    }
    
    if (lastEntryWasOp) {
        if (secondNumber===null) {
          secondNumber = firstNumber/100;
          dispVal = String(secondNumber);
        } else {
          secondNumber = secondNumber/100;
          dispVal = String(secondNumber);  
        }
    } else {
        firstNumber = firstNumber/100;
        dispVal = String(firstNumber);
    }
    
    display.textContent = dispVal;
    return;
  }

  // store operator and leave display as-is
  // overwrites stored operator (if any)
  // uses firstNumber as 0 if display is showing 0
  if (e.target.className.includes("operation")) {
    evaluated = false;
    lastEntryWasOp = true;
    e.target.className = 'operation-pressed'
    firstNumber = firstNumber ?? 0;
    op = e.target.id;
    return;
  }

  if (s == ".") {
    if (decimalInUse) return;
    decimalInUse = true;
    display.textContent = lastEntryWasOp ? '0.' : display.textContent + s;
    return;
  } else {
    display.textContent = lastEntryWasOp || display.textContent[0] == 0 ? s : display.textContent + s;
    //return;
    /*
    if (!decimalInUse && display.textContent[0] == 0) {
      display.textContent = s;
    } else {
      display.textContent = display.textContent + s;
    }
    */
  }

  let sgn = makeNextNumberNegative ? -1 : 1
  if (evaluated) {
    evaluated = false;
    firstNumber = sgn * Number(display.textContent);
    dispVal = String(firstNumber);   
  } else if (!op) {
    firstNumber = sgn * Number(display.textContent);
    dispVal = String(firstNumber);
  } else {
    secondNumber = sgn * Number(display.textContent);
    dispVal = String(secondNumber); 
  }
  display.textContent = dispVal;
  makeNextNumberNegative = false;
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