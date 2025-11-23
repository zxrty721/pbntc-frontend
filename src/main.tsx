import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/style/index.css'
import { BrowserRouter } from 'react-router-dom' // 👈 ต้องมี

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> {/* 👈 หุ้มไว้ */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)