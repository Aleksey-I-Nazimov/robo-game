import Point from "../Point";
import GameFieldModel from "../GameFieldModel";
import ContentFactory from "../../info/ContentFactory";


class GameFieldFactory {

    constructor(settingsModelProvider) {
        this.settingsModelProvider = settingsModelProvider;
        this.contentFactory = new ContentFactory();
    }

    makeGameFields() {
        const settings = this.settingsModelProvider.getSettingsModel();
        const levelNumber = settings.getLevelNumber();
        const scenario = settings.getScenario();
        const difficulty = settings.getDifficulty();

        const srcImg = this.#decodeSrcImg(scenario);
        const targetImg = this.#decodeTrgImg(scenario);
        const point = this.#decodeDifficulty(difficulty);
        const gameFields = new Array(levelNumber);

        for (let i = 0; i < levelNumber; ++i) {
            gameFields.push(GameFieldFactory.makeGameField(i, srcImg, targetImg, point));
        }

        return gameFields;
    }

    #decodeSrcImg(scenarioDictionary) {
        return this.contentFactory
            .resolveContentByKey(scenarioDictionary.getKey())
            .getTechExtension()
            .first;
    }

    #decodeTrgImg(scenarioDictionary) {
        return this.contentFactory
            .resolveContentByKey(scenarioDictionary.getKey())
            .getTechExtension()
            .second;
    }

    #decodeObstacleImg() {
        return null;
    }

    #decodeDifficulty(defficultyDictionary) {
        const point = this.contentFactory
            .resolveContentByKey(defficultyDictionary.getKey())
            .getTechExtension();

        return new Point(point.height, point.width);
    }

    static makeGameField(i, srcImg, targetImg, maxPoint) {

        const srcPoint = Point.getRandPoint(maxPoint.getRow(), maxPoint.getColumn(), null);

        return new GameFieldModel(
            maxPoint,
            srcPoint,
            Point.getRandPoint(maxPoint.getRow(), maxPoint.getColumn(), srcPoint),
            srcImg,
            targetImg
        );
    }

}

export default GameFieldFactory