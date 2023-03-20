import React from "react";
import Title from "./components/Title"
import ValuesHeading from './components/ValuesHeading'
import ValuesField from "./components/ValuesField";

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <Title />
      <div className="values-container">
        <ValuesHeading text="Default Values" />
        <ValuesField />
      </div>
    </React.StrictMode>
  )
}
export default App;