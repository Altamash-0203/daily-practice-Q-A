/*
We need to implement a function cancellable that executes a given function (let's call it fn) after a specified delay (t milliseconds), unless a cancel function (cancelFn) is called before the delay expires. The cancel function should prevent the execution of the delayed function.

In other words, we have a task fn we want to do, but we want to wait for a bit (t milliseconds) before doing it. However, if we change our mind and want to cancel this task before the wait time is up, we can use a cancel function (cancelFn). If we don't cancel, the task will happen after the delay.

Closures:
In JavaScript, a closure is a combination of a function and the lexical environment within which that function was declared. The lexical environment consists of the variables, functions, and scopes available at the time of the closure's creation.

Working:

When a function is defined inside another function, a closure is created. The inner function retains a reference to the variables and scope of its outer function.
When the outer function finishes executing and returns, the closure is still intact with its captured variables and scope chain.
The closure allows the inner function to access and manipulate the variables of its outer function, even if the outer function's execution has been completed.
This behavior is possible because the closure maintains a reference to its outer function's variables and scope chain, preventing them from being garbage collected.
For a more detailed explanation of closures, check out the Counter editorial.

In the context of the problem, closures are used to maintain a reference to the timer variable even after the function that creates the closure has returned. This allows the cancelFn function to access and modify the timer variable, effectively canceling the execution of the delayed function.

setTimeout:
setTimeout is a built-in function in JavaScript that allows you to schedule the execution of a function after a specified delay. It can take an infinite number of arguments but usually, its first two arguments are always a function to be executed and a delay time in milliseconds.

Note: setTimeout is a variadic function that can accept an infinite number of arguments.

Here's an example of how to use setTimeout:

function delayedFunction() {
  console.log("Delayed function executed!");
}

const delay = 2000;

const timerId = setTimeout(delayedFunction, delay);

// To cancel the execution before the delay expires:
clearTimeout(timerId);
Working:

When setTimeout is called, it starts a timer and sets it to run after the specified delay.
After the delay expires, the JavaScript event loop puts the specified function in the execution queue.
Once the call stack is empty, the function is executed, and any associated code inside it is run.
If the setTimeout function is canceled before the delay expires, the scheduled function will not be executed.
For a deeper understanding of setTimeout, refer to the following editorials: Cache With Time Limit Editorial, Debounce Editorial, and Throttle Editorial.

In the context of the problem, setTimeout is used inside the cancellable function to schedule the execution of the delayed function (fn) after the specified delay (t).

Overall, closures and setTimeout work together in this problem to create a cancelable delayed function execution mechanism. The closure preserves the reference to the timeoutId variable, and setTimeout schedules the execution of the function after the specified delay.

Approach 1: Using Closure
Intuition:
We use the setTimeout function to schedule the execution of the delayed function fn after the specified timeout t. Then, we use the apply method to pass the arguments from the args array to fn.

When we call fn.apply(null, args), we're telling JS to execute the fn function with the arguments in the args array. The null argument specifies that the function should be executed in the global scope rather than in the scope of some other object. This is useful because we want to call a function defined in the global scope from within another function.

Also, by storing the timer ID returned by setTimeout in the timeoutId variable, we can cancel the execution of the delayed function by calling clearTimeout with the timeoutId.

Algorithm:
Inside the cancellable function, we use setTimeout to schedule the execution of fn after the specified timeout t. The fn function is invoked using the apply method, with null as the context and args as the arguments. Additionally, the setTimeout function returns a timer ID, which is stored in the timeoutId variable.
Afterward, a cancelFn function is defined, which calls clearTimeout with the timeoutId to cancel the execution of the delayed function.
Finally, return the cancelFn from the cancellable function.
Implementation:

Complexity Analysis:
Time complexity: O(1)

Space complexity: O(1)

While the time and space complexity of the cancellable function itself is O(1), it's important to note that the time complexity of the function fn that is passed as an argument can have some different complexity.

Approach 2: Using Boolean flag
Intuition:
We can use a boolean variable that decides whether calling function fn is allowed or not.

Algorithm:
Initialize a boolean variable isCancelled as false to track the cancellation status.
Use setTimeout() to schedule the execution of fn after a delay of t milliseconds, but only if isCancelled is false.
Return a function that flips the value of isCancelled to true, canceling the execution of fn. The cancellation function ensures that fn will never be called if it is invoked before the delay expires.
While this approach does prevent the fn function from being executed if the cancel function is invoked, it's worth noting that the setTimeout callback still gets executed when the delay is over. This means that even when canceled, the function still uses up a slot in the JavaScript event loop queue. As such, in terms of computational efficiency, this approach might be slightly le
*/



function cancellable(fn, args, t) {
    // Schedule the execution of fn with the provided args after delay t
    const timeoutId = setTimeout(() => {
      const result = fn(...args);
      console.log(`{"time": ${t}, "returned": ${result}}`);
    }, t);
  
    // Return the cancel function, which clears the timeout if invoked before t
    return () => clearTimeout(timeoutId);
  }
  
  // Example 1:
  const cancelTimeMs1 = 50;
  const cancelFn1 = cancellable((x) => x * 5, [2], 20);
  setTimeout(cancelFn1, cancelTimeMs1);
  
  // Example 2:
  const cancelTimeMs2 = 50;
  const cancelFn2 = cancellable((x) => x ** 2, [2], 100);
  setTimeout(cancelFn2, cancelTimeMs2);
  
  // Example 3:
  const cancelTimeMs3 = 100;
  const cancelFn3 = cancellable((x1, x2) => x1 * x2, [2, 4], 30);
  setTimeout(cancelFn3, cancelTimeMs3);
  