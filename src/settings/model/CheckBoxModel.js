class CheckBoxModel {

    constructor(label, checked) {
        this._label = label;
        this._checked = checked;
    }

    findState(element) {
        return element.checked;
    }

    getLabel() {
        return this._label;
    }

    getChecked() {
        return this._checked;
    }

}

export default CheckBoxModel