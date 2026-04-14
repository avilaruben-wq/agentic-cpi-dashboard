import { useState, useCallback, useRef } from 'react';
import type { AgentStatus, PipelineState } from '../types/pipeline';

const initialAgents: AgentStatus[] = [
  {
    id: 1,
    name: 'Supply Baseline Agent',
    shortName: 'Supply',
    description: 'Ingests and reconciles headcount from WF360, SCORE, SAP Fieldglass. Applies attrition, leave, and availability adjustments.',
    status: 'idle',
    inputCount: 0,
    outputCount: 0,
    processingTime: 0,
    inputs: ['WF360 Headcount', 'SCORE Plans', 'SAP Fieldglass', 'EIS/MIS Attrition', 'GreenSTAR Assignments'],
    outputs: ['Supply Dashboard', 'Bench Register', 'Utilization Baseline'],
  },
  {
    id: 2,
    name: 'Demand Forecast Agent',
    shortName: 'Demand',
    description: 'Ingests deal data, scores by win/churn probability, reconciles bottoms-up vs top-down demand views.',
    status: 'idle',
    inputCount: 0,
    outputCount: 0,
    processingTime: 0,
    inputs: ['GreenSTAR Deals', 'Salesforce Pipeline', 'Finance Revenue Commit', 'Certinia Win Scores'],
    outputs: ['Bottoms-Up Demand', 'Top-Down Demand', 'Demand Delta Report'],
  },
  {
    id: 3,
    name: 'Gaps & Actions Agent',
    shortName: 'Gaps',
    description: 'Surfaces supply-demand gaps, runs 6-step fulfillment hierarchy, models scenarios with cGP impact.',
    status: 'idle',
    inputCount: 0,
    outputCount: 0,
    processingTime: 0,
    inputs: ['Supply Baseline', 'Validated Demand', 'Cost Tables', 'Sourcing Strategy'],
    outputs: ['Gap Register', 'Fulfillment Plans', 'Scenario Models', 'DI Auth Letter'],
  },
];

export function useAgentPipeline() {
  const [state, setState] = useState<PipelineState>({
    agents: initialAgents,
    isRunning: false,
    startedAt: null,
    completedAt: null,
  });
  const timers = useRef<number[]>([]);

  const updateAgent = (id: number, updates: Partial<AgentStatus>) => {
    setState(prev => ({
      ...prev,
      agents: prev.agents.map(a => a.id === id ? { ...a, ...updates } : a),
    }));
  };

  const runPipeline = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];

    setState({
      agents: initialAgents,
      isRunning: true,
      startedAt: Date.now(),
      completedAt: null,
    });

    // Agent 1: starts immediately, runs 2s
    timers.current.push(window.setTimeout(() => {
      updateAgent(1, { status: 'processing', inputCount: 14227 });
    }, 300));

    timers.current.push(window.setTimeout(() => {
      updateAgent(1, { status: 'complete', outputCount: 14227, processingTime: 2.1 });
    }, 2500));

    // Agent 2: starts after Agent 1, runs 3s
    timers.current.push(window.setTimeout(() => {
      updateAgent(2, { status: 'processing', inputCount: 18916 });
    }, 2800));

    timers.current.push(window.setTimeout(() => {
      updateAgent(2, { status: 'complete', outputCount: 4689, processingTime: 3.2 });
    }, 5800));

    // Agent 3: starts after Agent 2, runs 2.5s
    timers.current.push(window.setTimeout(() => {
      updateAgent(3, { status: 'processing', inputCount: 2931 });
    }, 6100));

    timers.current.push(window.setTimeout(() => {
      updateAgent(3, { status: 'complete', outputCount: 2931, processingTime: 2.4 });
      setState(prev => ({ ...prev, isRunning: false, completedAt: Date.now() }));
    }, 8500));
  }, []);

  return { ...state, runPipeline };
}
