
class Game {

    constructor(
        gameFieldModels,
        attemptsNumber,
        timeoutMs,
        gameSoundModel,
        stepTimeoutMs
    ) {
        this._gameFieldModels = gameFieldModels;
        this._attemptsNumber = attemptsNumber;
        this._timeoutMs = timeoutMs;
        this._gameSoundModel = gameSoundModel;
        this._stepTimeoutMs = stepTimeoutMs;

    }

    getGameFieldModels() {
        return this._gameFieldModels;
    }

    getAttemptsNumber() {
        return this._attemptsNumber;
    }

    getTimeoutMs() {
        return this._timeoutMs;
    }

    getGameSoundModel() {
        return this._gameSoundModel;
    }

    getStepTimeoutMs() {
        return this._stepTimeoutMs;
    }
}

export default Game