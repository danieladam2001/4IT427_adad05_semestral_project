import { InitialCard } from './components/InitialCard';
import { IterationCard } from './components/IterationCard';
import { type PipelineInitialization, type PipelineIteration } from './types/pipeline.types';
import { usePipeline } from './context/PipelineContext';

function App() {
  const PipelineContext = usePipeline();
  
  if (!PipelineContext?.pipeline){
    return <></>
  }

  const test_pipeline_init: PipelineInitialization = PipelineContext.pipeline.initialization_step
  const test_pipeline_iteration: PipelineIteration = PipelineContext.pipeline.automatic_iterations[0]

  return (
  <>
    <main>
      Semestral Project
    </main>
    <div>
      <InitialCard initialStep={test_pipeline_init}/>
    </div>
    <div>
      <IterationCard iteration={test_pipeline_iteration}/>
    </div>
  </>

  );
}

export default App;