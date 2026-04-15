import { useState, useCallback } from 'react';
import { theme } from './theme';
import { TabId, AgentState, PlanningMode } from './types/ibm';
import { Header } from './components/layout/Header';
import { ModeBanner } from './components/layout/ModeBanner';
import { TabBar } from './components/layout/TabBar';
import { ModeSelector } from './components/views/ModeSelector';
import { Agent1View } from './components/views/Agent1View';
import { Agent2View } from './components/views/Agent2View';
import { Agent3View } from './components/views/Agent3View';
import { ApproveView } from './components/views/ApproveView';

const keyframes = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const initialAgentStates: Record<TabId, AgentState> = {
  agent1: 'ready',
  agent2: 'locked',
  agent3: 'locked',
  approve: 'locked',
};

function App() {
  const [planningMode, setPlanningMode] = useState<PlanningMode | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('agent1');
  const [agentStates, setAgentStates] = useState<Record<TabId, AgentState>>(initialAgentStates);

  const setAgentState = useCallback((tabId: TabId, state: AgentState) => {
    setAgentStates(prev => {
      const next = { ...prev, [tabId]: state };
      if (state === 'approved') {
        if (tabId === 'agent1' && next.agent2 === 'locked') next.agent2 = 'ready';
        if (tabId === 'agent2' && next.agent3 === 'locked') next.agent3 = 'ready';
        if (tabId === 'agent3' && next.approve === 'locked') next.approve = 'ready';
      }
      return next;
    });
  }, []);

  const handleModeSelect = (mode: PlanningMode) => {
    setPlanningMode(mode);
    setActiveTab('agent1');
    setAgentStates(initialAgentStates);
  };

  const handleModeReset = () => {
    setPlanningMode(null);
    setActiveTab('agent1');
    setAgentStates(initialAgentStates);
  };

  const renderView = () => {
    switch (activeTab) {
      case 'agent1': return <Agent1View agentState={agentStates.agent1} onStateChange={(s) => setAgentState('agent1', s)} />;
      case 'agent2': return <Agent2View agentState={agentStates.agent2} onStateChange={(s) => setAgentState('agent2', s)} />;
      case 'agent3': return <Agent3View agentState={agentStates.agent3} onStateChange={(s) => setAgentState('agent3', s)} planningMode={planningMode!} />;
      case 'approve': return <ApproveView agentState={agentStates.approve} onStateChange={(s) => setAgentState('approve', s)} planningMode={planningMode!} />;
    }
  };

  return (
    <>
      <style>{keyframes}</style>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: theme.bg,
      }}>
        <Header />

        {!planningMode ? (
          <main style={{ flex: 1, animation: 'fadeIn 0.3s ease' }}>
            <ModeSelector onSelect={handleModeSelect} />
          </main>
        ) : (
          <>
            <ModeBanner mode={planningMode} onReset={handleModeReset} />
            <TabBar activeTab={activeTab} onTabChange={setActiveTab} agentStates={agentStates} />
            <main style={{
              flex: 1,
              padding: `${theme.sp(5)} ${theme.sp(6)}`,
              animation: 'fadeIn 0.3s ease',
            }}>
              {renderView()}
            </main>
          </>
        )}
      </div>
    </>
  );
}

export default App;
