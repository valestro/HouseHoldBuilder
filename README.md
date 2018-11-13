# HouseHoldBuilder
[Live Site](https://valestro.github.io/HouseHoldBuilder/)
UI for building a household up from individual people. Only JavaScript. No libraries.

Current focus on quality of JavaScript, not the beauty of design. [Ref. Assignment](https://homework.adhoc.team/hhbuilder/)

## Task
You have been given an HTML page (index.html) with a form and a placeholder for displaying a household.

Create an index.js file that can:

* Validate data entry (age is required and > 0, relationship is required)
* Add people to a growing household list
* Remove a previously added person from the list
* Display the household list in the HTML as it is modified
* Serialize the household as JSON upon form submission as a fake trip to the server

## Notes
Do not modify the given index.html file in any way. Modify the DOM through Javascript.

You must write JavaScript, not a language that compiles down to JavaScript. You must use ES3 or ES5/5.1 standard. Assume the capabilities of a modern mainstream browser in wide use, i.e., no bleeding-edge features. No 3rd party libraries – i.e., no jQuery.

On submission, put the serialized JSON in the provided “debug” DOM element and display that element.

After submission the user should be able to make changes and submit the household again.

Only age and relationship validations required as described above.



