import { getPath } from './a_star.js';
export { updateNode };




const tableDiv = document.getElementById('table-div');
var mainTable = document.getElementById('main-table');

var isMouseDown = false;

// Main grid
const maxRows = 30;
const maxColumns = 70;

const startCellX = 10;
const startCellY = 13;

const goalCellX = 50;
const goalCellY = 13;

const mainGrid = {width:maxColumns, height:maxRows, nodeArray: []};





// Listeners

document.body.addEventListener('mousedown', () => {
    isMouseDown = true;
})

document.body.addEventListener('mouseup', () => {
    isMouseDown = false;
})


// Constructors

function Node(x, y, visited, type) {
    this.xPos = x;
    this.yPos = y;
    this.visited = visited;
    this.type = type; // UNKNOWN, START, VALID, GOAL, INVALID, OBSTACLE
    this.neighbours = [];
    this.lastNode = null;
    this.fValue = 0;
}

function buildNodeArray() {
    for(var i = 0; i < mainGrid.width; i++) {
        mainGrid.nodeArray[i] = [];
        for(var j = 0; j < mainGrid.height; j++){
            if(goalCellX === i && goalCellY === j) {
                mainGrid.nodeArray[i][j] = new Node(i, j, false, 'GOAL');
            } else if (startCellX === i && startCellY === j) {
                mainGrid.nodeArray[i][j] = new Node(i, j, false, 'START');
            } else {
                mainGrid.nodeArray[i][j] = new Node(i, j, false, 'EMPTY');
            }
            
        }
    }
}



// Create the nodes array
buildNodeArray();

// Creates the visual table
tableCreate();

updateNode(69, 10, 'OBSTACLE');

getPath(startCellX, startCellY, goalCellX, goalCellY, mainGrid);
/*
var queue = new PriorityQueue({ comparator: function(a, b) { return b.fValue - a.fValue; }});
//var queue = new PriorityQueue({ comparator: function(a, b) { return b - a; }});
//var queue = new PriorityQueue({ strategy: PriorityQueue.BinaryHeapStrategy }); // Default
queue.queue(mainGrid.nodeArray[10][20]);
queue.queue(mainGrid.nodeArray[12][19]);
queue.queue(mainGrid.nodeArray[14][45]);
queue.queue(mainGrid.nodeArray[19][14]);
queue.queue(mainGrid.nodeArray[21][6]);
queue.queue(mainGrid.nodeArray[5][30]);

//var lowest = queue.dequeue(); // returns 5

console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
*/
function tableCreate(){
    for(var i = 0; i < maxRows; i++){

        var tr = mainTable.insertRow();

        for(var j = 0; j < maxColumns; j++){
            var td = tr.insertCell();

            // Give the cell a x and a y position
            td.xPos = j;
            td.yPos = i;


            // Various listeners
            td.onclick = function () {
                tableCellClick(this);
            };

            
            td.addEventListener('mousemove', function () {
                tableCellMouseMove(this);
            })

            td.addEventListener('mouseclick', function () {
                tableCellClick(this);
            })

            // Update the cell according to the main grid 
            updateCell(j, i, mainGrid.nodeArray[j][i].type);
        }
    }
}



function addTableCellsOnClickEvents(){
    /*
    mainTable.rows[0].cells[0].onclick = function (){
        console.log("mmm");
    }
    */
    for(var r = 0; r < maxRows; r++){
        for(var c = 0; c < maxColumns; c++){
            mainTable.rows[r].cells[c].onclick = () => {
                tableCellClick(this);
            }
        }
    }
}


function updateCell(cx, cy, type) {
    switch(type) {
        case 'VISITED': 
        mainTable.rows[cy].cells[cx].classList.add('visited-cell');
             break;

        case 'OBSTACLE': 
        mainTable.rows[cy].cells[cx].classList.add('obstacle-cell');
             break;

        case 'MAINPATH':
            mainTable.rows[cy].cells[cx].classList.add('mainpath-cell');
             break;

        case 'EMPTY':
            mainTable.rows[cy].cells[cx].classList.add('empty-cell');
             break;

        case 'START':
            mainTable.rows[cy].cells[cx].classList.add('start-cell');
             break;

         case 'GOAL':
            mainTable.rows[cy].cells[cx].classList.add('goal-cell');
             break;
    }
}

// Updates the node in the main grid array, and reflects it in the frontend
function updateNode(nx, ny, type){
    switch(type) {
        case 'VISITED': 
        mainGrid.nodeArray[nx][ny].type = 'VISITED';
        updateCell(nx, ny, type);
             break;

        case 'OBSTACLE': 
        mainGrid.nodeArray[nx][ny].type = 'OBSTACLE';
        updateCell(nx, ny, type);
             break;

        case 'MAINPATH':
            mainGrid.nodeArray[nx][ny].type = 'MAINPATH';
            updateCell(nx, ny, type);
             break;

        case 'EMPTY':
            mainGrid.nodeArray[nx][ny].type = 'EMPTY';
            updateCell(nx, ny, type);
             break;

        case 'START':
            mainGrid.nodeArray[nx][ny].type = 'START';
            updateCell(nx, ny, type);
             break;

         case 'GOAL':
            mainGrid.nodeArray[nx][ny].type = 'GOAL';
            updateCell(nx, ny, type);
             break;
    }
}



function tableCellMouseMove(cell){
    if(isMouseDown){
        cellClickEvent(cell);
    }
}


function tableCellClick(cell){
    cellClickEvent(cell);
}

// Decides what to do when activating a cell
function cellClickEvent(cell) {
    
    findNeighbours(getNode(cell.xPos, cell.yPos));
/*
    if(mainGrid.nodeArray[cell.xPos][cell.yPos].type === 'START' || mainGrid.nodeArray[cell.xPos][cell.yPos].type === 'GOAL') {
        return;
    }

    updateNode(cell.xPos, cell.yPos, 'OBSTACLE');
*/
}



function getNode(x, y){
    return mainGrid.nodeArray[x][y];
}

function getTableCell(x, y){
    return mainTable.rows[y].cells[x];
}

