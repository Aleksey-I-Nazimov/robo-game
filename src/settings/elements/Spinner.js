import * as React from "react";


class Spinner extends React.Component {

    constructor(props) {
        super(props);

        this.id = props.id;
        this.handler = props.handler;
        this.state = this.#makeState(props.model);

        if (props.componentList !== undefined) {
            props.componentList.push(this);
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange() {
        const element = window.document.getElementById(this.id);
        const value = this.state.model.findValue(element);
        this.handler(value);
    }

    render() {
        const model = this.state.model;
        return (<input id={this.id} onChange={this.onChange}
                       type={"range"} min={model.getMin()} max={model.getMax()} step={model.getStep()}/>);
    }

    #makeState(model) {
        return {model: model};
    }

}

export default Spinner