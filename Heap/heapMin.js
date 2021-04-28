/**
 * Parent class of min 
 */
export default class HeapMin {
    // We initialize our heap as the array with size of 0.
    constructor(){
        this.heapContainer = [];
        this.size = 0;
    }

    /**
     * Get left children index
     * @param {number} parentIndex 
     * @returns {number}
     */
    getLeftChildrenIndex ( parentIndex ) {
        return (2 * parentIndex) +1;
    }

    /**
     * Get right childen index
     * @param {number} parentIndex 
     * @returns {number}
     */
    getRightChildernIndex ( parentIndex ) {
        return (2 * parentIndex ) + 2;
    }

    /**
     * Get parent index
     * @param {number} childrenIndex 
     * @returns {number}
     */
    getParentIndex(childrenIndex){
        return (childrenIndex - 1) / 2;
    }

    /**
     * Boolean of left child
     * @param {number} index
     * @returns {boolean}
     */
    hasLeftChild(index) {
        return ( this.getLeftChildrenIndex(index) < this.size );
    }

    /**
     * Boolean of right child
     * @param {number} index 
     * @returns {boolean}
     */
    hasRightChild( index ) {
        return (this.getRightChildernIndex(index) < this.size );
    }

    /**
     * Check if it has a parent.
     * @param {number} index 
     * @returns {boolean}
     */
    hasParent ( index ) {
        // return this.getParentIndex(index) >= 0;
        return this.getParentIndex(index) >= 0;
    }

    /**
     * Get the items of the left children
     * @param {number} index 
     * @returns {*}
     */
    getItemleftChild( index ) {
        return this.heapContainer[this.getLeftChildrenIndex(index)];
    }

    /**
     * Get the items of the right children.
     * @param {number} index 
     * @returns {*}
     */
     getItemrigthChild ( index ) {
        return this.heapContainer[this.getRightChildernIndex(index)];
    }

    /**
     * Get the items form the father of the index.
     * @param {*} index 
     * @returns 
     */
    getItemParent ( index ) {
        return this.heapContainer[this.getParentIndex(index)];
    }

    /**
     * Swap 2 indexes.
     * @param {number} indexOne 
     * @param {number} indexTwo 
     */
    swap(indexOne, indexTwo){
        const temp = this.heapContainer[indexTwo];
        this.heapContainer[indexTwo] = this.heapContainer[indexOne];
        this.heapContainer[indexOne] = temp;
    }

    /**
     * Check the smallest item in the heap.
     * @returns {*}
     */
    peek(){
        // Check if the size has somehting on it.
        if(this.size == 0){
            return null;
        } 
        return this.heapContainer[0];
    }

    /**
     * Give us the minimun item in the heap.
     * @returns {*}
     */
    poll(){
        // check if the size has something on it
        if(this.size == 0) {
            return null;
        }

        // If the size is just 1, we don't need to update anything
        if(this.size == 1){
            size = 0;
            return this.heapContainer.pop();
        }

        const item = this.heapContainer[0];
        // Move last item of the heap to the head.
        this.heapContainer[0] = this.heapContainer.pop();
        this.size--;
        this.heapifyDown();
        return item;
    }

    /**
     * 
     * @param {*} item 
     * @returns {Heap}
     */
    add( item ) {
        this.heapContainer.push(item);
        this.size++;
        this.heapifyUp();
        return this;
    }

    /**
     * The new added node, goes up until it find his place.
     */
    heapifyUp(){
        // Start from the last item it added, the index
        let index = this.size - 1;
        // Cicle, while our index has a parent and the parent.value > current.value, we are out of order
        while( this.hasParent(index) && this.getItemParent(index)  > this.heapContainer[index]) {
            // Swap parent index, and current value, then walk to be the new parent.
            this.swap(this.getParentIndex(index) , index);
            index = this.getParentIndex(index);
        }
    }


    /**
     * We move the node at the top to his place.
     */
    heapifyDown(){
        // Start by de top
        let index = 0;
        // Check if it has left childen, if not it's the last node.
        while(this.heapContainer[this.getLeftChildrenIndex(index)]){
            let smallerChildernIndex = this.getLeftChildrenIndex(index);
            // We check if we have a right child, if we do, we check who is the smallest, if its right, we change our culler smaller one.
            if(this.hasRightChild(index) && this.getItemrigthChild(index < this.getItemleftChild(index))){
                smallerChildernIndex = this.getRightChildernIndex(index);
            }

            if(this.heapContainer[index] < this.heapContainer[[smallerChildernIndex]]) {
                break;
            } else {
                this.swap(index, smallerChildernIndex);
            }

            index = smallerChildernIndex;
        }

    }
    

    /**
     * 
     * @returns {boolean}
     */
    isEmpty(){
        return this.heapContainer.length == 0;
    }

    
    remove( item ){
        // Check if we have a size > 0
        if (this.heapContainer.length == 0){
            return null;
        }
        // Find number of items to remove 
        let itemsToRemove = this.find(item).length;

        // We need a cicle to search for each one
        for(let iteration = 0; iteration < itemsToRemove ; iteration++){
            // Save items removed then we need to do heapify
            const itemIndexRemoved = this.find(item)[0];

            // Check if the item removed is the last child, we just remove it.
            if(itemIndexRemoved == (this.size - 1)){
                this.heapContainer.pop();
                this.size --;
            } else {
                // We change the last one to this index;
                this.heapContainer[itemIndexRemoved] = this.heapContainer.pop();
                this.size --;

                // Get the parent
                const parentItem = this.getParentIndex(itemIndexRemoved);

                // If there is no parent or parent is in correct order with the node
                // We're going to delete then heapify down. otherwise heapify up.

                if(this.hasLeftChild(itemIndexRemoved) && (!parentItem 
                    || this.getItemParent(itemIndexRemoved) < this.heapContainer[itemIndexRemoved])){
                        this.heapifyDown(itemIndexRemoved);
                    } else {
                        this.heapifyUp(itemIndexRemoved);
                    }
            }

        }

        return this.heapContainer;
    }

    /**
     * Find for items in the heap
     * @param {*} item 
     * @returns {[]*}
     */
    find( item ){
        let foundItems = [];
        for(let itemIndex = 0; itemIndex < this.size ; itemIndex++){
            if(this.heapContainer[itemIndex] == item){
                foundItems.push(itemIndex);
            }
        }
        return foundItems;
    }

}