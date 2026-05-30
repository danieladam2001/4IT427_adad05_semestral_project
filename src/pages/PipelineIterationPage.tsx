import { useParams } from 'react-router-dom';
import { usePipeline } from '../context/PipelineContext';
import { IterationCard } from '../components/IterationCard';

export function PipelineIterationPage() {
  const { id } = useParams<{ id: string }>();
  const PipelineContext = usePipeline();

  if (!PipelineContext?.pipeline){
    return <></>;
  }

  const all_iterations = PipelineContext.pipeline.automatic_iterations;
  const base_prompt = PipelineContext.pipeline.initialization_step.user_defined_base_prompt;

  const currentIteration = all_iterations.find(
    (item) => item.iteration_number === Number(id)
  );

  if (!currentIteration) {
    return <div className="text-red-500 font-medium p-4 border border-red-200 rounded-xl bg-red-50">Iterace č. {id} nebyla nalezena.</div>;
  }

  return (
    <div className="space-y-4">

      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-3xl"> Optimalizační Krok #{id} </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1"> Detailní výsledky generování a testování variant promptů v této iteraci. </p>
      </div>

      <IterationCard 
        iteration={currentIteration} 
        allIterations={all_iterations}
        basePrompt={base_prompt}
      />
    </div>
  );
}