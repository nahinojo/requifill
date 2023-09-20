# **TODO.md**

## **Current Issues**

### Popup 

- Save Changes banner needs to be placed below everything; it cannot block fields
- Field does not unfocus on pressing keyboard 'Enter'
- Autosort MultiValueswer
- When creating a new field, ensure autofill is empty

### Requisition Form Manipulation

- (Potential) If a field is deleted, the value within Requisition input remains on screen
- Redo enhance.tsx

### Overhaul fieldName and fieldNameToId (again)
[Objectives] 
  - Only define the list of valid fieldNames and corresponding input ids once, each. 
  - Define them within the same object for maintainability
### Specific Issue: "Enable Autofill" but Default to an Empty String

[Context]
- You want a specific Reqisition \<input\> to be empty, but, you still would like the datalist dropdown. Let's call this feature DWA (Datalist Without Autofill). To currently achieve DWA, the field should be set as a MultiValueField with the first value as an empty string.

[Problem]
- The methodology to achieve DWA is not readily apparent. The user should realize that the first element in a MultiValueField should be empty, since it is the default value.
- It would be incorrect to use the term MultiValue since it is really a single value, without the default autofill feature
- It would be incorrect to use the term 'Enable Autofill' since you're ultimately "filling" with an empty string.
- Overall, acessing this feature requires you to take a unobvious and connotatively unintuitive approach.

[Solution 1: Separate the autofill process into two states]

Description
- Switch becomes 'Enable Requifill.' This switch determines if Requifill changes any aspect of the Requisition DOM. Of course, if this switch is turned off then the Requisition DOM is immediately cleared of all changes.
- The actual autofill feature can be toggled on a field-by-field basis. 
  - "Enable fill on page-load" is in field's the context menu.
  - This would only apply to SingleValueFields.
  - MultiValueField's priority feature may as well as be disabled, since it was really only for autofill purposes

## **Upcoming Features**

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
