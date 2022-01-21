import * as React from "react";
import ClickButton from "../elements/ClickButton";


class ResultPanel extends React.Component {

    constructor(props) {
        super(props)
    }


    render() {
        return <div>
            <ClickButton text={"Пробуем заново"}/>
            <ClickButton text={"К настройкам"}/>
        </div>
    }

}