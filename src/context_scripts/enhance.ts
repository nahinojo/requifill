/*
Enchance any list-based input

Scrolling up or down cycles through items in list
*/

const setInputValue = (value: any, targetInput: HTMLInputElement): void => {
  targetInput.value = value
  targetInput.select()
}

const modulo = (m: number, n: number): number => {
  return ((n % m) + m) % m
}

const addOptionsScroller = (id: string, options: string[], setDefault: boolean): void => {
  const targetInput = document.getElementById(id) as HTMLInputElement
  let currentIdx = 0
  if (setDefault) {
    setInputValue(options[0], targetInput)
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
    setInputValue(options[currentIdx], targetInput)
  })
}

const addNumericScroller = (id: string, defaultNumber: number, setDefault: boolean): void => {
  const targetInput = document.getElementById(id) as HTMLInputElement
  let currentNumber = defaultNumber
  if (setDefault) {
    setInputValue(String(currentNumber), targetInput)
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
    setInputValue(currentNumber, targetInput)
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
