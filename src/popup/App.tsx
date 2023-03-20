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
        <Detail name="Requestor Phone #" value="1234567890" type="tel"/>
        <Detail name="Ad Hoc User ID" value="adarami" type="text"/>
        <Detail name="Commodity Code" value="31160000" type="number"/>
      </div>
    </React.StrictMode>
  )
}
export default App;