import Point from "./Point";


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

    compareScrAndTarget() {
        return this.#sourcePoint.isEqualTo(this.#targetPoint)
    }

}

export default GameFieldModel
