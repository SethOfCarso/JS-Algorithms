/**
 * Class for heapMax
 */
export default class HeapMax{
    // constructor for our heap
    constructor(){
        this.heapContainer = [];
        this.size = 0;
    }
    /**
     * Get left children index
     * @param {number} parentIndex 
     * @returns {number}
     */
    getLeftChildernIndex(parentIndex){
        return ( 2 * parentIndex) + 1;
    }

    /**
     * Get right children index.
     * @param {number} parentIndex 
     * @returns {number}
     */
    getRightChildrenIndex(parentIndex){
        return (2 * parentIndex) + 2;
    }

    /**
     * get parent Index
     * @param {number} childIndex 
     * @returns {number}
     */
    getParentIndex(childIndex){
        return Math.floor((childIndex - 1  ) / 2);
    }

    /**
     * Does the left Children exist?
     * @param {number} index 
     * @returns {boolean}
     */
    hasLeftChildren(index) {
        return ( this.getLeftChildernIndex(index) < this.size);
    }
    /**
     * Does the right Children exist?
     * @param {number} index 
     * @returns {boolean}
     */
    hasRigthChildren(index) {
        return ( this.getRightChildrenIndex(index) <= this.size);
    }
    /**
     * Does the parent exist?
     * @param {number} index 
     * @returns {boolean}
     */
    hasParent(index) {
        return this.getParentIndex(index) >= 0;
    }

    /**
     * Get the item of the left children
     * @param {number} index 
     * @returns {*}
     */
    getItemLeftChildren(index) {
        return this.heapContainer[this.getLeftChildernIndex(index)];
    }

    /**
     * Get the item of the right children
     * @param {number} index 
     * @returns {*}
     */
    getItemRightChildren(index) {
        return this.heapContainer[this.getRightChildrenIndex(index)];
    }

    /**
     * Get the item of the parent
     * @param {number} index 
     * @returns {*}
     */
    getItemParent(index){
        return this.heapContainer[this.getParentIndex(index)];
    }

    /**
     * Swap two index
     * @param {number} indexOne 
     * @param {number} indexTwo 
     */
    swap (indexOne, indexTwo) {
        const temp = this.heapContainer[indexTwo];
        this.heapContainer[indexTwo] = this.heapContainer[indexOne];
        this.heapContainer[indexOne] = temp;
    }

    /**
     * 
     * @returns null || first item, must be the highest
     */
    peek(){
        // Check if the array is bigger than 0
        if(this.size == 0){
            return null;
        }
        return this.heapContainer[0];
    }

    /**
     * highest item in the heap.
     * @returns {*}
     */
    poll(){
        // Check if the heap is bigger than 0
        if (this.size == 0){
            return null;
        }
        // Store the item we are about to remove
        const removedItem = this.heapContainer[0];
        // We change our last item of the heap to be the top one, reduce size and heapifyDown
        this.heapContainer[0] = this.heapContainer.pop;
        this.size --;
        this.heapifyDown();

        return removedItem;
    }

    /**
     * We add an item then we look for his place in the heap.
     * @param {*} item 
     * @returns {Heap}
     */
    add(item){
        this.heapContainer.push(item);
        this.size++;
        this.heapifyUp();
        return this;
    }

    /**
     * Find the index of the items in the heap
     * @param {*} item 
     * @returns {[]*}
     */
    find(item) {
        let itemsFinded = [];
        
        for(let index = 0; index < this.size; index++){
            if(this.heapContainer[index] == item){
                itemsFinded.push(index);
            }
        }

        return itemsFinded;
    }

    /**
     * 
     * @returns {boolean}
     */
    isEmpty(){
        return this.size == 0;
    }

    /**
     * Move the node at the top to his place
     */
    heapifyDown(){
        // Start at the top
        let index = 0;
        // If we have a left children we can move
        while (this.heapContainer[this.getLeftChildernIndex(index)]){
            // Check the smaller children of both children
            let smallerChildrenIndex = this.getLeftChildernIndex(index);
            if(this.hasRigthChildren(index) && this.getItemRightChildren(index) < this.getItemLeftChildren(index)){
                smallerChildrenIndex = this.getRightChildrenIndex(index);
            }
            if(this.heapContainer[index] > this.heapContainer[smallerChildrenIndex]){
                break;
            } else {
                this.swap(index, smallerChildrenIndex);
            }
            index = smallerChildrenIndex;
        }
    }

    /**
     * Look the place for our recently added node.
     */
    heapifyUp(){
        // This is after we added a new node
        let index = this.size - 1;
        console.log("Comprobacion");
        console.log(this.getItemParent(index));
        console.log(this.heapContainer[index]);
        while (this.hasParent(index) && this.getItemParent(index) < this.heapContainer[index]){
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }

    remove(item) {
        // Check if the heap is bigger than 0
        if( this.size == 0){
            return null;
        }

        // How many we are going to remove
        let indexToRemove = this.find(item).length;

        // Cicle for each one
        for(let index = 0 ; index < indexToRemove; index++){
            // Always do this search, because after we remove them,  the indexes change.
            const indexRemoved = this.find(item)[0];

            // If its the last child, we just remove it.
            if(indexRemoved == this.size - 1){
                this.size--;
                this.heapContainer.pop();
            } else {
                // We change the one we removed with the last one
                this.heapContainer[indexRemoved] = this.heapContainer.pop();
                size --;
            }

            // Save the parent to check the items values.
            const parentIndex = this.getParentIndex(indexRemoved);
            // If it have a left children
            if(this.hasLeftChildren(indexRemoved) &&
            // If the parent exist and the parent it's bigger
            (!parentIndex || this.getItemParent(indexRemoved) > this.heapContainer[indexRemoved])){
                this.heapifyDown(indexRemoved);
            } else {
                this.heapifyUp(indexRemoved);
            }
        }

        return this.heapContainer
    }
}
