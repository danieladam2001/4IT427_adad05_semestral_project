import { createContext, type ReactNode, useContext } from "react";
import { type PipelineDataRoot } from '../types/pipeline.types';
import { useQuery } from "@tanstack/react-query";

const fetchPipelineData = async (): Promise<PipelineDataRoot> => {
  const response = await fetch("/pipeline.json");
  if (!response.ok) {
    throw new Error(`Failed to fetch pipeline data: ${response.statusText}`);
  }
  return response.json();
};

interface PipelineContextType {
  pipeline: PipelineDataRoot | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}

const PipelineContext = createContext<PipelineContextType | undefined>(undefined);

export function PipelineProvider({ children }: { children: ReactNode }) {

  const {data: pipeline, isLoading, isError, error, refetch } = useQuery<PipelineDataRoot, Error>({
    queryKey: ["pipeline"],
    queryFn: fetchPipelineData,
  });

  return (
    <PipelineContext.Provider value={{ pipeline, isLoading, isError, error, refetch }}>
      {children}
    </PipelineContext.Provider>
  );
}

export function usePipeline(){
  const context = useContext(PipelineContext);

  if (!context) {
    throw new Error("usePipeline must be used within PipelineProvider");
  };

  return context;

}