import * as React from "react";
import ScenarioComboBox from "./ScenarioComboBox";
import ComplexityComboBox from "./ComplexityComboBox";
import LevelCounter from "./LevelCounter";
import LiveCounter from "./LiveCounter";
import TimeControlComboBox from "./TimeControlComboBox";
import SoundControlCheckBox from "./SoundControlCheckBox";
import ClickButton from "../elements/ClickButton";


class MainSettingsPanel extends React.Component {

    constructor(props) {
        super(props);

        this.listeners = props.listeners;
    }

    onAction(actionId) {
        if (actionId === "ToGames") {
            this.listeners.forEach(l => l.onNext(1));
        } else if (actionId === "ToRules") {
            this.listeners.forEach(l => l.onPrev(1));
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
                    <td><ClickButton text={"Читать правила"} listeners={[this]} actionId={"ToRules"}/></td>
                    <td><ClickButton text={"Вперед к игре"} listeners={[this]} actionId={"ToGames"}/></td>
                </tr>
                </tbody>
            </table>
        );
    }

}

export default MainSettingsPanel
