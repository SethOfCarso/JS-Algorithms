import hashTable from '../HashTable/hashtable.js'
export default class trieNode {

    /**
     * 
     * @param {string} character 
     * @param {boolean} isCompletereWord 
     */
    constructor(character, isCompletereWord = false) {
        this.character = character;
        this.isCompletereWord = isCompletereWord;
        this.children = new hashTable();
    }

    /**
     * 
     * @param {string} character 
     * @returns {trieNode}
     */
    getChild(character){
        return this.children.get(character);
    }

    /**
     * 
     * @param {string} character 
     * @param {Boolean} isCompleteWord 
     * @returns {trieNode}
     */
    addChild(character, isCompleteWord = false) {
        if(this.children.has(character)) {
            this.children.set(character, new trieNode(character, isCompleteWord));
        }

        const childNode = this.children.get(character);

        // In casess similiar to adding "car" after "carpet" we need to mark "r" character as complete.
        childNode.isCompleteWord = childNode.isCompleteWord || isCompleteWord;

        return childNode;
    }

    /**
     * 
     * @param {string} character 
     * @returns {trieNode}
     */
    removeChild(character) {
        const childNode = this.getChild(character);

        // Delete child only if:
        // childNode has no children,
        // childrenNode.isCompleteWord == false.

        if( 
            childNode 
            &&  !childNode.isCompletereWord
            &&  !childNode.hasChildren() 
            ) {
                this.children.delete(character);
            }
        return this;
    }

    /**
     * 
     * @param {string} character 
     * @returns {trieNode}
     */
    hasChild(character) {
        return this.children.has(character);
    }

    /**
     * Check wheter current trieNode has children or not
     * @returns {boolean}
     */
    hasChildren() {
        return this.children.getKeys().length !== 0;
    }

    suggestChildren() {
        return [...this.children.getKeys()];
    }

    toString() {
        let childrenAsString = this.suggestChildren().toString();
        childrenAsString = childrenAsString ? `:${childrenAsString}` : '';
        const isCompleteString = this.isCompletereWord ? '*' : '';

        return `${this.character} ${isCompleteString}${childrenAsString}`;
    }


}