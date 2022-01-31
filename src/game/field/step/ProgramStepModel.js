import ArrowCalculator from "./ArrowCalculator";


class ProgramStepModel {

    constructor() {
        this.arrowCalculator = new ArrowCalculator();
        this.listeners = [];
        this.stepArray = [];
    }

    addListener(listener) {
        this.listeners.push(listener);
        return this;
    }

    addTheNewStep(newStep) {
        this.stepArray.push(newStep);
        this.#notify();
        return this;
    }

    addLeft() {
        this.addTheNewStep(this.arrowCalculator.getLeft())
    }

    addUp() {
        this.addTheNewStep(this.arrowCalculator.getUp())
    }

    addDown() {
        this.addTheNewStep(this.arrowCalculator.getDown())
    }

    addRight() {
        this.addTheNewStep(this.arrowCalculator.getRight())
    }

    removeLast() {
        if (this.stepArray.length > 0) {
            this.stepArray.pop();
            this.#notify();
        }
    }

    #notify() {
        this.listeners.forEach(l => l.onChangedStepArray(this.stepArray));
    }

}

export default ProgramStepModel