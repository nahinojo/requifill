import React from 'react';
import {createRoot} from 'react-dom/client';
import './css/index.css'
import App from './components/App'

const root = document.getElementById('root');
if (root) {
  const rootElement = (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  createRoot(root).render(rootElement);
}
