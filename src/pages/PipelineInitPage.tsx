import { usePipeline } from '../context/PipelineContext';
import { InitialCard } from '../components/InitialCard';

export function PipelineInitPage() {
  const PipelineContext = usePipeline();

  if (!PipelineContext?.pipeline){
    return <></>
  }

  const initial_step = PipelineContext?.pipeline.initialization_step;

  return (
    <InitialCard initialStep={initial_step} />
  );
}