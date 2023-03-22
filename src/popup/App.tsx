import React from "react";
import Title from "./components/Title"
import DetailHeader from './components/DetailHeader'
import Detail from "./components/Detail";

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <Title />
      <div className="details-container">
        <DetailHeader text="Default Values" />
        <Detail 
          id="requestor-person-phone-number"
          type="tel"
          field="Requestor Phone #" 
        />
        <Detail
          id="ad-hoc-user-id"
          type="text" 
          field="Ad Hoc User ID"
        />
        <Detail 
          id="commodity-code"
          type="number"
          field="Commodity Code" 
        />
      </div>
    </React.StrictMode>
  )
}
export default App;