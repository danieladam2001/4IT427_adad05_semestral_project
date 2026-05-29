import { InitialCard } from './components/InitialCard';
import { type PipelineInitialization } from './types/pipeline.types';

const test: PipelineInitialization = {
  user_defined_base_prompt: "Analýza vztahu mezi premisou a hypotézou. Klasifikuj relaci přesně jako jeden z těchto štítků: 'entailment' (vyplývání), 'contradiction' (rozpor), nebo 'neutral' (neutrální). Výstup poskytni ve strukturovaném formátu JSON.",
  user_defined_json_schema: {
    type: "object",
    properties: {
      thought_process: {
        type: "string",
        description: "Krok za krokem popsané logické uvažování"
      },
      label: {
        type: "string",
        enum: ["entailment", "neutral", "contradiction"]
      },
      confidence_score: {
        type: "number"
      }
    },
    required: ["thought_process", "label", "confidence_score"]
  }
}

function App() {
  return (
  <>
    <main>
      Semestral Project
    </main>
    <div>
      <InitialCard initialStep={test}/>
    </div>
  </>

  );
}

export default App;