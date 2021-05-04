import Stack from "./stack.js"


let newStack = new Stack();
console.log(newStack);
console.log(newStack.isEmpty());
 newStack.push(4);

 newStack.push(8);
 newStack.push(12);
 newStack.push(16);
 console.log(newStack.toArray());
 newStack.pop();
 console.log(newStack.toArray());
 

 
let stringStack = newStack.toString();

console.log(stringStack);

