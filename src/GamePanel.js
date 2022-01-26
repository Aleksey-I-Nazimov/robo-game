import * as React from "react";


class GamePanel extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.#makeState(0);
        this.panels = props.panels;

        this.panels.forEach(p => p.addListener(this));
    }

    onNext(index) {
        const p = this.#getState() + parseInt(index);
        this.setState(this.#makeState(p));
    }

    onPrev(index) {
        const p = this.#getState() - parseInt(index);
        this.setState(this.#makeState(p));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const panel = this.#getPanel();
        if (panel.onSwitchingPanel !== undefined) {
            panel.onSwitchingPanel();
        }
    }

    render() {
        return this.#getPanel().render();
    }

    #makeState(number) {
        return {panel: parseInt(number)};
    }

    #getState() {
        return this.state.panel;
    }

    #getPanel() {
        return this.panels[this.#getState()];
    }

}

export default GamePanel