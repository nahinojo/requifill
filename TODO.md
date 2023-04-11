# **TODO.md**
## **Issues**

## **Features**
### Application Settings
- Add an icon for the extension

### Document & Advertise
- Fill out the README.md in detail.
- Make a website for this extension.

### UI
- Add a visual indicator that the input field contains scrollable values. Maybe an icon or change of styling?

### Linting
- Setup gitlinter.
- Setup Markdown (linter if possible)

### CI/CD
- Setup the extension to be permanently installable, with real-time updates on its release.

### Capabilites
- Copy/paste from merchandise store (Amazon, Newegg, Digikey) to KFS document.
- Copy/paste from submitted KFS document to purchase logbook.

### Extension Window
- Allow user to add/remove items from Default Values list.


## **Considerations**
### Default Values: Popup vs Enhance.ts
- It seems that the default values for the various input fields are handled by both the popup menu as well as the enhance.ts context script. enchance.ts is useful for improving the HTML elements, however, maybe the default values themselves should nonehtless be stored and managed by the FillItem components within the popup menu. This sould be done for the sake of consistency and inuitivety.
