import * as React from "react";


class Spinner extends React.Component {

    constructor(props) {
        super(props);

        this.id = props.id;
        this.labelId = "label" + props.id;
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
        const labelElement = window.document.getElementById(this.labelId);
        this.handler(value);
        labelElement.innerText = value;
    }

    render() {
        const model = this.state.model;
        const value = model.getMax();
        return (
            <div>
                <p id={this.labelId}>{value}</p>
                <input id={this.id} onChange={this.onChange}
                       type={"range"} min={model.getMin()} max={value} step={model.getStep()} defaultValue={value}/>
            </div>
        );
    }

    #makeState(model) {
        return {model: model};
    }

}

export default Spinner