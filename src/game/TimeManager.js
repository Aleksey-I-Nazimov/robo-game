class TimeManager {

    constructor(game, gameOverCallback) {

        this.game = game;
        this.gameOverCallback = gameOverCallback;

        this.timestampMs = 100;
        this.gameTimeMs = 0;
        this.timeoutControllerId = null;

        this.listeners = [];
    }

    addListener(listener) {
        this.listeners.push(listener);
        return this;
    }

    setOriginalGameFieldModel() {
        console.log("TimeManager: Setting the new original game field model");
        if (this.#isStarted) {
            this.#stopTimeoutController(this, false);
        }
        this.#startTimeControl();
        return this;
    }

    stopTimer() {
        this.#stopTimeoutController(this, false);
    }

    #startTimeControl() {
        const timeout = this.game.getTimeoutMs();
        const $ = this;

        if (!$.#isStarted() && timeout > 0) {
            console.log("TimeManager: Starting time control. Timeout =", timeout);
            $.timeoutControllerId = setInterval(
                () => {

                    $.#notifyTimeValue();
                    $.gameTimeMs = $.gameTimeMs + $.timestampMs;
                    if ($.gameTimeMs >= timeout) {
                        $.#stopTimeoutController($, true);
                    }

                },

                $.timestampMs
            )
        }
    }

    #stopTimeoutController($, isGameOver) {

        if ($.#isStarted()) {

            console.log("TimeManager: Stop event. Time (ms): ", $.gameTimeMs, $.game.getTimeoutMs());
            $.#clear();
            $.#notifyTimeValue();

            if (isGameOver) {
                $.#notifyGameOver(false);
            }
        }
    }

    #notifyGameOver(success) {
        console.log("TimeManager: Game over: success=", success);

        this.listeners.forEach(
            l => {
                if (l.onGameOver !== undefined) {
                    l.onGameOver(success)
                }
            }
        );
        this.gameOverCallback.onGameOver(success);
    }

    #notifyTimeValue() {
        this.listeners.forEach(
            l => {
                if (l.onGameTime !== undefined) {
                    l.onGameTime(this.gameTimeMs, this.timestampMs, this.game.getTimeoutMs());
                }
            }
        );
    }

    #isStarted() {
        return this.timeoutControllerId !== null;
    }

    #clear() {
        clearInterval(this.timeoutControllerId);
        this.timeoutControllerId = null;
        this.gameTimeMs = 0;
    }

}

export default TimeManager