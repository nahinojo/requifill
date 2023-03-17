import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css'

const Title: React.FC = () => {
  return (
    <div id='title-background'>
      <h1 id='title'>Requifill</h1>
    </div>
  );
};
const App: React.FC = () => {
  return (
    <Title />
  )
}

const root = document.getElementById('root');
if (root) {
  const rootElement = (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  createRoot(root).render(rootElement);
}
