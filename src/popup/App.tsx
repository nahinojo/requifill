import React, { ChangeEvent, FC, ReactEventHandler, useState } from 'react';
import Title from "./components/Title"
import FieldHeader from './components/FieldHeader'
import Field from "./components/Field";

interface FieldDict {
  requestorPersonPhoneNumber: String,
  adHocUserID: String,
  commodityCode: String,
}

const App: FC = () => {

  const [inputValues, setInputValues] = useState<FieldDict>({
    requestorPersonPhoneNumber: '',
    adHocUserID: '',
    commodityCode: ''
  })

  return (
    <React.StrictMode>
      <Title />
      <div className="field-container">
        <FieldHeader text="Default Values" />
        <Field 
          name="Requestor Phone #" 
          id="requestor-person-phone-number"
          type="tel"
        />
        <Field
          name="Ad Hoc User ID"
          id="ad-hoc-user-id"
          type="text" 
        />
        <Field 
          name="Commodity Code"
          id="commodity-code"
          type="text"
          pattern="[0-9]+"
        />
      </div>
    </React.StrictMode>
  )
};
export default App;