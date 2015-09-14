'use strict';

/*========================================================||
||   External required sources                            ||
||========================================================*/

var React = require('react-native'),
Firebase = require('firebase'),
ref = new Firebase("https://katfish.firebaseio.com/"),
friendStore,
person = {};

/*========================================================||
||   Setting for individual id (table below)              ||
||========================================================*/

person.shuffle = function(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
person.id = '100010275515528'

/*========================================================||
||   Accessing the database through firebase functions    ||
||========================================================*/

person.fish = function(friends){
  this.shuffle(friends);
  friendStore = friends.shift()
  person.id = friendStore.id;
  person.name = friendStore.name;
  friends.push({id : person.id});
  var personRef = ref.child("pond").child(person.id);
}
/*========================================================||
||   Make the person available throughout the application ||
||========================================================*/

module.exports = person;

/*========================================================||
||   IDs of sample data                                   ||
||========================================================*/

  // chris is '10102692890098514';
  // casey is '100010275515528';
  // kent is '10205585315006058'