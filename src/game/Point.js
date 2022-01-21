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

}

export default Point
