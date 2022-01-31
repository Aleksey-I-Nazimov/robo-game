import Content from "./Content";


class ContentFactory {

    constructor() {
        this.createProgKey = "createProgKey";
        this.checkProgKey = "checkProgKey";

        this.donkeyCabbageKey = "donkeyCabbageKey";
        this.beeFlowerKey = "beeFlowerKey";
        this.wolfRabbitKey = "wolfRabbitKey";
        this.catMouseKey = "catMouseKey";
        this.rabbitCarrotKey = "rabbitCarrotKey";

        this.twoTwoKey = "twoTwoKey";
        this.fiveFiveKey = "fiveFiveKey";
        this.tenTenKey = "tenTenKey";
        this.fifteenTenKey = "fifteenTenKey";
        this.twentyFifteenKey = "twentyFifteenKey";

        this.timeDisabledKey = "timeDisabledKey";
        this.timeEnabledKey = "timeEnabledKey";
        this.shortTimeKey = "shortTimeKey";
        this.shortestTimeKey = "shortestTimeKey";

        this.infoMap = new Map();

        this.infoMap.set(this.createProgKey, this.createProgramTypeInfo);
        this.infoMap.set(this.checkProgKey, this.checkProgramTypeInfo);
        this.infoMap.set(this.donkeyCabbageKey, this.donkeyCabbageInfo);
        this.infoMap.set(this.beeFlowerKey, this.beeFlowerInfo);
        this.infoMap.set(this.wolfRabbitKey, this.wolfRabbitInfo);
        this.infoMap.set(this.catMouseKey, this.catMouseInfo);
        this.infoMap.set(this.rabbitCarrotKey, this.rabbitCarrotInfo);
        this.infoMap.set(this.twoTwoKey, this.twoTwoInfo);
        this.infoMap.set(this.fiveFiveKey, this.fiveFiveInfo);
        this.infoMap.set(this.tenTenKey, this.tenTenInfo);
        this.infoMap.set(this.fifteenTenKey, this.fifteenTenInfo);
        this.infoMap.set(this.twentyFifteenKey, this.twentyFifteenInfo);
        this.infoMap.set(this.timeDisabledKey, this.timeDisabledInfo);
        this.infoMap.set(this.timeEnabledKey, this.timeEnabledInfo);
        this.infoMap.set(this.shortTimeKey, this.shortTimeInfo);
        this.infoMap.set(this.shortestTimeKey, this.shortestTimeInfo);
    }


    createProgramTypeInfo() {
        return new Content(this.createProgKey, "Составить программу");
    }

    checkProgramTypeInfo() {
        return new Content(this.checkProgKey, "Тест. Проверить программу");
    }


    donkeyCabbageInfo() {
        return new Content(this.donkeyCabbageKey, "Ослик и капуста", null, null,
            {
                first: "https://img.icons8.com/external-icongeek26-flat-icongeek26/64/000000/external-donkey-animal-faces-icongeek26-flat-icongeek26.png",
                second: "https://img.icons8.com/external-icongeek26-flat-icongeek26/64/000000/external-cabbage-fruits-and-vegetables-icongeek26-flat-icongeek26.png"
            });
    }

    beeFlowerInfo() {
        return new Content(this.beeFlowerKey, "Пчела и цветок", null, null,
            {
                first: "https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/60/000000/external-bee-spring-vitaliy-gorbachev-lineal-color-vitaly-gorbachev.png",
                second: "https://img.icons8.com/fluency/48/000000/flower-doodle.png"
            });
    }

    wolfRabbitInfo() {
        return new Content(this.wolfRabbitKey, "Волк и заяц", null, null,
            {
                first: "https://img.icons8.com/emoji/48/000000/wolf-emoji.png",
                second: "https://img.icons8.com/external-photo3ideastudio-flat-photo3ideastudio/64/000000/external-rabbit-spring-photo3ideastudio-flat-photo3ideastudio.png"
            });
    }

    catMouseInfo() {
        return new Content(this.catMouseKey, "Кошка и мышка", null, null,
            {
                first: "https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-cat-dog-and-cat-justicon-lineal-color-justicon-1.png",
                second: "https://img.icons8.com/emoji/48/000000/mouse-body-emoji.png"
            }
        );
    }

    rabbitCarrotInfo() {
        return new Content(this.rabbitCarrotKey, "Заяц и морковь", null, null,
            {
                first: "https://img.icons8.com/external-photo3ideastudio-flat-photo3ideastudio/64/000000/external-rabbit-spring-photo3ideastudio-flat-photo3ideastudio.png",
                second: "https://img.icons8.com/external-vitaliy-gorbachev-flat-vitaly-gorbachev/58/000000/external-carrot-easter-vitaliy-gorbachev-flat-vitaly-gorbachev.png"
            });
    }


    twoTwoInfo() {
        return new Content(this.twoTwoKey, "2x2", "", "", {width: 2, height: 2});
    }

    fiveFiveInfo() {
        return new Content(this.fiveFiveKey, "5x5", "", "", {width: 5, height: 5});
    }

    tenTenInfo() {
        return new Content(this.tenTenKey, "10x10", "", "", {width: 10, height: 10});
    }

    fifteenTenInfo() {
        return new Content(this.fifteenTenKey, "15x10", "", "", {width: 15, height: 10});
    }

    twentyFifteenInfo() {
        return new Content(this.twentyFifteenKey, "25х15", "", "", {width: 25, height: 15});
    }


    timeDisabledInfo() {
        return new Content(this.timeDisabledKey, "Выключено");
    }

    timeEnabledInfo() {
        return new Content(this.timeEnabledKey, "Включено");
    }

    shortTimeInfo() {
        return new Content(this.shortTimeKey, "Очень быстро");
    }

    shortestTimeInfo() {
        return new Content(this.shortestTimeKey, "Молния");
    }

    resolveContentByKey(key) {
        return this.infoMap.get(key)();
    }

}

export default ContentFactory