import { useState, useEffect } from 'react';
import { theme } from './theme';
import { TabId } from './types/ibm';
import { Header } from './components/layout/Header';
import { TabBar } from './components/layout/TabBar';
import { AgentPipeline } from './components/pipeline/AgentPipeline';
import { SupplyView } from './components/views/SupplyView';
import { DemandView } from './components/views/DemandView';
import { GapView } from './components/views/GapView';
import { ScenarioView } from './components/views/ScenarioView';
import { OutputView } from './components/views/OutputView';
import { useAgentPipeline } from './hooks/useAgentPipeline';

const keyframes = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 8px ${theme.pipelineGlow}; }
    50% { box-shadow: 0 0 24px ${theme.pipelineGlow}, 0 0 48px ${theme.pipelineGlow}; }
  }
  @keyframes flow {
    from { stroke-dashoffset: 20; }
    to { stroke-dashoffset: 0; }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('supply');
  const pipeline = useAgentPipeline();

  useEffect(() => {
    pipeline.runPipeline();
  }, []);

  const renderView = () => {
    switch (activeTab) {
      case 'supply': return <SupplyView />;
      case 'demand': return <DemandView />;
      case 'gaps': return <GapView />;
      case 'scenarios': return <ScenarioView />;
      case 'output': return <OutputView />;
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

        <div style={{
          borderBottom: `1px solid ${theme.surfaceBorder}`,
          background: theme.bg,
          padding: `${theme.sp(2)} ${theme.sp(6)}`,
        }}>
          <AgentPipeline
            agents={pipeline.agents}
            compact
          />
        </div>

        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

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
