import requests

GRAPHQL_URL = "https://api.platform.opentargets.org/api/v4/graphql"

def search_disease(query: str):
    query_str = """
    query searchDisease($queryString: String!) {
      search(queryString: $queryString, entityNames: ["disease"], page: {index: 0, size: 5}) {
        hits {
          id
          name
          description
        }
      }
    }
    """
    
    variables = {"queryString": query}
    try:
        response = requests.post(GRAPHQL_URL, json={"query": query_str, "variables": variables}, timeout=10)
        data = response.json()
        return data.get("data", {}).get("search", {}).get("hits", [])
    except Exception as e:
        print(f"Error searching disease: {e}")
        return []

def get_targets_for_disease(efo_id: str, size: int = 50):
    query_str = """
    query diseaseTargets($efoId: String!, $size: Int!) {
      disease(efoId: $efoId) {
        id
        name
        associatedTargets(page: {index: 0, size: $size}) {
          rows {
            target {
              id
              approvedSymbol
            }
            score
          }
        }
      }
    }
    """
    variables = {"efoId": efo_id, "size": size}
    try:
        response = requests.post(GRAPHQL_URL, json={"query": query_str, "variables": variables}, timeout=10)
        data = response.json()
        disease_data = data.get("data", {}).get("disease", {})
        if not disease_data:
            return None
        
        targets = []
        for row in disease_data.get("associatedTargets", {}).get("rows", []):
            targets.append({
                "id": row["target"]["id"],
                "symbol": row["target"]["approvedSymbol"],
                "score": row["score"]
            })
        return targets
    except Exception as e:
        print(f"Error fetching targets: {e}")
        return []

from typing import List
def get_drugs_for_targets_by_symbol(symbols: List[str]):
    query_str = """
    query searchDrugs($qs: String!) {
      search(queryString: $qs, entityNames: ["drug"], page: {index: 0, size: 15}) {
        hits {
          id
          name
        }
      }
    }
    """
    result = {}
    for symbol in symbols:
        try:
            response = requests.post(GRAPHQL_URL, json={"query": query_str, "variables": {"qs": symbol}}, timeout=5)
            data = response.json()
            hits = data.get("data", {}).get("search", {}).get("hits", [])
            for hit in hits:
                d_id = hit["id"]
                if d_id not in result:
                    result[d_id] = {"name": hit["name"], "targets": set()}
                result[d_id]["targets"].add(symbol)
        except Exception as e:
            print(f"Error fetching drugs for {symbol}:", e)
            continue
    return result

def batch_get_drug_moa(chembl_ids: List[str]):
    query_str = """
    query getMoA($chemblIds: [String!]!) {
      drugs(chemblIds: $chemblIds) {
        id
        mechanismsOfAction {
          rows {
            actionType
            targets { approvedSymbol }
          }
        }
      }
    }
    """
    try:
        response = requests.post(GRAPHQL_URL, json={"query": query_str, "variables": {"chemblIds": chembl_ids}}, timeout=15)
        data = response.json()
        drugs_data = data.get("data", {}).get("drugs", [])
        moa_dict = {}
        for drug in drugs_data:
            d_id = drug["id"]
            moa_dict[d_id] = {}
            rows = drug.get("mechanismsOfAction", {}).get("rows", [])
            for row in rows:
                action = row.get("actionType")
                for target in row.get("targets", []):
                    symbol = target.get("approvedSymbol")
                    if symbol and action:
                        moa_dict[d_id][symbol] = action
        return moa_dict
    except Exception as e:
        print(f"Error fetching MoA: {e}")
        return {}

def batch_get_clinical_info(chembl_ids: List[str]):
    query_str = """
    query getClinical($chemblIds: [String!]!) {
      drugs(chemblIds: $chemblIds) {
        id
        maximumClinicalStage
        indications {
          rows {
            disease {
              id
              name
            }
          }
        }
      }
    }
    """
    try:
        response = requests.post(GRAPHQL_URL, json={"query": query_str, "variables": {"chemblIds": chembl_ids}}, timeout=15)
        data = response.json()
        drugs_data = data.get("data", {}).get("drugs", [])
        clinical_dict = {}
        for drug in drugs_data:
            d_id = drug["id"]
            clinical_dict[d_id] = {
                "max_stage": drug.get("maximumClinicalStage"),
                "indications": [row["disease"]["id"] for row in drug.get("indications", {}).get("rows", [])]
            }
        return clinical_dict
    except Exception as e:
        print(f"Error fetching Clinical Info: {e}")
        return {}
