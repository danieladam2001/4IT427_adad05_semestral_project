export interface PipelineInitialization {
  user_defined_base_prompt: string; // Obsah úvodního promptu definovaného uživatelem
  user_defined_json_schema: Record<string, any>; // JSON schéma typu jakéhokoliv slovníku
}

export interface PromptCandidate {
  candidate_id: string; // Identifikátor verze promptu
  prompt_text: string; // Obsah vygenerovaného promptu
  metrics: Record<string, any>; // Metriky typu jakéhokoliv slovníku
}

export interface PipelineIteration {
  iteration_number: number; // Numerický identifikátor pipeline - indexuji od jedničky jako 'první'
  parent_prompt_source: string; // Odkaz na předchozího vítěze, nebo případně 'initialization_step'
  candidates: PromptCandidate[]; // Pole, které bude obsahovat přesně 3 kandidáty - nové prompty
  winning_candidate_id: string; // ID kandidáta, který v této iteraci vyhrál
  selection_reasoning: string; // Textové zdůvodnění, proč pipeline vybrala tohoto kandidáta
}

export interface PipelineDataRoot {
  initialization_step: PipelineInitialization; // Interface pro 'nultý' krok pipepline
  automatic_iterations: PipelineIteration[]; // Obsahuje list interface několika iterací 
}