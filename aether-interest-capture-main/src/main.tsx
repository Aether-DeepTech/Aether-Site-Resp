// src/main.tsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Importa o gerenciador
import App from './App.tsx'
import './index.css'

// Pega o elemento root do HTML
const rootElement = document.getElementById('root')!

// Envelopamos o <App /> com o <BrowserRouter>
createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)