import { type PipelineIteration, type PromptCandidate } from '../types/pipeline.types';

interface PromptCandidateColProps {
  candidate: PromptCandidate;
  isWinner: boolean;
}

function PromptCandidateCol({ candidate, isWinner }: PromptCandidateColProps) {
  return (
    <div>
      <h4>Kandidát: {candidate.candidate_id}</h4>
      
      {isWinner && <p><strong>⭐ Vítěz této iterace</strong></p>}

      <div>
        <h5>Text promptu:</h5>
        <p>{candidate.prompt_text}</p>
      </div>

      <div>
        <h5>Metriky:</h5>
        <ul>
          {Object.entries(candidate.metrics).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface IterationCardProps {
  iteration: PipelineIteration;
}

export function IterationCard({ iteration }: IterationCardProps) {
  return (
    <div>
      <h3>Iterace č. {iteration.iteration_number}</h3>
      <p>Výchozí prompt z minulé iterace: {iteration.parent_prompt_source}</p>

      <div>
        <h3>Testované prompty:</h3>
        {iteration.candidates.map((candidate) => (
          <PromptCandidateCol
            key={candidate.candidate_id} 
            candidate={candidate} 
            isWinner={candidate.candidate_id === iteration.winning_candidate_id}
          />
        ))}
      </div>

      <div>
        <p><strong>Odůvodnění výběru vítěze:</strong></p>
        <p><em>{iteration.selection_reasoning}</em></p>
      </div>
    </div>
  );
}