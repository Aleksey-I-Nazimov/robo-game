import React from "react";


class ScenarioComboBox extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <select id={"ScenarioComboBox"}>
                <option value={"1"}>Ослик и капуста</option>
                <option value={"2"}>Пчела и цветок</option>
                <option value={"3"}>Волк и заяц</option>
                <option value={"4"}>Кошка и мышка</option>
                <option value={"5"}>Зайка и морковь</option>
            </select>
        );
    }

}

export default ScenarioComboBox