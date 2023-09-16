# **TODO.md**

## **Issues**

### Popup 

- Save Changes banner needs to be placed below everything; it cannot bloc fields
- Field does not unfocus on pressing keyboard 'Enter'

### Requisition Form Manipulation

- (Potential) If a field is deleted, the value within Requisition input remains on screen

### Specific Issue: Enable Autofill and default to empty string

[Description]
- Say someone wants the Reqisition input to be empty, but, they still would like the dropdown. To achieve this as is, set everything as a multivalue field with the first autofill value as 

[Solution: Separate into two states]
- Switch becomes 'Enable Requifill.' This switch determines if ANY Requisition DOM changes occur. If turned off, clears everything.
- (When Enable Requifill ON) The actual autofill feature can be toggled on a field-by-field basis.

[Solution: Autofill is button]
- Instead of Autofill being a togleable state, it's a button. Will execute autofill.ts when clicked.
- Enable requifill will likely still exist, just in the extension settings
## **Features**

### Storage

### Documentation & Advertise

[ Wait until project is more fleshed out before completing]
- Fill out the README.md in detail.
- Make a website for this extension.


### Popup

[ See design on Figma ]
- Enable/Disable fields to be multivalue
- Clearall values? Remove all fields?


### Requisition Form Manipulation

- Add a visual indicator that the input field contains scrollable values. Maybe an icon or change of styling?
- Autofill expected value when typing. Maybe include a dropdown for scrolling?
- Finer decimal scroll when holding down the shift key

### Other Capabilities

- Copy/paste from merchandise store (Amazon, Newegg, Digikey) to KFS document.
- Copy/paste from submitted KFS document to purchase logbook.

## **Considerations**
