/* - - - HTML ELEMENTS - - - */
const screen = document.querySelector("#screen");
const specialKeys = document.querySelector("#keypad #special-keys");
const numberKeys = document.querySelector("#keypad #numbers");
const operatorKeys = document.querySelector("#keypad #operators");


/* - - - GLOBAL VARIABLES - - - */
let state = "off";


/* - - - LISTENERS - - - */

// Listener for the special keys
specialKeys.addEventListener("click", (e) => {
    const keyPressed = e.target.id;

    switch (keyPressed) {
        case "on-off":
            changeState();
            break;

        case "delete":
            deleteLastCharacter();
            break;
        
        case "clear":
            clear();
            break;
    }
});

// Listener for the number keys
numberKeys.addEventListener("click", (e) => {
    alert(e.target.id);
});

// Listener for the operator keys
operatorKeys.addEventListener("click", (e) => {
    alert(e.target.id);
});


/* - - - FUNCTIONS - - - */
// Function to change between states (on - off)
function changeState() {
    if (state == "off") {
        state = "on";
        enableButtons();
        screen.textContent = "0";
    }

    else if (state == "on") {
        state = "off";
        disableButtons();
        screen.textContent = "";
    }
}

// Function to enable all the buttons but on-off
function enableButtons() {
    const DOMbuttons = document.querySelectorAll("button");
    for (let btn of DOMbuttons) {
        btn.disabled = false;
    }
}

// Function to disable all the buttons but on-off
function disableButtons() {
    const DOMbuttons = document.querySelectorAll("button");
    for (let btn of DOMbuttons) {
        if (btn.id != "on-off") btn.disabled = true;
    }
}

// Function to clear the screen and reset the operantor and operand values
function clear() {
    screen.textContent = "0";
}

// Function to delete the last character on the screen
function deleteLastCharacter() {
    const screenText = screen.textContent;

    if (screenText.length > 1) {
        screen.textContent = screenText.slice(0, screenText.length-1);
    }

    else {
        screen.textContent = "0";
    }
}