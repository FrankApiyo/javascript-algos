import BinaryTreeNode from '../BinaryTreeNode';
import Comparator from '../../comparator/Comparator';

export default class BinarySearchTreeNode extends BinaryTreeNode {
    /**
     * @param {*} [value] - node value
     * @param {function} [comparaFunction] - comparator function
     */
    constructor(value = null, compareFunction = undefined) {
        super(value);

        // This comparator is used to compare node values with each other
        this.compareFunction = compareFunction;
        this.nodeValueComparator = new Comparator(compareFunction);
    }

    /**
     * @param {*} value
     * @return {BinarySearchTreeNode}
     */
    insert(value) {
        if (this.nodeValueComparator.equal(this.value, null)) {
            this.value = value;

            return this;
        }

        if (this.nodeValueComparator.lessThan(value, this.value)) {
            // Insert to left.
            if (this.left) {
                return this.left.insert(value);
            }

            const newNode = new BinarySearchTreeNode(value, this.compareFunction);
            this.setLeft(newNode);

            return newNode;
        }

        if (this.nodeValueComparator.greaterThan(value, this.value)) {
            // Insert to the right.
            if (this.right) {
                return this.right.insert(value);
            }

            const newNode = new BinarySearchTreeNode(value, this.compareFunction);
            this.setRight(newNode);

            return newNode;
        }

        return this;
    }

    /**
     * @param {*} value
     * @return {BinarySearchTreeNode}
     */
    find(value) {
        // Check root
        if (this.nodeValueComparator.equal(this.value, value)) {
            return this;
        }

        if (this.nodeValueComparator.lessThan(value, this.value)) {
            // Check the left nodes
            return this.left.find(value);
        }

        if (this.nodeValueComparator.greaterThan(value, this.value)) {
            // Check the right nodes
            return this.right.find(value);
        }

        return null;
    }

    /**
     * @param {*} value
     * @return {boolean}
     */
    contains(value) {
        return !!this.find(value);
    }

    /**
     * @param {*} value
     * @return {boolean}
     */
    remove(value) {
        const nodeToRemove = this.find(value);

        if (!nodeToRemove) {
            throw new Error('Item not found in the tree');
        }

        const { parent } = nodeToRemove;

        if (!nodeToRemove.left && !nodeToRemove.right) {
            // Node is a left and thus no children
            if (parent) {
                parent.removeChild(nodeToRemove);
            } else {
                // Node has no parent. Just erase the current node value
                nodeToRemove.setValue(undefined);
            }
        } else if (nodeToRemove.left && nodeToRemove.right) {
            // Node has 2 children
            // Find the next biggest value (minimum value in the right branch)
            // and replace the current node value with that next biggest value.
            const nextBiggerNode = nodeToRemove.right.findMin();
            if (!this.nodeComparator.equal(nextBiggerNode, nodeToRemove.right)) {
                this.remove(nextBiggerNode.value);
                nodeToRemove.setValue(nextBiggerNode.value);
            } else {
                // In case if the next right value is the next bigger and it does not have a left child
                // then just replace the node that is going to be deleted with the right node.
                nodeToRemove.setValue(nodeToRemove.right.value);
                nodeToRemove.setRight(nodeToRemove.right.right);
            }
        } else {
            // node has only one child.
            // make the child to be a direct child of current node's parent
            /** @var BinarySearchTreeNode */
            const childNode = nodetoRemove.left || nodeToRemove.right;

            if (parent) {
                parent.replaceChild(nodeToRemove, childNode);
            } else {
                BinaryTreeNode.copyNode(childNode, nodeToRemove);
            }
        }

        // clear the parent of removed node.
        nodeToRemove.parent = null;

        return true;
    }
    /**
         * @return {BinarySearchTreeNode}
         */
     findMin() {
        if (!this.left) {
            return this;
        }

        return this.left.findMin();
    }
}