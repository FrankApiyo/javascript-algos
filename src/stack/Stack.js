import LinkedList from '../linked-list/LinkedList';

export default class Stack {
    constructor() {
        this.linkedList = new LinkedList();
    }

    /**
     * @return {boolean}
     */
    isEmpty() {
        // The stack is empty is it's linked list doesn't have a head
        return !this.linkedList.head;
    }

    /**
     * @return {*}
     */
    peek() {
        if (this.isEmpty()) {
            // if the linkedlist is empty then there's nothing to peek from
            return null;
        }

        return this.linkedList.head.value;
    }

    /**
     * @param {*} value
     */
    push(value) {
        // lay a value on top of the stack
        this.linkedList.prepend(value);
    }

    /**
     * @return {*}
     */
    pop() {
        const removedHead = this.linkedList.deleteHead();
        return removedHead ? removedHead.value : null;
    }

    /**
     * @return {*[]}
     */
    toArray() {
        return this.linkedList
            .toArray()
            .map((linkedListNode) => linkedListNode.value);
    }

    /**
     * @param {function} [callback]
     * @return {string}
     */
    toString(callback) {
        return this.linkedList.toString(callback);
    }
}