class SettingsModel {

    constructor(
        type,
        difficulty,
        levelNumber,
        attemptsNumber,
        timeControl,
        soundControl,
        scenario
    ) {
        this._type = type;
        this._difficulty = difficulty;
        this._levelNumber = levelNumber;
        this._attemptsNumber = attemptsNumber;
        this._timeControl = timeControl;
        this._soundControl = soundControl;
        this._scenario = scenario;
    }


    setType(value) {
        return new SettingsModel(value, this.getDifficulty(), this.getLevelNumber(),
            this.getAttemptsNumber(), this.getTimeControl(), this.getSoundControl(), this.getScenario());
    }

    setDifficulty(value) {
        return new SettingsModel(this.getType(), value, this.getLevelNumber(),
            this.getAttemptsNumber(), this.getTimeControl(), this.getSoundControl(), this.getScenario());
    }

    setLevelNumber(value) {
        return new SettingsModel(this.getType(), this.getDifficulty(), value,
            this.getAttemptsNumber(), this.getTimeControl(), this.getSoundControl(), this.getScenario());
    }

    setAttemptsNumber(value) {
        return new SettingsModel(this.getType(), this.getDifficulty(), this.getLevelNumber(),
            value, this.getTimeControl(), this.getSoundControl(), this.getScenario());
    }

    setTimeControl(value) {
        return new SettingsModel(this.getType(), this.getDifficulty(), this.getLevelNumber(),
            this.getAttemptsNumber(), value, this.getSoundControl(), this.getScenario());
    }

    setSoundControl(value) {
        return new SettingsModel(this.getType(), this.getDifficulty(), this.getLevelNumber(),
            this.getAttemptsNumber(), this.getTimeControl(), value, this.getScenario());
    }

    setScenario(value) {
        return new SettingsModel(this.getType(), this.getDifficulty(), this.getLevelNumber(),
            this.getAttemptsNumber(), this.getTimeControl(), this.getSoundControl(), value);
    }

    getType() {
        return this._type;
    }

    getScenario() {
        return this._scenario;
    }

    getDifficulty() {
        return this._difficulty;
    }

    getLevelNumber() {
        return this._levelNumber;
    }

    getAttemptsNumber() {
        return this._attemptsNumber;
    }

    getTimeControl() {
        return this._timeControl;
    }

    getSoundControl() {
        return this._soundControl;
    }

    toString() {
        return JSON.stringify(this);
    }


}

export default SettingsModel