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



To change the slider speed set a new value in the AUTOSCROLL_TIMEOUT (file slider.js) in milliseconds.
If you want to disable elements auto-scroll set IS_AUTOSCROLL (file slider.js) from =true to =false.
By default auto-scroll does not work while the mouse is on the slider, that is part of UX flow to increase usability.

---

Also, if the public host directory will be different than public_html (baseurl address), 
then it's necessary to add a path directory. It's simple, and instruction is located in the form.js file.
