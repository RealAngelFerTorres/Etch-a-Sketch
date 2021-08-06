// Creates default 16x16 blank cells grid
let gridContainer = document.getElementsByClassName("gridContainer")[0];

for (let i = 0; i < 257; i++) {
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

// Default values
let mode = 'blackCell'
let rainbowSequence = 0;
let actualCell = "";

// Grid border will reset the actual hovered cell
gridBorder = document.getElementById("gridBorder");
gridBorder = gridBorder.addEventListener("mousemove", () => actualCell = "outsideGrid");

// Prepare buttons with listeners to change mode/reset
resetButton = document.getElementById("resetButton");
resetButton = resetButton.addEventListener("click", resetGrid);

classicButton = document.getElementById("classicButton");
classicButton = classicButton.addEventListener("click", () => mode = 'blackCell');

eraserButton = document.getElementById("eraserButton");
eraserButton = eraserButton.addEventListener("click", () => mode = 'eraser');

modernButton = document.getElementById("modernButton");
modernButton = modernButton.addEventListener("click", () => mode = 'modernCell');

rainbowButton = document.getElementById("rainbowButton");
rainbowButton = rainbowButton.addEventListener("click", () => mode = 'rainbowCell');

// If mouse hovers a cell, add new class depending the selected mode
function mouseHover(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log(actualCell);
    let cellClases = e.target.classList;
    if (cellClases[0] != actualCell) {
        if (mode == 'eraser') {
            cellClases.remove(cellClases[2]);
        } else {
            let currentClass = cellClases[2];
            if (!currentClass) {
                if (mode == 'rainbowCell') {
                    cellClases.add(`rainbowCell${rainbowSequence}`);
                    rainbowSequence++;
                } else if (mode == 'modernCell') {
                    cellClases.add("modernCell0");
                } else {
                    cellClases.add(mode);
                }
            } else {
                if (mode == 'rainbowCell') {
                    cellClases.replace(currentClass, `rainbowCell${rainbowSequence}`);
                    rainbowSequence++;
                } else { 
                    
                    // Takes out numbers from cell's class. ie: modernCell3
                    let currentClassChecker = currentClass.replace(/[0-9]/g, '');

                    if (mode != currentClassChecker) {
                        if (mode == 'modernCell') {
                            cellClases.replace(currentClass, "modernCell0");
                        } else {
                            cellClases.replace(currentClass, mode);
                        }
                    } else if (mode == 'modernCell') {
                        let number = parseInt(currentClass[10]);
                        if (number < 9) {
                            number += 1;
                            cellClases.replace(currentClass, `modernCell${number}`);
                        }
                    }
                }
            }
        }
        actualCell = cellClases[0];
    }
    if (rainbowSequence >= 7){
        rainbowSequence = 0;
    }
}

// Reset the grid
function resetGrid() {

    // User inputs new grid size between 1-100
    do {
        userInput = prompt("How many cells do you want? (Between 1 to 100)");
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
    gridContainer.style.cssText = `grid-template-columns: repeat(${userInput}, ${560 / userInput}px);
                                   grid-template-rows: repeat(${userInput}, ${560 / userInput}px)`;
    
    // Adds event listeners when the mouse hovers a cell
    let cells = document.getElementsByClassName("cell");
    for (let cell of cells) {
        cell.addEventListener("mousemove", mouseHover)
    }
}   