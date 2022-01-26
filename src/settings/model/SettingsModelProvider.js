class SettingsModelProvider {

    constructor(settingsModel) {
        this._settingsModel = settingsModel;
        this._listeners = [];
    }

    addListener(listener) {
        this._listeners.push(listener);
        return this;
    }

    getSettingsModel() {
        return this._settingsModel;
    }

    acceptNewSettingsModel(settingsModel) {
        this._settingsModel = settingsModel;
        this.#notify();
    }

    #notify() {
        this._listeners.forEach(
            l => {
                if (l.onChangedSettings !== undefined) {
                    l.onChangedSettings(this._settingsModel);
                }
            }
        );
    }

}

export default SettingsModelProvider