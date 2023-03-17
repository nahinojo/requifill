import chroma from "chroma-js";

//New Color
const newColor = chroma('#D4F880').darken().hex();

const button = document.createElement("button");
// set the button's text
button.innerHTML = "Click me";
// set the button's background color to blue
button.style.backgroundColor = newColor;
// append the button to the body of the HTML document
export default button
