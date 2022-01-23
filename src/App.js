import './App.css';
import React from "react";
import RulesPanel from "./rules/RulesPanel";
import MainSettingsPanel from "./settings/MainSettingsPanel";
import ResultPanel from "./results/ResultPanel";
import RoboGamePanel from "./game/RoboGamePanel";
import GamePanel from "./GamePanel";


function App() {

    const panels = [new RulesPanel(1), new MainSettingsPanel(1, 1),
        new RoboGamePanel(1, 1), new ResultPanel(1, 2)];

    return (
        <GamePanel panels={panels}/>
    );
}

export default App;
