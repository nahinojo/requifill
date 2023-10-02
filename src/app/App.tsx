import React, {
  useEffect,
  useState,
  useReducer
} from 'react'
import {
  AddNewField,
  FieldRenderer,
  ToggleAutofillHeader,
  UnsavedChangesPrompt
} from './components'
import {
  fieldDataContext,
  fieldDataDispatchContext,
  fieldDataReducer
} from './hooks'
import {
  initialFieldData,
  syncStorage
} from '../utils'

import type { FC } from 'react'
import { NavMenu } from './components/NavMenu'

const App: FC = () => {
  const [fieldData, fieldDataDispatch] = useReducer(
    fieldDataReducer,
    initialFieldData
  )
  console.count('App render')
  const [isUnsavedChanges, setIsUnsavedChanges] = useState<boolean>(false)
  const [isAddingField, setIsAddingField] = useState<boolean>(false)
  const [isRenderAddNewField, setIsRenderAddNewField] = useState<boolean>(true)

  /*
  Ensures <NavMenu /> does not block lower region during root overflow

  Problem: the values for height are calculated BEFORE the new render.
  - Hence, the calculation for body height is based on the previous render of App, not the post-render
  - How do I solve this issue?

  This is one of those circumstances where I feel I am looking th problem wrong.
  Shouldn't the DOM automatically add a properly sized scroll bar to handle overflow?
   - Notice how the scroll bar overlaps NavMenu. This shouldn't occur.
  What is the real issue that I need to solve? Solution > Remedy

  Maybe lock the shape of root to have it's bottom side to tangent NavMenu.
    - Then, normal overflow will be handled and there will not be an overlap issue.
    - Also, consider not using root itself, rather a div wrapper for field data.
  */
  const { body } = document
  const root = document.getElementById('root') as HTMLDivElement
  const rootHeight = root.clientHeight
  const bodyHeight = body.clientHeight
  const navMenuHeight = 96
  const componentTreeHeight = rootHeight + navMenuHeight
  const isNavMenuNeedsMoreSpace = componentTreeHeight > bodyHeight
  const isNavMenuNeedsLessSpace = false
  const isNavMenuNeedsNoSpace = componentTreeHeight < 600
  console.log(
    'rootHeight:',
    rootHeight,
    '\nbodyHeight:',
    bodyHeight,
    '\ncomponentTreeHeight:',
    componentTreeHeight
  )
  if (isNavMenuNeedsMoreSpace) {
    console.log('Increasing <body/> height')
    body.style.height = `${componentTreeHeight}px`
  }
  if (isNavMenuNeedsNoSpace) {
    console.log('Setting <body /> height to 600px')
    body.style.height = '600px'
  }

  /*
  Injects fieldData into field <input> elements.
  Ensures fieldData is in sync with browser storage.
  */
  useEffect(
    () => {
      syncStorage
        .get()
        .then(storage => {
          if (Object.keys(storage).length <= 0) {
            syncStorage
              .set({
                fieldData: initialFieldData
              })
              .catch(error => {
                console.error(error)
              })
          } else {
            fieldDataDispatch({
              newFieldData: storage.fieldData,
              type: 'set-data'
            })
          }
        })
        .catch(error => {
          console.error(error)
        })
      syncStorage.onChanged.addListener(() => {
        syncStorage
          .get()
          .then(storage => {
            fieldDataDispatch({
              newFieldData: storage.fieldData,
              type: 'set-data'
            })
          })
          .catch(error => {
            console.error(error)
          })
      })
    }, []
  )

  return (
    <fieldDataContext.Provider
      value={fieldData}
    >
      <fieldDataDispatchContext.Provider
        value={fieldDataDispatch}
      >
        <ToggleAutofillHeader />
        <FieldRenderer
          setIsRenderAddNewField={setIsRenderAddNewField}
          setIsUnsavedChanges={setIsUnsavedChanges}
        />
        {
          !!isRenderAddNewField && (
            <AddNewField
              isAddingField={isAddingField}
              setIsAddingField={setIsAddingField}
              setIsUnsavedChanges={setIsUnsavedChanges}
            />
          )
        }
        {
          !!isUnsavedChanges && (
            <UnsavedChangesPrompt
              setIsUnsavedChanges={setIsUnsavedChanges}
            />
          )
        }
        {
          !isUnsavedChanges && (
            <NavMenu />
          )
        }
      </fieldDataDispatchContext.Provider>
    </fieldDataContext.Provider>
  )
}

export default App
