import * as React from "react";


class ScoreField extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.#makeState(0);
        props.scoreModel.addListener(this);
    }

    onScoring(overallScores) {
        console.log("ScoredField: Changing score field state. Overall=", overallScores);
        this.setState(this.#makeState(overallScores));
    }

    render() {
        return <div>Очки: {this.state.scores}</div>
    }

    #makeState(scores) {
        return {scores: scores};
    }

}

export default ScoreField