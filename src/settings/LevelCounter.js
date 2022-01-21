import * as React from "react";


class LevelCounter extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<input type={"range"} min={2} max={30}/>);
    }

}

export default LevelCounter