# **TODO.md**
## **Issues**

## **Features**
### Metadata
- Add an icon for the extension

### Document & Advertise
- Fill out the README.md in detail.
- Make a website for this extension.

[ Wait until project is more fleshed out before completeing ]

### DOM Manipulation
- Add a visual indicator that the input field contains scrollable values. Maybe an icon or change of styling?

### CI/CD
- Setup the extension to be permanently installable, with real-time updates on its release.

[ Requires a different version of Firefox. Install on work PC. ] 

### Popup Features
- Allow user to add/remove items from Default Values list.

### New Capabilites
- Copy/paste from merchandise store (Amazon, Newegg, Digikey) to KFS document.
- Copy/paste from submitted KFS document to purchase logbook.



## **Considerations**
### Default Values: Popup vs Enhance.ts
- It seems that the default values for the various input fields are handled by both the popup menu as well as the enhance.ts context script. enchance.ts is useful for improving the HTML elements, however, maybe the default values themselves should nonehtless be stored and managed by the FillItem components within the popup menu. This sould be done for the sake of consistency and inuitivety.
