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

        this.finishAction = null;

        this.state = {actionId: this.rulesId};

        this.modelProvider = new SettingsModelProvider(new SettingsModel());
        this.modelProvider.addListener({
            onChangedSettings: function (model) {
                console.log(model.toString());
            }
        });
    }

    onAction(actionId) {

        const prevActionId = this.state.actionId;

        if (prevActionId === this.gameId &&
            (actionId === this.settingsId || actionId === this.gameOverId)
        ) {
            if (this.finishAction !== null) {
                this.finishAction.onChangedMainPanel();
            }
        }
        this.setState({actionId: actionId});
    };

    onGameOver() {
        this.onAction(this.gameOverId);
    }

    setFinishAction(finishAction) {
        this.finishAction = finishAction;
        return this;
    }

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
                    <ClickButton key={"goToSettingsButton"}
                                 text={"Поехали к настройкам"} listeners={[this]} actionId={this.settingsId}/>
                </div>
            </div>
        );
    }

    #renderSettings() {
        return (
            <div>
                <MainSettingsPanel settingsModelProvider={this.modelProvider}/>
                <div>
                    <ClickButton key={"goToRulesButton"}
                                 text={"Читать правила"} listeners={[this]} actionId={this.rulesId}/>
                    <ClickButton key={"goToGameButton"}
                                 text={"Вперед к игре"} listeners={[this]} actionId={this.gameId}/>
                </div>
            </div>
        );
    }

    #renderGame() {
        return (
            <div>
                <RobotGamePanel settingsModelProvider={this.modelProvider} gameOverCallback={this}/>
                <div>
                    <ClickButton key={"goToSettingsButton2"}
                                 text={"К настройкам"} listeners={[this]} actionId={this.settingsId}/>
                    <ClickButton key={"goToGameOverButton"}
                                 text={"Завершить"} listeners={[this]} actionId={this.gameOverId}/>
                </div>
            </div>
        );
    }

    #renderGameOver() {
        return (
            <div>
                <GameOverPanel/>
                <div>
                    <ClickButton key={"goToSettingsButton3"}
                                 text={"Попробовать еще"} listeners={[this]} actionId={this.settingsId}/>
                </div>
            </div>
        );
    }


}

export default GamePanel