/**
 * The class controls completing game field models
 * @author Nazimov Aleksey I.
 */
class GameManager {

    /**
     * The main game manager constructor
     * @param {Game} game
     * @param {Object} gameOverCallback
     */
    constructor(game, gameOverCallback) {

        this.game = game;
        this.gameOverCallback = gameOverCallback;

        this.scoreArray = [];
        this.firedAttempts = 0;
        this.gameFieldModelCnt = 0;

        this.listeners = [];
    }

    addListener(listener) {
        this.listeners.push(listener);
        return this;
    }

    getStepTimeoutMs() {
        return this.game.getStepTimeoutMs();
    }

    getOriginalGameFieldModel() {
        return this.game.getGameFieldModels()[this.gameFieldModelCnt];
    }

    /**
     * This method is executed when the step generator produces the new game field model
     * @param {GameFieldModel} model
     * @param {Number} counter
     */
    onGeneratedModel(model, counter) {
        if (counter === 0) {
            this.#initManagement(model);
        }
    }

    /**
     * This method is executed when the step generator produces the new failed game field model
     * @param {GameFieldModel} model
     * @param {Number} counter
     */
    onFailedGeneration(model, counter) {
        this.onGeneratedModel(model, counter);
    }

    /**
     * This method is executed when the user step generates scores
     * ATTENTION: This method has to be executed when after game management initialization
     * @param {Number} overallScores
     */
    onScoring(overallScores) {

        if (this.gameFieldModelCnt < this.scoreArray.length) {
            console.log("GameManager: Accepting scores = ", overallScores);
            this.scoreArray[this.gameFieldModelCnt] += overallScores;

        } else {
            console.log("GameManager: The game management was not initialized");
        }
    }

    /**
     * The method is executed when the user arrow program was completed
     * @param {GameFieldModel} model is the final game model
     * @param {Number} counter is the final step counter value
     */
    onFinalizedGeneration(model, counter) {

        const $ = this;

        /*
        This method cannot be executed directly. It has to be executed at the next step.
        Finalized generation has to notify all subscribed listeners.
        This subscription executes changing to the new game model. That is why these changes
        can influence on the next subscribers.
         */
        setTimeout(() => {
                if (model.compareScrAndTarget()) {
                    if ($.#wasItTheFinalModel()) {
                        console.log("GameManager: Successful game over: ", model);
                        $.#notifyGameOver(true)

                    } else {
                        $.gameFieldModelCnt += 1;
                        console.log("GameManager: The game was completed. Model counter was incremented: ", $.gameFieldModelCnt);
                        $.#notifyOriginalModel()
                    }
                } else {
                    $.firedAttempts += 1;
                    console.log("GameManager: Game goal was not achieved. Fired attempts: ", $.firedAttempts);
                    if (!$.#hasAnyAttempts()) {
                        $.#notifyGameOver(false);
                    }
                }
            }
        );
    }


    /**
     * This method is executed when the user checks their arrows program
     * @param {GameFieldModel} model is the original model which is set as a task
     */
    #initManagement(model) {

        if (this.#isItTheNewModel()) {
            console.log("GameManager: Initializing the new model");

            this.scoreArray.push(0);
            this.firedAttempts = 0;
            this.#notifyNewModelAttempt();

        } else {
            console.log("GameManager: Restarting the new attempt of the existed model");

            this.scoreArray[this.gameFieldModelCnt] = 0;
            this.#notifyNewAttempt();
        }

    }

    #notifyNewModelAttempt() {
        console.log("GameManager: The new model #" + this.gameFieldModelCnt);
    }

    #notifyNewAttempt() {
        console.log("GameManager: The new attempt #" + this.firedAttempts + " for model #" + this.gameFieldModelCnt);
    }

    #notifyGameOver(success) {
        console.log("GameManager: Game over: success=", success);

        this.listeners.forEach(l => {
            if (l.onGameOver !== undefined) {
                l.onGameOver()
            }
        });
        this.gameOverCallback.onGameOver();
    }

    #notifyOriginalModel() {
        console.log("GameManager: Notification of the game field model. Counter=", this.gameFieldModelCnt);
        const newModel = this.game.getGameFieldModels()[this.gameFieldModelCnt];

        this.listeners.forEach(l => {
            if (l.setOriginalGameFieldModel !== undefined) {
                l.setOriginalGameFieldModel(newModel)
            }
        });
    }

    #wasItTheFinalModel() {
        return this.gameFieldModelCnt === this.game.getGameFieldModels().length - 1;
    }

    #isItTheNewModel() {
        return this.gameFieldModelCnt === this.scoreArray.length;
    }

    #hasAnyAttempts() {
        return this.firedAttempts < this.game.getAttemptsNumber();
    }


}

export default GameManager