import { InitialCard } from './components/InitialCard';
import { IterationCard } from './components/IterationCard';
import { type PipelineInitialization, type PipelineIteration } from './types/pipeline.types';

const test_pipeline_init: PipelineInitialization = {
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

const test_pipeline_itteration: PipelineIteration = {
  "iteration_number": 1,
  "parent_prompt_source": "initialization_step",
  "candidates": [
    {
      "candidate_id": "c_1_1",
      "prompt_text": "You are an expert NLP system evaluating logical entailment using the SNLI framework. Given a premise and a hypothesis, determine if the relationship is entailment, contradiction, or neutral. Break down your logical reasoning step-by-step into the 'thought_process' field before selecting the label. Output must strictly match the JSON schema.",
      "metrics": {
        "accuracy": 0.742,
        "f1_macro": 0.738,
        "entailment_precision": 0.761,
        "neutral_precision": 0.695,
        "contradiction_precision": 0.77,
        "avg_latency_ms": 420
      }
    },
    {
      "candidate_id": "c_1_2",
      "prompt_text": "Task: Stanford Natural Language Inference (SNLI) classification.\nInput: A pair of sentences (Premise and Hypothesis).\nOutput: JSON containing your reasoning, a classification label (entailment/neutral/contradiction), and a confidence score from 0.0 to 1.0. Read the sentences carefully. Neutral means the hypothesis could be true or false given the premise.",
      "metrics": {
        "accuracy": 0.785,
        "f1_macro": 0.781,
        "entailment_precision": 0.812,
        "neutral_precision": 0.724,
        "contradiction_precision": 0.819,
        "avg_latency_ms": 385
      }
    },
    {
      "candidate_id": "c_1_3",
      "prompt_text": "Analyze sentence pairs for semantic inference (SNLI). Evaluate whether the premise strictly entails, contradicts, or remains neutral to the hypothesis. Format your response strictly as JSON with 'thought_process', 'label', and 'confidence_score'. Be highly conservative with 'entailment'—ensure it is mathematically or logically absolute.",
      "metrics": {
        "accuracy": 0.711,
        "f1_macro": 0.702,
        "entailment_precision": 0.68,
        "neutral_precision": 0.685,
        "contradiction_precision": 0.768,
        "avg_latency_ms": 450
      }
    }
  ],
  "winning_candidate_id": "c_1_2",
  "selection_reasoning": "Candidate c_1_2 achieved the highest macro F1-score (0.781) and overall accuracy (78.5%) while maintaining the lowest average latency."
}

function App() {
  return (
  <>
    <main>
      Semestral Project
    </main>
    <div>
      <InitialCard initialStep={test_pipeline_init}/>
    </div>
    <div>
      <IterationCard iteration={test_pipeline_itteration}/>
    </div>
  </>

  );
}

export default App;