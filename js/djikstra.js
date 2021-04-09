function Djikstra(){

    const startNode = mainTable.rows[startCellX].cells[startCellY];
    findPath(startNode, nodeArray);
}

function findPath(startNode, grid) {
     
    var queue = [startNode];

    while(queue.length > 0) {
        // Take the first element off the queue
        var c = queue.shift();

        // Scan in all 4 directions
        var location = explore(c, 'Up', grid);
        if(location.type === 'GOAL') {
            return location.path;
        } else if (location.type === 'VALID') {
            queue.push(location);
            setVisited(grid[location.xPos][location.yPos]);
        }

        var location = explore(c, 'Down', grid);
        if(location.type === 'GOAL') {
            return location.path;
        } else if (location.type === 'VALID') {
            queue.push(location);
            setVisited(grid[location.xPos][location.yPos]);
        }

        var location = explore(c, 'Left', grid);
        if(location.type === 'GOAL') {
            return location.path;
        } else if (location.type === 'VALID') {
            queue.push(location);
            setVisited(grid[location.xPos][location.yPos]);
        }

        var location = explore(c, 'Right', grid);
        if(location.type === 'GOAL') {
            return location.path;
        } else if (location.type === 'VALID') {
            queue.push(location);
            setVisited(grid[location.xPos][location.yPos]);
        }
    }

    // There is no valid path
    return false;

}

function explore(node, direction, grid) {

    var newX = node.xPos;
    var newY = node.yPos;

    if(direction === 'Up') {
        newY += 1;
    } else if (direction === 'Down') {
        newY -= 1;
    } else if (direction === 'Left') {
        newX -= 1;
    } else if (direction === 'Right') {
        newX += 1;
    }

    var location = {
        x: newX,
        y: newY,
        type: 'UNKNOWN'
    }

    location.type = checkLocation(location, grid);
    
    return location;
}

function checkLocation(loc, grid){

    if(loc.x < 0 ||
        loc.x >= grid.length ||
        loc.y < 0 ||
        loc.y >= grid[0].length) {
            return 'INVALID';
        } else if (grid[loc.x][loc.y].type === 'GOAL') {
            return 'GOAL';
        } else if (grid[loc.x][loc.y].type === 'OBSTACLE') {
            return 'OBSTACLE';
        } else {
            return 'VALID';
        }
}