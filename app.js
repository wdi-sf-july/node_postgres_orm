var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  Person = require('./models/models.js').Person,
  app = express();



app.set("view engine", "ejs");
// Middleware
app.use(bodyParser.urlencoded());
app.use(methodOverride("_method"));




app.get("/people", function(req, res){
  Person.all(function(err, allPeople){
    res.render("people/index", {people: allPeople});
  })
});

app.get("/people/new", function(req, res){
  res.render("people/new")
});

app.get("/people/:id", function(req,res){
  Person.findBy("id", req.params.id, function(err, foundPerson){
    res.render("people/show", {person: foundPerson });
  });
});

app.get("/people/:id/edit", function(req,res){
  Person.findBy("id", req.params.id, function(err, foundPerson){
    res.render("people/edit", {person: foundPerson });
  });
});



app.post("/people", function(req, res){
  Person.create(req.body.person, function(err, newPerson){
    res.redirect("/people/" + newPerson.id);
  });

});

app.delete("/people/:id", function(req, res){
  Person.findBy("id", req.params.id, function(err, person){
    person.destroy(function(err){
      res.redirect("/people");
    })
  });
});

app.put("/people/:id", function(req,res){
  Person.findBy("id", req.params.id, function(err, foundPerson){
    foundPerson.update(req.body.person, function(){
      res.redirect("/people/"+ foundPerson.id);
    });
  });
})

app.listen(3000, function(){
  console.log("THE SERVER IS LISTENING ON localhost:3000");
});
