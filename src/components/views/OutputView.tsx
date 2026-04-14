import React, { useState } from 'react';
import { theme } from '../../theme';
import { ViewHeader } from '../shared/ViewHeader';
import { RunButton } from '../shared/RunButton';

type OutputTab = 'di' | 'score';

interface OutputViewProps {
  isCompleted: boolean;
  onComplete: () => void;
}

const docStyles = {
  page: {
    background: '#ffffff',
    border: `1px solid ${theme.surfaceBorder}`,
    borderRadius: theme.radius,
    padding: '48px 56px',
    maxWidth: '860px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
  } as React.CSSProperties,
  header: {
    borderBottom: '2px solid #161616',
    paddingBottom: '16px',
    marginBottom: '24px',
  } as React.CSSProperties,
  title: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#161616',
    margin: 0,
    letterSpacing: '0.2px',
  } as React.CSSProperties,
  subtitle: {
    fontSize: '13px',
    color: '#525252',
    margin: '4px 0 0',
  } as React.CSSProperties,
  meta: {
    display: 'flex' as const,
    gap: '32px',
    fontSize: '12px',
    color: '#525252',
    marginTop: '12px',
  },
  metaItem: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '2px',
  },
  metaLabel: {
    fontSize: '10px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.32px',
    color: '#8d8d8d',
    fontWeight: 500,
  },
  sectionTitle: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#161616',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.32px',
    margin: '28px 0 12px',
    paddingBottom: '6px',
    borderBottom: '1px solid #e0e0e0',
  } as React.CSSProperties,
  body: {
    fontSize: '13px',
    color: '#161616',
    lineHeight: 1.7,
    margin: '0 0 8px',
  } as React.CSSProperties,
  bodyMuted: {
    fontSize: '12px',
    color: '#525252',
    lineHeight: 1.7,
    margin: '0 0 4px',
    paddingLeft: '16px',
  } as React.CSSProperties,
  actionBlock: {
    background: '#f4f4f4',
    borderRadius: '4px',
    padding: '12px 16px',
    marginBottom: '8px',
  } as React.CSSProperties,
  actionTitle: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#161616',
    marginBottom: '4px',
  } as React.CSSProperties,
  actionDetail: {
    fontSize: '12px',
    color: '#525252',
    lineHeight: 1.6,
    margin: 0,
  } as React.CSSProperties,
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '12px',
    margin: '8px 0 16px',
  },
  th: {
    textAlign: 'left' as const,
    padding: '8px 12px',
    background: '#f4f4f4',
    borderBottom: '1px solid #e0e0e0',
    fontSize: '11px',
    fontWeight: 600,
    color: '#525252',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.32px',
  },
  td: {
    padding: '8px 12px',
    borderBottom: '1px solid #e0e0e0',
    color: '#161616',
  },
  tdRight: {
    padding: '8px 12px',
    borderBottom: '1px solid #e0e0e0',
    color: '#161616',
    textAlign: 'right' as const,
    fontFamily: "'IBM Plex Mono', monospace",
  },
  checkbox: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: '8px',
    padding: '8px 0',
    fontSize: '13px',
    color: '#161616',
    borderBottom: '1px solid #f4f4f4',
  },
  checkboxBox: {
    width: '16px',
    height: '16px',
    border: '1px solid #8d8d8d',
    borderRadius: '2px',
    flexShrink: 0,
  } as React.CSSProperties,
  footer: {
    borderTop: '1px solid #e0e0e0',
    paddingTop: '16px',
    marginTop: '28px',
    fontSize: '11px',
    color: '#8d8d8d',
  } as React.CSSProperties,
  badge: (color: string, bg: string) => ({
    display: 'inline-block' as const,
    padding: '2px 8px',
    borderRadius: '2px',
    background: bg,
    color: color,
    fontSize: '11px',
    fontWeight: 500,
    marginLeft: '8px',
  }),
};

const DIAuthLetter: React.FC = () => (
  <div style={docStyles.page}>
    <div style={docStyles.header}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={docStyles.title}>Demand Interlock Authorization</h1>
          <p style={docStyles.subtitle}>IBM Consulting — Global Capacity Management</p>
        </div>
        <span style={{
          background: '#0f62fe', color: '#fff', padding: '4px 12px',
          borderRadius: '2px', fontSize: '11px', fontWeight: 600,
        }}>
          Q3 2026
        </span>
      </div>
      <div style={docStyles.meta}>
        <div style={docStyles.metaItem}>
          <span style={docStyles.metaLabel}>Date</span>
          <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <div style={docStyles.metaItem}>
          <span style={docStyles.metaLabel}>Prepared by</span>
          <span>Agentic CPI System</span>
        </div>
        <div style={docStyles.metaItem}>
          <span style={docStyles.metaLabel}>Authorization Level</span>
          <span>GEO COO / CFO</span>
        </div>
        <div style={docStyles.metaItem}>
          <span style={docStyles.metaLabel}>To</span>
          <span>Service Line Leads, GEO COOs, CFO Office</span>
        </div>
      </div>
    </div>

    <h3 style={docStyles.sectionTitle}>1. Executive Summary</h3>
    <p style={docStyles.body}>
      This authorization covers the Q3 2026 capacity plan spanning 32 centers, 36 practices, and 7 band levels across all 5 GEOs.
    </p>
    <table style={docStyles.table}>
      <tbody>
        <tr><td style={docStyles.td}>Total validated demand</td><td style={docStyles.tdRight}>18,916 HC</td></tr>
        <tr><td style={docStyles.td}>Current supply</td><td style={docStyles.tdRight}>14,227 HC</td></tr>
        <tr><td style={{ ...docStyles.td, fontWeight: 600 }}>Net gap requiring action</td><td style={{ ...docStyles.tdRight, fontWeight: 600, color: '#da1e28' }}>2,931 HC</td></tr>
      </tbody>
    </table>
    <p style={docStyles.body}>
      <strong>8 CritSit gaps</strong> identified requiring immediate executive attention — primarily in SAP Application Ops (Americas, EMEA, Japan), Quality Engineering (EMEA, APAC), and AI & Analytics (Americas, APAC).
    </p>

    <h3 style={docStyles.sectionTitle}>2. Authorized Actions</h3>
    <p style={{ ...docStyles.body, marginBottom: '12px' }}>The following fulfillment actions are authorized under the <strong>Base scenario</strong>:</p>

    {[
      { label: 'a) Bench Redeployment', hc: '586 HC', details: ['Priority: CritSit gaps in SAP and QE practices', 'Cross-geo redeployment authorized for CritSit only'] },
      { label: 'b) Internal Rotation', hc: '293 HC', details: ['Java-to-Open Source pathway: 40 HC (Americas)', 'Infrastructure-to-Cloud pathway: 28 HC (EMEA)', 'Backend-to-Frontend pathway: 25 HC (UKI)'] },
      { label: 'c) Reskill / ANOB', hc: '440 HC', details: ['SAP Academy fast-track: 80 HC across EMEA + APAC', 'AI/ML certification program: 45 HC (Americas + APAC)', 'QE Automation bootcamp: 120 HC (FNC Global)'] },
      { label: 'd) External Hire', hc: '879 HC', details: ['Budget authorized: $28.0M', 'Priority bands: B6-B8 (92% of hires)', '60-day average lead time assumed'] },
      { label: 'e) Sub-K Contractors', hc: '527 HC', details: ['Budget authorized: $22.0M', 'CritSit bridge coverage: 180 HC immediate', 'SAP Fieldglass POs within 48 hours of approval'] },
      { label: 'f) HCAM / FTH', hc: '206 HC', details: ['Fixed-term positions for demand with <6 month visibility', 'Approval routing: GEO COO → CFO'] },
    ].map(action => (
      <div key={action.label} style={docStyles.actionBlock}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={docStyles.actionTitle}>{action.label}</span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', fontWeight: 600 }}>{action.hc}</span>
        </div>
        {action.details.map((d, i) => (
          <p key={i} style={docStyles.actionDetail}>• {d}</p>
        ))}
      </div>
    ))}

    <h3 style={docStyles.sectionTitle}>3. Financial Impact</h3>
    <table style={docStyles.table}>
      <tbody>
        <tr><td style={docStyles.td}>Total fulfillment investment</td><td style={docStyles.tdRight}>$50.0M</td></tr>
        <tr><td style={docStyles.td}>Projected cGP impact</td><td style={{ ...docStyles.tdRight, color: '#da1e28' }}>-$120M</td></tr>
        <tr><td style={docStyles.td}>Utilization delta</td><td style={{ ...docStyles.tdRight, color: '#ba4e00' }}>-1.4pp vs. target</td></tr>
        <tr><td style={docStyles.td}>Revenue at risk (unfilled gaps)</td><td style={{ ...docStyles.tdRight, color: '#da1e28', fontWeight: 600 }}>$176.4M</td></tr>
      </tbody>
    </table>

    <h3 style={docStyles.sectionTitle}>4. Approval Required</h3>
    {['GEO COO — Americas', 'GEO COO — EMEA', 'GEO COO — APAC', 'GEO COO — Japan', 'GEO COO — UKI', 'Global CFO', 'BPOD Lead'].map(name => (
      <div key={name} style={docStyles.checkbox}>
        <div style={docStyles.checkboxBox} />
        <span>{name}</span>
      </div>
    ))}

    <div style={docStyles.footer}>
      Generated by Agentic CPI v1.0 — Capacity Planning Intelligence<br />
      Auto-populated into SCORE upon final approval
    </div>
  </div>
);

const SCOREPlan: React.FC = () => (
  <div style={docStyles.page}>
    <div style={docStyles.header}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={docStyles.title}>SCORE Plan Summary</h1>
          <p style={docStyles.subtitle}>Situation — Complication — Options — Recommendation — Evidence</p>
        </div>
        <span style={{
          background: '#0f62fe', color: '#fff', padding: '4px 12px',
          borderRadius: '2px', fontSize: '11px', fontWeight: 600,
        }}>
          Q3 2026
        </span>
      </div>
    </div>

    <h3 style={docStyles.sectionTitle}>Situation</h3>
    <p style={docStyles.body}>
      IBM Consulting faces a <strong>2,931 HC gap</strong> against validated Q3 demand of 18,916 across 5 GEOs. Eight CritSit gaps threaten <strong>$89.2M in revenue</strong>, concentrated in SAP Application Ops, Quality Engineering, and AI & Analytics practices.
    </p>

    <h3 style={docStyles.sectionTitle}>Complication</h3>
    <p style={{ ...docStyles.body, marginBottom: '8px' }}>Three structural challenges compound the gap:</p>
    {[
      'SAP S/4HANA migration wave creating unprecedented demand for ABAP HANA specialists — 3x historical run rate',
      'AI talent market tightening — Data Scientist-AI roles show 5.0 fill difficulty score (max)',
      'Revenue forecasts exceed visible deal pipeline by 35% on average across critical JRS roles',
    ].map((item, i) => (
      <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px', paddingLeft: '4px' }}>
        <span style={{ color: '#da1e28', fontWeight: 600, fontSize: '13px', flexShrink: 0 }}>{i + 1}.</span>
        <p style={{ ...docStyles.body, margin: 0 }}>{item}</p>
      </div>
    ))}

    <h3 style={docStyles.sectionTitle}>Options Evaluated</h3>
    <table style={docStyles.table}>
      <thead>
        <tr>
          <th style={docStyles.th}>Scenario</th>
          <th style={docStyles.th}>Gaps Filled</th>
          <th style={{ ...docStyles.th, textAlign: 'right' }}>cGP Impact</th>
          <th style={{ ...docStyles.th, textAlign: 'right' }}>Rev at Risk</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={docStyles.td}>Conservative</td>
          <td style={docStyles.td}>1,973 of 2,931</td>
          <td style={docStyles.tdRight}>-$82M</td>
          <td style={{ ...docStyles.tdRight, color: '#da1e28' }}>$94M</td>
        </tr>
        <tr style={{ background: '#edf5ff' }}>
          <td style={{ ...docStyles.td, fontWeight: 600 }}>Base <span style={docStyles.badge('#0f62fe', '#d0e2ff')}>RECOMMENDED</span></td>
          <td style={{ ...docStyles.td, fontWeight: 600 }}>2,931 of 2,931</td>
          <td style={{ ...docStyles.tdRight, fontWeight: 600 }}>-$120M</td>
          <td style={{ ...docStyles.tdRight, fontWeight: 600 }}>$0</td>
        </tr>
        <tr>
          <td style={docStyles.td}>Flex (Growth)</td>
          <td style={docStyles.td}>3,580 projected</td>
          <td style={docStyles.tdRight}>-$165M</td>
          <td style={{ ...docStyles.tdRight, color: '#198038' }}>+$45-65M upside</td>
        </tr>
      </tbody>
    </table>

    <h3 style={docStyles.sectionTitle}>Recommendation</h3>
    <div style={{ ...docStyles.actionBlock, borderLeft: '3px solid #0f62fe' }}>
      <p style={{ ...docStyles.actionTitle, marginBottom: '8px' }}>Proceed with Base scenario with Flex triggers</p>
      {[
        { label: 'Immediate', text: 'Activate Base fulfillment plan across all GEOs' },
        { label: '30-day gate', text: 'Review signed pipeline vs. forecast — if win rate exceeds 80%, escalate to Flex' },
        { label: 'CritSit', text: 'Authorize immediate SubK engagement for 8 critical gaps ($8.2M)' },
        { label: 'Cadence', text: 'Monthly TI to validate demand trajectory' },
      ].map(item => (
        <p key={item.label} style={docStyles.actionDetail}>
          <strong>{item.label}:</strong> {item.text}
        </p>
      ))}
    </div>

    <h3 style={docStyles.sectionTitle}>Evidence</h3>
    {[
      'Historical fill rate at Base assumptions: 84.5% (3-quarter trailing average)',
      'SubK cost premium justified by $176.4M revenue at risk',
      'FNC Global QE factory has 115% stretch capacity available',
      'Cross-geo redeployment saved $12M in Q1 2026 (Americas→APAC SAP transfer)',
    ].map((item, i) => (
      <p key={i} style={docStyles.bodyMuted}>• {item}</p>
    ))}

    <h3 style={docStyles.sectionTitle}>Key Metrics for Tracking</h3>
    <table style={docStyles.table}>
      <thead>
        <tr>
          <th style={docStyles.th}>Metric</th>
          <th style={docStyles.th}>Target</th>
          <th style={docStyles.th}>Timeline</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style={docStyles.td}>Gap closure rate</td><td style={docStyles.td}>85%</td><td style={docStyles.td}>By Week 8</td></tr>
        <tr><td style={docStyles.td}>CritSit resolution</td><td style={docStyles.td}>100% bridge coverage</td><td style={docStyles.td}>By Week 2</td></tr>
        <tr><td style={docStyles.td}>SubK-to-FTE conversion</td><td style={docStyles.td}>40%</td><td style={docStyles.td}>Within 6 months</td></tr>
        <tr><td style={docStyles.td}>Demand delta trend</td><td style={docStyles.td}>Narrowing</td><td style={docStyles.td}>Monthly review</td></tr>
      </tbody>
    </table>

    <div style={docStyles.footer}>
      Generated by Agentic CPI v1.0 — Capacity Planning Intelligence
    </div>
  </div>
);

export const OutputView: React.FC<OutputViewProps> = ({ isCompleted, onComplete }) => {
  const [tab, setTab] = useState<OutputTab>('di');

  const btnStyle = (active: boolean): React.CSSProperties => ({
    background: active ? theme.primary : theme.surface,
    border: `1px solid ${active ? theme.primary : theme.surfaceBorder}`,
    color: active ? '#fff' : theme.textSecondary,
    padding: `0 ${theme.sp(4)}`,
    borderRadius: theme.radius,
    fontSize: theme.fontSize.sm,
    fontWeight: active ? theme.fontWeight.semibold : theme.fontWeight.regular,
    cursor: 'pointer',
    fontFamily: 'inherit',
    height: '32px',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.sp(4) }}>
      <ViewHeader
        title="Step 5: Output"
        description="Generate the DI Authorization Letter and SCORE plan for approval routing."
        action={
          <RunButton
            label="Generate Output"
            runningLabel="Generating documents..."
            completedLabel="Output Ready"
            isCompleted={isCompleted}
            onRun={onComplete}
            duration={1500}
          />
        }
      />

      {isCompleted ? (
        <>
          <div style={{ display: 'flex', gap: theme.sp(2) }}>
            <button style={btnStyle(tab === 'di')} onClick={() => setTab('di')}>DI Authorization Letter</button>
            <button style={btnStyle(tab === 'score')} onClick={() => setTab('score')}>SCORE Plan Summary</button>
          </div>

          {tab === 'di' ? <DIAuthLetter /> : <SCOREPlan />}

          <div style={{
            display: 'flex', alignItems: 'center',
            padding: `${theme.sp(2)} ${theme.sp(3)}`,
            background: theme.surface,
            border: `1px solid ${theme.surfaceBorder}`,
            borderRadius: theme.radius,
            fontSize: theme.fontSize.xs,
            color: theme.textMuted,
          }}>
            Auto-populated into SCORE upon final approval — TRAM authorization letters generated for all ANOB actions
          </div>
        </>
      ) : (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: theme.sp(16), color: theme.textMuted, fontSize: theme.fontSize.md,
          border: `1px dashed ${theme.surfaceBorder}`, borderRadius: theme.radius,
          background: theme.surface,
        }}>
          Click "Generate Output" to create the DI Authorization Letter and SCORE plan
        </div>
      )}
    </div>
  );
};
