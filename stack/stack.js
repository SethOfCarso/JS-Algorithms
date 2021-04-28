import stackNode from './stackNode.js'

/**
 * Create a class for Stack
 */
export default class Stack {
    // First of all we create a constructor with just the top.
    constructor(){
        this.top = null;
    }
    // Then we create our basic operations
    // isEmpty, peek, push, pop, toString, toArray
    /**
     * @returns {boolean}
     */
    isEmpty(){
        return this.top == null;
    }  
    /**
     * We peek the top, but we don't remove it.
     * @returns {*}
     */
    peek(){
        // We need to check if the top exist
        if(!this.top){
            return null;
        }
        return this.top.value;
    }

    /**
     * Add the value to the top.
     * @param {*} value - to add to the stack
     * @returns {stack}
     */
    push(value){
        // We create our node with the value.
        let node = new stackNode(value);

        // We add the value to the stack
        node.next = this.top;
        this.top = node;
    }

    /**
     * LIFO, Eliminate the value at the top and return it.
     * @returns {*} value
     */
    pop(){
        // Check if the top exist
        if(!this.top){
            return null;
        }

        // We save the current value at the top, then we poitn the top to the new top.
        const value = this.top.value;
        this.top = this.top.next;

        return value;


    }

    /**
     * To write our 
     * @param {*} callback - call itself until the end.
     * @returns {string}
     */
    toString(){
        let currentNode = this.top;
        let nodeString  = "";
        console.log(currentNode.value);
        while (currentNode){
            nodeString = nodeString + "" + currentNode.value  + " -> ";
            currentNode = currentNode.next;
        }
        return nodeString;
    }

    /**
     * Make the stack an array.
     * @returns {[]}
     */
    toArray(){
        let array = [];
        // Check the top if exist
        if (!this.top){
            return array;
        }
        // Cicle , start by the top then push to the array, and pop it 
        let currentNode = this.top;

        while(currentNode){
            array.push(currentNode);
            currentNode = currentNode.next;
        }
        return array;
    }
}