import json
import chembl_api

ids = ["CHEMBL1743015", "CHEMBL2108675", "CHEMBL1200880"]
res = chembl_api.get_mechanisms_for_drugs(ids)
print(json.dumps(res, indent=2))
