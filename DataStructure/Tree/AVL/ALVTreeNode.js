/**
 * Creating a node for the ALV Tree search.
 */
export default class ALVNode {
    constructor(data,height = 0, left = null, right = null ) {
        this.data = data;
        this.height = height;
        this.left = left;
        this.right = right;
        
    }
}