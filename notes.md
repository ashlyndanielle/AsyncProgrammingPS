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