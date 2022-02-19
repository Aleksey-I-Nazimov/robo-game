import * as React from "react";
import ArrowCalculator from "./ArrowCalculator";
import ClickButton from "../../../elements/ClickButton";


class ProgramButtonGroup extends React.Component {

    constructor(props) {
        super(props);

        this.stepModel = props.stepModel;
        this.arrowCalculator = new ArrowCalculator();

        this.handleDown = this.handleDown.bind(this);
        this.handleLeft = this.handleLeft.bind(this);
        this.handleUp = this.handleUp.bind(this);
        this.handleRight = this.handleRight.bind(this);
    }

    componentDidMount() {
        window.document.addEventListener(
            "keydown",
            e => {
                if (this.arrowCalculator.isLeft(e.code)) {
                    this.makeClick(this.arrowCalculator.getLeft());

                } else if (this.arrowCalculator.isUp(e.code)) {
                    this.makeClick(this.arrowCalculator.getUp());

                } else if (this.arrowCalculator.isDown(e.code)) {
                    this.makeClick(this.arrowCalculator.getDown());

                } else if (this.arrowCalculator.isRight(e.code)) {
                    this.makeClick(this.arrowCalculator.getRight())
                }

                console.log(e.code)
            },
            false);
    }

    handleLeft() {
        this.stepModel.addLeft();
    }

    handleUp() {
        this.stepModel.addUp();
    }

    handleDown() {
        this.stepModel.addDown();
    }

    handleRight() {
        this.stepModel.addRight();
    }

    onAction(actionId) {
        this.stepModel.removeLast();
    }

    makeClick(id) {
        window.document.getElementById(id).click()
    }

    render() {
        return <div>
            <img src={this.arrowCalculator.getLeftImg()} id={this.arrowCalculator.getLeft()}
                 onClick={this.handleLeft}
                 onTouchStart={this.handleLeft} alt={"The left button"}/>
            <img src={this.arrowCalculator.getUpImg()} id={this.arrowCalculator.getUp()}
                 onClick={this.handleUp}
                 onTouchStart={this.handleUp} alt={"The right button"}/>
            <img src={this.arrowCalculator.getDownImg()} id={this.arrowCalculator.getDown()}
                 onClick={this.handleDown}
                 onTouchStart={this.handleDown} alt={"The down button"}/>
            <img src={this.arrowCalculator.getRightImg()} id={this.arrowCalculator.getRight()}
                 onClick={this.handleRight}
                 onTouchStart={this.handleRight} alt={"The right button"}/>
            <ClickButton text={"Удалить шаг"} actionId={"Remove step"} listeners={[this]}/>
        </div>
    }

}

export default ProgramButtonGroup