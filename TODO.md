# **TODO.md**

## **Issues**

### Popup 

- Save Changes banner needs to be placed below everything; it cannot bloc fields
- Field does not unfocus on pressing keyboard 'Enter'

### Requisition Form Manipulation

- (Potential) If a field is deleted, the value within Requisition input remains on screen
- The 'Enable Autofill' switch is somewhat misleading:
  - Say someone wants the Reqisition input to be empty, but, they still would like the dropdown.
  - To achieve this as is, set everything as a multivalue field with the first autofill value as ''
  - Solution 1:
   - Switch becomes 'Enable Requifill'
    - Determines if ANY Requisition DOM changes occur. If turned off, clears everything.
   - (When Enable Requifill ON) The actual autofill feature can be toggled on a field-by-field bases.
    - Users will see this difference by noticing

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
