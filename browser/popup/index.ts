import button from "./button";

// create the header element
const header = document.createElement('header');

// add some text to the header
const headerText = document.createTextNode('This is the header');

// append the text to the header element
header.appendChild(headerText);

// append the header element to the document body
document.body.appendChild(header);
document.body.appendChild(button)
