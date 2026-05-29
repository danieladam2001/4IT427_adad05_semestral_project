import { PipelineInitPage } from './pages/PipelineInitPage';
import { PipelineIterationPage } from './pages/PipelineIterationPage';
import { type PipelineIteration } from './types/pipeline.types';
import { usePipeline } from './context/PipelineContext';
import { Routes, Route, NavLink } from 'react-router-dom';

function App() {
  const PipelineContext = usePipeline();
  
  if (!PipelineContext?.pipeline){
    return <></>
  }

  const test_pipeline_iterations: PipelineIteration[] = PipelineContext.pipeline.automatic_iterations

  return (
    <main>
      <div>
        
        <nav>
          <NavLink to="/" end>Inicializační Krok</NavLink>
          {test_pipeline_iterations.map((item) => (
            <NavLink 
              key={item.iteration_number} 
              to={`/iteration/${item.iteration_number}`}
            >
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