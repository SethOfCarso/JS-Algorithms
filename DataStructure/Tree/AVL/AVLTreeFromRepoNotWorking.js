import BinarySearchTree from '../BinarySearch/BinarySearchTree.js'

export default class AVLTree extends BinarySearchTree {

    // We are going to implement the basic operations
    // insert, delete, balance, and the four types of rotations.

    /**
     * 
     * @param {*} value 
     */
    insert( value ) {
        // Do the normal Binary Search Tree insert.
        super.insert(value);

        // We are going to start where we inserted and move up until the root, just to check the balance
        // and do a rebalance if we need to.
        let currentNode = this.root.find(value);
        while ( currentNode ) {
            this.balance(currentNode);
            currentNode = currentNode.parent;
        }
    }

    findComponents(value){
        
        let currentNode = this.root.find(value);

        return currentNode
        
    }


    /**
     * 
     * @param {*} value 
     * @returns {boolean}
     */
    remove( value ){
        // Do standart Binary Search Tree remove
        super.remove(value);

        // We need to rebalance the tree starting from the root
        this.balance(this.root);
    }

    /**
     * 
     * @param {BinarySearchTreeNode} node 
     */
    balance(node) {
        if(node.balanceFactor > 1){
            // Left rotation.
            if(node.left.balanceFactor > 0){
                // left-left rotation
                this.rotateLeftLeft(node);
            } else if (node.balanceFactor < 0) {
                // left-rigth rotation
                this.rotateLeftRight(node);
            }

        } else if (node.balanceFactor < -1 ){
            // Rigth rotation
            if(node.right.balanceFactor < 0 ) {
                // Right-Right rotation
                this.rotateRightRight(node);
            } else if (this.right.balanceFactor > 0) {
                // Right-left rotation
                this.rotateRightLeft(node);
            }
        }
    }

    /**
     * 
     * @param {BinarySearchTreeNode} rootNode 
     */
    rotateLeftLeft(rootNode){
        // Detach left node from root node.
        const leftNode = rootNode.left;
        rootNode.setLeft(null);

        // Make left node to be a child of rootNode's parent.
        if(rootNode.parent) {
            rootNode.parent.setLeft(leftNode);
        } else if (rootNode == this.root) {
            // If rootNode is the root, then make left node to be a new root.
            this.root = leftNode
        }

        // If left node has a right child then detach it and
        // attach it as a left child for root node.
        if(leftNode.right) {
            rootNode.setLeft(leftNode.right);
        }

        // Atach rootNode to the right of leftNode
        leftNode.setRight(rootNode);

    }

    /**
     * 
     * @param {BinarySearchTreeNode} rootNode 
     */
    rotateLeftRight(rootNode){
        // Detach left node from rootNode since it is going to be replaces
        const leftNode = rootNode.left;
        rootNode.setLeft(null);

        // Detach right node from leftNode.
        const leftRightNode = leftNode.right;
        leftNode.setRight(null);

        // Preserve leftRightNode's left subtree.
        if(leftRightNode.left ){
            leftNode.setRight(leftRightNode.left);
            leftRightNode.setLeft(null);
        }

        // Attach leftRightNode to the rootNode
        rootNode.setLeft(leftRightNode);

        // Atach leftNode as left node for leftRight node.
        leftRightNode.setLeft(leftNode);

        // Do left-left rotation.
        this.rotateLeftLeft;
    }


    /**
     * 
     * @param {BinarySearchTreeNode} rootNode 
     */
    rotateRightLeft(rootNode) {
        // Detach right node from rootNode since it is going to be replaced.
        const rightNode = rootNode.right;
        rootNode.setRight(null);

        // Detach left node from rightNode.
        const rightLeftNode = rightNode.left;
        rightNode.setLeft(null);

        if(rightLeftNode.right) {
            rightNode.setLeft(rightLeftNode.right);
            rightLeftNode.setRight(null);
        }

        // Atach rightLeftNode to the rootNode.
        rootNode.setRight(rightLeftNode);

        // Attach rightNode as right node for rightLeft node.
        rightLeftNode.setRight(rightNode);

        // Do right-right rotation
        this.rotateRightRight(rootNode);
    }

    rotateRightRight(rootNode) {
        // Detach right node form root node.
        const rightNode = rootNode.right;
        rootNode.setRight(null);

        // Make right node to be a child of rootNode's parent.
        if(rootNode.parent) {
            rootNode.parent.setRight(rightNode);
        } else if (rootNode == this.root) {
            // If root node is root then make right node to be a new root.
            this.root = rightNode;
        }

        // If right nod ehas a left child then detach it and
        // attach it as a right child for rootNode.
        if(rightNode.left) {
            rootNode.setRight(rightNode.left);
        }

        // Atach rootNode to the left of rightNode.
        rightNode.setLeft(rootNode);
    }

}