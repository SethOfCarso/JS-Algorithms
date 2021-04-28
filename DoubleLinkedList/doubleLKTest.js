import DoubleLinkedList from './doubleLinkedList.js'
import DoubleLinkList from './doubleLinkedList.js'

let DLinkList = new DoubleLinkedList();

let stringDL = null;
stringDL = DLinkList.toString();
console.log(stringDL);

DLinkList.append(4)
DLinkList.append(5)
DLinkList.append(3)

stringDL = DLinkList.toString();
console.log(stringDL);

let newArrayToPass = [3,46,3,46,1]
DLinkList.fromArray(newArrayToPass)

console.log(DLinkList);

DLinkList.reverse();
console.log(DLinkList);

DLinkList.delete(46);
console.log(DLinkList);

