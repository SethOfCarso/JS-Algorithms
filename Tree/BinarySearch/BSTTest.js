import BinarySearchTree from "./BinarySearchTree.js";

console.log("We are going to test BST tree");

let newTree = new BinarySearchTree();

newTree.insert(12);
newTree.insert(20);
newTree.insert(5);
newTree.insert(3);
newTree.insert(15);
newTree.insert(4);

let contain = newTree.contains(3)

console.log(contain);


let treeString = newTree.toString()
console.log(treeString);


setTimeout(()=>{
    console.log("Remove");
    newTree.remove(5)
    console.log(newTree.toString());
},100)