/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    if(n===undefined){
      return array[0];
    }
    else{
      var newArr = array.slice(0, n);
      return newArr;
    }
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if(n===undefined){
      return array[array.length-1];
    }
    else if(n>array.length){
      return array;
    }
    else{
      var newArr = array.slice(array.length-n);
      return newArr;
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    if(Array.isArray(collection)) {
      collection.forEach(iterator);
    }
    else{
      for(var prop in collection){
        iterator(collection[prop], prop, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  // _.indexOf = function(array, target){
  //   if(Array.indexOf()){
  //     return array.indexOf(target);
  //   }
  //   else{
  //     for(var i=0; i<array.length; i++){
  //       if(arr[i]===target){
  //         return i;
  //       }
  //     }
  //   }
  // };

  _.indexOf = function(array, target){
    for(var i=0; i<array.length; i++){
      if(array[i]===target){
        return i;
      }
    }
    return -1;
  };


  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    var newArr = [];
    for(var i=0; i<collection.length; i++){
      if(iterator(collection[i])){
        newArr.push(collection[i]);
      }
    }
    return newArr;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    // Iterator is a function test that you apply to every value in collection

    // var newArr = [];
    // for(var i=0; i<collection.length; i++){
    //   if(!iterator(collection[i])){
    //     newArr.push(collection[i]);
    //   }
    // }
    // return newArr;

    // alternative way
    for(var i=collection.length-1; i>=0; i--){
      if(iterator(collection[i])){
        collection.splice(i, 1);
      }
    }
    return collection;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var newArr = [];
    for(var i=0; i<array.length; i++){
      if(newArr.indexOf(array[i])===-1){
        newArr.push(array[i]);
      }
    }
    return newArr;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    for(var i=0; i<array.length; i++){
      array[i] = iterator(array[i]);
    }
    return array;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    var propValues = [];
    for(var i=0; i<array.length; i++){
      var currentObj = array[i];
      propValues.push(currentObj[propertyName]);
    }
    return propValues;
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    for(var i=0; i<list.length; i++){
      var currentArr = list[i];
      var method = currentArr[methodName] || methodName;
      method.apply(currentArr, args);


      // // alternative way
      // if(typeof methodName ==='string'){
      //   currentArr[methodName](args);
      // }
      // else{
      //   methodName.apply(currentArr, args);
      // }
    }
    return list;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  _.reduce = function(collection, iterator, initialValue) {
    var result;
    var prevValue;
    if(initialValue){
      prevValue = iterator(initialValue, collection[0]);
    }
    else{
      prevValue = collection[0];
    }

    for(var i=0; i<collection.length-1; i++){
      result = iterator(prevValue, collection[i+1]);
      prevValue = result;
    }
    return result;

  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    if(Array.isArray(collection) ){ // check for array first, since typeof will give object for array
      for(var i=0; i<collection.length; i++){
        if(collection[i]===target){
          return true;
        }
      }
      return false;
    }
    else{
      for(var prop in collection){
        if(collection[prop]===target){
          return true;
        }
      }
      return false;
    }
  };



  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    if(!iterator){
      return true;
    }
    for(var i=0; i<collection.length; i++){
      if(!iterator(collection[i])){
        return false;
      }
    }
    return true;

  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    iterator = iterator || function(number){return number % 2 === 0;};  // default iterator
    for(var i=0; i<collection.length; i++){
      if(iterator(collection[i])){
        return true;
      }
    }
    return false;
  };


  // *
  //  * OBJECTS
  //  * =======
  //  *
  //  * In this section, we'll look at a couple of helpers for merging objects.


  // Extend a given object with all the properties of the passed in
  // object(s).
  _.extend = function(obj) {
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
  };


  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    setTimeout(func, wait);
  };



  // Shuffle an array.
  _.shuffle = function(array) {
    var newArr = [];
    var counter = 0;
    while(counter<array.length){
      var randNum = Math.floor(Math.random()*array.length);
      if(newArr[randNum]===undefined){
        newArr[randNum]= array[counter];
        counter++;
      }
    }
    return newArr;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

}).call(this);
