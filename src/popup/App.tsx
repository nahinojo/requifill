import React, { FC } from 'react';
import Title from "./components/Title"
import FieldHeader from './components/FieldHeader'
import Field from "./components/Field";


const App: FC = () => {

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
          type="number"
        />
      </div>
    </React.StrictMode>
  )
};
export default App;