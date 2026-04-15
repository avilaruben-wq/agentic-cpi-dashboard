import React, { useState } from 'react';
import { theme } from '../../theme';
import { AgentState, PlanningMode } from '../../types/ibm';
import { totalGapCount, totalRevenueAtRisk, critSitCount } from '../../data/gapData';
import { supplySnapshot } from '../../data/supplyData';
import { SummaryBar } from '../shared/SummaryBar';
import { formatNumber, formatCurrency } from '../../utils/format';

interface ApproveViewProps {
  agentState: AgentState;
  onStateChange: (s: AgentState) => void;
  planningMode: PlanningMode;
}

const docStyles = {
  page: { background: '#ffffff', border: `1px solid ${theme.surfaceBorder}`, borderRadius: theme.radius, padding: '48px 56px', maxWidth: '860px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' } as React.CSSProperties,
  header: { borderBottom: '2px solid #161616', paddingBottom: '16px', marginBottom: '24px' } as React.CSSProperties,
  title: { fontSize: '18px', fontWeight: 600, color: '#161616', margin: 0 } as React.CSSProperties,
  subtitle: { fontSize: '13px', color: '#525252', margin: '4px 0 0' } as React.CSSProperties,
  sectionTitle: { fontSize: '13px', fontWeight: 600, color: '#161616', textTransform: 'uppercase' as const, letterSpacing: '0.32px', margin: '28px 0 12px', paddingBottom: '6px', borderBottom: '1px solid #e0e0e0' } as React.CSSProperties,
  body: { fontSize: '13px', color: '#161616', lineHeight: 1.7, margin: '0 0 8px' } as React.CSSProperties,
  table: { width: '100%', borderCollapse: 'collapse' as const, fontSize: '12px', margin: '8px 0 16px' },
  th: { textAlign: 'left' as const, padding: '8px 12px', background: '#f4f4f4', borderBottom: '1px solid #e0e0e0', fontSize: '11px', fontWeight: 600, color: '#525252', textTransform: 'uppercase' as const, letterSpacing: '0.32px' },
  td: { padding: '8px 12px', borderBottom: '1px solid #e0e0e0', color: '#161616' },
  tdRight: { padding: '8px 12px', borderBottom: '1px solid #e0e0e0', color: '#161616', textAlign: 'right' as const, fontFamily: "'IBM Plex Mono', monospace" },
  actionBlock: { background: '#f4f4f4', borderRadius: '4px', padding: '12px 16px', marginBottom: '8px' } as React.CSSProperties,
  checkbox: { display: 'flex' as const, alignItems: 'center' as const, gap: '8px', padding: '8px 0', fontSize: '13px', color: '#161616', borderBottom: '1px solid #f4f4f4' },
  footer: { borderTop: '1px solid #e0e0e0', paddingTop: '16px', marginTop: '28px', fontSize: '11px', color: '#8d8d8d' } as React.CSSProperties,
};

const approvers = ['GEO COO — Americas', 'GEO COO — EMEA', 'GEO COO — APAC', 'GEO COO — Japan', 'GEO COO — UKI', 'Global CFO', 'BPOD Lead'];

export const ApproveView: React.FC<ApproveViewProps> = ({ agentState, onStateChange, planningMode }) => {
  const isQuarterly = planningMode === 'quarterly';
  const [tab, setTab] = useState<'summary' | 'di' | 'score'>('summary');
  const [checkedApprovers, setCheckedApprovers] = useState<Set<string>>(new Set());

  const toggleApprover = (name: string) => {
    setCheckedApprovers(prev => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const allApproved = checkedApprovers.size === approvers.length;

  if (agentState === 'locked') {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: theme.sp(16),
        color: theme.textMuted, fontSize: theme.fontSize.md, background: theme.surface,
        border: `1px dashed ${theme.surfaceBorder}`, borderRadius: theme.radius,
      }}>
        🔒 Complete and approve all three agents first
      </div>
    );
  }

  const btnStyle = (active: boolean): React.CSSProperties => ({
    background: active ? theme.primary : theme.surface,
    border: `1px solid ${active ? theme.primary : theme.surfaceBorder}`,
    color: active ? '#fff' : theme.textSecondary,
    padding: `0 ${theme.sp(4)}`, borderRadius: theme.radius,
    fontSize: theme.fontSize.sm, fontWeight: active ? theme.fontWeight.semibold : theme.fontWeight.regular,
    cursor: 'pointer', fontFamily: 'inherit', height: '32px',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.sp(4) }}>
      <div>
        <h2 style={{ fontSize: theme.fontSize.lg, fontWeight: theme.fontWeight.semibold, color: theme.text, margin: 0 }}>
          {isQuarterly ? 'Leaders Review & Approve' : 'Review & Submit'}
        </h2>
        <p style={{ fontSize: theme.fontSize.sm, color: theme.textMuted, margin: `${theme.sp(1)} 0 0` }}>
          {isQuarterly
            ? 'BPOD / COO / CFO approve HC commitment and fulfillment actions — single integrated review'
            : 'Review the 90-day resourcing recommendations and submit for action'}
        </p>
      </div>

      <SummaryBar metrics={[
        { label: 'Supply', value: formatNumber(supplySnapshot.totalHC) },
        { label: 'Demand', value: '18,916' },
        { label: 'Gap', value: formatNumber(totalGapCount), color: theme.red },
        { label: 'CritSits', value: String(critSitCount), color: theme.red },
        { label: 'Revenue at risk', value: formatCurrency(totalRevenueAtRisk), color: theme.orange },
        { label: 'Recommended', value: 'Base scenario' },
      ]} />

      <div style={{ display: 'flex', gap: theme.sp(2) }}>
        <button style={btnStyle(tab === 'summary')} onClick={() => setTab('summary')}>Approval Summary</button>
        {isQuarterly && (
          <>
            <button style={btnStyle(tab === 'di')} onClick={() => setTab('di')}>DI Authorization Letter</button>
            <button style={btnStyle(tab === 'score')} onClick={() => setTab('score')}>SCORE Plan</button>
          </>
        )}
      </div>

      {tab === 'summary' && (
        <div style={docStyles.page}>
          <div style={docStyles.header}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h1 style={docStyles.title}>{isQuarterly ? 'Capacity Plan Approval' : '90-Day Resourcing Plan'}</h1>
                <p style={docStyles.subtitle}>{isQuarterly ? 'Q3 2026 — Demand Interlock Authorization' : '90-Day Talent Interlock — Apr 14 – Jul 13, 2026'}</p>
              </div>
              <span style={{ background: agentState === 'approved' ? '#198038' : theme.primary, color: '#fff', padding: '4px 12px', borderRadius: '2px', fontSize: '11px', fontWeight: 600 }}>
                {agentState === 'approved' ? 'APPROVED' : 'PENDING APPROVAL'}
              </span>
            </div>
          </div>

          <h3 style={docStyles.sectionTitle}>Pipeline Summary</h3>
          <table style={docStyles.table}>
            <tbody>
              <tr><td style={docStyles.td}>Agent 1 — Supply Baseline</td><td style={{ ...docStyles.tdRight, color: '#198038' }}>✓ Approved</td></tr>
              <tr><td style={docStyles.td}>Agent 2 — Demand Forecast</td><td style={{ ...docStyles.tdRight, color: '#198038' }}>✓ Approved</td></tr>
              <tr><td style={docStyles.td}>Agent 3 — Gaps & Actions</td><td style={{ ...docStyles.tdRight, color: '#198038' }}>✓ Approved</td></tr>
            </tbody>
          </table>

          <h3 style={docStyles.sectionTitle}>Key Decisions</h3>
          <table style={docStyles.table}>
            <tbody>
              <tr><td style={docStyles.td}>Recommended scenario</td><td style={{ ...docStyles.tdRight, fontWeight: 600 }}>Base</td></tr>
              <tr><td style={docStyles.td}>Total fulfillment investment</td><td style={docStyles.tdRight}>$50.0M</td></tr>
              <tr><td style={docStyles.td}>cGP impact</td><td style={{ ...docStyles.tdRight, color: theme.red }}>-$120M</td></tr>
              <tr><td style={docStyles.td}>Revenue protected</td><td style={{ ...docStyles.tdRight, color: '#198038' }}>{formatCurrency(totalRevenueAtRisk)}</td></tr>
              <tr><td style={docStyles.td}>CritSit gaps addressed</td><td style={docStyles.tdRight}>{critSitCount} of {critSitCount}</td></tr>
            </tbody>
          </table>

          <h3 style={docStyles.sectionTitle}>Authorized Fulfillment Actions</h3>
          {[
            { action: 'Bench Redeployment', hc: 586 },
            { action: 'Internal Rotation', hc: 293 },
            { action: 'Reskill / ANOB', hc: 440 },
            { action: 'External Hire', hc: 879 },
            { action: 'Sub-K Contractors', hc: 527 },
            { action: 'HCAM / FTH', hc: 206 },
          ].map(a => (
            <div key={a.action} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f4f4f4', fontSize: '13px' }}>
              <span style={{ color: '#161616' }}>{a.action}</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500 }}>{formatNumber(a.hc)} HC</span>
            </div>
          ))}

          <h3 style={docStyles.sectionTitle}>Approval Signatories</h3>
          {approvers.map(name => (
            <div key={name} style={docStyles.checkbox}>
              <div
                onClick={() => agentState !== 'approved' && toggleApprover(name)}
                style={{
                  width: 16, height: 16, border: '1px solid #8d8d8d', borderRadius: '2px',
                  flexShrink: 0, cursor: agentState === 'approved' ? 'default' : 'pointer',
                  background: checkedApprovers.has(name) || agentState === 'approved' ? '#198038' : '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: '10px', fontWeight: 700,
                  transition: 'all 0.15s',
                }}
              >
                {(checkedApprovers.has(name) || agentState === 'approved') && '✓'}
              </div>
              <span>{name}</span>
            </div>
          ))}

          {agentState !== 'approved' && (
            <div style={{ marginTop: theme.sp(5), display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => onStateChange('approved')}
                disabled={!allApproved}
                style={{
                  background: allApproved ? '#198038' : theme.surfaceBorder,
                  border: 'none', color: '#fff',
                  padding: `${theme.sp(2)} ${theme.sp(6)}`, borderRadius: theme.radius,
                  fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.semibold,
                  cursor: allApproved ? 'pointer' : 'not-allowed', fontFamily: 'inherit',
                }}
              >
                Submit for Final Approval
              </button>
            </div>
          )}

          {agentState === 'approved' && (
            <div style={{
              marginTop: theme.sp(4), padding: theme.sp(4),
              background: theme.greenBg, border: `1px solid ${theme.green}30`,
              borderRadius: theme.radius, textAlign: 'center',
            }}>
              <div style={{ fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.semibold, color: '#198038' }}>
                ✓ Plan Approved — Auto-populating into SCORE
              </div>
              <div style={{ fontSize: theme.fontSize.xs, color: theme.textSecondary, marginTop: theme.sp(1) }}>
                TRAM authorization letters generated for all ANOB actions. SAP Fieldglass POs queued for SubK engagement.
              </div>
            </div>
          )}

          <div style={docStyles.footer}>
            Generated by Agentic CPI v1.0 — Capacity Planning Intelligence
          </div>
        </div>
      )}

      {tab === 'di' && <DIAuthLetter />}
      {tab === 'score' && <SCOREPlan />}
    </div>
  );
};

// --- DI Auth Letter Component ---
const DIAuthLetter: React.FC = () => (
  <div style={docStyles.page}>
    <div style={docStyles.header}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 style={docStyles.title}>Demand Interlock Authorization</h1>
          <p style={docStyles.subtitle}>IBM Consulting — Global Capacity Management</p>
        </div>
        <span style={{ background: '#0f62fe', color: '#fff', padding: '4px 12px', borderRadius: '2px', fontSize: '11px', fontWeight: 600 }}>Q3 2026</span>
      </div>
      <div style={{ display: 'flex', gap: '32px', fontSize: '12px', color: '#525252', marginTop: '12px' }}>
        {[
          ['Date', new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })],
          ['Prepared by', 'Agentic CPI System'],
          ['Authorization', 'GEO COO / CFO'],
        ].map(([label, value]) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.32px', color: '#8d8d8d', fontWeight: 500 }}>{label}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
    <h3 style={docStyles.sectionTitle}>Executive Summary</h3>
    <p style={docStyles.body}>This authorization covers the Q3 2026 capacity plan spanning 32 centers, 36 practices, and 7 band levels across all 5 GEOs.</p>
    <table style={docStyles.table}>
      <tbody>
        <tr><td style={docStyles.td}>Total validated demand</td><td style={docStyles.tdRight}>18,916 HC</td></tr>
        <tr><td style={docStyles.td}>Current supply</td><td style={docStyles.tdRight}>14,227 HC</td></tr>
        <tr><td style={{ ...docStyles.td, fontWeight: 600 }}>Net gap</td><td style={{ ...docStyles.tdRight, fontWeight: 600, color: '#da1e28' }}>2,931 HC</td></tr>
      </tbody>
    </table>
    <h3 style={docStyles.sectionTitle}>Financial Impact</h3>
    <table style={docStyles.table}>
      <tbody>
        <tr><td style={docStyles.td}>Total investment</td><td style={docStyles.tdRight}>$50.0M</td></tr>
        <tr><td style={docStyles.td}>cGP impact</td><td style={{ ...docStyles.tdRight, color: '#da1e28' }}>-$120M</td></tr>
        <tr><td style={docStyles.td}>Revenue at risk</td><td style={{ ...docStyles.tdRight, color: '#da1e28', fontWeight: 600 }}>$176.4M</td></tr>
      </tbody>
    </table>
    <div style={docStyles.footer}>Generated by Agentic CPI v1.0</div>
  </div>
);

// --- SCORE Plan Component ---
const SCOREPlan: React.FC = () => (
  <div style={docStyles.page}>
    <div style={docStyles.header}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 style={docStyles.title}>SCORE Plan Summary</h1>
          <p style={docStyles.subtitle}>Situation — Complication — Options — Recommendation — Evidence</p>
        </div>
        <span style={{ background: '#0f62fe', color: '#fff', padding: '4px 12px', borderRadius: '2px', fontSize: '11px', fontWeight: 600 }}>Q3 2026</span>
      </div>
    </div>
    <h3 style={docStyles.sectionTitle}>Situation</h3>
    <p style={docStyles.body}>IBM Consulting faces a <strong>2,931 HC gap</strong> against validated Q3 demand of 18,916 across 5 GEOs. Eight CritSit gaps threaten <strong>$89.2M in revenue</strong>.</p>
    <h3 style={docStyles.sectionTitle}>Options Evaluated</h3>
    <table style={docStyles.table}>
      <thead><tr><th style={docStyles.th}>Scenario</th><th style={docStyles.th}>Gaps Filled</th><th style={{ ...docStyles.th, textAlign: 'right' }}>cGP</th></tr></thead>
      <tbody>
        <tr><td style={docStyles.td}>Conservative</td><td style={docStyles.td}>1,973</td><td style={docStyles.tdRight}>-$82M</td></tr>
        <tr style={{ background: '#edf5ff' }}><td style={{ ...docStyles.td, fontWeight: 600 }}>Base (Recommended)</td><td style={{ ...docStyles.td, fontWeight: 600 }}>2,931</td><td style={{ ...docStyles.tdRight, fontWeight: 600 }}>-$120M</td></tr>
        <tr><td style={docStyles.td}>Flex</td><td style={docStyles.td}>3,580</td><td style={docStyles.tdRight}>-$165M</td></tr>
      </tbody>
    </table>
    <h3 style={docStyles.sectionTitle}>Recommendation</h3>
    <div style={{ ...docStyles.actionBlock, borderLeft: '3px solid #0f62fe' }}>
      <p style={{ fontSize: '13px', fontWeight: 600, color: '#161616', marginBottom: '4px' }}>Proceed with Base scenario with Flex triggers</p>
      <p style={{ fontSize: '12px', color: '#525252', lineHeight: 1.6, margin: 0 }}>Activate Base plan immediately. 30-day gate: escalate to Flex if win rate exceeds 80%. Authorize SubK for 8 CritSit gaps ($8.2M).</p>
    </div>
    <div style={docStyles.footer}>Generated by Agentic CPI v1.0</div>
  </div>
);
