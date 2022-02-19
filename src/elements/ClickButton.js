import * as React from "react";
import "./Button.css"


class ClickButton extends React.Component {

    constructor(props) {
        super(props);

        this.actionId = props.actionId;
        this.text = props.text;
        this.listeners = [];
        this.handleClick = this.handleClick.bind(this);

        const listeners = this.props.listeners;
        if (listeners != null) {
            listeners.forEach(l => this.addListener(l));
        }
    }

    addListener(l) {
        this.listeners.push(l);
        return this;
    }

    handleClick() {
        this.#notify();
    }

    render() {
        return (
            <div onClick={this.handleClick} onTouchStart={this.handleClick} className="clickButton">
                <p className="widgetText">{this.text}</p>
            </div>
        );
    }

    #notify() {
        this.listeners.forEach(l => l.onAction(this.actionId));
    }
}

export default ClickButton