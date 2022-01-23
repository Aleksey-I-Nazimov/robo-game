import * as React from "react";
import ClickButton from "../elements/ClickButton";


class ResultPanel extends React.Component {

    constructor(toGameIndex, toSettingsIndex) {
        super();

        this.TO_GAME = "ToGame";
        this.TO_SETTINGS = "ToSettings;"

        this.listeners = [];
        this.toGameIndex = toGameIndex;
        this.toSettingsIndex = toSettingsIndex;
    }

    addListener(listener) {
        this.listeners.push(listener);
    }

    onAction(actionId) {
        if (actionId === this.TO_GAME) {
            this.listeners.forEach(l => l.onPrev(this.toGameIndex));
        } else if (actionId === this.TO_SETTINGS) {
            this.listeners.forEach(l => l.onPrev(this.toSettingsIndex));
        }
    }


    render() {
        return <div>
            <ClickButton text={"Пробуем заново"} listeners={[this]} actionId={this.TO_GAME}/>
            <ClickButton text={"К настройкам"} listeners={[this]} actionId={this.TO_SETTINGS}/>
        </div>
    }

}

export default ResultPanel