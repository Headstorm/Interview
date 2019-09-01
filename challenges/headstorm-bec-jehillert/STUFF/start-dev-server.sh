#!/bin/bash -p
set -e

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path" && cd "../"
gnome-terminal \
  --window-with-profile="Grass" \
  --geometry +2505+1046 \
  --hide-menubar \
  -- bash -c 'npm run dev-server'

exit 0

