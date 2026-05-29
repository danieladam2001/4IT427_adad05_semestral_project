import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { PipelineProvider } from './context/PipelineContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PipelineProvider>
      <App />
    </PipelineProvider>
  </StrictMode>
)
