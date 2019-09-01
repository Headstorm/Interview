#!/usr/bin/env bash
set -e
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path" && cd "../"
git add --all
git status
git commit --allow-empty -m "Updating heroku deployment with code modifications on $(date)"
git push heroku master
echo -e "\e[32mDeployment updated."
exit 0
