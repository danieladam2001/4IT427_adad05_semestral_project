import { describe, expect, it } from 'vitest';
import { getBestMetricNamesForCandidate } from './pipelineUtils';
import { type PromptCandidate } from '../types/pipeline.types';

const mockCandidates: PromptCandidate[] = [
  {
    candidate_id: "candidate_1",
    prompt_text: "Text varianty 1",
    metrics: { 
      accuracy: 0.700, 
      f1_macro: 0.650, 
      avg_latency_ms: 350
    }
  },
  {
    candidate_id: "candidate_2",
    prompt_text: "Text varianty 2",
    metrics: { 
      accuracy: 0.850,
      f1_macro: 0.800, 
      avg_latency_ms: 500 
    }
  },
  {
    candidate_id: "candidate_3",
    prompt_text: "Text varianty 3",
    metrics: { 
      accuracy: 0.850,
      f1_macro: 0.820,
      avg_latency_ms: 420 
    }
  }
];

describe('getBestMetricNamesForCandidate', () => {
  
  it('vrátí prázdné pole, pokud hledané ID v seznamu vůbec neexistuje', () => {
    const result = getBestMetricNamesForCandidate(mockCandidates, "non_existent_id");
    expect(result).toEqual([]);
  });

  it('správně minimalizuje avg_latency_ms a označí pouze nejnižší hodnotu', () => {
    // candidate_1 má latenci 350ms, což je nejméně z celé trojice
    const resultForC1 = getBestMetricNamesForCandidate(mockCandidates, "candidate_1");
    expect(resultForC1).toContain('avg_latency_ms');

    // candidate_2 má latenci 500ms
    const resultForC2 = getBestMetricNamesForCandidate(mockCandidates, "candidate_2");
    expect(resultForC2).not.toContain('avg_latency_ms');
  });

  it('správně maximalizuje metriky jako accuracy a f1_macro', () => {
    // candidate_3 má nejvyšší f1_macro (0.820)
    const resultForC3 = getBestMetricNamesForCandidate(mockCandidates, "candidate_3");
    expect(resultForC3).toContain('f1_macro');

    // candidate_1 má nejnižší f1_macro (pouze 0.650)
    const resultForC1 = getBestMetricNamesForCandidate(mockCandidates, "candidate_1");
    expect(resultForC1).not.toContain('f1_macro');
  });

  it('správně zvládne sdílené první místo u maximalizace (accuracy)', () => {
    // candidate_2 i candidate_3 mají shodně nejvyšší přesnost
    const resultForC2 = getBestMetricNamesForCandidate(mockCandidates, "candidate_2");
    const resultForC3 = getBestMetricNamesForCandidate(mockCandidates, "candidate_3");

    expect(resultForC2).toContain('accuracy');
    expect(resultForC3).toContain('accuracy');
  });

});