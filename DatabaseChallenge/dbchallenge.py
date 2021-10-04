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

record_id = int(data["record_id"])
name = str(data["name"])
cell_phone = str(data["cell_phone"])
work_phone = str(data["work_phone"])
email = str(data["email"])
basic_widget = str(data["basic_widget"])
advanced_widget = str(data["advanced_widget"])
protection_plane = data["protection_plan"])

f.close()
