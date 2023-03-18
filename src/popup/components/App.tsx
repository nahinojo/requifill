import React from "react";
import Title from "./Title";
import Header from "./Header";

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <Title />
      <Header text="Default Values" />
    </React.StrictMode>
  )
}
export default App;