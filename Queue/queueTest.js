import Queue from './queue.js'

let cinema = new Queue();

cinema.enqueue("Juan");
cinema.enqueue("Paco");
cinema.enqueue("Charles");
cinema.enqueue("Jhon");
let stringCinema = cinema.toString();
console.log(stringCinema);


console.log("Letting 1 to enter the cinema");
cinema.dequeue();
stringCinema = cinema.toString();
console.log(stringCinema);
// cinema.dequeue()

console.log(cinema);
