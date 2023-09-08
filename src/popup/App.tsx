import React, { useState, useEffect } from 'react'
import type { FC, ReactEventHandler, ChangeEvent, MouseEventHandler, MouseEvent } from 'react'
import syncStorage from '../utils/syncStorage'
import ToggleAutofillHeader from './components/ToggleAutofillHeader'
import AddNewField from './components/AddNewField'
import FieldRenderer from './components/FieldRenderer'
import UnsavedFieldPrompt from './components/UnsavedFieldPrompt'
import getFieldName from '../utils/getFieldName'
import getFieldIndex from '../utils/getFieldIndex'

export type FieldDataProps = Record<string, {
  title?: string
  autofillValue: string | Record<string, string>
  isActive: boolean
}>

const App: FC = () => {
  const [fieldData, setFieldData] = useState<FieldDataProps>({})
  const [isUnsavedFieldChanges, setIsUnsavedFieldChanges] = useState<boolean>(false)
  const [isAddingField, setIsAddingField] = useState<boolean>(false)
  const [isRenderAddField, setIsRenderAddField] = useState<boolean>(true)

  /*
  Alters any specific autofillValue for both <SingleValueField /> <MultiValueField /> components.
  */
  const setAutofillValue = (
    fieldName: string,
    autofillValue: string | Record<string, string>,
    fieldIndex: number | null = null
  ): void => {
    setFieldData(prevFieldData => {
      return fieldIndex === null
        // Editing autofillValue if <SingleValueField /> component.
        // Or, editing entire autofillValue object of <MultiValueField /> component.
        ? {
          ...prevFieldData,
          [fieldName]: {
            ...prevFieldData[fieldName],
            autofillValue
          }
        }
        // Editing a specific value within autofillValue of <MultiValueField /> component.
        : {
          ...prevFieldData,
          [fieldName]: {
            ...prevFieldData[fieldName],
            autofillValue: {
              ...prevFieldData[fieldName].autofillValue as Record<string, string>,
              [fieldIndex]: autofillValue
            }
          }
        }
    })
  }

  /*
  Keeps fieldData synchronized with values in <input> elements.
  */
  const syncFieldDataState: ReactEventHandler<HTMLInputElement> =
  (evt: ChangeEvent<HTMLInputElement>) => {
    const { id: targetId, value: autofillValue } = evt.target
    const fieldName = getFieldName(targetId)
    if (fieldData != null) {
      if (typeof fieldData[fieldName].autofillValue === 'string') {
        setAutofillValue(
          fieldName, autofillValue
        )
      } else {
        const fieldIndex = getFieldIndex(targetId)
        setAutofillValue(
          fieldName, autofillValue, fieldIndex
        )
      }
      setIsUnsavedFieldChanges(true)
    }
  }

  /*
  Saves fieldData state to browser storage.
  */
  const saveFieldDataChanges: ReactEventHandler<HTMLInputElement> = () => {
    syncStorage
      .set({ fieldData })
      .catch(error => {
        console.log(error)
      })
    setIsUnsavedFieldChanges(false)
  }

  /*
  Reverts fieldData state from browser storage.
  */
  const discardFieldDataChanges: ReactEventHandler<HTMLInputElement> = () => {
    syncStorage
      .get()
      .then(storage => {
        setFieldData(storage.fieldData)
      })
      .catch(error => {
        console.log(error)
      })
    setIsUnsavedFieldChanges(false)
  }

  /*
  Changes priority of two items for <MultiValueField /> component.
  */
  const swapAutofillItemIndeces = (
    fieldName: string,
    fieldIndex1: number,
    fieldIndex2: number
  ): void => {
    setFieldData(prevFieldData => {
      const prevAutofillValue = prevFieldData[fieldName].autofillValue as Record<string, string>
      const fieldValue1 = prevAutofillValue[fieldIndex1]
      const fieldValue2 = prevAutofillValue[fieldIndex2]
      return {
        ...prevFieldData,
        [fieldName]: {
          ...prevFieldData[fieldName],
          autofillValue: {
            ...prevAutofillValue,
            [fieldIndex1]: fieldValue2,
            [fieldIndex2]: fieldValue1
          }
        }
      }
    })
  }

  /*
  Decreases an item's priority for <MultiValueField /> component.
  */
  const decreaseItemPriority: MouseEventHandler<HTMLDivElement> =
  (evt: MouseEvent<HTMLElement>): void => {
    const { id: targetId } = evt.target as HTMLElement
    const fieldName = getFieldName(targetId)
    const fieldIndex = getFieldIndex(targetId)
    const autofillValue = fieldData[fieldName].autofillValue as Record<string, string>
    const indexLowerBoundary = Object.keys(autofillValue).length - 1
    if (fieldIndex < indexLowerBoundary) {
      swapAutofillItemIndeces(
        fieldName,
        fieldIndex,
        fieldIndex + 1
      )
    }
  }

  /*
  Increases an item's priority for <MultiValueField /> component.
  */
  const increaseItemPriority: MouseEventHandler<HTMLDivElement> =
  (evt: MouseEvent<HTMLElement>): void => {
    const { id: targetId } = evt.target as HTMLElement
    const fieldName = getFieldName(targetId)
    const fieldIndex = getFieldIndex(targetId)
    if (fieldIndex > 0) {
      swapAutofillItemIndeces(
        fieldName,
        fieldIndex,
        fieldIndex - 1
      )
    }
  }

  /*
  Adds an item to <MultiVlaueField />.
  */
  const addAutofillItem: MouseEventHandler<HTMLElement> =
  (evt: MouseEvent<HTMLElement>): void => {
    const { id: targetId } = evt.target as HTMLElement
    const fieldName = getFieldName(targetId)
    const newIndex = Object.keys(fieldData[fieldName].autofillValue).length
    setAutofillValue(
      fieldName,
      '',
      newIndex
    )
    setIsUnsavedFieldChanges(true)
  }

  /*
  Deletes an item for <MultiValueField />.
  */
  const deleteAutofillItem: MouseEventHandler<HTMLElement> =
  (evt: MouseEvent<HTMLElement>): void => {
    const { id: targetId } = evt.target as HTMLElement
    const fieldName = getFieldName(targetId)
    const fieldIndex = getFieldIndex(targetId)
    const prevAutofillValue = fieldData[fieldName].autofillValue as Record<string, string>
    const newAutofillValue: Record<string, string> = {}
    let newIndex = 0
    for (const idx in prevAutofillValue) {
      const prevIndex = Number(idx)
      if (prevIndex !== fieldIndex) {
        newAutofillValue[newIndex] = prevAutofillValue[prevIndex]
        newIndex++
      }
    }
    if (Object.keys(newAutofillValue).length === 1) {
      setAutofillValue(
        fieldName, newAutofillValue[0]
      )
    } else {
      setAutofillValue(
        fieldName, newAutofillValue
      )
    }
    setIsUnsavedFieldChanges(true)
  }

  /*
  Injects fieldData into field <input> elements on page load.
  Ensures fieldData is in sync with browser storage.
  */
  useEffect(
    () => {
      syncStorage
        .get()
        .then(storage => {
          if (Object.keys(storage).length <= 0) {
            const initialFieldData = {
              adHocUserId: {
                autofillValue: 'adarami',
                isActive: true,
                title: 'Ad Hoc User ID'
              },
              commodityCode: {
                autofillValue: '7786413',
                isActive: false
              },
              description: {
                autofillValue: {
                  0: 'Amazon',
                  1: 'Digikey',
                  2: 'Home Depot',
                  3: 'Mouser'
                },
                isActive: true
              },
              phoneNumber: {
                autofillValue: '9491234567',
                isActive: false
              }
            }
            syncStorage
              .set({
                fieldData: initialFieldData
              })
              .catch(error => {
                console.log(error)
              })
            setFieldData(initialFieldData)
          } else {
            setFieldData(storage.fieldData)
          }
        })
        .catch(error => {
          console.log(error)
        })
      syncStorage.onChanged.addListener(() => {
        syncStorage
          .get()
          .then(storage => {
            setFieldData(storage.fieldData)
          })
          .catch(error => {
            console.log(error)
          })
      })
    }, []
  )

  return (
    <>
      <ToggleAutofillHeader />
      <FieldRenderer
        addAutofillItem={addAutofillItem}
        decreaseItemPriority={decreaseItemPriority}
        deleteAutofillItem={deleteAutofillItem}
        fieldData={fieldData}
        increaseItemPriority={increaseItemPriority}
        setIsRenderAddField={setIsRenderAddField}
        syncFieldDataState={syncFieldDataState}
      />
      <AddNewField
        fieldData={fieldData}
        isAddingField={isAddingField}
        isRenderAddField={isRenderAddField}
        setIsAddingField={setIsAddingField}
      />
      {
        !!isUnsavedFieldChanges && (
          <UnsavedFieldPrompt
            discardFieldChanges={discardFieldDataChanges}
            saveFieldChanges={saveFieldDataChanges}
          />
        )
      }
    </>
  )
}

export default App
