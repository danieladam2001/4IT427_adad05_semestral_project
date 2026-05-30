import { useState } from 'react';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer-continued';
import { type PipelineIteration, type PromptCandidate } from '../types/pipeline.types';

interface PromptCandidateColProps {
  candidate: PromptCandidate;
  isWinner: boolean;
  isSelected: boolean;
  onClick: () => void;
}

function PromptCandidateCol({ candidate, isWinner, isSelected, onClick }: PromptCandidateColProps) {
  return (
    <div 
      onClick={onClick}
      className={`flex flex-col h-full rounded-2xl border p-5 shadow-sm transition-all duration-300 cursor-pointer select-none ${
        isSelected
          ? 'bg-amber-50/50 dark:bg-zinc-900 border-amber-500 ring-2 ring-amber-500/40 transform -translate-y-1' 
          : isWinner 
            ? 'bg-amber-50/30 dark:bg-zinc-900 border-amber-500 ring-2 ring-amber-500/10 hover:border-amber-500' 
            : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
      }`}
    >
      
      <div className="flex justify-between items-start mb-4 gap-2">
        <h4 className="text-xs font-mono font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2 py-1 rounded">
          {candidate.candidate_id} {isSelected && "• Vybráno pro Diff"}
        </h4>
        {isWinner && (
          <span className="text-[10px] bg-amber-500 text-white font-bold px-2 py-1 rounded-full uppercase tracking-wider whitespace-nowrap shadow-sm">
            Vítěz iterace ⭐
          </span>
        )}
      </div>
      
      <div className="flex-1 space-y-4 mb-6">
        <div>
          <h5 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1.5">Text promptu (Kliknutím porovnáš):</h5>
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
  allIterations: PipelineIteration[];
  basePrompt: string;
}

export function IterationCard({ iteration, allIterations, basePrompt }: IterationCardProps) {
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);

  let parentPromptText = "";
  if (iteration.parent_prompt_source === "initialization_step") {
    parentPromptText = basePrompt;
  } else {
    const parentIteration = allIterations.find(it => 
      it.candidates.some(c => c.candidate_id === iteration.parent_prompt_source)
    );
    const parentCandidate = parentIteration?.candidates.find(
      c => c.candidate_id === iteration.parent_prompt_source
    );
    parentPromptText = parentCandidate?.prompt_text || "";
  }

  const selectedCandidate = iteration.candidates.find(
    c => c.candidate_id === selectedCandidateId
  );

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
              isSelected={candidate.candidate_id === selectedCandidateId}
              onClick={() => {
                if (selectedCandidateId === candidate.candidate_id) {
                  setSelectedCandidateId(null);
                } else {
                  setSelectedCandidateId(candidate.candidate_id);
                }
              }}
            />
          ))}
        </div>
      </div>

      {selectedCandidate && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-2">
            <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
              Vizuální porovnání změn: <span className="font-mono text-amber-500">{iteration.parent_prompt_source}</span> ➡️ <span className="font-mono text-amber-500">{selectedCandidate.candidate_id}</span>
            </h4>
            <button 
              onClick={() => setSelectedCandidateId(null)}
              className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
            >
              Zavřít porovnání ✕
            </button>
          </div>

          <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 text-xs font-sans">
            <ReactDiffViewer
              oldValue={parentPromptText}
              newValue={selectedCandidate.prompt_text}
              splitView={false}
              compareMethod={DiffMethod.WORDS}
              useDarkTheme={document.documentElement.classList.contains('dark') || document.body.parentElement?.classList.contains('dark')}
              styles={{
                variables: {
                  light: {
                    diffViewerBackground: '#ffffff',
                    addedBackground: '#e6fffa',
                    addedColor: '#0e6245',
                    removedBackground: '#ffebee',
                    removedColor: '#b71c1c',
                  },
                  dark: {
                    diffViewerBackground: '#18181b',
                    addedBackground: '#042f2e',
                    addedColor: '#2dd4bf',
                    removedBackground: '#450a0a',
                    removedColor: '#f87171',
                  }
                }
              }}
            />
          </div>
        </div>
      )}

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