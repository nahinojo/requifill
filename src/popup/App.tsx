import React, { ChangeEvent, FC, FormEvent, KeyboardEvent, ReactEventHandler, SyntheticEvent } from 'react';
import Title from "./components/Title"
import FieldHeader from './components/FieldHeader'
import Field from "./components/Field";

interface beforeInputEvent extends SyntheticEvent {
  data: string
}

const App: FC = () => {

  const verifyIsNumber: ReactEventHandler<HTMLInputElement> = (
    ev: SyntheticEvent
  ) => {
    console.log("Event: ", ev)
    const keypress = ev
    console.log("keypress: ", keypress)
    console.log("typeof keypress: ", typeof keypress)
    // const isNotValidNumber = isNaN(keypress) || keypress == ' '
    // if (isNotValidNumber) {
    //   ev.preventDefault()
    //   return
    // }
  };

  return (
    <React.StrictMode>
      <Title />
      <div className="field-container">
        <FieldHeader text="Default Values" />
        <Field 
          id="requestor-person-phone-number"
          type="tel"
          name="Requestor Phone #" 
        />
        <Field
          id="ad-hoc-user-id"
          type="text" 
          name="Ad Hoc User ID"
        />
        <Field 
          id="commodity-code"
          type="number"
          name="Commodity Code"
          onBeforeInput={verifyIsNumber}
        />
      </div>
    </React.StrictMode>
  )
};
export default App;