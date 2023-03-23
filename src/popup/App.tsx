import React from "react";
import Title from "./components/Title"
import FieldHeader from './components/FieldHeader'
import Field from "./components/Field";

const App: React.FC = () => {
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
        />
      </div>
    </React.StrictMode>
  )
};
export default App;