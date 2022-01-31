import * as React from "react";


class ScoreField extends React.Component {

    constructor(props) {
        super(props);

        this.state = {scores: 0};
        props.scoreModel.addListener(this);
    }

    onScoring(overallScores) {
        this.setState({scores: overallScores});
    }

    render() {
        return <div>Очки: {this.state.scores}</div>
    }

}

export default ScoreField