import BinaryTreeNode from '../BinaryTreeNode.js'
import BinarySearchTree from './BinarySearchTree.js';



export default class BinarySearchTreeNode extends BinaryTreeNode {

    /**
     * 
     * @param {*} value 
     */
    constructor(value = null) {
        super(value);
    }

    /**
     * Insert node.
     * @param {*} value 
     * @returns {BinarySearchTreeNode}
     */
    insert(value) {
        // Check if we have a value at the top, if its null, we need to start the binary search tree
        if (this.value == null) {
             this.value = value;
             return this;
        }

        // We need to check if the value is less than our current value, if it is, goes left
        if (value < this.value) {
            // If left currently exist, then it's going to call itself to check where to insert
            if (this.left) {
                return this.left.insert(value);
            }

            // If left doesn't exist we create a new BinaryNode to set it.
            const newNode = new BinarySearchTreeNode(value);
            this.setLeft(newNode);

            return newNode;
        }

        // We need to check if the value is greater than our current value, if it is, goes right
        if (value > this.value) {

            // If right exist, it's going to call itself to check until it finds a place
            if (this.right) {
                return this.right.insert(value);
            }
            // Where we find the place, we create a new node to set it Right
            const newNode = new BinarySearchTreeNode(value);
            this.setRight(newNode);

            return newNode;
        }
        return this;
    }

    /**
     * 
     * @param {*} value 
     * @returns {BinarySearchTreeNode}
     */
    find(value) {
        // We need to check the root to see if it exist
        if (this.value == value) {
            return this;
        }

        // If left exist and the value is lesser than what we are loocking for lets find that way
        if (this.left && value < this.value) {
            return this.left.find(value);
        }

        // If right existe and the value is greater that wath we were loocking for we need to search that way
        if (this.right && value > this.value) {
            return this.right.find(value);
        }
        // If we dont find a value
        return null;
    }

    /**
     * Use find to look for it and return a boolean
     * @param {*} value 
     * @returns {BinarySearchTreeNode}
     */
    contains(value) {
        // Double exclamation mark means it's casted to be a boolean
        return !!this.find(value);
    }

    /**
     * Remove certain value
     * @param {*} value 
     * @returns {boolean}
     */
    remove(value) {
        const nodeToRemove = this.find(value);
        // We need to check if the node to remove exist
        if (!nodeToRemove) {
            return false;
        }

        const {
            parent
        } = nodeToRemove;

        if (!nodeToRemove.left && !nodeToRemove.right) {
            // If it doesn't have neither, it means that it is a leaf.
            if (parent) {
                // Node has a parent. Just remove the pointer to this node form the parent.
                parent.removeChild(nodeToRemove);
            } else {
                // Node has no parent. Just erase current node value.
                nodeToRemove.setValue(undefined)
            }
        } else if (nodeToRemove.left && nodeToRemove.right) {
            // Node has 2 childres.
            // We have 2 options, find the biggest one from the left branch or find the smaller one from the right branch
            // In this case we are going to find the smalles from the right branch.
            // Find the next biggest value (minimun value in the right branch)
            // and replace current value node with that next biggest value.
            const nextBiggerNode = nodeToRemove.right.findMin();
            if (!(nodeToRemove.right == nextBiggerNode)) {
                this.remove(nextBiggerNode.value);
                nodeToRemove.setValue(nextBiggerNode.value)
            } else {
                // In case if next right value is the next bigger one and it doens't have a left child
                // then just replace node that is going to be deleted with the right node.
                nodeToRemove.setValue(nodeToRemove.right.value)
                nodeToRemove.setRight(nodeToRemove.right.right);
            }
        } else {
            // Node has only one child.
            // Make this child to be a direct child of the current node's parent.
            const childNode = nodeToRemove.left || nodeToRemove.right;

            if (parent) {
                parent.replaceChild(nodeToRemove, childNode);
            } else {
                BinaryTreeNode.copyNode(childNode, nodeToRemove);
            }
        }
        // Clear the parent of removed node.
        nodeToRemove.parent = null;

        return true;
    }

    /**
     * Find the lowest value
     * @returns {BinarySearchTreeNode}
     */
    findMin() {
        if(!this.left) {
            return this;
        }
        return this.left.findMin();
    }
}