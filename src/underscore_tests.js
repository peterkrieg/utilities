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
      // could equal [5,1,7]['sort'].apply([5,1,7], args)

      // [1,5,7]['sort'].apply([1,5,7], args);
      // Array.prototype.sort.apply([1,5,7, args]);


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
    var counter = 0;
    var falsey = [null, 0, '', false, NaN, undefined];
    for(var i=0; i<collection.length; i++){
      if(falsey.indexOf(collection[i])>-1){
        counter++;
      }
    }
    if(counter===collection.length){
      return false;
    }
    // now check iterator
    for(var j=0; j<collection.length; j++){
      if(iterator(collection[j])){
        return true;
      }
    }
    return false;
  } ;


  // *
  //  * OBJECTS
  //  * =======
  //  *
  //  * In this section, we'll look at a couple of helpers for merging objects.


  // Extend a given object with all the properties of the passed in
  // object(s).
  _.extend = function(obj) {
    var objects = arguments;
    for(var i=0; i<arguments.length; i++){
      var currentObj = arguments[i];
      for(var prop in currentObj){
        obj[prop]= currentObj[prop];
      }
    }
    return obj;
  };












  //   for(var i=0; i<obj.length; i++){
  //     var currentObj = obj[i];
  //     for(var prop in currentObj){
  //       newObj[prop]=currentObj[prop];
  //     }
  //   }
  //   return newObj;
  // };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var objects = arguments;
    for(var i=0; i<arguments.length; i++){
      var currentObj = arguments[i];
      for(var prop in currentObj){
        if(obj[prop]===undefined){
          obj[prop]= currentObj[prop];
        }
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    var executed = false;
    return function(){
      if(!executed){
        executed = true;
        func();
      }
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    // var executed = false;
    // return function(){
    //   if(!executed){
    //     executed = true;
    //     var result = func();
    //     return result;
    //   }
    //   return func();
    // };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = arguments;
    console.log(args);
    // delete func, and wait on args, want all args after that, if any
    // this function should work, it works on JSBin, not sure why it doesn't pass test
    //  http://jsbin.com/vicera/edit?js,console    
    delete args[0];
    delete args[1];
    console.log(args);
    var newArgs = [];
    for(var prop in args){
      newArgs.push(args[prop]);
    }
    console.log(newArgs);
    var newFunc = func.bind(newArgs);
    setTimeout(newFunc, wait);
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
    // first check for undefined values
    if(collection.indexOf(undefined)>-1){
      console.log('yep');
      var counter = 0;  // keep track of how many undefined
      for(var i=collection.length-1; i>=0; i--){
        if(collection[i]===undefined){
          counter++;
          // undefinedVals.push(collection[i]);
          collection.splice(i, 1);
        }
      }
      if(typeof iterator === 'function'){
        collection.sort(iterator);
      }
      else if(typeof iterator ==='string'){
        collection.sort(function(a,b){return a.length- b.length;});
      }
      for(var k=0; k<counter; k++){
        collection.push(undefined);
      }
      console.log(collection);
      return collection;
    }



    if(typeof iterator === 'function'){
      collection.sort(iterator);
    }
    else if(typeof iterator ==='string'){
      collection.sort(function(a,b){return a.length- b.length;});
    }




    return collection;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var result = [];
    var arr = [];
    for(var prop in arguments){
      arr.push(arguments[prop]);
    }
    arr.sort(function(a,b){return b.length-a.length;}); // sorts array of arrays, by longest array first
    var numRef = arr[0].length;

    for(var i=0; i<numRef; i++){
      var currentArr = arr[i];
      result[i]= [];
      for(var j=0; j<arr.length; j++){
        result[i].push(arr[j][i]);
      }
    }
    return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = function(nestedArray, result) {
    var newArr = [];
    // for(var i=0; i<nestedArray.length; i++){
    //   var element = nestedArray[i];


      // function checkArr(arr){
      //   if(!Array.isArray(element)){
      //     newArr.push(element);
      //   }





      // }



    //   if(!Array.isArray(element)){
    //     newArr.push(element);
    //   }
    //   else{

    //   }

    // }



  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var arrays = arguments;
    console.log(arguments);
    var shared = [];
    // why does this not work??  trying to make more efficient, start at first array
    // arrays.sort(function(a,b){return a.length-b.length;});
    //  I think it doesn't wory because I looked up, and arguments isn't actually an array, 
    // it is "array like object".  Need to call sort method

    // this line makes program more efficient.  Basing entire intersection on shortest array
    Array.prototype.sort.call(arrays, function(a,b){return a.length-b.length;});
    console.log(arrays);
    var firstArr = arrays[0];
    for(var i=0; i<firstArr.length; i++){
      var element = firstArr[i];
      for(var j=1; j<arrays.length; j++){
        var currentArr = arrays[j];
        if(currentArr.indexOf(element)===-1){ // element not shared, break loop
          break;
        }
        if(j===arrays.length-1){
          shared.push(element);
        }
      }
    }
    return shared;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.

  // This code should work below.  I ran it in JSBin, and chrome console to test, and works perfectly there
  // but not here.. works for both tests in underscoreSpec.js
  _.difference = function(arrays) {
    var firstArr = arguments[0];
    for(var i=1; i<arguments.length; i++){
      var currentArr = arguments[i];
      for(var j=firstArr.length-1; j>=0; j--){
        if(currentArr.indexOf(firstArr[j])>-1){  // element exists in both arrays, must be removed
          firstArr.splice(j, 1);
        }
      }
    }
    return firstArr;
  };

  // alternative way, to not affect original first array, this ALSO works in JSbin, and chrome console..
  // _.difference = function(array) {
  //   var firstArr = array[0];
  //   var newArr = firstArr;
  //   for(var i=1; i<array.length; i++){
  //     var currentArr = array[i];
  //     for(var j=firstArr.length-1; j>=0; j--){
  //       if(currentArr.indexOf(firstArr[j])>-1){  // element exists in both arrays, must be removed
  //         newArr.splice(j, 1);
  //       }
  //     }
  //   }
  //   return newArr;
  // };

}).call(this);
