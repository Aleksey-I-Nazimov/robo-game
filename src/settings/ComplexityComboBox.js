import * as React from "react";


class ComplexityComboBox extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <select id={"ComplexityComboBox"}>
                <option value={"1"}>2x2</option>
                <option value={"2"}>5x5</option>
                <option value={"3"}>10x10</option>
                <option value={"4"}>15x10</option>
                <option value={"5"}>25x15</option>
                <option value={"6"}>От простого к сложному</option>
            </select>
        );
    }

}

export default ComplexityComboBox