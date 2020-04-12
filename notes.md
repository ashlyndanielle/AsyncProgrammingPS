# JavaScript Promises and Async Programming: Notes


## Why is callback hell....hell?

* dirty / messy code :(
* handling errors - makes code even messier :(

## Promises

__Promise:__ Object that represents the eventual completion (or failure) of an asynchronous operation, and its resulting value (developer.mozzilla)

* allows developers to write asynchronous code in a clear and less error prone way

__Promise States__
* Pending
* Fulfilled - when fulfilled it will return a single value
* Rejected - returns a reason why it was rejected

__*Always remember to return a promise when chaining .then()*__

__Creating Promises__
* a promise takes a function as it's only parameter to it's constructor (executer function)
  * the executer function takes two parameters: resolve and reject - change state of promise to fulfilled or rejected

__Promise.all()__
* pass array of calls into function
* results are returned in an array in the same order that you passed the calls in
* waits until all promises are fulfilled OR until one promise is rejected

__Promise.allSettled()__
* not all browsers support this (of course...)
* returns an object with two keys
  * a status key of 'fulfilled' or 'rejected'
  * the second key is 'value' if fulfilled; or 'reason' if rejected
* .then() will return all promises, even if they were rejected
* we don't need a catch block but should still include it

__Promise.race()__
* used when trying to get data from the quickest source (i.e. which server is closest)
* will return whenever the first promise *settles*
  * if the first promise fails, it will call the catch function and you won't get your data
* not a lot of use cases but just be aware of it