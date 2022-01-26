class Dictionary {

    constructor(key, value) {
        this._key = key;
        this._value = value;
    }

    getKey() {
        return this._key;
    }

    getValue() {
        return this._value;
    }

    isEqual(dictionary) {
        return this._key === dictionary.getKey() &&
            this._value === dictionary.getValue();
    }

}

export default Dictionary