class GameManager {

    constructor(game) {
        this.game = game;
        this.scoreArray = [];
        this.firedAttempts = 0;
        this.gameFieldModelCnt = 0;

        this.listeners = [];
    }


    getStepTimeoutMs() {
        return this.game.getStepTimeoutMs();
    }

    addListener(listener) {
        this.listeners.push(listener);
    }

    onOriginalModel(model) {
        const maxAttempts = this.game.getAttemptsNumber();
        if (this.firedAttempts < maxAttempts) {
            if (this.gameFieldModelCnt === this.scoreArray.length) {
                this.scoreArray.push(0);
                this.firedAttempts = 0;
            } else {
                this.scoreArray[this.gameFieldModelCnt] = 0;
                this.firedAttempts += 1;
                this.#notifyNewAttempting();
            }
        } else {
            this.#notifyGameOver(false);
        }
    }


    onFinalizedGeneration(model, counter) {
        const srcPoint = model.getSourcePoint();
        const targetPoint = model.getTargetPoint();
        if (srcPoint.isEqualTo(targetPoint)) {
            const scores = this.scoreArray[this.gameFieldModelCnt];
            if (scores >= 0) {
                if (this.#wasItFinalGame()) {
                    this.#notifyGameOver(true)
                } else {
                    this.gameFieldModelCnt += 1;
                    this.#notifyOnNewModel()
                }
            } else {
                this.#notifyGameOver();
            }
        }
    }


    onScoring(overallScores) {
        this.scoreArray[this.gameFieldModelCnt] += overallScores;
    }


    #notifyOnNewModel(model) {
        this.listeners.forEach(l => {
            if (l.onNewModel !== undefined) {
                l.onNewModel(model)
            }
        });
    }

    #notifyNewAttempting() {
        this.listeners.forEach(l => {
            if (l.onNewAttemption !== undefined) {
                l.onNewAttemption()
            }
        });
    }

    #notifyGameOver() {
        this.listeners.forEach(l => {
            if (l.onGameOver !== undefined) {
                l.onGameOver()
            }
        });
    }

    #wasItFinalGame() {
        return false;
    }


}