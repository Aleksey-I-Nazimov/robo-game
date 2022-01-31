
class ComboBoxModel {

    constructor(label, dictionaries) {
        this._label = label;
        this._dictionaries = dictionaries;
    }

    getLabel() {
        return this._label;
    }

    getDictionaries() {
        return this._dictionaries;
    }

    findDictionaryByKey(key) {
        for (let i = 0; i < this._dictionaries.length; ++i) {
            if (this._dictionaries[i].getKey() === key) {
                return this._dictionaries[i];
            }
        }
        return null;
    }

    findDictionaryByElement(element) {
        const key = element[element.selectedIndex].value;
        return this.findDictionaryByKey(key);
    }

}

export default ComboBoxModel

