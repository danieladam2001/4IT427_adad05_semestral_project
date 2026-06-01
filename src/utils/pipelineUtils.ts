import { type PromptCandidate } from "../types/pipeline.types";

const METRICS_TO_MINIMIZE: string[] = ["avg_latency_ms"];


export function getBestMetricNamesForCandidate(candidates: PromptCandidate[], targetCandidateId: string): string[] {
  const targetCandidate = candidates.find(c => c.candidate_id === targetCandidateId);
  if (!targetCandidate || candidates.length === 0) return [];

  const bestMetrics: string[] = [];

  const bestValues: Record<string, number> = {};
  
  candidates.forEach(candidate => {
    Object.entries(candidate.metrics).forEach(([metricName, value]) => {
      if (typeof value === "number") {
        const shouldMinimize = METRICS_TO_MINIMIZE.includes(metricName.toLowerCase());
        
        if (bestValues[metricName] === undefined) {
          bestValues[metricName] = value;
        } else {
          if (shouldMinimize) {
            if (value < bestValues[metricName]) {
              bestValues[metricName] = value;
            }
          } else {
            if (value > bestValues[metricName]) {
              bestValues[metricName] = value;
            }
          }
        }
      }
    });
  });

  Object.entries(targetCandidate.metrics).forEach(([metricName, value]) => {
    if (typeof value === "number" && bestValues[metricName] === value) {
      bestMetrics.push(metricName);
    }
  });

  return bestMetrics;
}