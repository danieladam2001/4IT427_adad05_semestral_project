import { useParams } from 'react-router-dom';
import { usePipeline } from '../context/PipelineContext';
import { IterationCard } from '../components/IterationCard';

export function PipelineIterationPage() {
  const { id } = useParams<{ id: string }>();
  const PipelineContext = usePipeline();

  if (!PipelineContext?.pipeline){
    return <></>
  }

  const all_iterations = PipelineContext.pipeline.automatic_iterations;

  const currentIteration = all_iterations.find(
    (item) => item.iteration_number === Number(id)
  );

  if (!currentIteration) {
    return <div>Iterace č. {id} nebyla nalezena.</div>;
  }

  return (
    <IterationCard iteration={currentIteration} />
  );
}