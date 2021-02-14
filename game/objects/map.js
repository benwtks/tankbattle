class Map {
    constructor(width, height) {
        this.walls = newMap(width+1, height+1);
    }
}
// TODO doesnt have to be a class
function newMap(width, height) {
    const map = [];

    const horizontalBorder = [[true, true]];
    for (let i = 1; i < width-1; i++) {
        horizontalBorder.push([true, false]);
    }
    horizontalBorder.push([true, true]);

    map.push(horizontalBorder);

    for (let i = 1; i < height-1; i++) {
        const row = [[false, true]];
        for (let j = 1; j < width-1; j++) {
            row.push([Math.random() < 0.125, Math.random() < 0.125]);
        }
        row.push([false, true]);
        map.push(row);
    }

    map.push(horizontalBorder);

    return map;
}

let map = new Map(10, 20);

console.log(map);
