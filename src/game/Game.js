class Game {

    constructor(
        gameFieldMaxPoint,
        levelNumber,
        eachLevelTimeoutMs,
        scoreThreshold,
        gameType,
        task,
        imageList
    ) {
        this._eachLevelTimeout = eachLevelTimeout;
        this._gameFieldMaxPoint = gameFieldMaxPoint;
        this._levelNumber = levelNumber;
        this._eachLevelTimeoutMs = eachLevelTimeoutMs;
        this._scoreThreshold = scoreThreshold;
        this._gameType = gameType;
        this._stepTimeoutMs = 500;
        this._task = task;
        this._imageList = imageList;
    }

    get gameFieldMaxPoint() {
        return this._gameFieldMaxPoint;
    }

    get levelNumber() {
        return this._levelNumber;
    }

    get eachLevelTimeoutMs() {
        return this._eachLevelTimeoutMs;
    }

    get scoreThreshold() {
        return this._scoreThreshold;
    }

    get gameType() {
        return this._gameType;
    }

    get eachLevelTimeout() {
        return this._eachLevelTimeout;
    }

    get stepTimeoutMs() {
        return this._stepTimeoutMs;
    }

    get task() {
        return this._task;
    }

    get imageList() {
        return this._imageList;
    }
}

export default Game