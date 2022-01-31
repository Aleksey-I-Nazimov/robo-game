class TimeCalculator {

    calculateFullTime(difficultyContent, timeContent) {

        const diff = difficultyContent.getTechExtension();
        const extension = timeContent.getTechExtension();

        if (extension.enabled) {
            return 1.4 * Math.max(diff.width, diff.height) * extension.timeCoefficient;
        } else {
            return -1;
        }

    }

}