#Weekend Lab - Postgres in Node

We'll be building our Object Relational Mapper. Wikipedia describes Object Relational Mapper as

> Object-relational mapping (ORM, O/RM, and O/R mapping) in computer science is a programming technique for converting data between incompatible type systems in object-oriented programming languages.

We will be writing the necessary code to connect our Node App to Postgres to update a resource, instead of a fixed array.


Using the sample  app provided, please fork and clone.

#Requirements
* Install `grunt-cli` with:

```
$ npm install -g grunt-cli
```

* Make sure that `grunt-cli` works by running:

```
$ grunt --version
```

You should see something like this:

```
grunt-cli v0.1.11
```

* Setup your local database using the schema file.
* Update `person.js` so all methods work with with Postgres to handle items.
* Construct a form to make this all work from the web.

##How to get started

1. First start by loading your `schema.sql` file provided to configure your database with the necessary rows and columns.

2. Run the tests by typing `grunt watch`. As you change your code, the tests will keep running. Use a separate terminal window or a split for this.

3. You will be writing the necessary methods to interact with your database in `person.js`. 

4. After you verify each of the methods in `person.js` are working. You can **only** then work on the forms needed to make this a complete web app.

##Bonus

Pat your self on the back if you get it, this will be a lot work.

##Super Bonus
Make a constructor called `Record` with static methods such as:

* `.findBy`or `.findByName` or `.findById`
*  `.all`
*  `.destroy`
*  `.create`

And a `prototype` method for `update`. Refactor your code so that `Person` will inherit from `Record`

##Resources
* [PGCommander](https://eggerapps.at/pgcommander/)
