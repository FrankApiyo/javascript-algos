import LinkedList from '../linked-list/LinkedList';

export default class Queue {
    constructor() {
        this.linkedList = new LinkedList();
    }

    /**
     * @return {boolean}
     */
    isEmpty() {
        return !this.linkedList.head;
    }

    /**
     * Read the elements at the front of the queue without removing it
     * @return {*}
     */
    peek() {
        if(!this.linkedList.head){
            return null;
        }

        return this.linkedList.head.value;
    }

    /**
     * Add element to the back of the queue
     * @param
     * @returns 
     */
    enqueue(element) {
        this.linkedList.append(element);

        return this;
    }

    /**
     * Remove the element at the front of the queue(the head of the linkedList)
     * If the queue is empty, return null
     * @return {*}
     */
    dequeue() {
        const removedHead = this.linkedList.deleteHead();
        return removedHead ? removedHead.value : null;
    }

    /**
     * @param [callback]
     * @return {string}
     */
    toString(callback) {
        // Return string representation of the queue's linked list
        return this.linkedList.toString(callback);
    }
}