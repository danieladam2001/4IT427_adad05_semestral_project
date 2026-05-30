import { usePipeline } from '../context/PipelineContext';
import { InitialCard } from '../components/InitialCard';

export function PipelineInitPage() {
  const PipelineContext = usePipeline();

  if (!PipelineContext?.pipeline){
    return <></>;
  }

  const initial_step = PipelineContext.pipeline.initialization_step;

  return (
    <div className="space-y-4">

      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-3xl"> Pipeline Konfigurace </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1"> Výchozí nastavení zadání před spuštěním automatické optimalizace. </p>
      </div>
      
      <InitialCard initialStep={initial_step} />

    </div>
  );
}