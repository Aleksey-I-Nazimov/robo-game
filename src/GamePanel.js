import * as React from "react";
import ClickButton from "./elements/ClickButton";
import SettingsModelProvider from "./settings/model/SettingsModelProvider";
import SettingsModel from "./settings/model/SettingsModel";
import MainSettingsPanel from "./settings/MainSettingsPanel";
import RobotGamePanel from "./game/RobotGamePanel";
import GameOverPanel from "./results/GameOverPanel";
import RulesPanel from "./rules/RulesPanel";


class GamePanel extends React.Component {

    constructor(props) {
        super(props);

        this.rulesId = "rulesId";
        this.settingsId = "settingsId";
        this.gameId = "gameId";
        this.gameOverId = "gameOverId";

        this.state = {actionId: this.rulesId};

        this.modelProvider = new SettingsModelProvider(new SettingsModel());
        this.modelProvider.addListener({
            onChangedSettings: function (model) {
                console.log(model.toString());
            }
        });
    }

    onAction(actionId) {
        this.setState({actionId: actionId});
    };

    render() {
        const id = this.state.actionId;

        if (id === this.rulesId) {
            return this.#renderRules();

        } else if (id === this.settingsId) {
            return this.#renderSettings();

        } else if (id === this.gameId) {
            return this.#renderGame();

        } else if (id === this.gameOverId) {
            return this.#renderGameOver();

        } else {
            return <div/>
        }
    }

    #renderRules() {
        return (
            <div>
                <RulesPanel/>
                <div>
                    <ClickButton text={"Поехали к настройкам"} listeners={[this]} actionId={this.settingsId}/>
                </div>
            </div>
        );
    }

    #renderSettings() {
        return (
            <div>
                <MainSettingsPanel settingsModelProvider={this.modelProvider}/>
                <div>
                    <ClickButton text={"Читать правила"} listeners={[this]} actionId={this.rulesId}/>
                    <ClickButton text={"Вперед к игре"} listeners={[this]} actionId={this.gameId}/>
                </div>
            </div>
        );
    }

    #renderGame() {
        return (
            <div>
                <RobotGamePanel settingsModelProvider={this.modelProvider} gameOverCallback={null}/>
                <div>
                    <ClickButton text={"К настройкам"} listeners={[this]} actionId={this.settingsId}/>
                    <ClickButton text={"Завершить"} listeners={[this]} actionId={this.gameOverId}/>
                </div>
            </div>
        );
    }

    #renderGameOver() {
        return (
            <div>
                <GameOverPanel/>
                <div>
                    <ClickButton text={"Попробовать еще"} listeners={[this]} actionId={this.settingsId}/>
                </div>
            </div>
        );
    }


}

export default GamePanel