import ALVNode from './ALVTreeNode.js'

/**
 * Created this from https://www.baeldung.com/java-avl-trees
 * Changed from Java to JS.
 */
export default class ALVTree {

    /**
     * We create the base of our Tree
     */
    constructor() {
        this.root = new ALVNode();
    }

    /**
     * 
     * @param {ALVNode} node 
     */
    updateHeight(node){
        // Get the max number between both sides.
        node.height = 1 + Math.max(height(n.left), height(n.right));
    }

    /**
     * 
     * @param {ALVNode} node 
     * @returns {number}
     */
    height(node){
        return n == null ? -1 : node.height;
    }

    getBalance(node) {
        return (n == null) ? 0 :this.height(n.right) - this.height(n.left);
    }
}