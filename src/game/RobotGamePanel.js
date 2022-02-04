import * as React from "react";
import GameCounter from "./scoring/GameCounter";
import StepGenerator from "./field/step/StepGenerator";
import ProgramStepModel from "./field/step/ProgramStepModel";
import ScoreField from "./scoring/ScoreField";
import GameField from "./field/GameField";
import ProgramButtonGroup from "./field/step/ProgramButtonGroup";
import ProgramStepsViewer from "./field/step/ProgramStepsViewer";
import LaunchButton from "../elements/LaunchButton";
import GameFactory from "./GameFactory";
import GameManager from "./GameManager";


class RobotGamePanel extends React.Component {

    constructor(props) {
        super(props);
        this.settingsModelProvider = props.settingsModelProvider;
        this.gameOverCallback = props.gameOverCallback;

    }

    // updateModel(gameFieldModel) {
    //     this.updateFunction(gameFieldModel);
    // }

    render() {

        const game = new GameFactory(this.settingsModelProvider).makeGame();

        const gameManager = new GameManager(game, this.gameOverCallback);

        const gameCounter = new GameCounter()
            .addListener(gameManager);

        const stepGenerator = new StepGenerator()
            .addListener(gameCounter)
            .addListener(gameManager)
            .setOriginalGameFieldModel(gameManager.getOriginalGameFieldModel())
            .setTimeout();

        const stepModel = new ProgramStepModel()
            .addListener(stepGenerator);

        // this.updateFunction = function (newModel) {
        //     stepModel.removeAll();
        //     stepGenerator.setOriginalGameFieldModel(newModel);
        // };

        return (
            <div>
                <h2>Задание для игры</h2>
                <div>
                    <ScoreField scoreModel={gameCounter}/>
                </div>
                <div>
                    <GameField gameFieldModel={gameManager.getOriginalGameFieldModel()} stepGenerator={stepGenerator}/>
                </div>
                <div>
                    Тестовое задание для проверки
                </div>
                <div>
                    <ProgramButtonGroup stepModel={stepModel}/>
                    <ProgramStepsViewer stepModel={stepModel}/>
                </div>
                <div>
                    <LaunchButton listeners={[stepGenerator]} stepGenerator={stepGenerator}/>
                </div>
            </div>
        );
    }

}

export default RobotGamePanel