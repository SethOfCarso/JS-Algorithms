import AVLTree from './AVLTree BY Git not working.js'

console.log("Hola mundo");

let alvTree = new AVLTree();

alvTree.insert(6);
alvTree.insert(4);
alvTree.insert(8);
alvTree.insert(9);
alvTree.insert(10);
// alvTree.insert(11);
// alvTree.insert(12);
// alvTree.insert(7);

console.log("Del 6 es");
console.log(alvTree.findComponents(6));

console.log("Del 9 es");
console.log(alvTree.findComponents(9));





let string = alvTree.toString()
console.log(string);