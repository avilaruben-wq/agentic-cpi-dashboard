import { useState, useCallback } from 'react';
import { theme } from './theme';
import { TabId, AgentState } from './types/ibm';
import { Header } from './components/layout/Header';
import { TabBar } from './components/layout/TabBar';
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

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('agent1');
  const [agentStates, setAgentStates] = useState<Record<TabId, AgentState>>({
    agent1: 'ready',
    agent2: 'locked',
    agent3: 'locked',
    approve: 'locked',
  });

  const setAgentState = useCallback((tabId: TabId, state: AgentState) => {
    setAgentStates(prev => {
      const next = { ...prev, [tabId]: state };
      // Unlock the next agent when current is approved
      if (state === 'approved') {
        if (tabId === 'agent1' && next.agent2 === 'locked') next.agent2 = 'ready';
        if (tabId === 'agent2' && next.agent3 === 'locked') next.agent3 = 'ready';
        if (tabId === 'agent3' && next.approve === 'locked') next.approve = 'ready';
      }
      return next;
    });
  }, []);

  const renderView = () => {
    switch (activeTab) {
      case 'agent1': return (
        <Agent1View
          agentState={agentStates.agent1}
          onStateChange={(s) => setAgentState('agent1', s)}
        />
      );
      case 'agent2': return (
        <Agent2View
          agentState={agentStates.agent2}
          onStateChange={(s) => setAgentState('agent2', s)}
        />
      );
      case 'agent3': return (
        <Agent3View
          agentState={agentStates.agent3}
          onStateChange={(s) => setAgentState('agent3', s)}
        />
      );
      case 'approve': return (
        <ApproveView
          agentState={agentStates.approve}
          onStateChange={(s) => setAgentState('approve', s)}
        />
      );
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
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} agentStates={agentStates} />
        <main style={{
          flex: 1,
          padding: `${theme.sp(5)} ${theme.sp(6)}`,
          animation: 'fadeIn 0.3s ease',
        }}>
          {renderView()}
        </main>
      </div>
    </>
  );
}

export default App;
