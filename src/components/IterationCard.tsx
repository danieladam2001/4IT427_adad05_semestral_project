import { useState } from 'react';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer-continued';
import { type PipelineIteration } from '../types/pipeline.types';
import { PromptCard } from './PromptCard';

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
            <PromptCard
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
              useDarkTheme={true}
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
                    addedColor: '#1d9c8b',
                    removedBackground: '#450a0a',
                    removedColor: '#f87171',
                  }
                }
              }}
            />
          </div>
        </div>
      )}

      <div className="p-5 rounded-xl text-sm mt-6 bg-mauve-50/20 dark:bg-zinc-900/60 border-pink-100/40 ring-2 ring-pink-300/10 flex flex-col h-full rounded-2xl border">
        <span className="font-bold text-white-800 dark:text-white-400 text-xs uppercase tracking-wider block mb-1">
          Odůvodnění výběru vítěze:
        </span>
        <p className="text-white-900 dark:text-white-200 italic leading-relaxed">
          "{iteration.selection_reasoning}"
        </p>
      </div>

    </div>
  );
}