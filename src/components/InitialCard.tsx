import { type PipelineInitialization } from '../types/pipeline.types';

interface InitialCardProps {
  initialStep: PipelineInitialization;
}

export function InitialCard({ initialStep }: InitialCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
      
      <div>
        <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2"> Uživatelem definovaný Inicializační prompt </h3>
        <p className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200/60 dark:border-zinc-800 text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-wrap"> {initialStep.user_defined_base_prompt} </p>
      </div>

      <div>
        <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2"> Požadované JSON Schéma </h3>
        <pre className="p-4 bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-300 rounded-xl overflow-x-auto text-xs font-mono max-h-96 leading-relaxed border border-zinc-200 dark:border-zinc-800">
          <code> {JSON.stringify(initialStep.user_defined_json_schema, null, 2)} </code>
        </pre>
      </div>

    </div>
  );
}