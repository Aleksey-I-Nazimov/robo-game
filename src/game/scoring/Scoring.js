class Scoring {


    constructor() {
        this.positive = 0;
        this.negative = 0;
        this.bonus = 1000;
        this.penalty = 1000;
        this.salary = 100;
    }


    makeStep() {
        this.positive += this.salary;
    }

    makeBonus() {
        this.positive += this.bonus;
    }

    makePenalty() {
        this.negative += this.penalty;
    }

    getPositive() {
        return this.positive;
    }

    getNegative() {
        return this.negative;
    }

    getOverall() {
        return this.positive - this.negative;
    }

    toString() {
        return JSON.stringify(this);
    }

}

export default Scoring;