import { type PipelineInitialization } from '../types/pipeline.types';

interface InitialCardProps {
  initialStep: PipelineInitialization;
}

export function InitialCard({ initialStep }: InitialCardProps) {
  return (
    <div>
      <h2>Inicializační krok</h2>
      <div>
        <h3>Uživatelem definovaný Inicializační prompt</h3>
        <p>{initialStep.user_defined_base_prompt}</p></div>
      <div>
        <h3>Požadované JSON Schéma</h3>
        <pre><code>{JSON.stringify(initialStep.user_defined_json_schema, null, 2)}</code></pre>
      </div>
    </div>
  );
}