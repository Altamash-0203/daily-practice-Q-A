/*
729. My Calendar I
Medium
Topics
Companies
Hint
You are implementing a program to use as your calendar. We can add a new event if adding the event will not cause a double booking.

A double booking happens when two events have some non-empty intersection (i.e., some moment is common to both events.).

The event can be represented as a pair of integers start and end that represents a booking on the half-open interval [start, end), the range of real numbers x such that start <= x < end.

Implement the MyCalendar class:

MyCalendar() Initializes the calendar object.
boolean book(int start, int end) Returns true if the event can be added to the calendar successfully without causing a double booking. Otherwise, return false and do not add the event to the calendar.
 

Example 1:

Input
["MyCalendar", "book", "book", "book"]
[[], [10, 20], [15, 25], [20, 30]]
Output
[null, true, false, true]
*/

class MyCalendar {
    constructor() {
      this.bookings = [];
    }
  
    book(start, end) {
      for (let [s, e] of this.bookings) {
        if (Math.max(start, s) < Math.min(end, e)) {
          return false;  // There's an overlap with an existing booking
        }
      }
      this.bookings.push([start, end]);  // No overlap, so we add the event
      return true;
    }
  }
  
  // Example usage:
  const calendar = new MyCalendar();
  console.log(calendar.book(10, 20)); // Output: true
  console.log(calendar.book(15, 25)); // Output: false
  console.log(calendar.book(20, 30)); // Output: true
  