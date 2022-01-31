import * as React from "react";
import GameCounter from "./scoring/GameCounter";
import GameFieldModel from "./field/GameFieldModel";
import pilot from "../pilot.svg";
import airPlan from "../airplan.svg";
import StepGenerator from "./field/step/StepGenerator";
import ProgramStepModel from "./field/step/ProgramStepModel";
import ScoreField from "./scoring/ScoreField";
import GameField from "./field/GameField";
import ProgramButtonGroup from "./field/step/ProgramButtonGroup";
import ProgramStepsViewer from "./field/step/ProgramStepsViewer";
import LaunchButton from "../elements/LaunchButton";
import ClickButton from "../elements/ClickButton";


class RoboGamePanel extends React.Component {


    constructor(toSettingsIndex, toFinishIndex) {

        super();

        this.TO_SETTINGS = "ToSettings";
        this.TO_FINISH = "ToFinish";

        this.listeners = [];
        this.toSettingsIndex = toSettingsIndex;
        this.toFinishIndex = toFinishIndex;
    }

    addListener(listener) {
        this.listeners.push(listener);
    }

    onAction(actionId) {

        if (actionId === this.TO_FINISH) {
            this.listeners.forEach(l => l.onNext(this.toFinishIndex));

        } else if (actionId === this.TO_SETTINGS) {
            this.listeners.forEach(l => l.onPrev(this.toSettingsIndex));
        }
    }

    render() {
        const maxRow = 5;
        const maxCol = 5;
        const timeoutMs = 500;

        const gameCounter = new GameCounter();

        const gameFieldModel = GameFieldModel
            .makeGameFieldModel(maxRow, maxCol, pilot, airPlan);

        const stepGenerator = new StepGenerator()
            .addListener(gameCounter)
            .setOriginalGameFieldModel(gameFieldModel)
            .setTimeout(timeoutMs);

        const stepModel = new ProgramStepModel()
            .addListener(stepGenerator);

        return <div>
            <h2>Задание для игры</h2>
            <div>
                <ScoreField scoreModel={gameCounter}/>
            </div>
            <div>
                <GameField gameFieldModel={gameFieldModel} stepGenerator={stepGenerator}/>
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
            <div>
                <ClickButton text={"К настройкам"} listeners={[this]} actionId={this.TO_SETTINGS}/>
                <ClickButton text={"Завершить"} listeners={[this]} actionId={this.TO_FINISH}/>
            </div>
        </div>
    }

}

export default RoboGamePanel