# Handling Numeric Input

Since the budget code consists only of numeric characters and you will not be performing any mathematical calculations on it, it is recommended to use the type="text" attribute for the <input> element. This will ensure that the user can only enter numeric characters, but without any of the added functionality that comes with type="number", such as increment buttons and browser validation of the input.

Using type="number" may also cause issues if the budget code includes leading zeros or if the code is longer than the maximum number value that can be represented by the input type. Therefore, using type="text" with appropriate validation for numeric characters is the safest and most appropriate choice in this case.

You can also add the pattern attribute to the <input> element to enforce the input to be only numeric characters, like this:

<input type="text" pattern="[0-9]+" required>

The pattern="[0-9]+" attribute ensures that only numeric characters are allowed and the required attribute makes it mandatory for the user to enter a value before submitting the form.