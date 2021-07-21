import Comparator from '../comparator/Comparator';
import HashTable from '../hash-table/HashTable';

export default class BinaryTreeNode {
    /**
     * @param {*} [value] - node value.
     */
    constructor(value = null) {
        this.left = null;
        this.right = null;
        this.parent = null;
        this.value = value;

        // Any node related meta inforamtion may be stored here
        this.meta = new HashTable();

        // This comparator is used to compare binary tree nodes with each other.
        this.nodeComparator = new Comparator();
    }

    /**
     * @return {Number}
     */
    get leftHeight() {
        if (!this.left) {
            return 0;
        }

        return this.left.height + 1;
    }

    /**
     * @return {number}
     */
    get rightHeight() {
        if(!this.right) {
            return 0;
        }

        return this.right.height + 1;
    }

    /**
     * @return {number}
     */
    get height() {
        return Math.max(this.leftHeight, this.rightHeight);
    }

    /**
     * @return {number}
     */
    get balanceFactor() {
        return this.leftHeight - this.rightHeight;
    }

    /**
     * Get the parent's sibling if it exists.
     * @return {BinaryTreeNode}
     */
    get uncle() {
        // check if the current node has parent.
        if (!this.parent) {
            return undefined;
        }

        // check if the current node has grand parent.
        if(!this.parent.parent) {
            return undefined;
        }

        // check if grand parent has two children.
        if (!this.parent.parent.left || !this.parent.parent.right) {
            return undefined;
        }

        // find the uncle
        if (this.nodeComparator.equal(this.parent, this.parent.parent.left)) {
            return this.parent.parent.right;
        }

        // Left one is uncle
        return this.parent.parent.left;
    }


    /**
     * @param {*} value
     * @return {BinaryTreeNode}
     */
    setValue(value) {
        this.value = value;

        return this;
    }

    /**
     * @param {BinaryTreeNode} node
     * @return {BinaryTreeNode}
     */
    setLeft(node) {
        if (this.left) {
            this.left.parent = null;
        }

        this.left = node;

        // make the current node the parent of new left one
        if (this.left) {
            this.left.parent = this;
        }

        return this;
    }

    /**
     * @param {BinaryTreeNode} node
     * @return {BinaryTreeNode}
     */
    setRight(node) {
        // Reset parent for right node since it's going to be detatched
        if (this.right) {
            this.right.parent = null;
        }

        // Attach new node to the right.
        this.right = node;

        // Make the current node to be a parent of new right one.
        if (node) {
            this.right.parent = this;
        }

        return this;
    }

    /**
     * @param {BinaryTreeNode} nodeToRemove
     * @return {boolean}
     */
    removeChild(nodeToRemove) {
        if (this.left && this.nodeComparator.equal(this.left, nodeToRemove)) {
            this.left = null;
            return true;
        }

        if (this.right && this.nodeComparator.equal(this.right, nodeToRemove)) {
            this.right = null;
            return true;
        }

        return false;
    }

    /**
     * @param {BinaryTreeNode} nodeToReplace
     * @param {BinaryTreeNode} replacementNode
     * @return {boolean}
     */
    replaceChild(nodeToReplace, replacementNode) {
        if (!nodeToReplace || !replacementNode) {
            return false;
        }

        if (this.left && this.nodeComparator.equal(this.left, nodeToReplace)) {
            this.left = replacementNode;
            return true;
        }

        if (this.right && this.nodeComparator.equal(this.right, nodeToReplace)) {
            this.right = replacementNode;
            return true;
        }

        return false;
    }

    /**
     * @param {BinaryTreeNode} sourceNode
     * @param {BinaryTreeNode} targetNode
     */
    static copyNode(sourceNode, targetNode) {
        targetNode.setValue(sourceNode.value);
        targetNode.setLeft(sourceNode.left);
        targetNode.setRight(sourceNode.right);
    }

    /**
     * @return {*[]}
     */
    traverseInOrder() {
        let traverse = [];

        // Add left node.
        if (this.left) {
            traverse = traverse.concat(this.left.traverseInOrder());
        }

        // Add root.
        traverse.push(this.value);

        if (this.right) {
            traverse = traverse.concat(this.right.traverseInOrder());
        }

        return traverse;
    }

    /**
     * @return {string}
     */
    toString() {
        return this.traverseInOrder().toString();
    }
}