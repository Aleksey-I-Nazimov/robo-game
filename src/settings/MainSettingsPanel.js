import * as React from "react";
import ScenarioComboBox from "./ScenarioComboBox";
import ComplexityComboBox from "./ComplexityComboBox";
import LevelCounter from "./LevelCounter";
import LiveCounter from "./LiveCounter";
import TimeControlComboBox from "./TimeControlComboBox";
import SoundControlCheckBox from "./SoundControlCheckBox";
import ClickButton from "../elements/ClickButton";


class MainSettingsPanel extends React.Component {


    constructor(toGameIndex, toRuleIndex) {
        super();

        this.TO_GAME = "ToGame";
        this.TO_RULES = "ToRules";

        this.listeners = [];
        this.toGameIndex = toGameIndex;
        this.toRuleIndex = toRuleIndex;
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

    render() {
        return (
            <table>
                <tbody>
                <tr>
                    <td>Сценарий игры</td>
                    <td><ScenarioComboBox/></td>
                </tr>
                <tr>
                    <td>Сложность</td>
                    <td><ComplexityComboBox/></td>
                </tr>
                <tr>
                    <td>Количество уровней</td>
                    <td><LevelCounter/></td>
                </tr>
                <tr>
                    <td>Количество попыток</td>
                    <td><LiveCounter/></td>
                </tr>
                <tr>
                    <td>Включить контроль времени</td>
                    <td><TimeControlComboBox/></td>
                </tr>
                <tr>
                    <td>Включить звук</td>
                    <td><SoundControlCheckBox/></td>
                </tr>
                <tr>
                    <td><ClickButton text={"Читать правила"} listeners={[this]} actionId={this.TO_RULES}/></td>
                    <td><ClickButton text={"Вперед к игре"} listeners={[this]} actionId={this.TO_GAME}/></td>
                </tr>
                </tbody>
            </table>
        );
    }

}

export default MainSettingsPanel
