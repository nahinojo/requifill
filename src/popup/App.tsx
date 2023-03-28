import React, { ChangeEvent, FC, ReactEventHandler, useState, useEffect } from 'react';
import Title from "./components/Title"
import FillHeader from './components/FillHeader'
import FillItem from "./components/FillItem";

interface FieldDict {
  requestorPersonPhoneNumber: string,
  adHocUserID: string,
  commodityCode: string,
}

const App: FC = () => {

  const [fillValues, setFillValues] = useState<FieldDict>({
    requestorPersonPhoneNumber: '',
    adHocUserID: '',
    commodityCode: ''
  });

  useEffect(() => {
    browser.storage.sync.get(null).then((fillValuesSync) => {
      for (let name in fillValuesSync) {
        updateFillValues(name, fillValuesSync[name])
      } 
    }
  )}, []);

  const updateFillValues = (name: string, value: string) => {
    setFillValues( prevFieldValues => ({
      ...prevFieldValues,
      [name]: value
    }))
  };

  const handleAnyChange: ReactEventHandler<HTMLInputElement> = (
    evt: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = evt.target
    updateFillValues(name, value)
  };

  const handlePatternChange: ReactEventHandler<HTMLInputElement> = (
    evt: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, pattern } = evt.target
    const regex = new RegExp(pattern)
    if (regex.test(value)) {
      updateFillValues(name, value)
    }
  };

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
          value={fillValues.requestorPersonPhoneNumber}
          onChange={handlePatternChange}
        />
        <FillItem
          name="adHocUserID"
          title="Ad Hoc User ID"
          id="ad-hoc-user-id"
          type="text" 
          value={fillValues.adHocUserID}
          onChange={handleAnyChange}
        />
        <FillItem 
          name="commodityCode"
          title="Commodity Code"
          id="commodity-code"
          type="text"
          pattern="^\d*$"
          inputMode="numeric"
          value={fillValues.commodityCode}
          onChange={handlePatternChange}
        />
      </div>
    </React.StrictMode>
  );
};
export default App;