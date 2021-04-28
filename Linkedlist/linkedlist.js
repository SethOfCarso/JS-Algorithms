import LinkedListNode from './linkedlistNode.js';
import Comparator from '../Comparator/comparator.js';


/**
 * We need to add basic operations for our linked list
 * Add, delete, search, print.
 */

export default class LinkedList {
    /***
     * Initiante our constructor with nothing.
     */
    constructor() {
        this.head = null;
        this.tail = null;
    }


    /**
     * Add to the head of the list.
     * @param {*} value 
     * @returns {LinkedList}
     */
    prepend(value) {
        // Make new node to be a head.
        const newNode = new LinkedListNode(value, this.head);
        this.head = newNode;

        // If there is no tail yet, we make our new node the tail.
        if (!this.tail) {
            this.tail = newNode;
        }
        return this;
    }


    /**
     * Add to the end.
     * @param {*} value 
     * @returns {LinkedList}
     */
    append(value) {
        const newNode = new LinkedListNode(value);

        // if there is no head, let make a the new node the head.
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;

            return this;
        }

        // Attach the new node to the end of the list.
        this.tail.next = newNode;
        this.tail = newNode;

        return this;
    }

    /**
     * Delete node
     * @param {*} value 
     * @returns {LinkedList} deletedNode, if null we did not find what to delete.
     */
    delete(value) {
        if (!this.head) {
            return null;
        }

        let deletedNode = null;
        // If the head need to be deleted we make the next node to be the
        // new head.
        // console.log(this.head.value);
        // console.log(value);
        
        
        while (this.head && this.head.value == value) {
            deletedNode = this.head;
            this.head = this.head.next;
        }

        let currentNode = this.head;

        if (currentNode !== null) {
            // If the next node mut be deleted then make next linked to next next node.
            while (currentNode.next) {
                if (currentNode.next.value == value) {
                    deletedNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                } else {
                    currentNode = currentNode.next;
                }
            }
        }

        // Check if the tail must be deleted.
        if(this.tail.value == value) {
            this.tail = currentNode;
        }

        return deletedNode;
    }

    /**
     * find the value in our linked list.
     * @param {*} findParams.value
     * @param{function} [findParams.callback]
     * @returns {linkedListNode} with the value || null.
     */
     find({ value = undefined, callback = undefined }) {
        // If our head doesn't exit just return null.
        if (!this.head) {
            return null;
        }

        let currentNode = this.head;

        while (currentNode) {
            // if value is specified then try to compare by value.
            if (callback && callback(currentNode.value)) {
                return currentNode;
              }
            
            if (value !== undefined && currentNode.value == value) {
                return currentNode;
            }

            currentNode = currentNode.next;
        }

        return null;
    }

    /**
     * @returns {linkedListNode} just the tail || null.
     */
    deleteTail() {
        const deletedTail = this.tail;

        if (this.head === this.tail) {
            // there is only one node in the list.
            this.head = null;
            this.tail = null;

            return deletedTail;
        }

        // If there are multiple nodes in the linked list.
        // We need to rewind the tail to the one before.

        let currentNode = this.head;
        while (currentNode.next) {
            if (!currentNode.next.next) {
                currentNode.next = null;
            } else {
                currentNode = currentNode.next;
            }
        }
        // Out of the loop we make our node the tail.
        this.tail = currentNode;

        return deletedTail;
    }

    /**
     * 
     * @returns {linkedListNode} head || null.
     */
    deleteHead() {
        // If head doesn't exist.
        if (!this.head) {
            return null;
        }

        const deletedHead = this.head;

        // if our head has a next one, we make that the new head.
        if (this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }

        return deletedHead;
    }

    /**
     * From array to linked list.
     * @param {*[]} values - Array of values that need to be linked list
     * @return {LinkedList}
     */
    fromArray(values) {
        // For each value, we use our append function to insert it into the linked list.
        values.forEach((value => this.append(value)));

        return this;
    }

    /**
     * linkedList to array.
     * @returns {linkedListNode[]}
     */
    toArray() {
        const nodes = [];

        let currentNode = this.head;
        // Cicle for each node to push it to the array.
        while(currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }

    /**
     * Linked list to string
     * @param  
     * @returns {string}
     */
    toString () {
        let currentNode = this.head;
        let nodeString = "";
        while(currentNode){
            nodeString = nodeString + currentNode.value + " -> ";
            currentNode = currentNode.next;
        }
        return nodeString
    }

    /**
     * Reverse all the linked list
     * @returns {LinkedList}
     */
    reverse(){
        let currNode = this.head;
        let prevNode = null;
        let nextNode = null;

        while(currNode) {
            // Store the next node
            nextNode = currNode.next;

            // Chjange next node of the current node so it would link to the previous node.
            currNode.next = prevNode;

            // Move prevNode and CurrNode one step forward.
            prevNode = currNode;
            currNode = nextNode;
        }

        // Reset head and tail.
        this.tail = this.head;
        this.head = prevNode;

        return this;
    }
}