const BLUE = "blue";
const RED = "red";
const GREEN = "green";
const ORANGE = "orange";
const PURPLE = "purple";
const WHITE = "black";

const colors = [BLUE, RED, GREEN, ORANGE, PURPLE, WHITE];


function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function createSides() {
    array = [];
    for (var i = 0; i < 6; i++) {
        array.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    return shuffle(array);
}


class Cube {
    constructor(wight, sides=[], buttomIndex=5) {
        this.wight = wight;

        if (sides.length == 0) {
            sides = createSides(); // Call the random colors
        }
        this.sides = sides;

        this.buttomIndex = buttomIndex;
    }

    getTopSideColor() {
        return this.sides[this.buttomIndex];
    }

    getButtomSideColor() {
        return this.sides[this.sides.length-(this.buttomIndex+1)]
    }

    putColorAtBottom(color) {
        this.buttomIndex = this.sides.indexOf(color);
    }

    putButtomIndex(index) {
        this.buttomIndex = index;
    }

    toString() {
        return "<div style='margin: 15px auto; padding: 10px; width:400px; border-top: 5px solid " + this.sides[this.buttomIndex] + "; border-bottom: 5px solid " + this.sides[this.sides.length-(this.buttomIndex+1)] + ";'>" +
        this.wight + " <br /> " + this.sides + 
        "</div>"
    }
}

class Tower {
    constructor(cubes) {
        this.totalCubes = cubes.sort(function (a, b) {
            return a.wight - b.wight;
        });

        this.resCubes = [];
    }

    printTower() {
        for (var i = this.resCubes.length-1; i > -1; i--) {
            document.write(this.resCubes[i].toString());
        }
    }

    isValidPosition(newcube, cubes) {
        if (cubes.length == 0) {
            return true;
        } 

        if (cubes[cubes.length-1].wight > newcube.wight && newcube.getButtomSideColor() == cubes[cubes.length-1].getTopSideColor()) {
            return true;
        }

        return false;
    }

    copyCubeList(listToCopy) {
        let copyCubes = [];
        listToCopy.forEach(element => {
            copyCubes.push(new Cube(element.wight, element.sides, element.buttomIndex));
        });
        return copyCubes;
    }

    findOptimalSolution(tempCubes) {
        if (tempCubes.length > this.resCubes.length) {
            this.resCubes = this.copyCubeList(tempCubes);
        }
        if (this.resCubes.length == this.totalCubes.length) {
            return;
        }

        this.totalCubes.forEach(element => {
            let firstIndex = element.buttomIndex;
            for (var buttomIndex = 0; buttomIndex < 6; buttomIndex++) {
                element.putButtomIndex(buttomIndex);
                if (this.isValidPosition(element, tempCubes)) {
                    this.findOptimalSolution(tempCubes.concat([element]))
                } else {
                    element.putButtomIndex(firstIndex);
                }
            }
        });
    }
}

let heavyCube1 = new Cube(100, [PURPLE, PURPLE, PURPLE, PURPLE, PURPLE, PURPLE]);
let heavyCube2 = new Cube(90, [BLUE, BLUE, BLUE, BLUE, BLUE, BLUE]);
let cubes = [new Cube(10), new Cube(2), new Cube(8), new Cube(1), heavyCube1, heavyCube2, new Cube(80), new Cube(40), new Cube(20)]
let tower = new Tower(cubes)
tower.findOptimalSolution([])
tower.printTower()
document.write("Total number of cubes " + tower.resCubes.length);