import React, { ChangeEvent, FC, ReactEventHandler, useState } from 'react';
import Title from "./components/Title"
import FillHeader from './components/FillHeader'
import FillItem from "./components/FillItem";

interface FieldDict {
  requestorPersonPhoneNumber: string,
  adHocUserID: string,
  commodityCode: string,
}

const App: FC = () => {

  const [fieldValues, setFieldValues] = useState<FieldDict>({
    requestorPersonPhoneNumber: '',
    adHocUserID: '',
    commodityCode: ''
  });

  const handleAnyChange: ReactEventHandler<HTMLInputElement> = (
    evt: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = evt.target
    setFieldValues( prevFieldValues => ({
      ...prevFieldValues,
      [name]: value
    }))
  };

  const handlePatternChange: ReactEventHandler<HTMLInputElement> = (
    evt: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, pattern } = evt.target
    const regex = new RegExp(pattern)
    if (regex.test(value)) {
      setFieldValues( prevFieldValues => ({
        ...prevFieldValues,
        [name]: value
      }))
    }
  }

  return (
    <React.StrictMode>
      <Title />
      <div className="fill-container">
        <FillHeader text="Default Values" />
        <FillItem 
          name="requestorPersonPhoneNumber"
          title="Requestor Phone #" 
          id="requestor-person-phone-number"
          type="tel"
          pattern="^[\d\+\-\)\( ]*$"
          value={fieldValues.requestorPersonPhoneNumber}
          onChange={handlePatternChange}
        />
        <FillItem
          name="adHocUserID"
          title="Ad Hoc User ID"
          id="ad-hoc-user-id"
          type="text" 
          value={fieldValues.adHocUserID}
          onChange={handleAnyChange}
        />
        <FillItem 
          name="commodityCode"
          title="Commodity Code"
          id="commodity-code"
          type="text"
          pattern="^\d*$"
          inputMode="numeric"
          value={fieldValues.commodityCode}
          onChange={handlePatternChange}
        />
      </div>
    </React.StrictMode>
  )
};
export default App;