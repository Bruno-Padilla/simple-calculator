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
    specialKeysKeypadAction(e.target.id);
});

// Listener for the number keys
numberKeys.addEventListener("click", (e) => {
    numbersKeypadAction(e.target.id);
});

// Listener for the operator keys
operatorKeys.addEventListener("click", (e) => {
    operatorsKeypadAction(e.target.id);
});

// Listener for the computer physical keyboard
window.addEventListener("keydown", (e) => {
    // Get the key pressed
    const keyPressed = e.key;

    // Return if presses tab
    if (keyPressed === "Tab") e.preventDefault();

    // Special keys actions
    if (keyPressed === "Delete") clear(); // "Supr" for clear the screen and memory
    else if (keyPressed === "Escape") changeState(); // "Esc" for on/off
    else if (keyPressed === "Backspace") specialKeysKeypadAction("delete"); // Backspace for delete

    // Numeric keys actions
    else if ((keyPressed >= "0" && keyPressed <= "9") || (keyPressed == ".")) numbersKeypadAction(keyPressed); // Numeric keypad
    else if (keyPressed == "Enter" || keyPressed == "=") numbersKeypadAction("="); // Enter for =
    
    // Operator keys actions
    else if (keyPressed == "+" || keyPressed == "-" || keyPressed == "*" || keyPressed == "/" || keyPressed == "%") operatorsKeypadAction(keyPressed);
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

// Function to do something when pressing a key on the numbers keypad
function numbersKeypadAction(keyPressed) {
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
        screen.textContent = operand.toFixed(2);
        operand = 0;
        operator = null;
        equalJustClicked = true;
    }

    // If we select the . button
    else if (keyPressed === ".") {
        // Get the text on the screen
        const screenText = screen.textContent;

        // Check if theres a number on the screen
        if (isNaN(screenText) || screenText.includes(".")) return

        // Add the . to the number
        screen.textContent += ".";
    }
}

// Function to do something when pressing a key on the special keys keypad
function specialKeysKeypadAction(keyPressed) {
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
}

// Function to do something when pressing a key on the operators keypad
function operatorsKeypadAction(keyPressed) {
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
}