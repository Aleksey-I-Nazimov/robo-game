import * as React from "react";


class TimeControlComboBox extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <select id={"TimeControlSelector"}>
                <option value={"1"}>Выключено</option>
                <option value={"2"}>Включено</option>
                <option value={"3"}>Очень быстро</option>
                <option value={"4"}>Молния</option>
            </select>
        );
    }

}

export default TimeControlComboBox