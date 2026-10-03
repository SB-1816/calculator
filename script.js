const display = document.getElementById("display");
const expression = document.getElementById("expression");


// ============================================
// ADD VALUE
// ============================================

function addValue(value) {

    if (display.value === "Error") {
        display.value = "0";
    }

    if (display.value === "0" && value !== ".") {
        display.value = value;
    } 
    else {
        display.value += value;
    }

    expression.innerText = display.value;
}


// ============================================
// CLEAR
// ============================================

function clearAll() {

    display.value = "0";

    expression.innerText = "Ready";
}


// ============================================
// DELETE
// ============================================

function deleteLast() {

    if (display.value === "Error") {
        clearAll();
        return;
    }

    if (display.value.length > 1) {

        display.value =
            display.value.slice(0, -1);

    } 
    else {

        display.value = "0";

    }

    expression.innerText = display.value;
}


// ============================================
// CALCULATE
// ============================================

function calculate() {

    try {

        let exp = display.value;

        let result = eval(exp);

        if (!isFinite(result)) {

            display.value = "Error";

            expression.innerText = "Invalid calculation";

        } 
        else {

            expression.innerText =
                exp + " =";

            display.value =
                formatNumber(result);
        }

    } 
    catch {

        display.value = "Error";

        expression.innerText =
            "Invalid expression";
    }
}


// ============================================
// FORMAT NUMBER
// ============================================

function formatNumber(number) {

    if (!isFinite(number)) {
        return "Error";
    }

    return Number(
        Number(number).toFixed(10)
    );
}


// ============================================
// SQUARE
// ============================================

function square() {

    let number =
        parseFloat(display.value);

    if (isNaN(number)) {
        return;
    }

    let result = number ** 2;

    expression.innerText =
        number + "²";

    display.value =
        formatNumber(result);
}


// ============================================
// SQUARE ROOT
// ============================================

function squareRoot() {

    let number =
        parseFloat(display.value);

    if (isNaN(number) || number < 0) {

        display.value = "Error";

        expression.innerText =
            "Invalid √ operation";

        return;
    }

    let result =
        Math.sqrt(number);

    expression.innerText =
        "√" + number;

    display.value =
        formatNumber(result);
}


// ============================================
// POWER
// ============================================

function power() {

    let base =
        parseFloat(display.value);

    if (isNaN(base)) {
        return;
    }

    let exponent =
        prompt("Enter the power:");

    if (exponent === null) {
        return;
    }

    exponent = Number(exponent);

    if (isNaN(exponent)) {

        display.value = "Error";

        return;
    }

    let result =
        Math.pow(base, exponent);

    expression.innerText =
        base + " ^ " + exponent;

    display.value =
        formatNumber(result);
}


// ============================================
// MODULUS
// ============================================

function modulus() {

    let first =
        parseFloat(display.value);

    if (isNaN(first)) {
        return;
    }

    let second =
        prompt("Enter the second number:");

    if (second === null) {
        return;
    }

    second = Number(second);

    if (isNaN(second) || second === 0) {

        display.value = "Error";

        expression.innerText =
            "Invalid modulus";

        return;
    }

    let result =
        first % second;

    expression.innerText =
        first + " mod " + second;

    display.value =
        formatNumber(result);
}


// ============================================
// PERCENTAGE
// ============================================

function percentage() {

    let number =
        parseFloat(display.value);

    if (isNaN(number)) {
        return;
    }

    let result =
        number / 100;

    expression.innerText =
        number + "%";

    display.value =
        formatNumber(result);
}


// ============================================
// RECIPROCAL
// ============================================

function reciprocal() {

    let number =
        parseFloat(display.value);

    if (isNaN(number) || number === 0) {

        display.value = "Error";

        expression.innerText =
            "Cannot divide by zero";

        return;
    }

    let result =
        1 / number;

    expression.innerText =
        "1 / " + number;

    display.value =
        formatNumber(result);
}


// ============================================
// POSITIVE / NEGATIVE
// ============================================

function negative() {

    let number =
        parseFloat(display.value);

    if (isNaN(number)) {
        return;
    }

    display.value =
        formatNumber(number * -1);

    expression.innerText =
        "+/-";
}


// ============================================
// PI
// ============================================

function pi() {

    display.value =
        Math.PI.toFixed(8);

    expression.innerText =
        "π =";
}


// ============================================
// EULER NUMBER
// ============================================

function euler() {

    display.value =
        Math.E.toFixed(8);

    expression.innerText =
        "e =";
}


// ============================================
// KEYBOARD SUPPORT
// ============================================

document.addEventListener(
    "keydown",
    function(event) {

        const key = event.key;


        // Numbers
        if (
            key >= "0" &&
            key <= "9"
        ) {

            addValue(key);

            animateButton(key);

            return;
        }


        // Operators
        if (
            key === "+" ||
            key === "-" ||
            key === "*" ||
            key === "/"
        ) {

            addValue(key);

            animateButton(key);

            return;
        }


        // Decimal
        if (key === ".") {

            addValue(".");

            animateButton(".");

            return;
        }


        // Parentheses
        if (key === "(" || key === ")") {

            addValue(key);

            return;
        }


        // ENTER
        if (
            key === "Enter" ||
            key === "="
        ) {

            event.preventDefault();

            calculate();

            animateButton("Enter");

            return;
        }


        // BACKSPACE
        if (key === "Backspace") {

            deleteLast();

            animateButton("Backspace");

            return;
        }


        // ESCAPE
        if (key === "Escape") {

            clearAll();

            animateButton("Escape");

            return;
        }


        // Percentage
        if (key === "%") {

            percentage();

            return;
        }

    }
);


// ============================================
// KEYBOARD BUTTON ANIMATION
// ============================================

function animateButton(key) {

    const buttons =
        document.querySelectorAll("button");

    buttons.forEach(button => {

        let text =
            button.innerText.trim();

        let match = false;


        if (
            text === key ||
            (key === "*" && text === "×") ||
            (key === "/" && text === "÷") ||
            (key === "-" && text === "−") ||
            (key === "Enter" && text === "=")
        ) {

            match = true;
        }


        if (match) {

            button.classList.add("active");

            setTimeout(() => {

                button.classList.remove("active");

            }, 120);

        }

    });
}


// ============================================
// PREVENT UNWANTED KEYS
// ============================================

display.addEventListener(
    "keydown",
    function(event) {

        event.preventDefault();

    }
);