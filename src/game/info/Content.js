class Content {

    constructor(key, text, img, sound, techExtension) {
        this._key = key;
        this._text = text;
        this._img = img;
        this._sound = sound;
        this._techExtension = techExtension;
    }


    getKey() {
        return this._key;
    }

    getText() {
        return this._text;
    }

    getImg() {
        return this._img;
    }

    getSound() {
        return this._sound;
    }

    getTechExtension() {
        return this._techExtension;
    }

    toString() {
        return JSON.stringify(this);
    }

}

export default Content