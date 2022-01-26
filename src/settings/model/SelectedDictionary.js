import Dictionary from "./Dictionary";


class SelectedDictionary extends Dictionary {

    constructor(key, value, selected) {
        super(key, value);
        this._selected = selected;
    }

    getSelected() {
        return this._selected;
    }

    toString() {
        return JSON.stringify(this);
    }

}

export default SelectedDictionary
