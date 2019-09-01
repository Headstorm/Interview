#!/bin/bash
set -e
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path" && cd "../"
PGPASSWORD=1445 pg_dump -Fc --no-acl --no-owner -h localhost -U jeh db > /home/jeh/Shared/Dropbox/Linked/db.dump
exit 0
