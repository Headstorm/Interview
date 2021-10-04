import json

with open('oldDb.json') as f:
    data = json.load(f)

print(data["record_id"])
print(data["name"])
print(data["cell_phone"])
print(data["work_phone"])
print(data["email"])
print(data["address"])
print(data["basic_widget"])
print(data["advanced_widget"])
print(data["protection_plan"])

f.close()
