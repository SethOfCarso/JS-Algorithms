export default class QueueNode {
    // Need data and what's next
    constructor(data, next = null){
        this.data = data;
        this.next = next;
    }
}