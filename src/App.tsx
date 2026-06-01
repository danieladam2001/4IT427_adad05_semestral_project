import { PipelineInitPage } from './pages/PipelineInitPage';
import { PipelineIterationPage } from './pages/PipelineIterationPage';
import { type PipelineIteration } from './types/pipeline.types';
import { usePipeline } from './context/PipelineContext';
import { Routes, Route, NavLink } from 'react-router-dom';

function App() {
  const PipelineContext = usePipeline();
  
  if (!PipelineContext?.pipeline){
    return <></>;
  }

  const test_pipeline_iterations: PipelineIteration[] = PipelineContext.pipeline.automatic_iterations;

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <nav className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-8 overflow-x-auto whitespace-nowrap">
          
          <NavLink to="/" end className={({ isActive }) => `
          "text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200" 
          ${isActive ? 'bg-mauve-600 text-white shadow-sm' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60'}
          `}>
            Inicializační Krok
          </NavLink>

          {test_pipeline_iterations.map((item) => (
            <NavLink key={item.iteration_number} to={`/iteration/${item.iteration_number}`} className={({ isActive }) => `
            "text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200" 
            ${isActive ? 'bg-mauve-600 text-white shadow-sm' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60'}
            `}>
              Iterace {item.iteration_number}
            </NavLink>
          ))}

        </nav>

        <Routes>
          <Route path="/" element={<PipelineInitPage/>} />
          <Route path="/iteration/:id" element={<PipelineIterationPage/>} />
        </Routes>

      </div>
    </main>
  );
}

export default App;