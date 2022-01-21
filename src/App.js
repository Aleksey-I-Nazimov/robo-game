import pilot from './pilot.svg';
import airPlan from './airplan.svg'
import GameFieldModel from './game/GameFieldModel'
import './App.css';
import ProgramStepModel from "./game/ProgramStepModel"
import StepGenerator from "./game/StepGenerator";
import GameCounter from "./game/GameCounter";
import React from "react";
import RulesPanel from "./rules/RulesPanel";


function App() {

    // return (
    //   <div className="App">
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <p>
    //         Edit <code>src/App.js</code> and save to reload.
    //       </p>
    //       <a
    //         className="App-link"
    //         href="https://reactjs.org"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Learn React
    //       </a>
    //     </header>
    //   </div>
    // );

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


    return (

        <RulesPanel/>

        //<MainSettingsPanel />

        // <div>
        //     <h2>Задание для игры</h2>
        //     <div>
        //         <ScoreField scoreModel={gameCounter}/>
        //     </div>
        //     <div>
        //         <GameField gameFieldModel={gameFieldModel} stepGenerator={stepGenerator}/>
        //     </div>
        //     <div>
        //         Тестовое задание для проверки
        //     </div>
        //     <div>
        //         <ProgramButtonGroup stepModel={stepModel}/>
        //         <ProgramStepsViewer stepModel={stepModel}/>
        //     </div>
        //     <div>
        //         <LaunchButton listeners={[stepGenerator]} stepGenerator={stepGenerator}/>
        //     </div>
        // </div>
    );

}

export default App;
