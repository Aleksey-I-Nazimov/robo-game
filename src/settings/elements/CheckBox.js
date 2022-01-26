import * as React from "react";


class CheckBox extends React.Component {

    constructor(props) {
        super(props);

        this.id = props.id;
        this.handler = props.handler;
        this.state = this.#makeModel(props.model);

        if (props.componentList !== undefined) {
            props.componentList.push(this);
        }

        this.onChange = this.onChange.bind(this);
    }

    setModel(model) {
        this.setState(this.#makeModel(model));
    }

    onChange() {
        const element = window.document.getElementById(this.id);
        const value = this.state.model.findState(element);
        this.handler(value);
    }

    render() {
        const model = this.state.model;
        if (model.getChecked()) {
            return (<input type="checkbox" onChange={this.onChange} id={this.id} select/>);
        } else {
            return (<input type="checkbox" onChange={this.onChange} id={this.id}/>);
        }
    }

    #makeModel(model) {
        return {model: model};
    }

}

export default CheckBox