export default class stackNode{
    // We need a constructor for the node
    constructor (value, next = null){
        this.value = value;
        this.next = next;
    }
}