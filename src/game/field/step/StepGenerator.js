import ArrowCalculator from "./ArrowCalculator";


class StepGenerator {

    constructor() {
        this.arrowCalculator = new ArrowCalculator();
        this.originalGameFieldModel = null;
        this.currentGameFieldModel = null;
        this.executionId = null;
        this.timeout = 1;

        this.stepArray = [];
        this.arrayPointer = 0;
        this.listeners = [];

        this.#dropArrayPointer();
    }

    addListener(listener) {
        this.listeners.push(listener);
        return this;
    }

    setOriginalGameFieldModel(originalGameFieldModel) {
        console.log("StepGenerator: Setting the original game field model: ", originalGameFieldModel);
        this.originalGameFieldModel = originalGameFieldModel;
        this.#reset();
        return this;
    }

    setTimeout(timeout) {
        console.log("StepGenerator: Setting the timeout value (ms): ", timeout);
        this.timeout = timeout;
        this.#reset();
        return this;
    }

    onPushed(pushed) {
        console.log("StepGenerator: Pushing start generation: ", pushed);
        if (pushed) {
            if (!this.#reset()) {
                this.#switchOn();
            }
        } else {
            this.#switchOff();
        }
    }

    onChangedStepArray(stepArray) {
        console.log("StepGenerator: The new step array: ", stepArray);
        this.stepArray = stepArray;
        this.#reset();
    }


    #run($) {
        if ($.stepArray.length > 0) {
            if ($.arrayPointer < $.stepArray.length) {
                const step = $.stepArray[$.arrayPointer];
                const response = $.arrowCalculator.make(step, $.currentGameFieldModel);

                if (response.isSuccess()) {
                    $.#notifyGeneration(response.getModel(), $.arrayPointer);
                    $.currentGameFieldModel = response.getModel();
                } else {
                    $.#notifyFailedGeneration(response.getModel(), $.arrayPointer);
                }
                $.arrayPointer++;

            } else {
                $.#notifyFinalization($.currentGameFieldModel, $.arrayPointer);
                $.#switchOff();
            }
        }
    }

    #notifyOrigination(model) {
        console.log("StepGenerator: Notifying origination: ", model);
        this.listeners.forEach(l => {
                if (l.onOriginalModel !== undefined) {
                    l.onOriginalModel(model)
                }
            }
        );
    }

    #notifyGeneration(model, pointer) {
        console.log("StepGenerator: Notifying the new generated step: ", model, pointer);
        this.listeners.forEach(l => {
                if (l.onGeneratedModel !== undefined) {
                    l.onGeneratedModel(model, pointer)
                }
            }
        );
    }

    #notifyFailedGeneration(model, pointer) {
        console.log("StepGenerator: Notifying the new failed step: ", model, pointer);
        this.listeners.forEach(l => {
                if (l.onFailedGeneration !== undefined) {
                    l.onFailedGeneration(model, pointer)
                }
            }
        );
    }

    #notifyFinalization(model, pointer) {
        console.log("StepGenerator: Notifying the final step: ", model, pointer);
        this.listeners.forEach(l => {
                if (l.onFinalizedGeneration !== undefined) {
                    l.onFinalizedGeneration(model, pointer)
                }
            }
        );
    }

    #reset() {

        if (this.#isRunning()) {
            console.trace("StepGenerator: Resetting started generator");
            this.#switchOff();
            this.currentGameFieldModel = this.originalGameFieldModel;
            this.#notifyOrigination(this.currentGameFieldModel);
            this.#switchOn();
            return true;

        } else {
            console.trace("StepGenerator: Resetting stopped generator");
            this.currentGameFieldModel = this.originalGameFieldModel;
            this.#notifyOrigination(this.currentGameFieldModel);
            return false;
        }
    }

    #switchOn() {
        if (!this.#isRunning()) {
            const $ = this;
            this.executionId = setInterval(function () {
                $.#run($)
            }, this.timeout);
            console.trace("StepGenerator: Step generator was successfully launched: executionId=", this.executionId);
        }
        return this;
    }

    #switchOff() {
        if (this.#isRunning()) {
            clearInterval(this.executionId);
            this.executionId = null;
            this.#dropArrayPointer();
            console.trace("StepGenerator: Step generator was successfully stopped");
        }
        return this;
    }

    #isRunning() {
        return this.executionId !== null;
    }

    #dropArrayPointer() {
        this.arrayPointer = 0;
        this.currentGameFieldModel = null;
    }

}

export default StepGenerator