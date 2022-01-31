import Point from "../Point";
import GameFieldModel from "../GameFieldModel";
import * as React from "react";


class Arrow {

    constructor(title, point, image) {
        this.title = title;
        this.point = point;
        this.image = image;
    }

    isEqual(id) {
        return id === this.title;
    }

}

class Status {

    constructor(model, success) {
        this.model = model;
        this.success = success;
    }

    getModel() {
        return this.model;
    }

    isSuccess() {
        return this.success;
    }

}


class ArrowCalculator {

    constructor() {
        this.arrowLeft = new Arrow("ArrowLeft", new Point(0, -1),
            "https://img.icons8.com/metro/50/000000/long-arrow-left.png");

        this.arrowUp = new Arrow("ArrowUp", new Point(-1, 0),
            "https://img.icons8.com/metro/50/000000/long-arrow-up.png");

        this.arrowDown = new Arrow("ArrowDown", new Point(1, 0),
            "https://img.icons8.com/metro/50/000000/long-arrow-down.png");

        this.arrowRight = new Arrow("ArrowRight", new Point(0, 1),
            "https://img.icons8.com/metro/50/000000/long-arrow-right.png");

        this.arrows = [this.arrowLeft, this.arrowUp,
            this.arrowDown, this.arrowRight];
    }

    isLeft(id) {
        return this.arrowLeft.isEqual(id);
    }

    isUp(id) {
        return this.arrowUp.isEqual(id);
    }

    isDown(id) {
        return this.arrowDown.isEqual(id);
    }

    isRight(id) {
        return this.arrowRight.isEqual(id);
    }

    getLeft() {
        return this.arrowLeft.title;
    }

    getUp() {
        return this.arrowUp.title;
    }

    getDown() {
        return this.arrowDown.title;
    }

    getRight() {
        return this.arrowRight.title;
    }

    getLeftImg() {
        return this.arrowLeft.image;
    }

    getUpImg() {
        return this.arrowUp.image;
    }

    getDownImg() {
        return this.arrowDown.image;
    }

    getRightImg() {
        return this.arrowRight.image;
    }

    make(arrowId, gameFieldModel) {

        const arrow = this.#find(arrowId);

        if (arrow !== null) {

            let newSrcPoint = gameFieldModel.getSourcePoint().plus(arrow.point);
            let status = this.#check(newSrcPoint, gameFieldModel.getMaxPoint());

            return new Status(GameFieldModel.modifyModel(newSrcPoint, gameFieldModel), status)
        }
        throw "Arrow ID=" + arrowId + " is not correct";
    }

    #find(arrowId) {
        for (let i = 0; i < this.arrows.length; ++i) {
            if (this.arrows[i].isEqual(arrowId)) {
                return this.arrows[i];
            }
        }
        return null;
    }

    #check(point, maxPoint) {

        if (point.getX() < 0 || point.getY() < 0) {
            return false;
        }

        if (point.getX() >= maxPoint.getX() || point.getY() >= maxPoint.getY()) {
            return false;
        }

        return true;
    }


}

export default ArrowCalculator