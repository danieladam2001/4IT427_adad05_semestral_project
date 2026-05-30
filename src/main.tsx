import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { PipelineProvider } from './context/PipelineContext.tsx'
import { BrowserRouter } from 'react-router-dom';
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PipelineProvider>
        <App />
      </PipelineProvider>
    </BrowserRouter>
  </StrictMode>
)
