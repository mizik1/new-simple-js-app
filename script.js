// add function
function add(number1, number2) {
  return number1 + number2;
}

// subtract function
function subtract(number1, number2) {
  return number1 - number2;
}

// multiply function
function multiply(number1, number2) {
  return number1 * number2;
}

// divide function
function divide(number1, number2) {
  if (number1 === 0 || number2 === 0) {
    return "Not Allowed";
  } else {
    let result = number1 / number2;
    return result;
  }
}
