import HeapMin from './heapMin.js'

let piramide = new HeapMin()

console.log("Created new piramide");
piramide.add(3);
piramide.add(20);
piramide.add(5);
piramide.add(7);
piramide.add(7);
piramide.add(7);
piramide.add(7);
piramide.add(324);
piramide.add(4)

console.log(piramide.getParentIndex(4));

console.log("found 7 in this index " + piramide.find(7));


console.log(piramide);

setTimeout(() => {
    piramide.remove(7)
    console.log(piramide);
},3000)

