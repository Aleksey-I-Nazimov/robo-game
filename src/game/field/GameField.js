import * as React from "react";
import '../../App.css';


class GameField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {gameFieldModel: props.gameFieldModel};

        props.stepGenerator.addListener(this);
    }

    onOriginalModel(model) {
        this.setNewModel(model);
    }

    onGeneratedModel(model) {
        this.setNewModel(model);
    }

    setNewModel(newModel) {
        this.setState({gameFieldModel: newModel});
    }

    renderRows() {
        const model = this.state.gameFieldModel;
        return model.getRowArray().map(
            rowIndex => {
                return (
                    <tr className="table-cell"
                        key={rowIndex}>{this.renderColumnsOfTheRow(rowIndex)}</tr>
                )
            }
        );
    }

    renderColumnsOfTheRow(rowIndex) {
        const model = this.state.gameFieldModel;
        return model.getColumnArray().map(
            columnIndex => {
                if (model.getSourcePoint().isEqualToRowColumn(rowIndex, columnIndex)) {
                    return this.renderCell(columnIndex, model.getSourceImg());

                } else if (model.getTargetPoint().isEqualToRowColumn(rowIndex, columnIndex)) {
                    return this.renderCell(columnIndex, model.getTargetImg());

                } else {
                    return <td className="table-cell" key={columnIndex}/>
                }
            }
        );
    }

    renderCell(index, imgSrc) {
        return <td className="table-cell" key={index}>
            <img className="grid-cell" src={imgSrc} alt=''/>
        </td>
    }

    render() {
        return (
            <table className="game-field-table">
                <tbody>{this.renderRows()}</tbody>
            </table>
        );
    }

}

export default GameField