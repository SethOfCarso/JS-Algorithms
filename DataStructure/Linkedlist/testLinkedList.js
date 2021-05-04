import LinkedList from './linkedlist.js';

let linkList = new LinkedList();

linkList.prepend(3);
linkList.prepend(4);
linkList.prepend(5);
linkList.prepend(6);

let newArray = [1,35123,6534,65221,6734573,3453453,735,2]
linkList.fromArray(newArray);

let toShow = linkList.toArray();
console.log("Hola");
console.log(toShow);



let stringLL = linkList.toString();
console.log(stringLL);
