export default class Comparator {
    /**
     * Constructor
     * @param {function(a: *, b: *)} [compareFunction] custom compare function
     */
    constructor(compareFunction) {
        this.compare = compareFunction || Comparator.defaultCompareFunction;
    }

    /**
     * Default comparison function. It assumes 'a' or 'b' are strings or numbers
     * @param {(string|number)} a
     * @param {(string|number)} b
     * @return {number}
     */
    static defaultCompareFunction(a, b){
        if(a === b){
            return 0;
        }

        return a < b ? -1 : 1;
    }

    /**
     * check if two variables are equal.
     * @param {*} a
     * @param {*} b
     * @param {boolean}
     */
    equal(a, b) {
        return this.compare(a, b) === 0;
    }

    /**
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    lessThan(a, b) {
        return this.compare(a, b) < 0;
    }

    /**
     * 
     * @param {*} a 
     * @param {*} b 
     * @returns {boolean}
     */
    greaterThan(a, b) {
        return this.compare(a, b) > 0;
    }

    /**
     * check if variable 'a' is less than or equal to 'b'.
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    lessThanOrEqual(a, b) {
        return this.lessThan(a, b) || this.equal(a, b);
    }

    /**
     * check if variable 'a' is greater than or equal to 'b'.
     * @param {*} a
     * @param {*} b
     * @param {boolean}
     */
    greaterThanOrEqual(a, b) {
        return this.greaterThan(a, b) || this.equal(a, b);
    }

    /**
     * Reverse the comparison order.
     */
    reverse() {
        const compareOriginial = this.compare;
        this.compare = (a, b) => compareOriginial(b, a);
    }
}