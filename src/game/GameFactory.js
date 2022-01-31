import Game from "./Game";
import GameFieldFactory from "./field/factory/GameFieldFactory";


class GameFactory {

    constructor(settingsModelProvider) {

        this.settingsModelProvider = settingsModelProvider;
        this.gameFieldFactory = new GameFieldFactory(settingsModelProvider);

    }

    makeGame() {
        const gameFields = this.gameFieldFactory.makeGameFields();
        const settings = this.settingsModelProvider.getSettingsModel();
        const timeoutModel = settings.getTimeControl();
        const attemptsNumber = settings.getAttemptsNumber();
        const soundsControl = settings.getSoundControl();
        const scenario = settings.getScenario();
        const difficulty = settings.getDifficulty();
        
        const timeout = this.#decodeTimeout(difficulty);
        const soundModel = this.#makeSoundModel(soundsControl, scenario);

        return new Game(gameFields, attemptsNumber, timeout, soundModel, 700);
    }


    #decodeTimeout(difficulty) {
        return undefined;
    }


    #makeSoundModel(soundsControl, scenario) {
        return undefined;
    }

}