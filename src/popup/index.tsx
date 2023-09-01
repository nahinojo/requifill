import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/popup.css'

const root = document.getElementById('root') as HTMLDivElement | null
if (root !== null) {
  createRoot(root)
    .render(<App />)
}
