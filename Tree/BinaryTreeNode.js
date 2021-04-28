import HashTable from '../HashTable/hashtable.js'

export default class BinaryTreeNode {
    // We need to create a constructor
    constructor(value = null){
        this.parent = null;
        this.left = null;
        this.right = null;
        this.value = value;

        this.meta = new HashTable();
    }


    /**
     * @returns {number}
     */
    get leftHeight() {
        // We start by the head, if left doesn't exist, means our height is 0
        if(!this.left){
            return 0;
        }
        return this.left.heigth + 1;
    }

    /**
     * 
     * @returns {number}
     */
    get rigthHeight() {
        // We start by the head, if right doesn't exist, means our height is 0
        if(!this.right) {
            return 0;
        }
        return this.right.heigth + 1;
    }

    /**
     * @returns {number}
     */
    get height () {
        return Math.max(this.leftHeight , this, this.rigthHeight);
    }

    /**
     * If psotivie, left is bigger than right, if it's negative right has more weight
     * @returns {number}
     */
    get balanceFactor() {
        return this.leftHeight - this.rigthHeight;
    }

    /**
     * We look for our uncle
     * @returns {BinaryTreeNode || undefined}
     */
    get uncle() {
        // Need to check if we have a parent
        if (!this.parent) {
            return undefined;
        }

        // If we have a parent we need to check the ancestor parent-parent to see if exist
        if(!this.parent.parent) {
            return undefined;
        }

        // if we have a paren-parent, we can now check if we have a uncle
        // We check both sides, looking for both soons
        if(!this.parent.parent.left || this.parent.parent.right){
            return undefined;
        }

        // Store both parent and grandParent to check who is our uncle
        const ourParent = this.parent.value;
        const ourGrandParent = this.parent.parent.value;

        // Compare values
        if(ourParent < ourGrandParent) {
            // If less than our parent, our uncle is Right/bigger
            return this.parent.parent.right;
        } else  {
            // If is greater our parent than the grandParent, it means our uncle is Left / lesser
            return this.parent.parent.left;
        }
    }

    /**
     * Set value
     * @param {*} value 
     * @returns {BinaryTreeNode}
     */
    setValue(value) {
        this.value = value;
        return this;
    }

    /**
     * 
     * @param {BinaryTreeNode} node 
     * @returns {BinaryTreeNode}
     */
    setLeft (node) {
        // Reset parent for left node since it is going to be detached
        if(this.left){
            this.left.parent = null;
        }
        // Atach new node to the left
        this.left = node

        // Make current node to be a parent for the new left node
        if(this.left) {
            this.left.parent = this;
        }
        return this;
    }

    /**
     * 
     * @param {BinaryTreeNode} node 
     * @returns {BinaryTreeNode}
     */
    setRight(node) {
        // Reset parent for night node since it is going to be detached
        if (this.right) {
            this.right.parent = null;
        }

        // Atach new node to the rigt
        this.right = node;

        // Make current node to be a parent for new right one.
        if(this.right) {
            this.right.parent = this;
        }
        return this;
    }

    /**
     * 
     * @param {BinaryTreeNode} nodeToRemove 
     * @returns {boolean}
     */
    removeChild(nodeToRemove) {
        if (this.right && this.right.value == nodeToRemove.value) {
            this.right = null;
            return true;
        }
        if (this.left && this.left.value == nodeToRemove.value) {
            this.left = null;
            return true;
        }
        return false;
    }

    /**
     * Replace nodes
     * @param {BinaryTreeNode} nodeToReplace 
     * @param {BinaryTreeNode} replacementNode 
     * @returns {boolean}
     */
    replaceChild (nodeToReplace, replacementNode) {
        // Check if both are diferent from undefined
        if(!nodeToReplace || !replacementNode) {
            return false;
        }
        // We check each node.value if the value is the one to replace
        if(this.right && this.right.value == nodeToReplace.value) {
            this.right = replacementNode;
            return true;
        }

        if(this.left && this.left.value == nodeToReplace.value) {
            this.left = replacementNode;
        }
        return false;
    }

    /**
     * 
     * @param {BinaryTreeNode} sourceNode 
     * @param {BinaryTreeNode} targetNode 
     */
    static copyNode (sourceNode, targetNode) {
        targetNode.setValue(sourceNode.value);
        targetNode.left(sourceNode.left);
        targetNode.right(sourceNode.right);
    }

    /**
     * we create an array where we push the values of each node
     * @returns {*[]}
     */
    traverseInOrder() {

        let traverse = [];

        // Start by the left side 
        // then the center
        // then right
        if(this.left){
            traverse = traverse + this.left.traverseInOrder();
            // traverse = traverse.concat(this.left.traverseInOrder());
            
        }

        // console.log(this.value);
        // traverse = traverse.push(this.value);
        traverse +=  this.value + " -> ";
        // console.log("Que contiene traverse");
        // console.log(traverse);

        if(this.right) {
            traverse = traverse + this.right.traverseInOrder();
            // traverse = traverse.concat(this.right.traverseInOrder());
        }
        return traverse;
    }

    /**
     * 
     * @returns {string}
     */
    toString(){
        return this.traverseInOrder().toString();
    }


}