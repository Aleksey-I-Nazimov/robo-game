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
import TimeManager from "./TimeManager";


class RobotGamePanel extends React.Component {

    constructor(props) {
        super(props);
        this.settingsModelProvider = props.settingsModelProvider;
        this.gameOverCallback = props.gameOverCallback;
    }

    render() {

        const game = new GameFactory(this.settingsModelProvider).makeGame();
        const gameManager = new GameManager(game, this.gameOverCallback);
        const timeManager = new TimeManager(game, this.gameOverCallback).setOriginalGameFieldModel();
        const originalGameModel = gameManager.getOriginalGameFieldModel();

        const gameCounter = new GameCounter()
            .addListener(gameManager);
        const stepGenerator = new StepGenerator()
            .setOriginalGameFieldModel(originalGameModel)
            .setTimeout(gameManager.getStepTimeoutMs())
            .addListener(gameManager)
            .addListener(gameCounter);
        const stepModel = new ProgramStepModel()
            .addListener(stepGenerator);

        gameManager.addListener(stepGenerator);
        gameManager.addListener(stepModel);
        gameManager.addListener(timeManager);

        return <div>
            <h2>Задание для игры</h2>
            <div>
                <ScoreField scoreModel={gameCounter} timeManager={timeManager}/>
            </div>
            <div>
                <GameField gameFieldModel={originalGameModel} stepGenerator={stepGenerator}/>
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
        </div>;
    }
}

export default RobotGamePanel