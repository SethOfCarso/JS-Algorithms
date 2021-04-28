import BinarySearchTreeNode from './BinarySearchTreeNode.js'

export default class BinarySearchTree {

    constructor() {
        this.root = new BinarySearchTreeNode (null);
    }

    /**
     * Insert 
     * @param {*} value 
     * @returns {BinaryTreeNode}
     */
    insert(value) {
        return this.root.insert(value);
    }

    /**
     * 
     * @param {*} value 
     * @returns {boolean}
     */
    contains (value) {
        return this.root.contains(value);
    }

    /**
     * 
     * @param {*} value 
     * @returns {boolean}
     */
    remove(value) {
        return this.root.remove(value);
    }


    /**
     * 
     * @returns {String}
     */
    toString() {
        return this.root.toString();
    }
}