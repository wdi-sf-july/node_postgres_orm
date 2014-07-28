var Person = require('./person');
var pg = require('pg');
var readline = require('readline');
var Models = {};

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


Models.Person = Person;

// Models.Person.all(function(err, people){
//   console.log(people);
// });

// Models.Person.findBy("id", 1, function(err, person){
//   console.log("found", person);
//   person.update({firstname: "sam", lastname: "creek"}, function(err, person){
//     console.log("UPDATED:", person)
//   });
// })

module.exports = Models;