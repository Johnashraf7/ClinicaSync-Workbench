import requests
from typing import List, Dict

CHEMBL_API = "https://www.ebi.ac.uk/chembl/api/data/mechanism"

def get_mechanisms_for_drugs(chembl_ids: List[str]) -> Dict[str, List[Dict]]:
    """
    Fetches the Mechanism of Action table records for a batch of ChEMBL IDs.
    Returns: Dict mapping each ChEMBL ID to a list of its MoA records.
    """
    if not chembl_ids:
        return {}
        
    moa_data = {cid: [] for cid in chembl_ids}
    
    # ChEMBL API ignores __in for this field. We must query each ID explicitly.
    import concurrent.futures
    
    def fetch_single(cid):
        try:
            # Proper filter: molecule_chembl_id=...
            url = f"{CHEMBL_API}?molecule_chembl_id={cid}&format=json"
            res = requests.get(url, timeout=5)
            if res.status_code == 200:
                return cid, res.json().get("mechanisms", [])
        except:
            pass
        return cid, []

    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        results = executor.map(fetch_single, chembl_ids)
        
    for cid, mechanisms in results:
        for mec in mechanisms:
            row = {
                "action_type": mec.get("action_type", "Unknown"),
                "mechanism_of_action": mec.get("mechanism_of_action", "Unspecified Mechanism"),
                "target_chembl_id": mec.get("target_chembl_id", "N/A")
            }
            moa_data[cid].append(row)
            
    return moa_data
