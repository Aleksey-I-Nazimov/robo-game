import * as React from "react";


class ScoreField extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.#makeState(0, 0);
        props.scoreModel.addListener(this);
        props.timeManager.addListener(this);
    }

    onScoring(overallScores) {
        console.log("ScoredField: Changing score field state. Overall=", overallScores);
        this.setState(this.#makeState(overallScores, this.state.time));
    }

    onGameTime(timeMs) {
        this.setState(this.#makeState(this.state.scores, timeMs))
    }

    render() {
        return <div>Очки: {this.state.scores} time (ms): {this.state.time}</div>
    }

    #makeState(scores, time) {
        return {scores: scores, time: time};
    }

}

export default ScoreField