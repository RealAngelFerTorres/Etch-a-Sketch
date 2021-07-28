// Creates default 16x16 blank cells grid
let gridContainer = document.getElementsByClassName("gridContainer")[0];

for (let i = 0; i < 256; i++) {
    let div = document.createElement('div');
    div.classList.add(i);
    div.classList.add("cell");
    gridContainer.appendChild(div);
}

// Adds event listeners to every cell
let cells = document.getElementsByClassName("cell");
for (let cell of cells) {
    cell.addEventListener("mousemove", mouseHover)
}

// Starts with classic (blackCell) mode by default
let mode = 'blackCell'

// Prepare buttons with listeners to change mode/reset
resetButton = document.getElementById("resetButton");
resetButton = resetButton.addEventListener("click", resetGrid);

classicButton = document.getElementById("classicButton");
classicButton = classicButton.addEventListener("click", () => mode = 'blackCell');

eraserButton = document.getElementById("eraserButton");
eraserButton = eraserButton.addEventListener("click", () => mode = 'whiteCell');

modernButton = document.getElementById("modernButton");
modernButton = modernButton.addEventListener("click", () => mode = 'modernCell');

rainbowButton = document.getElementById("rainbowButton");
rainbowButton = rainbowButton.addEventListener("click", () => mode = 'rainbowCell');

// If mouse hovers a cell, add new class depending the selected mode
function mouseHover(e) {
    e.preventDefault();
    oldMode = e.target.classList[2];
    if (!oldMode) {
        if (mode == 'rainbowCell') {
            e.target.classList.add(`rainbowCell${Math.floor(Math.random() * 7)}`);
        } else if (mode == 'modernCell') {
            e.target.classList.add("modernCell0");
        } else {
            e.target.classList.add(mode);
        }
    } else {
        let oldModeChecker = oldMode.replace(/[0-9]/g, '');
        if (mode != oldModeChecker) {
            if (mode == 'rainbowCell') {
                e.target.classList.replace(oldMode, `rainbowCell${Math.floor(Math.random() * 7)}`);
            } else if (mode == 'modernCell') {
                e.target.classList.replace(oldMode, "modernCell0");
            }else {
                e.target.classList.replace(oldMode, mode);
            }
        // DOING: modern mode
        } else if (mode == 'modernCell') {
            console.log(oldMode);
            let number = parseInt(oldMode[10]);
            console.log("Despues de parsear:", oldMode);
            number += 1;
            e.target.classList.replace(oldMode, `modernCell${number}`);
        }
    }
}

// Reset the grid
function resetGrid() {

    // User inputs new grid size between 1-100
    do {
        userInput = prompt("How many cells do you want? (Between 1 to 100)");
        console.log(userInput);
    } while (userInput <= 0 || userInput > 100 || !(userInput == Math.floor(userInput)));
    
    // Removes all children of the container 
    gridContainer.replaceChildren();

    // Adds children according to user input
    for (let i = 0; i < userInput * userInput; i++) {
        let div = document.createElement('div');
        div.classList.add(i);
        div.classList.add("cell");
        gridContainer.appendChild(div);
    }
    
    // The cell auto-sizes according user input
    gridContainer.style.cssText = `grid-template-columns: repeat(${userInput}, ${480 / userInput}px);
                                   grid-template-rows: repeat(${userInput}, ${480 / userInput}px)`;
    
    // Adds event listeners when the mouse hovers a cell
    let cells = document.getElementsByClassName("cell");
    for (let cell of cells) {
        cell.addEventListener("mousemove", mouseHover)
    }
}   