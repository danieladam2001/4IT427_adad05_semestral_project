import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { PipelineProvider } from './context/PipelineContext.tsx'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, 
      retry: 2,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <PipelineProvider>
          <App />
        </PipelineProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
)
