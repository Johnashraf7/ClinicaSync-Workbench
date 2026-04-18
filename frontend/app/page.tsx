"use client";
import React, { useState } from 'react';
import { Search, ArrowRight, Activity, Cpu, Network } from 'lucide-react';
import { searchDisease, predictRepurposing, SearchResult, DrugCandidate } from '../lib/api';
import DrugCard from '../components/DrugCard';
import MethodologySection from '../components/MethodologySection';

export default function Home() {
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedDisease, setSelectedDisease] = useState<SearchResult | null>(null);
  
  const [processing, setProcessing] = useState(false);
  const [candidates, setCandidates] = useState<DrugCandidate[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setSearching(true);
    setResults([]);
    setSelectedDisease(null);
    setCandidates([]);
    setError(null);
    
    try {
      const data = await searchDisease(query);
      if (data.length === 0) setError("No diseases found.");
      setResults(data);
    } catch (err) {
      setError("Failed to search. Ensure backend is running.");
    } finally {
      setSearching(false);
    }
  };

  const handlePredict = async (disease: SearchResult) => {
    setSelectedDisease(disease);
    setResults([]);
    setProcessing(true);
    setError(null);
    
    try {
      const data = await predictRepurposing(disease.id, disease.name);
      if(data.length === 0) setError("No interactions found for this disease.");
      setCandidates(data);
    } catch (err: any) {
      setError(err.message || "Failed to predict repurposing candidates.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="container">
      <header className="header" style={{ justifyContent: 'center', marginTop: '2rem', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes logoPulse {
            0% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(0, 229, 255, 0.4)); }
            50% { transform: scale(1.05); filter: drop-shadow(0 0 25px rgba(0, 229, 255, 0.6)); }
            100% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(0, 229, 255, 0.4)); }
          }
          .dynamic-logo-img {
            animation: logoPulse 4s infinite ease-in-out;
          }
        `}} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
           <img 
             src="/molecular_logo.png" 
             alt="TheraMatch Geometric Molecule" 
             className="dynamic-logo-img"
             style={{ 
               height: '140px', 
               objectFit: 'contain', 
               mixBlendMode: 'screen',
             }} 
           />
           <h1 className="logo-text" style={{ 
             fontSize: '4.5rem', 
             fontWeight: '900', 
             letterSpacing: '-4px',
             margin: '10px 0 0 0',
             background: 'linear-gradient(to bottom, #FFFFFF, #E2E8F0)',
             WebkitBackgroundClip: 'text',
             WebkitTextFillColor: 'transparent',
             textShadow: '0 0 40px rgba(0, 229, 255, 0.2)'
           }}>
             TheraMatch
           </h1>
           <div style={{ 
             fontSize: '0.9rem', 
             color: '#00E5FF', 
             textTransform: 'uppercase', 
             letterSpacing: '8px', 
             marginTop: '0px',
             background: 'rgba(0, 229, 255, 0.1)',
             padding: '4px 16px',
             borderRadius: '20px',
             border: '1px solid rgba(0, 229, 255, 0.2)',
             fontWeight: '800'
           }}>
             Analytical Engine
           </div>
        </div>
      </header>



      <div className="text-center mb-4">
        <h2>Computational Drug Repurposing</h2>
        <p>Identify new therapeutic uses for existing drugs via Knowledge Graph Analysis & AI</p>
      </div>



      <form onSubmit={handleSearch} className="search-container">
        <Search className="search-icon" />
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search for a disease (e.g., Rheumatoid Arthritis, Asthma)..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-btn" disabled={searching}>
          {searching ? <div className="spinner" style={{width: 20, height: 20, borderWidth: 2}}></div> : 'Analyze'}
        </button>
      </form>

      {error && <div className="error-msg" style={{maxWidth: 600, margin: '0 auto', marginBottom: '2rem'}}>{error}</div>}

      {results.length > 0 && (
        <div className="results-grid" style={{maxWidth: 600, margin: '0 auto'}}>
          <h3 className="mb-2">Select exact disease entity:</h3>
          {results.map(r => (
            <div key={r.id} className="drug-card" style={{cursor: 'pointer'}} onClick={() => handlePredict(r)}>
              <div className="card-header">
                <div>
                  <div className="drug-name">{r.name}</div>
                  <p style={{fontSize: '0.875rem', marginTop: '8px'}}>{r.description}</p>
                </div>
                <ArrowRight color="var(--primary)" />
              </div>
            </div>
          ))}
        </div>
      )}

      {processing && (
        <div className="text-center mt-8" style={{padding: '3rem'}}>
          <Activity size={48} color="var(--primary)" style={{margin: '0 auto', marginBottom: '1rem'}} />
          <h3>Constructing Knowledge Graph...</h3>
          <p>Analyzing genetic targets and identifying repurposing candidates.</p>
          <div className="spinner mt-4" style={{width: 40, height: 40}}></div>
        </div>
      )}

      {selectedDisease && candidates.length > 0 && (
        <div className="mt-8">
          <div className="results-header">
            <h2>Candidates for {selectedDisease.name}</h2>
            <p style={{marginBottom: "1rem"}}>Ranked by target proximity score via Open Targets Genomics API</p>
            <div className="score-clarification" style={{ background: 'rgba(0, 229, 255, 0.05)', border: '1px solid rgba(0, 229, 255, 0.2)', padding: '1rem', borderRadius: '12px', fontSize: '0.95rem' }}>
              <strong style={{color: 'var(--primary)'}}>★ Score Clarification:</strong> This score is the cumulative genetic & pathway evidence (from DisGeNET/Open Targets) of all genes successfully targeted by this drug. A higher score equates to a stronger probability of the drug interrupting disease pathways.
            </div>
          </div>
          
          <div className="results-grid">
            {candidates.map(candidate => (
              <DrugCard key={candidate.id} candidate={candidate} diseaseName={selectedDisease.name} />
            ))}
          </div>
        </div>
      )}

      {!searching && !processing && results.length === 0 && candidates.length === 0 && !error && (
        <>
          <div className="empty-state" style={{ marginBottom: '4rem' }}>
            <Network size={48} color="var(--text-subtle)" style={{margin: '0 auto', marginBottom: '1rem'}} />
            <h3>Awaiting Query</h3>
            <p>Enter a disease above to construct the biomedical graph.</p>
          </div>
          <MethodologySection />
        </>
      )}
    </main>
  );
}
