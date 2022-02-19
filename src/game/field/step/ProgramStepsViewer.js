import React from "react";
import ArrowCalculator from "./ArrowCalculator";


class ProgramStepsViewer extends React.Component {

    constructor(props) {
        super(props);

        this.stepModel = props.stepModel;
        this.state = this.#makeState();
        this.cnt = 0;

        this.arrowCalculator = new ArrowCalculator();
    }

    onChangedStepArray(newStepArray) {
        this.setState(this.#makeState(newStepArray))
    }

    componentDidMount() {
        this.stepModel.addListener(this)
    }

    render() {
        return <div>{this.state.steps.map(buttonId => this.#makeButton(buttonId))}</div>
    }


    #makeState(stepList) {
        if (stepList === null || stepList === undefined) {
            return {steps: []}
        } else {
            return {steps: stepList};
        }
    }

    #makeButton(buttonId) {
        this.cnt++;
        if (this.arrowCalculator.isLeft(buttonId)) {
            return <img src={this.arrowCalculator.getLeftImg()} key={this.cnt} alt={this.cnt}/>;

        } else if (this.arrowCalculator.isUp(buttonId)) {
            return <img src={this.arrowCalculator.getUpImg()} key={this.cnt} alt={this.cnt}/>;

        } else if (this.arrowCalculator.isDown(buttonId)) {
            return <img src={this.arrowCalculator.getDownImg()} key={this.cnt} alt={this.cnt}/>;

        } else if (this.arrowCalculator.isRight(buttonId)) {
            return <img src={this.arrowCalculator.getRightImg()} key={this.cnt} alt={this.cnt}/>;

        } else {
            return <div key={this.cnt}/>
        }
    }

}

export default ProgramStepsViewer


