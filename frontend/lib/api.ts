// Replace with environment variable for production (e.g., HF Spaces URL)
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7860';

export interface SearchResult {
  id: string;
  name: string;
  description: string;
}

export interface DrugCandidate {
  id: string;
  name: string;
  score: number;
  shared_genes: string[];
  moa_table: { action_type: string, mechanism_of_action: string, target_chembl_id: string }[];
  clinical_stage: string;
  validation_status: "Confirmed" | "Predicted";
}

export const searchDisease = async (query: string): Promise<SearchResult[]> => {
  const res = await fetch(`${API_BASE}/api/search?query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Search failed');
  const data = await res.json();
  return data.results || [];
};

export const predictRepurposing = async (diseaseId: string, diseaseName: string): Promise<DrugCandidate[]> => {
  const res = await fetch(`${API_BASE}/api/predict?disease_id=${encodeURIComponent(diseaseId)}&disease_name=${encodeURIComponent(diseaseName)}`);
  if (!res.ok) throw new Error('Prediction failed. This disease might not have enough target data.');
  const data = await res.json();
  return data.candidates || [];
};

export const explainMechanism = async (drug: string, disease: string, genes: string[]): Promise<string> => {
  const res = await fetch(`${API_BASE}/api/explain`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ drug, disease, genes })
  });
  if (!res.ok) throw new Error('Explanation failed');
  const data = await res.json();
  return data.explanation;
};
