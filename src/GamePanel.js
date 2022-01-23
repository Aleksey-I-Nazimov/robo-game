import * as React from "react";


class GamePanel extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.#makeState(0);
        this.panels = props.panels;

        this.panels.forEach(p => p.addListener(this));
    }

    onNext(index) {
        const p = this.#getState() + index;
        this.setState(this.#makeState(p));
    }

    onPrev(index) {
        const p = this.#getState() - index;
        this.setState(this.#makeState(p));
    }

    render() {
        return this.panels[this.#getState()].render();
    }

    #makeState(number) {
        return {panel: number};
    }

    #getState() {
        return this.state.panel;
    }

}

export default GamePanel