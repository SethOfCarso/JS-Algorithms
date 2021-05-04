import HashTable from './hashtable.js'

let tableOfContacts = new HashTable();

tableOfContacts.set("Trabajo", "AVS calle colonias 188");
tableOfContacts.set("Casa" , "Erick calle Madero 194");
tableOfContacts.set("Escuela" , "ITESO calle periferico 411");


console.log("Give me the info from Casa");
console.log(tableOfContacts.get("Casa"));

tableOfContacts.delete("Trabajo")


console.log("Give me all the values of the hash");
console.log(tableOfContacts.getValues());

console.log("Todas las llaves");
console.log(tableOfContacts.getKeys());

console.log("Give me all the values of the hash");
console.log(tableOfContacts.getValues());
