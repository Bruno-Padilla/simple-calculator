/* - - - HTML ELEMENTS - - - */
const screen = document.querySelector("#screen");
const specialKeys = document.querySelector("#keypad #special-keys");
const numberKeys = document.querySelector("#keypad #numbers");
const operatorKeys = document.querySelector("#keypad #operators");


/* - - - INIT - - - */
let state = "off";
let operand = 0;
let operator = null;
let equalJustClicked = false;
disableButtons();


/* - - - LISTENERS - - - */

// Listener for the special keys
specialKeys.addEventListener("click", (e) => {
    // Get the key pressed
    const keyPressed = e.target.id;

    // Do something according to the pressed key
    switch (keyPressed) {
        // Change the calculator state (on / off)
        case "on-off":
            changeState();
            break;

        // Delete the last character on the calculator screen
        case "delete":
            deleteLastCharacter();
            break;
        
        // Clear the screen and memory from the calculator
        case "clear":
            clear();
            break;
    }
});

// Listener for the number keys
numberKeys.addEventListener("click", (e) => {
    // Get the pressed key
    const keyPressed = e.target.id;
    
    // If we select a numeric button
    if (!isNaN(keyPressed)) {
        // Get the text on the screen
        const screenText = screen.textContent;

        // Else add the selected number to the screen
        if (screenText === "0" || equalJustClicked) {
            screen.textContent = keyPressed;
            equalJustClicked = false;
        } else if (!isNaN(screenText)) {
            screen.textContent += keyPressed;
        } else {
            screen.textContent = keyPressed;
        }
    }

    // If we select the = button
    else if (keyPressed === "=") {
        // If there are no operators setted yet and the operand is on the screen
        if (operator === null) {
            operand = +screen.textContent;
        }
        
        // If there is a number on the screen evaluate the expression
        else if (!isNaN(screen.textContent)) {
            operand = evaluateExpression();
        }

        // Show the operand on the screen and reset the operator
        screen.textContent = operand;
        operand = 0;
        operator = null;
        equalJustClicked = true;
    }
});

// Listener for the operator keys
operatorKeys.addEventListener("click", (e) => {
    // Get the pressed key
    const keyPressed = e.target.id;
    if (keyPressed === "operators") return

    // Get the screen text
    const screenText = screen.textContent;

    // If theres a number on the screen, save the operand
    if (!isNaN(screenText)) {
        operand = (operator !== null ? evaluateExpression() : +screenText);
    }

    // Save an show the selected operator
    operator = keyPressed;
    screen.textContent = operator;
});


/* - - - FUNCTIONS - - - */

// Function to change between states (on - off)
function changeState() {
    // Turn on the calculator if it was turned off
    if (state == "off") {
        state = "on";
        enableButtons();
        screen.textContent = "0";
    }

    // Turn off the calculator if it was turned on
    else if (state == "on") {
        state = "off";
        disableButtons();
        screen.textContent = "";
    }
}

// Function to enable all the buttons but on-off
function enableButtons() {
    // Get a node-list from all the buttons on the calculator
    const DOMbuttons = document.querySelectorAll("button");

    // Enable all buttons
    for (let btn of DOMbuttons) {
        btn.disabled = false;
    }
}

// Function to disable all the buttons but on-off
function disableButtons() {
    // Get a node-list from all the buttons on the calculator
    const DOMbuttons = document.querySelectorAll("button");

    // Disable all buttons
    for (let btn of DOMbuttons) {
        if (btn.id != "on-off") btn.disabled = true;
    }
}

// Function to clear the screen and reset the operantor and operand values
function clear() {
    // Clear the screen (shows a "0")
    screen.textContent = "0";

    // Clear the calculator memory
    operand = 0;
    operator = null;
}

// Function to delete the last character on the screen
function deleteLastCharacter() {
    // Get the text on the screen
    const screenText = screen.textContent;

    // Delete the last character on the screen 
    screen.textContent = screenText.slice(0, screenText.length-1);

    // Shows 0 if the deleted character was the only one on the screen
    if (screen.textContent.length === 0) screen.textContent = "0";

}

// Function to evalate an expression
function evaluateExpression() {
    switch (operator) {
        case "+":
            return operand + +screen.textContent;
            break;
        
        case "-":
            return operand - screen.textContent;
            break;
        
        case "*":
            return operand * screen.textContent;
            break;
        
        case "/":
            return operand / screen.textContent;
            break;
        
        case "%":
            return operand % screen.textContent;
            break;
    }
}