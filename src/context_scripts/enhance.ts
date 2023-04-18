/*
Wrapper function for setting value of target <input> element
*/
type InputSetter = (value: string | number) => void

const focusInputValue = (targetInput: HTMLInputElement): InputSetter => {
  return (value: string | number): void => {
    if (!isNaN(value as number)) {
      value = String(value)
    }
    targetInput.value = value as string
    targetInput.select()
  }
}

/*
Assists the cyclical indexing of Arrays
*/
const modulo = (m: number, n: number): number => {
  return ((n % m) + m) % m
}

/*
Enchance any list-based input

Scrolling up or down cycles through items in list
*/

const addOptionsScroller = (
  id: string,
  options: string[]
): void => {
  console.log('id', id)
  const targetInput = document.getElementById(id) as HTMLInputElement
  console.log('targetInput', targetInput)
  console.log('targetInput.value:', targetInput.value)
  const setInputValue = focusInputValue(targetInput)
  let currentIdx = (
    options.includes(targetInput.value) ? options.indexOf(targetInput.value) : 0
  )
  targetInput.addEventListener('wheel', (evt) => {
    evt.preventDefault()
    if (options.includes(targetInput.value)) {
      if (evt.deltaY > 0) {
        currentIdx = modulo(options.length, (currentIdx + 1))
      } else {
        currentIdx = modulo(options.length, (currentIdx - 1))
      }
    } else {
      currentIdx = 0
    }
    setInputValue(options[currentIdx])
  })
}

const addNumericScroller = (
  id: string,
  defaultNumber: number
): void => {
  const targetInput = document.getElementById(id) as HTMLInputElement
  const setInputValue = focusInputValue(targetInput)
  let currentNumber = defaultNumber
  targetInput.addEventListener('wheel', (evt) => {
    evt.preventDefault()
    const inputContainsValidNumber = (
      Number(targetInput.value) !== null &&
      Number(targetInput.value) >= defaultNumber)
    if (inputContainsValidNumber) {
      if (evt.deltaY > 0) {
        currentNumber += 1
      } else if (Number(targetInput.value) !== defaultNumber) {
        currentNumber -= 1
      }
    } else {
      currentNumber = defaultNumber
    }
    setInputValue(currentNumber)
  })
}

// Enhancing UOM Input
addOptionsScroller(
  'newPurchasingItemLine.itemUnitOfMeasureCode',
  ['UN', 'PK']
)

// Enchancing Budget Code Input
addOptionsScroller(
  'document.documentHeader.organizationDocumentNumber',
  ['080p', '081p']
)

// Enchancing Description Input
addOptionsScroller(
  'document.documentHeader.documentDescription',
  ['Amazon', 'Ebay', 'McMaster-Carr', 'Newegg']
)

addNumericScroller(
  'newPurchasingItemLine.itemQuantity',
  1
)

addNumericScroller(
  'newPurchasingItemLine.itemUnitPrice',
  0
)
