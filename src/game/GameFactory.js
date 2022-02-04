import Game from "./Game";
import GameFieldFactory from "./field/factory/GameFieldFactory";
import ContentFactory from "./info/ContentFactory";
import SoundModel from "./info/SoundModel";
import TimeCalculator from "./TimeCalculator";


class GameFactory {

    constructor(settingsModelProvider) {
        this.settingsModelProvider = settingsModelProvider;
        this.gameFieldFactory = new GameFieldFactory(settingsModelProvider);
        this.contentFactory = new ContentFactory();
        this.timeCalculator = new TimeCalculator();
    }

    makeGame() {

        const gameFields = this.gameFieldFactory.makeGameFields();
        const settings = this.settingsModelProvider.getSettingsModel();
        const timeoutDict = settings.getTimeControl();
        const attemptsNumber = settings.getAttemptsNumber();
        const soundFlag = settings.getSoundControl();
        const scenarioDict = settings.getScenario();
        const difficultyDict = settings.getDifficulty();

        const timeout = this.#decodeTimeout(difficultyDict, timeoutDict);
        const soundModel = this.#makeSoundModel(soundFlag, scenarioDict);

        return new Game(gameFields, attemptsNumber, timeout, soundModel, 700);
    }


    #decodeTimeout(difficultyDict, timeoutDict) {

        const difContent = this.contentFactory.resolveContentByKey(difficultyDict.getKey());
        const timeoutContent = this.contentFactory.resolveContentByKey(timeoutDict.getKey());

        return this.timeCalculator.calculateFullTime(difContent, timeoutContent);
    }


    #makeSoundModel(soundsControl, scenario) {
        return new SoundModel(false);
    }

}

export default GameFactory