import { type PipelineIteration, type PromptCandidate } from '../types/pipeline.types';

interface PromptCandidateColProps {
  candidate: PromptCandidate;
  isWinner: boolean;
}

function PromptCandidateCol({ candidate, isWinner }: PromptCandidateColProps) {
  return (
    <div className={`flex flex-col h-full rounded-2xl border p-5 shadow-sm transition-all duration-300 ${
      isWinner 
        ? 'bg-amber-50/30 dark:bg-zinc-900 border-amber-500 ring-2 ring-amber-500/10' 
        : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
    }`}>
      
      <div className="flex justify-between items-start mb-4 gap-2">
        <h4 className="text-xs font-mono font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2 py-1 rounded">
          {candidate.candidate_id}
        </h4>
        {isWinner && (
          <span className="text-[10px] bg-amber-500 text-white font-bold px-2 py-1 rounded-full uppercase tracking-wider whitespace-nowrap shadow-sm">
            Vítěz iterace ⭐
          </span>
        )}
      </div>
      
      <div className="flex-1 space-y-4 mb-6">
        <div>
          <h5 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1.5">Text promptu:</h5>
          <p className="text-sm text-zinc-800 dark:text-zinc-300 bg-zinc-50/50 dark:bg-zinc-800/20 p-3 rounded-xl border border-zinc-200/50 dark:border-zinc-800/40 leading-relaxed whitespace-pre-wrap font-sans">
            {candidate.prompt_text}
          </p>
        </div>
      </div>

      <div>
        <h5 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">Vyhodnocení (Metrics):</h5>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.entries(candidate.metrics).map(([key, value]) => (
            <div key={key} className="bg-zinc-50 dark:bg-zinc-800/50 px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-center flex flex-col justify-center min-w-[90px]">
              <div className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-tight truncate" title={key}>
                {key.replace('_', ' ')}
              </div>
              <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">
                {typeof value === 'number' ? (value < 1 ? `${(value * 100).toFixed(1)}%` : value) : JSON.stringify(value)}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

interface IterationCardProps {
  iteration: PipelineIteration;
}

export function IterationCard({ iteration }: IterationCardProps) {
  return (
    <div className="space-y-6">
      
      <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
        Výchozí prompt z minulé iterace (Parent):{' '}
        <span className="font-mono bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-1.5 py-0.5 rounded">
          {iteration.parent_prompt_source}
        </span>
      </div>

      <div>
        <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-3">Porovnání generovaných kandidátů:</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {iteration.candidates.map((candidate) => (
            <PromptCandidateCol
              key={candidate.candidate_id} 
              candidate={candidate} 
              isWinner={candidate.candidate_id === iteration.winning_candidate_id}
            />
          ))}
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-950/10 p-5 rounded-xl border border-amber-200 dark:border-amber-900/40 text-sm mt-6">
        <span className="font-bold text-amber-800 dark:text-amber-400 text-xs uppercase tracking-wider block mb-1">
          Odůvodnění výběru vítěze:
        </span>
        <p className="text-amber-900 dark:text-amber-200 italic leading-relaxed">
          "{iteration.selection_reasoning}"
        </p>
      </div>

    </div>
  );
}