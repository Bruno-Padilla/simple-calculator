/* - - - HTML ELEMENTS - - - */
const screen = document.querySelector("#screen");
const specialKeys = document.querySelector("#keypad #special-keys");
const numberKeys = document.querySelector("#keypad #numbers");
const operatorKeys = document.querySelector("#keypad #operators");


/* - - - INIT - - - */
let state = "off";
// disableButtons();


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
    if (keyPressed >= "0" && keyPressed <= "9") {
        // Get the text on the screen
        const screenText = screen.textContent;

        // Add the selected number to the screen
        if (screenText.length === 1 && screenText === "0") {
            screen.textContent = keyPressed;
        } else {
            screen.textContent += keyPressed;
        }
    }
});

// Listener for the operator keys
operatorKeys.addEventListener("click", (e) => {
    alert(e.target.id);
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