var expect = require('chai').expect,
    chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    SPerson = require('./spec_helper').SPerson,
    Promise = require('sequelize').Promise,
    Person = require('../models/person');

chai.should();
chai.use(sinonChai);

describe('Person', function() {
  describe("construction", function() {
    describe('takes params and makes a person', function() {
      var person;
      beforeEach(function() {
        person = new Person({
          firstname: 'Joe',
          lastname: 'Shmoe',
          id: 123
        });
      });

      it('should have a first name', function() {
        expect(person.firstname).to.equal('Joe');
      });

      it('should have a last name', function() {
        expect(person.lastname).to.equal('Shmoe');
      });

      it('should have an id', function() {
        expect(person.id).to.equal(123);
      });
    });
  });

  describe(".all", function() {
    var cb = sinon.spy(),
        people = [
          {firstname: "Joe", lastname: "Shmoe", id: 1},
          {firstname: "Jane", lastname: "Doe", id: 2}
        ];
    process.setMaxListeners(0);

    describe("when there are people in the db", function(done) {

      beforeEach(function(done) {
        SPerson.destroy({}).then(function() {
          SPerson.bulkCreate(people).then(function(people) {
            Person.all(cb);
            setTimeout(function() {
              done();
            }, 500);
          });
        });
      });

      it("calls the callback with all people in the db", function() {
        expect(cb).to.have.been.calledWith(null, people.map(function(p) {
          return new Person(p);
        }));
      });
    });

    describe("when there are no people in the db", function() {
      beforeEach(function(done) {
        SPerson.destroy({}).then(function() {
          Person.all(cb);
          setTimeout(function() {
            done();
          }, 500);
        });
      });
      it("calls the callback with an empty array", function() {
        expect(cb).to.have.been.calledWith(null, []);
      });
    });
  });

  describe(".findBy", function() {
    var cb = sinon.spy();

    describe("when a key is not passed in", function() {
      beforeEach(function(done) {
        Person.findBy(undefined, 123, cb);
        setTimeout(function() {
          done();
        }, 500);
      });
      it("should call the callback with an error", function() {
        expect(cb.args[0][0].routine).to.equal('errorMissingColumn');
      });
    });

    describe("when a value is not passed in", function() {
      beforeEach(function(done) {
        Person.findBy("adsf", undefined, cb);
        setTimeout(function() {
          done();
        }, 500);
      });
      it("should call the callback with an error", function() {
        expect(cb.args[0][0].routine).to.equal('errorMissingColumn');
      });
    });

    describe("when a person is found", function() {
      var cb = sinon.spy(), people;
      beforeEach(function(done) {
        SPerson.destroy({}).then(function() {
          people = [
            {firstname: "Joe", lastname: "Shmoe", id: 1},
            {firstname: "Jane", lastname: "Doe", id: 2}
          ];
          process.setMaxListeners(0);
          SPerson.bulkCreate(people).then(function(people) {
            Person.findBy("firstname", "Joe", cb);
            setTimeout(function() {
              done();
            }, 500);
          });
        });
      });

      it("should call the callback with the found person", function() {
        expect(cb).to.have.been.calledWith(null, new Person(people[0]));
      });
    });
  });

  describe(".create", function() {
    describe("when passed an object", function() {
      it("should call the callback function with the created record", function(done) {
        var cb = sinon.spy(), found;

        SPerson.destroy({}).then(function() {
          Person.create({firstname: "John", lastname: "Doe"}, cb);

          SPerson.find({ 
            where: { 
              firstname: "John", lastname: "Doe"
            }
          }).then(function(person) {
            found = person;
          });
        });

        setTimeout(function() {
          done();
          expect(cb).to.have.been.calledWith(null, new Person(found.values)); 
        }, 500);

      });
    });
  });

  describe("#destroy", function() {
    it("should remove the object from the database", function(done) {
      SPerson.destroy({}).then(function() {
        var found, person, personId;

        SPerson.create({ firstname: "John", lastname: "Doe"})
          .then(function(p) {
            person = new Person(p.values); 
            console.log(person);
            personId = person.id;
            console.log("person to delete", personId);
            person.destroy();
            done();
          });

        SPerson.find(personId).then(function(person) {
          found = person;
        });

        expect(found).to.not.exist;
      });
    });
  });
});
