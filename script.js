let gridContainer = document.getElementsByClassName("gridContainer")[0];

for (let y = 0; y < 16; y++){
    for (let x = 0; x <16; x++){
        let cell = document.createElement('div');
        cell.classList.add(y);
        cell.classList.add(x);
        gridContainer.appendChild(cell);
    }
}
