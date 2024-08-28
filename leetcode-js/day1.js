/*
Q1-Write a function createHelloWorld. It should return a new function that always
   returns "Hello World".
 

Example 1:

Input: args = []
Output: "Hello World"
Explanation:
const f = createHelloWorld();
f(); // "Hello World"

The function returned by createHelloWorld should always return "Hello World".
Example 2:

Input: args = [{},null,42]
Output: "Hello World"
Explanation:
const f = createHelloWorld();
f({}, null, 42); // "Hello World"

Any arguments could be passed to the function but it should still always return "Hello World".

*/


function createHelloWorld()
{
  return function ()
  {
  return "hello World"
  }
}


// 1]  first case

let newFunction=createHelloWorld()
  
console.log(newFunction())



// second case 
let newFunction2=createHelloWorld()


console.log(newFunction2({}, null, 42));

//