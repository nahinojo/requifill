/*
Enchance any list-based input

Scrolling cycles through items in list
*/
const setTargetInputValue = (value: any, targetInput: HTMLInputElement): void => {
  targetInput.value = value
  targetInput.select()
}

const addOptionsScroller = (id: string, options: string[], setDefault: boolean): void => {
  const targetInput = document.getElementById(id) as HTMLInputElement
  let currentIdx = 0
  if (setDefault) {
    setTargetInputValue(options[0], targetInput)
    currentIdx += 1
  }
  targetInput.addEventListener('wheel', (evt) => {
    evt.preventDefault()
    setTargetInputValue(options[currentIdx], targetInput)
    currentIdx = (currentIdx + 1) % options.length
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
