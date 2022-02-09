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
        if (model.compareScrAndTarget()) {
            this.scoring.makeBonus();
            this.#notify();
        }
    }

    #notify() {
        console.log("GameCounter: Notifying scores: ", this.scoring);
        this.listeners.forEach(l => l.onScoring(this.scoring.getOverall()));
    }


}

export default GameCounter