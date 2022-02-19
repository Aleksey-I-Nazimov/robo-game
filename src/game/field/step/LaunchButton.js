import * as React from "react";
import "./LaunchButton.css"

class LaunchButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {pushed: false};
        this.pushTitle = "Ожидайте результата";
        this.releaseTitle = "Запуск";
        this.listeners = [];

        this.handlePush = this.handlePush.bind(this);
        this.handleRelease = this.handleRelease.bind(this);

        props.listeners.forEach(l => this.addListener(l));

        props.stepGenerator.addListener(this);
    }

    onFinalizedGeneration() {
        this.#push(false);
    }

    handlePush() {
        if (!this.isPushed()) {
            this.#push(true)
        }
    }

    handleRelease() {
        if (this.isPushed()) {
            this.#push(false)
        }
    }

    isPushed() {
        return this.state.pushed;
    }

    addListener(listener) {
        this.listeners.push(listener);
    }

    #notify(flag) {
        this.listeners.forEach(l => l.onPushed(flag))
    }

    #push(flag) {
        this.setState({pushed: flag});
        this.#notify(flag)
    }

    render() {
        if (this.isPushed()) {
            return <div onClick={this.handleRelease}
                        onTouchStart={this.handleRelease}
                        className="pushedButton">
                <p className="pushedWidgetText">{this.pushTitle}</p>
            </div>
        } else {
            return <div onClick={this.handlePush}
                        onTouchStart={this.handlePush}
                        className="pushedButton">
                <p className="pushedWidgetText">{this.releaseTitle}</p>
            </div>
        }
    }

}

export default LaunchButton
