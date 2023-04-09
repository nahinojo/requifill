/*
Enchance any list-based input

Scrolling up or down cycles through items in list
*/

const focusInputValue = (targetInput: HTMLInputElement) =>
  (value: string | number): void => {
    if (!isNaN(value as number)) {
      value = String(value)
    }
    targetInput.value = value as string
    targetInput.select()
  }

// Ensures cyclical indexing through 'options' list.
const modulo = (m: number, n: number): number => {
  return ((n % m) + m) % m
}

const addOptionsScroller = (id: string, options: string[], setDefault: boolean): void => {
  const targetInput = document.getElementById(id) as HTMLInputElement
  const setInputValue = focusInputValue(targetInput)
  let currentIdx = 0
  if (setDefault) {
    setInputValue(options[0])
  }
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

const addNumericScroller = (id: string, defaultNumber: number, setDefault: boolean): void => {
  const targetInput = document.getElementById(id) as HTMLInputElement
  const setInputValue = focusInputValue(targetInput)
  let currentNumber = defaultNumber
  if (setDefault) {
    setInputValue(String(currentNumber))
  }
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
  ['UN', 'PK'],
  true
)

// Enchancing Budget Code Input
addOptionsScroller(
  'document.documentHeader.organizationDocumentNumber',
  ['080p', '081p'],
  true)

// Enchancing Description Input
addOptionsScroller(
  'document.documentHeader.documentDescription',
  ['Amazon', 'Ebay', 'McMaster-Carr', 'Newegg'],
  false
)

addNumericScroller(
  'newPurchasingItemLine.itemQuantity',
  1,
  true
)

addNumericScroller(
  'newPurchasingItemLine.itemUnitPrice',
  0,
  false
)
