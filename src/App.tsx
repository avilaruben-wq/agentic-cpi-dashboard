import { useState, useCallback } from 'react';
import { theme } from './theme';
import { TabId } from './types/ibm';
import { Header } from './components/layout/Header';
import { TabBar } from './components/layout/TabBar';
import { SupplyView } from './components/views/SupplyView';
import { DemandView } from './components/views/DemandView';
import { GapView } from './components/views/GapView';
import { ScenarioView } from './components/views/ScenarioView';
import { OutputView } from './components/views/OutputView';

const keyframes = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 8px ${theme.pipelineGlow}; }
    50% { box-shadow: 0 0 24px ${theme.pipelineGlow}, 0 0 48px ${theme.pipelineGlow}; }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('supply');
  const [completedTabs, setCompletedTabs] = useState<Set<TabId>>(new Set());

  const markComplete = useCallback((tabId: TabId) => {
    setCompletedTabs(prev => new Set(prev).add(tabId));
  }, []);

  const renderView = () => {
    switch (activeTab) {
      case 'supply': return <SupplyView isCompleted={completedTabs.has('supply')} onComplete={() => markComplete('supply')} />;
      case 'demand': return <DemandView isCompleted={completedTabs.has('demand')} onComplete={() => markComplete('demand')} />;
      case 'gaps': return <GapView isCompleted={completedTabs.has('gaps')} onComplete={() => markComplete('gaps')} />;
      case 'scenarios': return <ScenarioView isCompleted={completedTabs.has('scenarios')} onComplete={() => markComplete('scenarios')} />;
      case 'output': return <OutputView isCompleted={completedTabs.has('output')} onComplete={() => markComplete('output')} />;
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
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} completedTabs={completedTabs} />

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
