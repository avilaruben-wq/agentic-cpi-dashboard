export type AgentStatusType = 'idle' | 'processing' | 'complete';

export interface AgentStatus {
  id: number;
  name: string;
  shortName: string;
  description: string;
  status: AgentStatusType;
  inputCount: number;
  outputCount: number;
  processingTime: number;
  inputs: string[];
  outputs: string[];
}

export interface PipelineState {
  agents: AgentStatus[];
  isRunning: boolean;
  startedAt: number | null;
  completedAt: number | null;
}
