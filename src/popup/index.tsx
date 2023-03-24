import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App'
import './styles/popup.css'

// // PRODCUTION USE ONLY
// function logAllEvents() {
//   for (const eventType in window) {
//     if (eventType.startsWith("on")) {
//       window.addEventListener(eventType.substring(2), function(event) {
//         console.log(eventType.substring(2) + " event:", event);
//       });
//     }
//   }
// }

// logAllEvents();

const root = document.getElementById('root') as HTMLDivElement | null;
root && createRoot(root).render(<App />);
