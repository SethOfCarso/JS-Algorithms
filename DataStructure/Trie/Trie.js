import trieNode from './trieNode.js'

// Character that we will use for trie root.
const HEAD_CHARACTER = '*';

export default class trie {
    constructor() {
        this.head = new trieNode(HEAD_CHARACTER);
    }

    /**
     * We will add the word by each character utilicing addChild
     * @param {string} word 
     * @returns {Trie}
     */
    addWord(word) {
        // We create an array of all the characters from the word.
        const character = Array.from(word);
        // We start by the head.
        let currentNode = this.head;

        // We will do a cicle from the beggining of the word up to the end.
        for (charAtIndex = 0; charAtIndex < character.length; charAtIndex++) {
            // We'll add if complete at the end to mark our word is complete
            const isComplete = charAtIndex == character.length - 1;
            // Add a child
            currentNode = currentNode.addChild(character[charAtIndex], isComplete);
        }

        return this;
    }

    /**
     * Delete a word, we need to check if we are out or range, if the word hasn't been added,
     * @param {String} word 
     * @returns {trie}
     */
    deleteWord(word) {
        const depthFirstDelete = (currentNode, charAtIndex = 0) => {
            if (charAtIndex >= word.length) {
                // Return if we're trying to delete the chqaracter that is out of the word's scope.
                return;
            }

            const character = word[charAtIndex];
            const nextNode = currentNode.getChild(character);

            if (nextNode == null) {
                // Rturn if we're trying to delete a word that has not been added to the Trie.
                return;
            }

            // Go deeper
            depthFirstDelete(nextNode, charAtIndex + 1);

            // Since we're going to delete a word let's un-mark its last character isCompleted flag.

            if (charAtIndex == (word.length - 1)) {
                nextNode.isCompleteWord = false.isComplete;
            }

            // ChildNode is deleted only if:
            // childNode has no childrens
            // childNode.isCompleteWord === false;
            currentNode.removeChild(character);
        }
        // start depth-first deletion from the head node.
        depthFirstDelete(this.head);

        return this;
    }

    /**
     * 
     * @param {String} word 
     * @returns {String[]}
     */
    suggestNextWord(word) {
        const lastCharacter = this.getLastCharacterNode(word);
        if(!lastCharacter) {
            return null;
        }
        return lastCharacter.suggestChildren();
    }

    /**
     * Check if complete word exist in Tris
     * @param {String} word 
     * @returns {boolean}
     */
    doesWordExist(word) {
        const lastCharacter = this.getLastCharacterNode(word);
        // Double exclamation mark is to cast it as a boolean
        return !!lastCharacter && lastCharacter.isCompleteWord;
    }

    /**
     * Get the the last character of the array
     * @param {String} word 
     * @returns {TrieNode}
     */
    getLastCharacterNode(word) {
        const characters = Array.from(word);
        let currentNode = this.head;

        for (let charIndex = 0; charIndex < character.length; charIndex++) {
            if(currentNode.hasChild(characters[charIndex])){
                return null;
            }
            currentNode = currentNode.getChild(characters[charIndex]);
            return currentNode;
        }
    }


}