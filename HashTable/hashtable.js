import LinkedList from '../Linkedlist/linkedlist.js'

// Hash table size directrly affects on the number of collisions.
// The bigger the hash table th less collisions you'll get.

const defaultaHashTable = 32;

export default class HashTable {
    constructor(hashTableSize = defaultaHashTable){
        // Create a table of certain size, and fill them with empty linked list buckets.
        // We are using the collision resolution Separate chaining with linked list.
        this.buckets = Array(hashTableSize).fill(null).map( () => new LinkedList());
        // To keep track of all actual keys in a fast way.
        this.keys = {};

    }

    /**
     * Converts key string to hash number.
     * @param {string} key 
     * @returns {number}
     */
    hash(key){
        // For simplicity we will just use the sum of all character codes.
        // But we can use whatever we cant for the hash
        // Ex. polynomial string hash to reduce number of collisions;
        // hash = charCodeAt(0) * PRIME^(n-1) +  chatCodeAt(1) * Prime^(n-2) + .... + charCodeAt(n-1)
        // Prime is a random prime number

        // const arrayString = key;
        // const reducer = (hashAcumulator , keySymbol) => hashAcumulator + keySymbol;
        // const hash = arrayString.reduce(reducer);

        const hash = Array.from(key).reduce(
            (hashAcumulator, keySymbol) => (hashAcumulator + keySymbol.charCodeAt(0)),
            0,
        );
        // Reduce the has number so it would fit hash table size;
        return hash % this.buckets.length;
    }

    /**
     * 
     * @param {string} key 
     * @param {*} value 
     */
    set(key, value) {
        const keyHash = this.hash(key);
        this.keys[key] = keyHash;

        const bucketLinkedList = this.buckets[keyHash];
        const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key == key });

        if(!node) {
            // Insert new node.
            bucketLinkedList.append({key, value});

        } else {
            // Update value of existing node.
            node.value.value = value;
        }
    }

    /**
     * Delete a key and the node atach to it.
     * @param {string} key 
     * @returns {*}
     */
    delete(key){
        // We generete the key
        const keyHash = this.hash(key);
        delete this.keys[key];
        const bucketLinkedList = this.buckets[keyHash];
        const node = bucketLinkedList.find({callback : (nodeValue) => nodeValue.key === key});

        if(node) {
            return bucketLinkedList.delete(node.value);
        }
        return null;
    }

    get(key){
        const keyHash = this.hash(key);
        const bucketLinkedList = this.buckets[keyHash];
        console.log(bucketLinkedList);
        const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key });
        

        console.log(node);
        // if(node){
        //     return node.value.value;
        // } 
        // return undefined
        return node ? node.value.value : undefined;
    }

    /**
     * 
     * @param {String} key 
     * @returns {boolean}
     */
    has(key){
        return  Object.hasOwnProperty.call(this.keys, key);
    }

    /**
     * 
     * @returns {string[]}
     */
    getKeys(){
        return Object.keys(this.keys);
    }

    /**
     * Get the list of all the stored values in the hash table
     * @returns {*[]}
     */
    getValues(){
        return this.buckets.reduce((values, bucket) =>{
            const buckertValues = bucket.toArray()
            .map((linkedListNode) => linkedListNode.value.value);
            return values.concat(buckertValues);
        }, []);
    }
}
