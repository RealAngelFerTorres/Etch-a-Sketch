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

// If mouse hover a blank cell, add new class with black style
function mouseHover(e) {
    e.target.classList.add("cellHovered");
    e.preventDefault();
}

// Prepare reset button for a click to reset the grid
resetButton = document.getElementById("resetButton");
resetButton = resetButton.addEventListener("click", resetGrid);

// Reset the grid
function resetGrid(){

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
    
    // Adds event listeners when the mouse hovers a cell. Again...
    let cells = document.getElementsByClassName("cell");
    for (let cell of cells) {
        cell.addEventListener("mousemove", mouseHover)
    }
}   