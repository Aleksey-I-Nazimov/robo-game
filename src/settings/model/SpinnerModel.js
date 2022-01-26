class SpinnerModel {

    constructor(label, min, max, step) {
        this._label = label;
        this._min = parseInt(min);
        this._max = parseInt(max);
        this._step = parseInt(step);
    }

    findValue(element) {
        return parseInt(element.value);
    }

    getLabel() {
        return this._label;
    }

    getMin() {
        return this._min;
    }

    getMax() {
        return this._max;
    }

    getStep() {
        return this._step;
    }

}

export default SpinnerModel