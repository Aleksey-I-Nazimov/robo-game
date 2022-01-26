import * as React from "react";


class ComboBox extends React.Component {

    constructor(props) {
        super(props);

        this.id = props.id;
        this.handler = props.handler;
        this.state = this.#makeState(props.model);
        this.cnt = this.id;

        if (props.componentList !== undefined) {
            props.componentList.push(this);
        }

        this.onChange = this.onChange.bind(this);
    }

    setModel(model) {
        this.setState(this.#makeState(model));
    }

    onChange() {
        const element = window.document.getElementById(this.id);
        const dictionary = this.state.model.findDictionaryByElement(element);
        this.handler(dictionary);
    }

    render() {
        return (
            <select id={this.id} onChange={this.onChange}>
                {this.#renderOptions()}
            </select>
        );
    }

    #renderOptions() {
        return this.state.model
            .getDictionaries()
            .map(d => {
                this.cnt = this.cnt + "x";
                if (d.getSelected()) {
                    return <option key={this.cnt} defaultValue value={d.getKey()}>{d.getValue()}</option>
                } else {
                    return <option key={this.cnt} value={d.getKey()}>{d.getValue()}</option>
                }
            });
    }

    #makeState(model) {
        return {model: model};
    }

}

export default ComboBox