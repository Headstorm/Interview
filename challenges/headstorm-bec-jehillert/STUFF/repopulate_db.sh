#!/bin/bash

# TURN OFF SERVER-UI AND CLIENT BEFORE RUNNING

####################################################
# Script requires a .pg_service.conf file to
# be located in the home directory with the
# following contents:
#   [tldb]
#   dbname=postgres
#   host=localhost
#   port=5432
#   user=jeh
#   password=OMITTED
####################################################
set -e

# Kill pgAdmin4 instances
# pkill pgAdmin4

 # reload schema
sudo service postgresql restart
psql service=tldb<schema.sql
# Start/restart devserver
# parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
# cd "$parent_path" && cd "../"
# gnome-terminal \
#   --window-with-profile="Grass" \
#   --geometry +2505+1046 \
#   --hide-menubar \
#   -- bash -c 'npm run dev-server'

node demo-generate-mock-data.js

# run populate_data_base_w_mock_data.js
# gnome-terminal \
#  --window-with-profile="Grass" \
#  --geometry +2505+349 \
#  --hide-menubar \
#  -- bash -c 'node demo-generate-mock-data.js'

exit 0
