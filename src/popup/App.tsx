import React, { useState, useReducer } from 'react'
import type { FC } from 'react'
import fieldDataReducer from './utils/fieldDataReducer'
import ToggleAutofillHeader from './components/ToggleAutofillHeader'
import AddNewField from './components/AddNewField'
import FieldRenderer from './components/FieldRenderer'
import UnsavedFieldPrompt from './components/UnsavedFieldPrompt'
import { FieldDataContext, FieldDataDispatchContext } from './utils/fieldDataContext'

const App: FC = () => {
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

  const [fieldData, fieldDataDispatch] = useReducer(
    fieldDataReducer,
    initialFieldData
  )
  const [isUnsavedFieldChanges, setIsUnsavedFieldChanges] = useState<boolean>(false)
  const [isAddingField, setIsAddingField] = useState<boolean>(false)
  const [isRenderAddField, setIsRenderAddField] = useState<boolean>(true)

  /*
  Injects fieldData into field <input> elements on page load
  Ensures fieldData is in sync with browser storage
  */
  // useEffect(
  //   () => {
  //     syncStorage
  //       .get()
  //       .then(storage => {
  //         if (Object.keys(storage).length <= 0) {
  //           const initialFieldData = {
  //             adHocUserId: {
  //               autofillValue: 'adarami',
  //               isActive: true,
  //               title: 'Ad Hoc User ID'
  //             },
  //             commodityCode: {
  //               autofillValue: '7786413',
  //               isActive: false
  //             },
  //             description: {
  //               autofillValue: {
  //                 0: 'Amazon',
  //                 1: 'Digikey',
  //                 2: 'Home Depot',
  //                 3: 'Mouser'
  //               },
  //               isActive: true
  //             },
  //             phoneNumber: {
  //               autofillValue: '9491234567',
  //               isActive: false
  //             }
  //           }
  //           syncStorage
  //             .set({
  //               fieldData: initialFieldData
  //             })
  //             .catch(error => {
  //               console.log(error)
  //             })
  //           setFieldData(initialFieldData)
  //         } else {
  //           setFieldData(storage.fieldData)
  //         }
  //       })
  //       .catch(error => {
  //         console.log(error)
  //       })
  //     syncStorage.onChanged.addListener(() => {
  //       syncStorage
  //         .get()
  //         .then(storage => {
  //           setFieldData(storage.fieldData)
  //         })
  //         .catch(error => {
  //           console.log(error)
  //         })
  //     })
  //   }, []
  // )

  return (
    <FieldDataContext.Provider
      value={fieldData}
    >
      <FieldDataDispatchContext.Provider
        value={fieldDataDispatch}
      >
        <ToggleAutofillHeader />
        <FieldRenderer
          setIsRenderAddField={setIsRenderAddField}
          setIsUnsavedChanges={setIsUnsavedFieldChanges}
        />
        {
          !!isRenderAddField && (
            <AddNewField
              isAddingField={isAddingField}
              isRenderAddField={isRenderAddField}
              setIsAddingField={setIsAddingField}
            />
          )
        }
        {
          !!isUnsavedFieldChanges && (
            <UnsavedFieldPrompt />
          )
        }
      </FieldDataDispatchContext.Provider>
    </FieldDataContext.Provider>
  )
}

export default App
