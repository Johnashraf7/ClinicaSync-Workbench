import requests
import json

url = "https://www.ebi.ac.uk/chembl/api/data/mechanism?molecule_dictionary__chembl_id__in=CHEMBL2108675&format=json"
print("Querying URI:", url)
res = requests.get(url).json()
print("Total count:", res.get('page_meta', {}).get('total_count'))
