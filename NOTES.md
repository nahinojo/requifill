# Handling Numeric Input

Since the budget code consists only of numeric characters and you will not be performing any mathematical calculations on it, it is recommended to use the type="text" attribute for the `<input>` element. This will ensure that the user can only enter numeric characters, but without any of the added functionality that comes with type="number", such as increment buttons and browser validation of the input.

Using type="number" may also cause issues if the budget code includes leading zeros or if the code is longer than the maximum number value that can be represented by the input type. Therefore, using type="text" with appropriate validation for numeric characters is the safest and most appropriate choice in this case.

You can also add the pattern attribute to the `<input>` element to enforce the input to be only numeric characters, like this:

`<input type="text" pattern="[0-9]+">`

The pattern="[0-9]+" attribute ensures that only numeric characters are allowed and the required attribute makes it mandatory for the user to enter a value before submitting the form.

## `BeforeInputEvent`: Solution

### `BeforeInputEvent` must be defined to include `data`

```tsx
interface BeforeInputEvent extends SyntheticEvent, Partial<Pick<InputEvent, 'data'>> {};
```

This is because event is not native.

### How to specify `BeforeInputEvent` is of type `KeyboardEvent`

```tsx
const App: FC = () => {

  const inputHandler: ReactEventHandler<HTMLInputElement> = (
    ev: BeforeInputEvent
  ) => {
    const x = ev.nativeEvent as unknown as KeyboardEvent
  }
```

Since `ev.nativeEvent` and `KeyboardEvent` vary greatly, you have to use the `unknown` command to allow such a harsh definition.

## Logging All Events on a HTML Element

To view all events on an HTML Element:

```tsx
function logAllEvents (): void {
  const quantityInput = document.getElementById('newPurchasingItemLine.itemQuantity') as HTMLInputElement
  for (const eventType in quantityInput) {
    quantityInput.addEventListener(eventType.substring(2), function (event) {
      console.log(eventType.substring(2) + ' event:', event)
    })
  }
}
logAllEvents()
```

You may also change ```document.getElementbyId...``` to ```window``` view all events on he page.

## Building a React Switch

upmostly.com/tutorials/build-a-react-switch-toggle-component
