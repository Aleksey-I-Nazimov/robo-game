import Scoring from "./Scoring";


class GameCounter {

    constructor() {

        this.scoring = null;
        this.listeners = [];

    }

    addListener(listener) {
        this.listeners.push(listener);
        return this;
    }

    onOriginalModel(model) {
        this.scoring = new Scoring();
        this.#notify();
    }

    onGeneratedModel(model, counter) {
        this.scoring.makeStep(counter);
        this.#notify();
    }

    onFailedGeneration(model, counter) {
        this.scoring.makePenalty(counter);
        this.#notify();
    }

    onFinalizedGeneration(model, counter) {
        const srcPoint = model.getSourcePoint();
        const targetPoint = model.getTargetPoint();
        if (srcPoint.isEqualTo(targetPoint)) {
            this.scoring.makeBonus();
            this.#notify();
        }
    }

    #notify() {
        this.listeners.forEach(l => l.onScoring(this.scoring.getOverall()));
    }


}

export default GameCounter