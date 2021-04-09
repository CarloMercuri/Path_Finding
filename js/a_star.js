export { getPath };
import { updateNode } from './main.js';





// F(n) = G(n) + H(n)
// H(n) : estimate of distance from node N to the end node. Taxicab geometry.
// G(n) : Current shortest distance to get from the start node to n node
// F(n) : G + H

function Node(x, y, visited, type) {
    this.xPos = x;
    this.yPos = y;
    this.visited = visited;
    this.type = type; // UNKNOWN, START, VALID, GOAL, INVALID (obstacle or w/e)
    this.path = [];
}

function h(nx, ny, end_x, end_y) {
    return Math.abs(nx - end_x) + Math.abs(ny - end_y);
}



// Returns an array of points representing the path to take
function getPath(start_x, start_y, endx, endy, grid) {

    // Create the list and push the start node in it. Later on it's gonna change to a 
    // priority queue
    var openList = [];

    openList.push(grid.nodeArray[start_x][start_y]);
    console.log(openList.length);

    // Main loop
    while(openList.length > 0) {
        var currentNode = openList.pop();
        console.log(currentNode);
        console.log(openList.length);
        openList.push(findNeighbours(currentNode, grid));
    }

    

}

function findNeighbours(node, grid){

    var returnList = [];

    // LEFT
    if(node.xPos - 1 >= 0) {
        if(grid.nodeArray[node.xPos - 1][node.yPos].type !== 'OBSTACLE' && 
        grid.nodeArray[node.xPos - 1][node.yPos].type !== 'VISITED') {
            node.neighbours.push(grid.nodeArray[node.xPos - 1][node.yPos]);
            updateNode(node.xPos - 1, node.yPos, 'VISITED');
            returnList.push(grid.nodeArray[node.xPos - 1][node.yPos]);
        }
    }

    // TOP
    if(node.yPos - 1 >= 0) {
        if(grid.nodeArray[node.xPos][node.yPos - 1].type !== 'OBSTACLE' && 
        grid.nodeArray[node.xPos][node.yPos - 1].type !== 'VISITED') {
            node.neighbours.push(grid.nodeArray[node.xPos][node.yPos - 1]);
            updateNode(node.xPos, node.yPos - 1, 'VISITED');
            returnList.push(grid.nodeArray[node.xPos][node.yPos - 1]);
        }
    }

    // RIGHT
    if(node.xPos + 1 < grid.width) {
        if(grid.nodeArray[node.xPos + 1][node.yPos].type !== 'OBSTACLE' && 
        grid.nodeArray[node.xPos + 1][node.yPos].type !== 'VISITED') {
            node.neighbours.push(grid.nodeArray[node.xPos + 1][node.yPos]);
            updateNode(node.xPos + 1, node.yPos, 'VISITED');
            returnList.push(grid.nodeArray[node.xPos + 1][node.yPos]);
        }
    }

    // DOWN
    if(node.yPos + 1 <grid.height) {
        if(grid.nodeArray[node.xPos][node.yPos + 1].type !== 'OBSTACLE' && 
        grid.nodeArray[node.xPos][node.yPos + 1].type !== 'VISITED') {
            node.neighbours.push(grid.nodeArray[node.xPos][node.yPos + 1]);
            updateNode(node.xPos, node.yPos + 1, 'VISITED');
            returnList.push(grid.nodeArray[node.xPos][node.yPos + 1]);
        }
    }

    console.log("done");

}



