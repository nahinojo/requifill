/*
Enhance UOM Input

Scrolling alters selection between 'UN' and 'PK'
*/
const uomInput = document.getElementById('newPurchasingItemLine.itemUnitOfMeasureCode') as HTMLInputElement
const setQuantityValue = (val: string): void => {
  uomInput.value = val
  uomInput.select()
}
setQuantityValue('UN')
uomInput.addEventListener('wheel', (evt) => {
  evt.preventDefault()
  if (uomInput.value === 'UN') {
    setQuantityValue('PK')
  } else {
    setQuantityValue('UN')
  }
})

/*
Enhance Budget Code Input

Scrolling alters selection between '8081p' and '080p'
*/
const budgetCodeInput = document.getElementById('document.documentHeader.organizationDocumentNumber') as HTMLInputElement
const setBudgetCodeValue = (val: string): void => {
  budgetCodeInput.value = val
  budgetCodeInput.select()
}
setBudgetCodeValue('081p')
budgetCodeInput.addEventListener('wheel', (evt) => {
  evt.preventDefault()
  if (budgetCodeInput.value === '081p') {
    setBudgetCodeValue('080p')
  } else {
    setBudgetCodeValue('081p')
  }
})
