"use client";
import React, { useState } from 'react';
import { Network, Sparkles, ChevronDown, ChevronUp, ShieldCheck, Activity, ExternalLink } from 'lucide-react';
import { DrugCandidate, explainMechanism } from '../lib/api';

export default function DrugCard({ candidate, diseaseName }: { candidate: DrugCandidate, diseaseName: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExplain = async () => {
    setIsExpanded(!isExpanded);
    if (!explanation && !isExpanded) {
      setLoading(true);
      try {
        const text = await explainMechanism(candidate.name, diseaseName, candidate.shared_genes);
        setExplanation(text);
      } catch (err) {
        setError("Failed to load explanation.");
      } finally {
        setLoading(false);
      }
    }
  };

  const validationColors = {
    Confirmed: { bg: 'rgba(16, 185, 129, 0.1)', text: '#10b981', border: 'rgba(16, 185, 129, 0.2)' },
    Predicted: { bg: 'rgba(59, 130, 246, 0.1)', text: '#3b82f6', border: 'rgba(59, 130, 246, 0.2)' }
  };

  const vStyle = validationColors[candidate.validation_status];

  return (
    <div className="drug-card">
      <div className="card-header" style={{ marginBottom: '1.5rem', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div className="drug-name" style={{ marginBottom: '4px' }}>
            <Network size={24} />
            {candidate.name}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
             <Activity size={14} color="var(--primary)" />
             <span>Maturity: <strong>{candidate.clinical_stage}</strong></span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
          <div className="drug-score" style={{ marginTop: 0 }}>
            Score: {candidate.score.toFixed(2)}
          </div>
          <div style={{ 
            background: vStyle.bg, 
            color: vStyle.text, 
            border: `1px solid ${vStyle.border}`,
            padding: '4px 8px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            {candidate.validation_status === 'Confirmed' ? <ShieldCheck size={14} /> : null}
            {candidate.validation_status}
          </div>
        </div>
      </div>
      
      {/* Tabular Mechanism of Action Mapping */}
      <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px solid rgba(0, 229, 255, 0.1)', overflow: 'hidden', position: 'relative', marginBottom: '1.5rem' }}>
        <div style={{ padding: '12px 15px', borderBottom: '1px solid rgba(255,255,255,0.1)', fontSize: '0.9rem', color: '#00E5FF', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
           <span>Mechanism of Action (ChEMBL)</span>
           <span>Target Records: {candidate.moa_table ? candidate.moa_table.length : 0}</span>
        </div>
        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
               <thead>
                 <tr style={{ background: 'rgba(255,255,255,0.02)', textAlign: 'left', color: '#94A3B8' }}>
                    <th style={{ padding: '10px 15px', fontWeight: 500 }}>Target (ChEMBL ID)</th>
                    <th style={{ padding: '10px 15px', fontWeight: 500 }}>Mechanism</th>
                    <th style={{ padding: '10px 15px', fontWeight: 500 }}>Action Type</th>
                 </tr>
               </thead>
               <tbody>
                  {candidate.moa_table && candidate.moa_table.length > 0 ? (
                     candidate.moa_table.map((row, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                           <td style={{ padding: '8px 15px', color: '#E2E8F0', fontFamily: 'monospace' }}>{row.target_chembl_id}</td>
                           <td style={{ padding: '8px 15px', color: '#E2E8F0' }}>{row.mechanism_of_action}</td>
                           <td style={{ padding: '8px 15px' }}>
                              <span style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                                 {row.action_type}
                              </span>
                           </td>
                        </tr>
                     ))
                  ) : (
                     <tr>
                        <td colSpan={3} style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>No verified mechanisms mapped in ChEMBL.</td>
                     </tr>
                  )}
               </tbody>
            </table>
        </div>
      </div>

      <div className="genes-list">
        {candidate.shared_genes.slice(0, 8).map(g => (
          <span key={g} className="gene-tag">{g}</span>
        ))}
        {candidate.shared_genes.length > 8 && (
          <span className="gene-tag" title={candidate.shared_genes.slice(8).join(', ')}>
            +{candidate.shared_genes.length - 8} more
          </span>
        )}
      </div>
      
      <div style={{ background: 'rgba(255, 255, 255, 0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', padding: '12px 15px', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={16} color="#10b981" />
          Clinical Evidence & Validation
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#E2E8F0' }}>{candidate.clinical_stage}</div>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Highest Global Development Phase</div>
          </div>
          <a 
            href={`https://clinicaltrials.gov/search?term=${encodeURIComponent(candidate.name)}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-center"
            style={{ 
              background: 'rgba(59, 130, 246, 0.1)', 
              color: '#3b82f6', 
              padding: '8px 12px', 
              borderRadius: '8px', 
              fontSize: '0.75rem', 
              fontWeight: 600,
              textDecoration: 'none',
              gap: '6px',
              border: '1px solid rgba(59, 130, 246, 0.2)'
            }}
          >
            Search Trials <ExternalLink size={12} />
          </a>
        </div>
      </div>

      <button className="explain-btn" onClick={handleExplain}>
        <Sparkles size={16} /> 
        AI Mechanism Analysis
        {isExpanded ? <ChevronUp size={16} style={{ marginLeft: "auto" }}/> : <ChevronDown size={16} style={{ marginLeft: "auto" }}/>}
      </button>

      {isExpanded && (
        <div className="explanation-box">
          {loading && <div className="flex-center"><div className="spinner"></div></div>}
          {error && <div className="error-msg">{error}</div>}
          {explanation && <p>{explanation}</p>}
        </div>
      )}
    </div>
  );
}
