import DoubleLinkListNode from './DoubleLinkedListNode.js'
import Comparator from '../Comparator/comparator.js'


/**
 * Is to create a double linked list, each node need to have:
 * Data, previous, next.
 * Also de list need to have a head and a tail.
 * 
 */
export default class DoubleLinkedList {

    constructor () {
        this.head = null;
        this.tail = null;
    }

    // Insert

    /**
     * Insert before the head.
     * @param {*} value to add to the linkedList
     * @return {DoubleLinkList}  
     */
    prepend(value) {
        // Need to make a new head.
        const newNode = new DoubleLinkListNode(value, this.head);

        // If head exist, it's not going to be the head anymore.
        // We need to update our current head to be the next one after the head.
        if(this.head) {
            this.head.previus = newNode;
        }

        this.head = newNode;

        // If there is no tail yet, we need to point the newNode to be a tail.
        if(!this.tail){
            this.tail = newNode;
        }
    }

    /**
     * Add node to the end of the linked list
     * @param {*} value  to add 
     * @returns {DoubleLinkList}
     */
    append(value){
        const newNode = new DoubleLinkListNode(value);
        // we need to check if head exist, if not head and tail will be our new linklist.
        if(!this.head){
            this.head = newNode;
            this.tail = newNode;

            return this;
        }
        // Attach new node to the end of the linked list.
        this.tail.next = newNode;
        // Attach current tail to the new node previus reference.
        newNode.previous = this.tail;
        // Set new node to be the tail of linked list
        this.tail = newNode;

        return this;
    }

    /**
     * Delete a node from our linked list.
     * @param {*} value 
     * @returns {DoubleLinkListNode}
     */
    delete(value) {
        // Check if head does'nt exist
        if(!this.head){
            return null;
        }

        let deletedNode  = null;
        let currentNode = this.head;

        while (currentNode) {

            // Check if our current node it's the same as the value they passed us.
            if(this.compare.equal(currentNode.value, value)){
                deletedNode = currentNode;

                // if they need to delete the head.
                if(deletedNode == this.head){
                    // Set the next of head as the new head.
                    this.head = deletedNode.next;

                    // Set the head previus to null, because it's the head.
                    if(this.head){
                        this.head.previous = null;
                    }

                    // If all the nodes in the list are the same as the value, we need to update the tail.
                    if(deletedNode == this.tail){
                        this.tail = null;
                        }
                    } else if( deletedNode == this.tail) {
                        // If the deleted node is going to be the tail, we need to update the tail.
                        // Set the tail to second last one, this is going to be our new tail
                        this.tail = deletedNode.previous;
                        this.tail.next = null;
                    } else {
                        // If any middle node are going to be deleted we 
                        // update the previus and the next one
                        const previusNode = deletedNode.previous;
                        const nextNode = deletedNode.next;
                        previusNode.next = nextNode;
                        nextNode.previous = previusNode;
                    }
            }
            currentNode = currentNode.next;

        }
        
    }

    /**
     * Find for the item inside our linked list
     * @param {*} param0 
     * @returns {DoubleLinkListNode}
     */
    find({value = undefined, callback = undefined}) {
        // check if the head it's null
        if(!this.head){
            return null;
        }

        // We need to cicle trought all the linked list to search for our value;
        let currentNode = this.head;

        while(currentNode){
            // If callback is specified, then try to find the node by callback
            if (callback && callback(currentNode.value)) {
                return currentNode;
              }

            // We need to check if the value of the node is the same as the value they passed us.
            if(value !== undefined && this.compare.equal(currentNode.value , value)){
                return currentNode;
            }

            currentNode = currentNode.next;
        }
        return null;
    }

    /**
     * Deletes the tail
     * @returns {DoubleLinkListNode}
     */
    deleteTail() {
        //We need to check if the head exist
        if(!this.head){
            return null;
        }

        // Check if the head !== tail, if they are the same we need to put both to be null;
        if (this.head === this.tail){
            const deletedTail = this.tail;
            this.head = null;
            this.tail = null;
            return deletedTail;
        }
        // Store the tail
        const deletedTail = this.tail;

        // Make the tail the second last one;
        this.tail = this.tail.previous;
        // The new tail.next need to be null;
        this.tail.next = null;
        
        return deletedTail;
    }


    /**
     * Delete head of the double link list
     * @returns {DoubleLinkListNode}
     */
    deleteHead(){
        //We check if the head exist
        if(!this.head){
            return null;
        }
        //We check if the head !== from the tail
        if(this.head === this.tail){
            const deletedNode = this.head;
            this.head = null;
            this.tail = null;
            return deletedNode;
        }

        // Store the head
        let deletedNode = this.head;
        // Make head.next the new head
        this.head = this.head.next;
        //Make the new head.previous = null because it's the head.
        this.head.previous = null;

        return deletedNode;
    }

    /**
     * double link list to array
     * @returns {Array}
     */
    toArray(){
        let nodes = [];

        // Check if head exist
        if(!this.head){
            return nodes;
        }

        // Start from the head up to the tail
        let currentNode = this.head;

        while(currentNode){

            // Add each node to the array
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }
        return nodes;
    }

    /**
     * From an array to double link list
     * @param {*[]} values - Array of values that need to be converted to linked list
     * @returns {DoubleLinkListNode}
     */

    fromArray(values){
        // values comes from an array
        values.forEach((node) => this.append(node));

        return this;
    }

    /**
     * Call it self until it finishes the job.
     * @param {*} callback 
     * @returns {String}
     */
    toString(callback){
        return this.toArray().map((node) => node.toString(callback)).toString();
    }

    /**
     * Reverse the double link list
     * @returns {DoubleLinkedList}
     */
    reverse(){
        if (!this.head){
            return null;
        }

        let currentNode = this.head;
        let prevNode = null;
        let nextNode = null;

        while (currentNode){
            // Store the next node
            prevNode = currentNode.previous;
            nextNode = currentNode.next;

            // Change next node of the current node so it would link to prevous node;
            currentNode.next = prevNode;
            currentNode.previous = nextNode;

            // Move prevNode and currNode nodes one step ahead;
            prevNode = currentNode;
            currentNode = nextNode;
        }

        this.tail = this.head;
        this.head = prevNode;

        return this;
    }
}
