/*
Enchance any list-based input

Scrolling cycles through items in list
*/
const setTargetInputValue = (value: any, targetInput: HTMLInputElement): void => {
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
    setTargetInputValue(options[0], targetInput)
  }
  targetInput.addEventListener('wheel', (evt) => {
    evt.preventDefault()
    if (!options.includes(targetInput.value)) {
      currentIdx = 0
    } else {
      if (evt.deltaY > 0) {
        currentIdx = modulo((currentIdx + 1), options.length)
      } else {
        currentIdx = modulo((currentIdx - 1), options.length)
      }
    }
    setTargetInputValue(options[currentIdx], targetInput)
    console.log('currentIdx (final):', currentIdx)
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

const logAllEvents = (): void => {
  const quantityInput = document.getElementById('newPurchasingItemLine.itemQuantity') as HTMLInputElement
  for (const eventType in quantityInput) {
    quantityInput.addEventListener(eventType.substring(2), (event) => {
      console.log(eventType.substring(2) + ' event:', event)
    })
  }
}
logAllEvents()
