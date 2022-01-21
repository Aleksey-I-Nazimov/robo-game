import Point from "./Point";


function getRandPoint(maxRow, maxColumn, previousPoint) {

    if (maxRow === 0 && maxColumn === 0) {
        return new Point(0, 0)
    }

    const newPointCreator = function () {
        return new Point(getRandomInt(maxRow), getRandomInt(maxColumn));
    };

    let newPoint = newPointCreator();
    if (previousPoint !== null) {
        while (newPoint.isEqualTo(previousPoint)) {
            newPoint = newPointCreator();
        }
    }

    return newPoint;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function makeArray(size) {
    const array = new Array(size);
    for (let i = 0; i < size; ++i) {
        array.push(i)
    }
    return array;
}


class GameFieldModel {

    #maxPoint = new Point(1, 1);
    #sourcePoint = new Point(1, 1);
    #targetPoint = new Point(1, 1);
    #sourceImg = null;
    #targetImg = null;
    #rowArray = new Array(1);
    #columnArray = new Array(1);

    constructor(
        maxPoint,
        sourcePoint,
        targetPoint,
        sourceImg,
        targetImg
    ) {
        this.#maxPoint = maxPoint;
        this.#sourcePoint = sourcePoint;
        this.#targetPoint = targetPoint;
        this.#sourceImg = sourceImg;
        this.#targetImg = targetImg;
        this.#rowArray = makeArray(maxPoint.getRow());
        this.#columnArray = makeArray(maxPoint.getColumn())
    }

    static makeGameFieldModel(maxRow, maxCol, sourceImg, targetImg) {
        const maxPoint = new Point(maxRow, maxCol);
        const srcPoint = getRandPoint(maxPoint.getRow(), maxPoint.getColumn(), null);
        return new GameFieldModel(
            maxPoint,
            srcPoint,
            getRandPoint(maxPoint.getRow(), maxPoint.getColumn(), srcPoint),
            sourceImg,
            targetImg
        );
    }

    static modifyModel(sourcePoint, model) {
        return new GameFieldModel(model.getMaxPoint(), sourcePoint, model.getTargetPoint(),
            model.getSourceImg(), model.getTargetImg())
    }

    getMaxPoint() {
        return this.#maxPoint;
    }

    getSourcePoint() {
        return this.#sourcePoint;
    }

    getTargetPoint() {
        return this.#targetPoint;
    }

    getSourceImg() {
        return this.#sourceImg;
    }

    getTargetImg() {
        return this.#targetImg;
    }

    getRowArray() {
        return this.#rowArray;
    }

    getColumnArray() {
        return this.#columnArray;
    }

}

export default GameFieldModel
