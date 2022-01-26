import * as React from "react";
import ComboBox from "./elements/ComboBox";
import Spinner from "./elements/Spinner";
import CheckBox from "./elements/CheckBox";
import ClickButton from "../elements/ClickButton";
import SelectedDictionary from "./model/SelectedDictionary";
import ComboBoxModel from "./model/ComboBoxModel";
import CheckBoxModel from "./model/CheckBoxModel";
import SpinnerModel from "./model/SpinnerModel";


class MainSettingsPanel extends React.Component {


    constructor(toGameIndex, toRuleIndex, modelProvider) {

        super();

        this.TO_GAME = "ToGame";
        this.TO_RULES = "ToRules";

        this.listeners = [];
        this.toGameIndex = toGameIndex;
        this.toRuleIndex = toRuleIndex;
        this.modelProvider = modelProvider;
        this.componentList = [];

        this.gameTypeModel = this.#makeGameTypeModel();
        this.gameScenarioModel = this.#makeScenarioModel();
        this.difficultyModel = this.#makeDifficultyModel();
        this.levelNumberModel = this.#makeLevelNumberModel();
        this.attemptsNumberModel = this.#makeAttemptsNumberModel();
        this.timeControlModel = this.#makeEnableTimeControlModel();
        this.enableSoundModel = this.#makeEnableSoundModel();

        // Binding feedback for THIS references:---------------------
        this.onChangedGameType = this.onChangedGameType.bind(this);
        this.onChangedGameScenario = this.onChangedGameScenario.bind(this);
        this.onDifficulty = this.onDifficulty.bind(this);
        this.onChangedLevelNumber = this.onChangedLevelNumber.bind(this);
        this.onChangedAttempts = this.onChangedAttempts.bind(this);
        this.onChangedTimeControl = this.onChangedTimeControl.bind(this);
        this.onEnabledSound = this.onEnabledSound.bind(this);
    }

    addListener(listener) {
        this.listeners.push(listener);
    }

    onAction(actionId) {
        if (actionId === this.TO_GAME) {
            this.listeners.forEach(l => l.onNext(this.toGameIndex));
        } else if (actionId === this.TO_RULES) {
            this.listeners.forEach(l => l.onPrev(this.toRuleIndex));
        }
    }

    onSwitchingPanel() {
        this.componentList.forEach(c => c.onChange());
    }

    onChangedGameType(gameTypeDictionary) {
        const model = this.modelProvider.getSettingsModel();
        this.modelProvider.acceptNewSettingsModel(model.setType(gameTypeDictionary));
    }

    onChangedGameScenario(gameScenarioDictionary) {
        const model = this.modelProvider.getSettingsModel();
        this.modelProvider.acceptNewSettingsModel(model.setScenario(gameScenarioDictionary))
    }

    onDifficulty(difficultyDictionary) {
        const model = this.modelProvider.getSettingsModel();
        this.modelProvider.acceptNewSettingsModel(model.setDifficulty(difficultyDictionary));
    }

    onChangedLevelNumber(levelNumber) {
        const model = this.modelProvider.getSettingsModel();
        this.modelProvider.acceptNewSettingsModel(model.setLevelNumber(levelNumber))
    }

    onChangedAttempts(attemptNumber) {
        const model = this.modelProvider.getSettingsModel();
        this.modelProvider.acceptNewSettingsModel(model.setAttemptsNumber(attemptNumber));
    }

    onChangedTimeControl(timeControlDictionary) {
        const model = this.modelProvider.getSettingsModel();
        this.modelProvider.acceptNewSettingsModel(model.setTimeControl(timeControlDictionary));
    }

    onEnabledSound(enabled) {
        const model = this.modelProvider.getSettingsModel();
        this.modelProvider.acceptNewSettingsModel(model.setSoundControl(enabled))
    }


    render() {

        return (
            <div>
                <table>
                    <tbody>
                    <tr>
                        <td>1.</td>
                        <td>{this.gameTypeModel.getLabel()}</td>
                        <td><ComboBox id={"gameType"} handler={this.onChangedGameType}
                                      model={this.gameTypeModel} componentList={this.componentList}/></td>
                    </tr>
                    <tr>
                        <td>2.</td>
                        <td>{this.gameScenarioModel.getLabel()}</td>
                        <td><ComboBox id={"gameScenario"} handler={this.onChangedGameScenario}
                                      model={this.gameScenarioModel} componentList={this.componentList}/></td>
                    </tr>
                    <tr>
                        <td>3.</td>
                        <td>{this.difficultyModel.getLabel()}</td>
                        <td><ComboBox id={"gameDifficulty"} handler={this.onDifficulty}
                                      model={this.difficultyModel} componentList={this.componentList}/></td>
                    </tr>
                    <tr>
                        <td>4.</td>
                        <td>{this.levelNumberModel.getLabel()}</td>
                        <td><Spinner id={"levelNumber"} handler={this.onChangedLevelNumber}
                                     model={this.levelNumberModel} componentList={this.componentList}/></td>
                    </tr>
                    <tr>
                        <td>5.</td>
                        <td>{this.attemptsNumberModel.getLabel()}</td>
                        <td><Spinner id={"attemptsNumber"} handler={this.onChangedAttempts}
                                     model={this.attemptsNumberModel} componentList={this.componentList}/></td>
                    </tr>
                    <tr>
                        <td>6.</td>
                        <td>{this.timeControlModel.getLabel()}</td>
                        <td><ComboBox id={"timeControl"} handler={this.onChangedTimeControl}
                                      model={this.timeControlModel} componentList={this.componentList}/></td>
                    </tr>
                    <tr>
                        <td>7.</td>
                        <td>{this.enableSoundModel.getLabel()}</td>
                        <td><CheckBox id={"soundSwitcher"} handler={this.onEnabledSound}
                                      model={this.enableSoundModel} componentList={this.componentList}/></td>
                    </tr>
                    </tbody>
                </table>
                <div>
                    <ClickButton text={"Читать правила"} listeners={[this]} actionId={this.TO_RULES}/>
                    <ClickButton text={"Вперед к игре"} listeners={[this]} actionId={this.TO_GAME}/>
                </div>
            </div>
        );
    }


    #makeGameTypeModel() {
        let creatingProg = new SelectedDictionary("createProgram", "Составить программу", true);
        let checkingProg = new SelectedDictionary("CreateProgram", "Тест. Проверить программу", false);
        return new ComboBoxModel("Тип игры", [creatingProg, checkingProg])
    }

    #makeScenarioModel() {
        let donkeyAndCabbage = new SelectedDictionary("donkeyAndCabbage", "Ослик и капуста", false);
        let beeAndFlower = new SelectedDictionary("beeAndFlower", "Пчела и цветок", true);
        let wolfAndRabbit = new SelectedDictionary("wolfAndRabbit", "Волк и заяц", false);
        let catAndMouse = new SelectedDictionary("catAndMouse", "Кошка и мышка", false);
        let rabbitAndCarrot = new SelectedDictionary("rabbitAndCarrot", "Заяц и морковь", false);

        return new ComboBoxModel("Сценарий игры",
            [donkeyAndCabbage, beeAndFlower, wolfAndRabbit, catAndMouse, rabbitAndCarrot]);
    }

    #makeDifficultyModel() {
        let twoTwo = new SelectedDictionary("twoTwo", "2x2", false);
        let fiveFive = new SelectedDictionary("fiveFive", "5x5", true);
        let tenTen = new SelectedDictionary("tenTen", "10x10", false);
        let fifteenTen = new SelectedDictionary("fifteenTen", "15x10", false);
        let twentyFifteen = new SelectedDictionary("twentyFifteen", "25x15", false)

        return new ComboBoxModel("Сложность игры",
            [twoTwo, fiveFive, tenTen, fifteenTen, twentyFifteen]);
    }

    #makeLevelNumberModel() {
        return new SpinnerModel("Количество уровней",
            3, 30, 1);
    }

    #makeAttemptsNumberModel() {
        return new SpinnerModel("Количество попыток",
            2, 10, 1);
    }

    #makeEnableTimeControlModel() {
        let disabled = new SelectedDictionary("disabled", "Выключено", true);
        let enabled = new SelectedDictionary("enabled", "Включено", false);
        let tooFast = new SelectedDictionary("tooFast", "Очень быстро", false);
        let theFastest = new SelectedDictionary("theFastest", "Молния", false);

        return new ComboBoxModel("Включить контроль времени",
            [disabled, enabled, tooFast, theFastest]);
    }

    #makeEnableSoundModel() {
        return new CheckBoxModel("Включить звук", false);
    }

}

export default MainSettingsPanel
