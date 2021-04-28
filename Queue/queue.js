import QueueNode from "./queueNode.js";

export default class Queue {
    // Basic constructor for our queue, need head and tail.
    // We need to remember that it's FIFO
    constructor(){
        this.head = null;
        this.tail = null;
    }

    /**
     * Check if the list is empty
     * @returns {boolean}
     */
    isEmpty() {
        return this.head == null;
    }

    /**
     * Check the value of the head, without removing it
     * @returns {*}
     */
    peek() {
        if(!this.head){
            return null;
        }
        return this.head.value;
    }

    /**
     * Add new node to the end of the line, to the tail.
     * This element is going to be processed after all ementes ahead of it.
     * @param {*} value 
     */
    enqueue(value){
        let newNode = new QueueNode(value);
        // Check if head exist
        if(!this.head){
            this.head = newNode;
            this.tail = newNode;
        }
        // Add to the end
        // Point the already tail to our new node
        this.tail.next = newNode;
        // Add our new node to be the new tail
        this.tail = newNode;
    }

    /**
     * FIFO, the head is removed.
     * If empty return null
     * @returns  {null | QueueNode}
     */
    dequeue(){
        // Check head if exist;
        if(!this.head){
            return null;
        }
        //Store to send it;
        const removedNode = this.head;

        if(!this.head.next){
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
        }
        return removedNode;
    }

    /**
     * Using callbacks to call our node until the end, then make it a string
     * @param {*} callback 
     * @returns {String}
     */
    toString() {
        let currentNode = this.head;
        let stringNode = "";

        // Cicle
        while(currentNode){
            stringNode = stringNode + currentNode.data + " ";
            currentNode = currentNode.next;
        }

        return stringNode;
    }
}