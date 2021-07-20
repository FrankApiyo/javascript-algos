import BinarySearchTreeNode from './BinarySearchTreeNode';

export default class BinarySearchTree {
    /**
     * @param {function} [nodeValueCompareFunction]
     */
    constructor(nodeValueCompareFunction) {
        this.root = new BinarySearchTreeNode(null, nodeValueCompareFunction);

        // steal node comparator from the root.
        this.nodeComparator = this.root.nodeComparator;
    }

    /**
     * @param {*} value
     * @return {BinarySearchTreeNode}
     */
    insert(value) {
        return this.root.insert(value);
    }

    /**
     * @param {*} value
     * @return {boolean}
     */
    contains(value) {
        return this.root.contains(value);
    }

    /**
     * @pram {*} value
     * @return {boolean}
     */
    remove(value) {
        return this.root.remove(value);
    }

    /**
     * @return {string}
     */
    toString() {
        this.root.toString();
    }
}