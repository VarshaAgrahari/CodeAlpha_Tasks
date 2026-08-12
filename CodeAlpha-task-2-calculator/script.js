// Display ko select kar rahe hain
const display = document.getElementById("display");
const result = document.getElementById("result");

// Saare calculator buttons ko select kar rahe hain
const buttons = document.querySelectorAll(".buttons button");


// Current calculation
let expression = "";


// =====================================
// BUTTON CLICK
// =====================================

buttons.forEach(function (button) {

    button.addEventListener("click", function () {

        const value = button.textContent.trim();

        // AC button
        if (button.classList.contains("clear")) {
            clearCalculator();
            return;
        }


        // DEL button
        if (button.classList.contains("delete")) {
            deleteLast();
            return;
        }


        // Equal button
        if (button.classList.contains("equal")) {
            calculateResult();
            return;
        }


        // Percentage
        if (value === "%") {
            calculatePercentage();
            return;
        }


        // Normal number/operator
        addValue(value);
    });

});


// =====================================
// ADD VALUE
// =====================================

function addValue(value) {

    // Agar previous result ke baad number press kiya
    // to naya calculation start hoga
    if (display.dataset.result === "true" && !isOperator(value)) {
        expression = "";
        display.dataset.result = "false";
    }


    // Starting me operator nahi lagne denge
    if (
        expression === "" &&
        ["+", "-", "*", "/"].includes(value)
    ) {
        return;
    }


    // Do operators continuously nahi aayenge
    if (
        isOperator(value) &&
        isOperator(expression.slice(-1))
    ) {
        expression = expression.slice(0, -1);
    }


    // Ek number me multiple decimal nahi hone denge
    if (value === ".") {

        const parts = expression.split(/[\+\-\*\/]/);

        const currentNumber = parts[parts.length - 1];

        if (currentNumber.includes(".")) {
            return;
        }
    }


    expression += value;

    display.value = expression;


try{
    const liveResult = Function(
        `"use strict"; return (${expression})`
    )();

    if (Number.isFinite(liveResult)){
        const roundedResult = 
        Number(liveResult.toFixed(10));
        result.textContent = roundedResult;
    }
}

catch (error) {
    result.textContent = "";
}

}


// =====================================
// CHECK OPERATOR
// =====================================

function isOperator(value) {

    return ["+", "-", "*", "/"].includes(value);

}


// =====================================
// CLEAR
// =====================================

function clearCalculator() {

    expression = "";

    display.value = "0";

    result.textContent = "";

    display.dataset.result = "false";
}


// =====================================
// DELETE LAST CHARACTER
// =====================================

/*function deleteLast() {

    if (display.dataset.result === "true") {
        clearCalculator();
        return;
    }


    expression = expression.slice(0, -1);


    if (expression === "") {
        display.value = "0";
    } else {
        display.value = expression;
    }
} */

function deleteLast(){
    if (display.dataset.result === "true"){
        display.value = "0";

        display.textContent = "";

        display.dataset.result = "false";

        expression = "";

        return ;
    }

    expression = expression.slice(0,-1);

    if(expression === ""){
        display.value = "0";
    } else {
        display.value = expression;
    }

    result.textContent = "";
} 


// =====================================
// CALCULATE RESULT
// =====================================

function calculateResult() {

    if (expression === "") {
        return;
    }


    // Agar last character operator hai
    if (isOperator(expression.slice(-1))) {
        expression = expression.slice(0, -1);
    }


    try {

        let result = Function(
            `"use strict"; return (${expression})`
        )();

        result = Number(result.toFixed(10));


        if (!Number.isFinite(result)) {
            throw new Error("Invalid calculation");
        }


        // Long decimal ko control karna
        const formattedResult =
            Number(result.toFixed(10));

        display.value = formattedResult;
        result.textContent = "";

        expression = String(formattedResult);

        display.dataset.result = "true";

    }

    catch (error) {

        display.value = "Error";

        expression = "";

        display.dataset.result = "true";
    }
}


// =====================================
// PERCENTAGE
// =====================================

function calculatePercentage() {

    if (expression === "") {
        return;
    }


    try {

        const result = Function(
            `"use strict"; return (${expression})`
        )();


        const percentage = result / 100;


        display.value = percentage;

        expression = String(percentage);

        display.dataset.result = "true";

    }

    catch (error) {

        display.value = "Error";

        expression = "";

        display.dataset.result = "true";
    }
}


// =====================================
// KEYBOARD SUPPORT
// =====================================

document.addEventListener("keydown", function (event) {

    const key = event.key;


    // Numbers
    if (key >= "0" && key <= "9") {

        addValue(key);

        return;
    }


    // Decimal
    if (key === ".") {

        addValue(".");

        return;
    }


    // Operators
    if (["+", "-", "*", "/"].includes(key)) {

        addValue(key);

        return;
    }


    // Percentage
    if (key === "%") {

        calculatePercentage();

        return;
    }


    // Enter = Calculate
    if (key === "Enter" || key === "=") {

        event.preventDefault();

        calculateResult();

        return;
    }


    // Backspace = Delete
    if (key === "Backspace") {

        deleteLast();

        return;
    }


    // Escape = Clear
    if (key === "Escape") {

        clearCalculator();

        return;
    }

});
