#!/bin/bash
# Note: It is not necessary to manually delete the existing
#       heroku database before running this script.
LINK=https://ucd9fa4a5850d74e3a839f34ce44.dl.dropboxusercontent.com/cd/0/get/Al2lVpsoyy3MEriubZTRVkTzFwyXZz7d8b1MAksh8UXDVP9DISAEnVbNFWsLUMH8MA4QqDUt9cuZSE9KLmVTd8yKb17SwAQiWC9BlNmBfwJWrICrfNyhxXq7nmmH98goIY4/file?dl=1#
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path" && cd "../"
heroku pg:backups:restore --confirm timelockr-server $LINK DATABASE_URL
exit 0;
