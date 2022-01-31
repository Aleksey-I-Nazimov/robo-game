class Point {

    constructor(row, column) {
        this.row = row;
        this.column = column;
    }

    getRow() {
        return this.row;
    };

    getY() {
        return this.row
    }

    getDeltaY() {
        return this.row;
    }

    getColumn() {
        return this.column;
    };

    getX() {
        return this.column;
    }

    getDeltaX() {
        return this.column;
    }

    isEqualToRowColumn(row, column) {
        return row === this.row && column === this.column;
    };

    isEqualTo(point) {
        return this.isEqualToRowColumn(point.getRow(), point.getColumn());
    };

    plus(point) {
        return new Point(this.getY() + point.getDeltaY(),
            this.getX() + point.getDeltaX());
    };


    static getRandPoint(maxRow, maxColumn, previousPoint) {

        if (maxRow === 0 && maxColumn === 0) {
            return new Point(0, 0)
        }

        const newPointCreator = function () {
            return new Point(Point.getRandomInt(maxRow), Point.getRandomInt(maxColumn));
        };

        let newPoint = newPointCreator();
        if (previousPoint !== null) {
            while (newPoint.isEqualTo(previousPoint)) {
                newPoint = newPointCreator();
            }
        }

        return newPoint;
    }

    static getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

}

export default Point
