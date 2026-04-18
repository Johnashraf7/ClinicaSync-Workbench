"use client";
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell, PieChart, Pie, AreaChart, Area
} from 'recharts';
import { Database, TrendingUp, Info, ShieldCheck, BarChart3 } from 'lucide-react';

const scoringData = [
  { name: 'Genetic Weight (w)', value: 85, fill: '#00E5FF' },
  { name: 'Pathway Overlap (√n)', value: 65, fill: '#3B82F6' },
  { name: 'Composite Factor', value: 92, fill: '#8B5CF6' },
];

const validationData = [
  { name: 'Confirmed (Phase IV)', value: 15, fill: '#10B981' },
  { name: 'Clinical (Phase I-III)', value: 35, fill: '#3B82F6' },
  { name: 'Computational (Novel)', value: 50, fill: '#8B5CF6' },
];

const thresholdData = [
  { score: 0, prob: 10 },
  { score: 20, prob: 12 },
  { score: 40, prob: 35 },
  { score: 60, prob: 70 },
  { score: 80, prob: 90 },
  { score: 100, prob: 98 },
];

export default function MethodologySection() {
  return (
    <section style={{ marginTop: '4rem', padding: '0 20px', maxWidth: '1400px', margin: '4rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#FFF', marginBottom: '1rem' }}>
          Analytical Foundations
        </h2>
        <p style={{ color: '#94A3B8', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
          Explore the biological data sources and mathematical models powering the TheraMatch engine.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        
        {/* Card 1: Data Provenance */}
        <div className="method-card" style={{ 
          background: 'rgba(15, 23, 42, 0.6)', 
          backdropFilter: 'blur(10px)',
          borderRadius: '24px', 
          padding: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
            <Database className="text-cyan" size={20} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#FFF' }}>1. Data Provenance</h3>
          </div>
          <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
            We ingest multi-omics data from Open Targets for genetic associations and EBI ChEMBL for pharmacological precision.
          </p>
          <div style={{ height: '220px', width: '100%', marginTop: 'auto' }}>
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoringData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="#94A3B8" fontSize={10} width={110} />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ background: '#0F172A', border: '1px solid rgba(0, 229, 255, 0.2)', borderRadius: '8px', fontSize: '10px' }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                    {scoringData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Card 2: Scoring Algorithm */}
        <div className="method-card" style={{ 
          background: 'rgba(15, 23, 42, 0.6)', 
          backdropFilter: 'blur(10px)',
          borderRadius: '24px', 
          padding: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
            <TrendingUp className="text-blue" size={20} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#FFF' }}>2. Scoring Algorithm</h3>
          </div>
          <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
            The Network Proximity Coefficient calculates effect probability based on cumulative genetic weight and overlap density.
          </p>
          <div style={{ 
            background: 'rgba(0,0,0,0.3)', 
            padding: '1.2rem', 
            borderRadius: '16px', 
            textAlign: 'center',
            border: '1px dashed rgba(0, 229, 255, 0.2)',
            marginTop: 'auto'
          }}>
             <div style={{ fontSize: '1.4rem', color: '#00E5FF', fontWeight: '700', fontFamily: 'serif' }}>
                Score = Σ(w) × √n
             </div>
             <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '6px' }}>
                w = Genetic Weight | n = Target Count
             </div>
          </div>
        </div>

        {/* Card 3: Clinical Validation */}
        <div className="method-card" style={{ 
          background: 'rgba(15, 23, 42, 0.6)', 
          backdropFilter: 'blur(10px)',
          borderRadius: '24px', 
          padding: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
            <ShieldCheck style={{ color: '#10B981' }} size={20} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#FFF' }}>3. Clinical Validation</h3>
          </div>
          <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '1rem', lineHeight: '1.5' }}>
            Cross-referencing predictions against global clinical registries to prioritize human safety profiles.
          </p>
          <div style={{ height: '220px', width: '100%', position: 'relative', marginTop: 'auto' }}>
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip 
                    contentStyle={{ background: '#0F172A', border: '1px solid rgba(0, 229, 255, 0.2)', borderRadius: '8px', fontSize: '10px' }}
                  />
                  <Pie
                    data={validationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={65}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {validationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} stroke="transparent" />
                    ))}
                  </Pie>
                </PieChart>
             </ResponsiveContainer>
             <div style={{ position: 'absolute', top: '51%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#FFF' }}>82%</div>
                <div style={{ fontSize: '0.5rem', color: '#94A3B8', textTransform: 'uppercase' }}>Clinical</div>
             </div>
          </div>
        </div>

        {/* Card 4: Score Interpretation */}
        <div className="method-card" style={{ 
          background: 'rgba(15, 23, 42, 0.6)', 
          backdropFilter: 'blur(10px)',
          borderRadius: '24px', 
          padding: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
            <BarChart3 style={{ color: '#8B5CF6' }} size={20} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#FFF' }}>4. Score Interpretation</h3>
          </div>
          <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
            Understanding the reliability curve. High scores indicate high density of combined evidence.
          </p>
          <div style={{ height: '220px', width: '100%', marginTop: 'auto' }}>
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={thresholdData}>
                  <defs>
                    <linearGradient id="colorProb" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="score" stroke="#64748B" fontSize={10} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ background: '#0F172A', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '8px', fontSize: '10px' }}
                  />
                  <Area type="monotone" dataKey="prob" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorProb)" />
                </AreaChart>
             </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.7rem', color: '#64748B' }}>
             <span>Low Potential</span>
             <span>High Confidence</span>
          </div>
        </div>

      </div>
    </section>
  );
}
