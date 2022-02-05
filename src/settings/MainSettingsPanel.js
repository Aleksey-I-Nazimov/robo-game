import * as React from "react";
import ComboBox from "./elements/ComboBox";
import Spinner from "./elements/Spinner";
import CheckBox from "./elements/CheckBox";
import SelectedDictionary from "./model/SelectedDictionary";
import ComboBoxModel from "./model/ComboBoxModel";
import CheckBoxModel from "./model/CheckBoxModel";
import SpinnerModel from "./model/SpinnerModel";
import ContentFactory from "../game/info/ContentFactory";


class MainSettingsPanel extends React.Component {


    constructor(props) {

        super(props);

        this.modelProvider = props.settingsModelProvider;
        this.componentList = [];

        this.contentFactory = new ContentFactory();

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

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.componentList.forEach(c => c.onChange());
    }

    componentDidMount() {
        this.componentList.forEach(c => c.onChange());
    }

    render() {

        return (
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
        );
    }


    #makeGameTypeModel() {
        let creationInfo = this.contentFactory.createProgramTypeInfo();
        let checkInfo = this.contentFactory.checkProgramTypeInfo();

        return new ComboBoxModel("Тип игры", [
                new SelectedDictionary(creationInfo.getKey(), creationInfo.getText(), true),
                new SelectedDictionary(creationInfo.getKey(), creationInfo.getText(), false)
            ]
        )
    }

    #makeScenarioModel() {
        let donkeyAndCabbage = this.contentFactory.donkeyCabbageInfo();
        let beeAndFlower = this.contentFactory.beeFlowerInfo();
        let wolfAndRabbit = this.contentFactory.wolfRabbitInfo();
        let catAndMouse = this.contentFactory.catMouseInfo();
        let rabbitAndCarrot = this.contentFactory.rabbitCarrotInfo();

        return new ComboBoxModel("Сценарий игры",
            [
                new SelectedDictionary(donkeyAndCabbage.getKey(), donkeyAndCabbage.getText(), false),
                new SelectedDictionary(beeAndFlower.getKey(), beeAndFlower.getText(), true),
                new SelectedDictionary(wolfAndRabbit.getKey(), wolfAndRabbit.getText(), false),
                new SelectedDictionary(catAndMouse.getKey(), catAndMouse.getText(), false),
                new SelectedDictionary(rabbitAndCarrot.getKey(), rabbitAndCarrot.getText(), false)
            ]
        );
    }

    #makeDifficultyModel() {
        let twoTwo = this.contentFactory.twoTwoInfo();
        let fiveFive = this.contentFactory.fiveFiveInfo();
        let tenTen = this.contentFactory.tenTenInfo();
        let fifteenTen = this.contentFactory.fifteenTenInfo();
        let twentyFifteen = this.contentFactory.twentyFifteenInfo();

        return new ComboBoxModel("Сложность игры",
            [
                new SelectedDictionary(twoTwo.getKey(), twoTwo.getText(), false),
                new SelectedDictionary(fiveFive.getKey(), fiveFive.getText(), true),
                new SelectedDictionary(tenTen.getKey(), tenTen.getText(), false),
                new SelectedDictionary(fifteenTen.getKey(), fifteenTen.getText(), false),
                new SelectedDictionary(twentyFifteen.getKey(), twentyFifteen.getText(), false)
            ]
        );
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

        let disabled = this.contentFactory.timeDisabledInfo();
        let enabled = this.contentFactory.timeEnabledInfo();
        let tooFast = this.contentFactory.shortTimeInfo();
        let theFastest = this.contentFactory.shortestTimeInfo();

        return new ComboBoxModel("Включить контроль времени",
            [
                new SelectedDictionary(disabled.getKey(), disabled.getText(), true),
                new SelectedDictionary(enabled.getKey(), enabled.getText(), false),
                new SelectedDictionary(tooFast.getKey(), tooFast.getText(), false),
                new SelectedDictionary(theFastest.getKey(), theFastest.getText(), false)
            ]
        );
    }

    #makeEnableSoundModel() {
        return new CheckBoxModel("Включить звук", false);
    }

}

export default MainSettingsPanel
