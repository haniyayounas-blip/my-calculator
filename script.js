
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

let currentInput = "0";
let previousInput = null;
let operator = null;
let shouldResetScreen = false;

function updateDisplay() {
    display.value = currentInput;
}

function calculate() {

    const secondInput = Number(currentInput);

    let result;

    if (operator === "+") {
        result = previousInput + secondInput;
    }

    else if (operator === "-") {
        result = previousInput - secondInput;
    }

    else if (operator === "*") {
        result = previousInput * secondInput;
    }

    else if (operator === "/") {
        if (secondInput === 0) {
            return null;
        }

        result = previousInput / secondInput;
    }

    return result;
}

buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        const value = button.textContent;

        // Numbers and decimal point
        if ("0123456789.".includes(value)) {

            if (shouldResetScreen) {
                currentInput = "0";
                shouldResetScreen = false;
            }

            if (value === "." && currentInput.includes(".")) {
                return;
            }

            if (currentInput === "0" && value !== ".") {
                currentInput = value;
            } else {
                currentInput += value;
            }

            updateDisplay();
            return;
        }

        // Clear button
        if (value === "C") {
            currentInput = "0";
            previousInput = null;
            operator = null;
            shouldResetScreen = false;
            updateDisplay();
            return;
        }

        // Delete button
        if (value === "DEL") {
            if (shouldResetScreen) {
                currentInput = "0";
                shouldResetScreen = false;
            } else {
                currentInput = currentInput.slice(0, -1);

                if (currentInput === "" || currentInput === "-") {
                    currentInput = "0";
                }
            }

            updateDisplay();
            return;
        }

        // Operator buttons
        if (["+", "-", "*", "/"].includes(value)) {

            if (previousInput !== null && operator !== null
                && !shouldResetScreen) {

                const result = calculate();

                if (result === null) {
                    currentInput = "Error";
                    previousInput = null;
                    operator = null;
                    shouldResetScreen = true;
                    updateDisplay();
                    return;
                }

                currentInput = String(result);
            }

            previousInput = Number(currentInput);
            operator = value;
            shouldResetScreen = true;
            updateDisplay();
            return;
        }

        // Equals button
        if (value === "=" && operator !== null
            && previousInput !== null) {

            const result = calculate();

            if (result === null) {
                currentInput = "Error";
            } else {
                currentInput = String(result);
            }

            previousInput = null;
            operator = null;
            shouldResetScreen = true;
            updateDisplay();
        }

    });

});
