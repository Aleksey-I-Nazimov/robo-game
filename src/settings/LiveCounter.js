import * as React from "react";


class LiveCounter extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<input type={"range"} min={2} max={9}/>);
    }

}

export default LiveCounter