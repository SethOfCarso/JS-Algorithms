/**
 * Basic tipe of node for the linked list
 * has value and next/link
 */
 export default class linkedListNode {
    constructor(value, next = null){
        this.value = value;
        this.next = next;
    }
}