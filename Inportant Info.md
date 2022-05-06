How-to:
For change something, simply edit constants in .js & .css files.

Example of constant in JS file:
const EXAMPLE = "value" / number;

In .css styles, you can also make changes in constants. There are 2 CSS files,
The first (index.css) is basic UI styles, and the second one (content/iframe.css) is for slider styles.
Example of CSS constant (usually in the beginning of the file):

--constant-example: any.constant.value;

You can change variables without any risk to broke something in project logic, so it's safe and good to know.
But better save the original .zip with the project, to be sure that nothing will be lost.





---

Also, if the public host directory will be different than public_html (baseurl address), 
then it's necessary to add a path directory. It's simple, and instruction is located in the form.js file.