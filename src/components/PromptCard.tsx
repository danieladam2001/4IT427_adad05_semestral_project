import { type PromptCandidate } from '../types/pipeline.types';

interface PromptCardProps {
  candidate: PromptCandidate;
  isWinner: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export function PromptCard({ candidate, isWinner, isSelected, onClick }: PromptCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`flex flex-col h-full rounded-2xl border p-5 shadow-sm transition-all duration-300 cursor-pointer select-none ${
        isSelected
          ? 'bg-mauve-50/50 dark:bg-zinc-900 border-mauve-500 ring-2 ring-mauve-500/40 transform -translate-y-1' 
          : isWinner 
            ? 'bg-mauve-50/30 dark:bg-zinc-900 border-pink-300 ring-2 ring-pink-300/10 hover:border-mauve-500' 
            : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
      }`}
    >
      
      <div className="flex justify-between items-start mb-4 gap-2">
        <h4 className="text-xs font-mono font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2 py-1 rounded">
          {candidate.candidate_id} {isSelected && "• Vybráno pro Diff"}
        </h4>
        {isWinner && (
          <span className="text-[10px] bg-pink-800 text-white font-bold px-2 py-1 rounded-full uppercase tracking-wider whitespace-nowrap shadow-sm">
            Vítěz iterace ★
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