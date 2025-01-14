// MongoDB and Mongoose

require('dotenv').config();

// #1 - Install and Set Up Mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// #2 - Create a Model
const Schema = mongoose.Schema;
const personSchema = new Schema ({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);

// #3 - Create and Save a Record of a Model
const createAndSavePerson = (done) => {
  let chrisFarr = new Person({
    name: "Chris Boo",
    age: 33,
    favoriteFoods: ["pizza", "ramen", "CheeseItz"]
  });
  chrisFarr.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

let arrayOfPeople = [
  {
    name: "Chris Boo",
    age: 33,
    favoriteFoods: ["pizza", "ramen", "CheeseItz"]
  },
  {
    name: "Samantha Bae",
    age: 33,
    favoriteFoods: ["pizza", "oysters", "olives"]
  },
  {
    name: "Indy Pants",
    age: 9,
    favoriteFoods: ["leftovers", "table scraps", "bacon"]
  }
];

// #3 - Create Many Records with model.create()
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// #4 - Use model.find() to Search Your Database
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, personFound) => {
    if (err) return console.error(err);
    done(null, personFound);
  })
};

// #5 - Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) console.error(err);
    done(null, data);
  });
};

// #5 - Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, data) => {
    if (err) console.error(err);
    done(null, data);
  });
};

// #6 - Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}, (err, foundPerson) => {
    if (err) return console.error(err);
    foundPerson.favoriteFoods.push(foodToAdd);
    foundPerson.save((err, updatedPerson) => {
      if (err) return console.error(err);
      done(null, updatedPerson)
    })
  })
};

// #7 - Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if (err) return console.error(err);
    done(null, updatedDoc);
  })
};

// #8 - Delete One Document Using model.findByIdAndRemove()
const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id: personId}, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  })
};

// #9 - Delete Many Documents with model.remove()
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  })
};

// #9 - Chain Search Query Helpers to Narrow Search Results
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
    .sort({name: 'asc'})
    .limit(2)
    .select('-age')
    .exec((err,data) => {
      if (err) return console.error(err);
      done(null, data);
    })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;