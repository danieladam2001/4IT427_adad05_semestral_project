import { createContext, type ReactNode, useContext, useState } from "react";
import { type PipelineDataRoot } from '../types/pipeline.types';

const INITIAL_PIPELINE: PipelineDataRoot = {
  "initialization_step": {
    "user_defined_base_prompt": "Analyze the relationship between the premise and hypothesis. Classify the relation as exactly one of these labels: 'entailment' (if the premise implies the hypothesis), 'contradiction' (if the premise refutes the hypothesis), or 'neutral' (if the truth of the hypothesis cannot be determined from the premise). Provide the answer in a structured JSON layout.",
    "user_defined_json_schema": {
      "type": "object",
      "properties": {
        "thought_process": {
          "type": "string",
          "description": "Step-by-step logical reasoning explaining the relationship."
        },
        "label": {
          "type": "string",
          "enum": [
            "entailment",
            "neutral",
            "contradiction"
          ]
        },
        "confidence_score": {
          "type": "number",
          "minimum": 0.0,
          "maximum": 1.0
        }
      },
      "required": [
        "thought_process",
        "label",
        "confidence_score"
      ]
    }
  },
  "automatic_iterations": [
    {
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
    },
    {
      "iteration_number": 2,
      "parent_prompt_source": "c_1_2",
      "candidates": [
        {
          "candidate_id": "c_2_1",
          "prompt_text": "Task: Stanford Natural Language Inference (SNLI) classification.\nInput: A pair of sentences (Premise and Hypothesis).\nOutput: JSON containing your reasoning, a classification label (entailment/neutral/contradiction), and a confidence score. Pay special attention to the 'neutral' boundary: if the hypothesis introduces unmentioned details that are plausible but not explicitly supported by the premise, it must be classified as neutral, not entailment.",
          "metrics": {
            "accuracy": 0.821,
            "f1_macro": 0.819,
            "entailment_precision": 0.835,
            "neutral_precision": 0.791,
            "contradiction_precision": 0.831,
            "avg_latency_ms": 410
          }
        },
        {
          "candidate_id": "c_2_2",
          "prompt_text": "Task: Stanford Natural Language Inference (SNLI) classification.\nInput: Premise and Hypothesis sentences.\nOutput: JSON schema with reasoning, label, and confidence. Note on contradiction: if the hypothesis describes a scene that physically or logically cannot coexist with the scene described in the premise, classify it as a contradiction.",
          "metrics": {
            "accuracy": 0.798,
            "f1_macro": 0.794,
            "entailment_precision": 0.805,
            "neutral_precision": 0.748,
            "contradiction_precision": 0.843,
            "avg_latency_ms": 395
          }
        },
        {
          "candidate_id": "c_2_3",
          "prompt_text": "Examine sentence pairs for SNLI. You must think step-by-step through the spatial and situational context before assigning a label. Output JSON. Let's look at an example: Premise: 'A dog runs outside.' Hypothesis: 'A dog is sleeping indoors.' This is a contradiction. Follow this rigorous reasoning style.",
          "metrics": {
            "accuracy": 0.804,
            "f1_macro": 0.801,
            "entailment_precision": 0.811,
            "neutral_precision": 0.772,
            "contradiction_precision": 0.82,
            "avg_latency_ms": 490
          }
        }
      ],
      "winning_candidate_id": "c_2_1",
      "selection_reasoning": "Candidate c_2_1 significantly improved the precision on the 'neutral' category (from 0.724 to 0.791), which pushed overall accuracy past the 82% threshold."
    },
    {
      "iteration_number": 3,
      "parent_prompt_source": "c_2_1",
      "candidates": [
        {
          "candidate_id": "c_3_1",
          "prompt_text": "Task: Stanford Natural Language Inference (SNLI) classification.\nInput: A pair of sentences (Premise and Hypothesis).\nOutput: JSON containing your reasoning, a classification label (entailment/neutral/contradiction), and a confidence score. Pay special attention to the 'neutral' boundary: if the hypothesis introduces unmentioned details that are plausible but not explicitly supported by the premise, it must be classified as neutral, not entailment. Keep the 'thought_process' dense, concise, and focused strictly on lexical entailment indicators.",
          "metrics": {
            "accuracy": 0.834,
            "f1_macro": 0.832,
            "entailment_precision": 0.84,
            "neutral_precision": 0.812,
            "contradiction_precision": 0.844,
            "avg_latency_ms": 375
          }
        },
        {
          "candidate_id": "c_3_2",
          "prompt_text": "Task: Stanford Natural Language Inference (SNLI) classification.\nInput: A pair of sentences (Premise and Hypothesis).\nOutput: JSON containing your reasoning, a classification label (entailment/neutral/contradiction), and a confidence score. Pay special attention to the 'neutral' boundary: if the hypothesis introduces unmentioned details that are plausible but not explicitly supported by the premise, it must be classified as neutral. Additionally, watch out for coreference: ensure pronouns match the exact subjects described in the premise.",
          "metrics": {
            "accuracy": 0.841,
            "f1_macro": 0.839,
            "entailment_precision": 0.852,
            "neutral_precision": 0.819,
            "contradiction_precision": 0.846,
            "avg_latency_ms": 425
          }
        },
        {
          "candidate_id": "c_3_3",
          "prompt_text": "Task: Stanford Natural Language Inference (SNLI) classification with strict boundaries.\nInput: Premise and Hypothesis.\nOutput: JSON matching your schema. If the hypothesis uses synonyms or hypernyms (e.g., 'animal' for 'dog'), this represents an entailment relation. If it changes quantities or actions completely, flag as a contradiction or neutral depending on strict context.",
          "metrics": {
            "accuracy": 0.789,
            "f1_macro": 0.783,
            "entailment_precision": 0.82,
            "neutral_precision": 0.71,
            "contradiction_precision": 0.819,
            "avg_latency_ms": 405
          }
        }
      ],
      "winning_candidate_id": "c_3_2",
      "selection_reasoning": "Candidate c_3_2 added safety guidelines regarding entity coreference, resulting in a balanced performance increase across all three target classes."
    },
    {
      "iteration_number": 4,
      "parent_prompt_source": "c_3_2",
      "candidates": [
        {
          "candidate_id": "c_4_1",
          "prompt_text": "Task: Stanford Natural Language Inference (SNLI) classification.\nInput: A pair of sentences (Premise and Hypothesis).\nOutput: JSON containing your reasoning, a classification label (entailment/neutral/contradiction), and a confidence score. Focus guidelines:\n1. Neutral boundary: if the hypothesis introduces unmentioned details, it is neutral.\n2. Coreference: track pronouns to original subjects.\n3. Quantifiers: Notice shifts between 'all', 'some', 'many', or 'none'. A shift from 'some' to 'all' is a contradiction or neutral, never an entailment.",
          "metrics": {
            "accuracy": 0.865,
            "f1_macro": 0.863,
            "entailment_precision": 0.871,
            "neutral_precision": 0.848,
            "contradiction_precision": 0.87,
            "avg_latency_ms": 430
          }
        },
        {
          "candidate_id": "c_4_2",
          "prompt_text": "Task: Stanford Natural Language Inference (SNLI) classification.\nInput: A pair of sentences (Premise and Hypothesis).\nOutput: JSON containing your reasoning, a classification label (entailment/neutral/contradiction), and a confidence score. Focus guidelines:\n1. Neutral boundary: if the hypothesis introduces unmentioned details, it is neutral.\n2. Coreference: track pronouns to original subjects.\n3. Passive/Active voice: Ensure actions remain identical regardless of grammatical conversions.",
          "metrics": {
            "accuracy": 0.846,
            "f1_macro": 0.843,
            "entailment_precision": 0.858,
            "neutral_precision": 0.822,
            "contradiction_precision": 0.849,
            "avg_latency_ms": 415
          }
        },
        {
          "candidate_id": "c_4_3",
          "prompt_text": "Task: Stanford Natural Language Inference (SNLI) classification.\nInput: A pair of sentences (Premise and Hypothesis).\nOutput: JSON containing your reasoning, a classification label (entailment/neutral/contradiction), and a confidence score. Focus guidelines:\n1. Neutral boundary: if the hypothesis introduces unmentioned details, it is neutral.\n2. Coreference: track pronouns to original subjects.\n3. Strictly ignore real-world external temporal context unless implicitly established by the premise phrases.",
          "metrics": {
            "accuracy": 0.839,
            "f1_macro": 0.835,
            "entailment_precision": 0.849,
            "neutral_precision": 0.815,
            "contradiction_precision": 0.841,
            "avg_latency_ms": 410
          }
        }
      ],
      "winning_candidate_id": "c_4_1",
      "selection_reasoning": "Candidate c_4_1 introduced explicitly defined quantifier mapping constraints, driving macro F1 score up to a pipeline high of 0.863."
    },
    {
      "iteration_number": 5,
      "parent_prompt_source": "c_4_1",
      "candidates": [
        {
          "candidate_id": "c_5_1",
          "prompt_text": "Task: Stanford Natural Language Inference (SNLI) classification.\nInput: A pair of sentences (Premise and Hypothesis).\nOutput: JSON containing your reasoning, a classification label (entailment/neutral/contradiction), and a confidence score. Focus guidelines:\n1. Neutral boundary: if the hypothesis introduces unmentioned details, it is neutral.\n2. Coreference: track pronouns to original subjects.\n3. Quantifiers: Notice shifts between 'all', 'some', 'many', or 'none'.\n4. Spatial-Temporal alignment: Ensure location tokens and timestamps do not conflict between sentences.",
          "metrics": {
            "accuracy": 0.872,
            "f1_macro": 0.871,
            "entailment_precision": 0.878,
            "neutral_precision": 0.859,
            "contradiction_precision": 0.876,
            "avg_latency_ms": 445
          }
        },
        {
          "candidate_id": "c_5_2",
          "prompt_text": "Task: Stanford Natural Language Inference (SNLI) classification.\nInput: A pair of sentences (Premise and Hypothesis).\nOutput: JSON containing your reasoning, a classification label (entailment/neutral/contradiction), and a confidence score. Focus guidelines:\n1. Neutral boundary: if the hypothesis introduces unmentioned details, it is neutral.\n2. Coreference: track pronouns to original subjects.\n3. Quantifiers: Notice shifts between 'all', 'some', 'many', or 'none'.\n5. Terminate reasoning early if a direct lexical antonym pair is observed (e.g. hot/cold) and output contradiction instantly.",
          "metrics": {
            "accuracy": 0.851,
            "f1_macro": 0.847,
            "entailment_precision": 0.86,
            "neutral_precision": 0.812,
            "contradiction_precision": 0.869,
            "avg_latency_ms": 360
          }
        },
        {
          "candidate_id": "c_5_3",
          "prompt_text": "Task: Stanford Natural Language Inference (SNLI) classification.\nInput: A pair of sentences (Premise and Hypothesis).\nOutput: JSON containing your reasoning, a classification label (entailment/neutral/contradiction), and a confidence score. Focus guidelines:\n1. Neutral boundary: if the hypothesis introduces unmentioned details, it is neutral.\n2. Coreference: track pronouns to original subjects.\n3. Quantifiers: Notice shifts between 'all', 'some', 'many', or 'none'.\nStrictly limit output 'thought_process' length to under 30 words to minimize formatting runtime errors.",
          "metrics": {
            "accuracy": 0.858,
            "f1_macro": 0.855,
            "entailment_precision": 0.861,
            "neutral_precision": 0.84,
            "contradiction_precision": 0.864,
            "avg_latency_ms": 355
          }
        }
      ],
      "winning_candidate_id": "c_5_1",
      "selection_reasoning": "Candidate c_5_1 achieved the peak performance of the complete run with 87.2% overall evaluation accuracy by correctly managing spatial alignments."
    }
  ]
}

interface PipelineContextType {
  pipeline: PipelineDataRoot;
}

const PipelineContext = createContext<PipelineContextType | null>(null);

export function PipelineProvider({ children }: { children: ReactNode }) {
  const [pipeline] = useState<PipelineDataRoot>(INITIAL_PIPELINE);

  return (
    <PipelineContext.Provider value={{ pipeline }}>
      {children}
    </PipelineContext.Provider>
  );
}

export const usePipeline = () => useContext(PipelineContext);