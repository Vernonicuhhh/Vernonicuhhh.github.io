function loadGrid(numRows, numCols){
    const grid = document.getElementById('grid');
    for(let i = 0; i < numRows ; i++){
        const row = document.createElement('div');
        row.classList.add('grid-row');
        row.id = `grid-row-${i}`;
        for(let j = 0; j < numCols ; j++){
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
}

function wrap(val, totalSz){
    return (val + totalSz) % totalSz;
}

function getNumNeighbors(grid, row, col, numRows, numCols){
    let sum = 0;

    for(let dx = -1; dx < 2; dx++){
        for(let dy = -1; dy < 2; dy++){
            if(!(dx == 0 && dy == 0)){
                sum += grid[wrap(row + dy, numRows)][wrap(col + dx, numCols)];
            }
        }
    }

    return sum;
}

function step(grid, numRows, numCols){
    let newGrid = [];
    for(let i = 0; i < numRows; i++){
        const newRow = [];
        for(let j = 0; j < numCols; j++){
            let numNeighbors = getNumNeighbors(grid, i, j, numRows, numCols);
            let val = 0;
            if(grid[i][j] && (numNeighbors == 2 || numNeighbors == 3)){
                val = 1;
            }
            else if(numNeighbors == 3){
                val = 1;
            }

            newRow.push(val);

        }
        newGrid.push(newRow);
    }

    return newGrid;
}

function paint(grid, numRows, numCols){
    for(let i = 0; i < numRows ; i++){
        const row = document.getElementById(`grid-row-${i}`) 
        for(let j = 0; j < numCols ; j++){
            row.children[j].style.backgroundColor =  grid[i][j] ? '#B5FFE9' : 'black';
        }
    }

}

const ROWS = 27;
const COLS = 48;
let grid = Array.from({ length: ROWS }, () => Array(COLS).fill(0));

const pulsar = [
  [0,2],[0,3],[0,4],[0,8],[0,9],[0,10],
  [2,0],[2,5],[2,7],[2,12],
  [3,0],[3,5],[3,7],[3,12],
  [4,0],[4,5],[4,7],[4,12],
  [5,2],[5,3],[5,4],[5,8],[5,9],[5,10],
  [7,2],[7,3],[7,4],[7,8],[7,9],[7,10],
  [8,0],[8,5],[8,7],[8,12],
  [9,0],[9,5],[9,7],[9,12],
  [10,0],[10,5],[10,7],[10,12],
  [12,2],[12,3],[12,4],[12,8],[12,9],[12,10]
];

const acorn = [
  [0,1],
  [1,3],
  [2,0],[2,1],[2,4],[2,5],[2,6]
];

const pentadecathlon = [
  [0,1],
  [1,0],[1,2],
  [2,1],
  [3,1],
  [4,1],
  [5,0],[5,2],
  [6,1],
  [7,1],
  [8,0],[8,2],
  [9,1],
  [10,1]
];

const gosperGliderGun = [
  [0,24],
  [1,22],[1,24],
  [2,12],[2,13],[2,20],[2,21],[2,34],[2,35],
  [3,11],[3,15],[3,20],[3,21],[3,34],[3,35],
  [4,0],[4,1],[4,10],[4,16],[4,20],[4,21],
  [5,0],[5,1],[5,10],[5,14],[5,16],[5,17],[5,22],[5,24],
  [6,10],[6,16],[6,24],
  [7,11],[7,15],
  [8,12],[8,13]
];

gosperGliderGun.forEach(([r, c]) => grid[r + 1][c + 6] = 1);
pulsar.forEach(([r, c]) => grid[r + 13][c + 2] = 1);
pentadecathlon.forEach(([r, c]) => grid[r + 9][c + 43] = 1);
acorn.forEach(([r, c]) => grid[r + 22][c + 28] = 1);

loadGrid(ROWS, COLS);
function conwayAnim(){
    const newGrid = step(grid, ROWS, COLS);
    paint(newGrid, ROWS, COLS);
    grid = newGrid;
    setTimeout(conwayAnim, 1000);
}
conwayAnim();