#!/bin/bash

usage="
Script usage:
  bin/main.sh [--mod=MOD_LETTERS] {up|down|stop|other docker-compose cmd}
"

cd "$(dirname "$0")"

if [[ -z $@ ]]; then
    echo "$usage"
fi

base_compose="-f ../compose/base.yml"
env_file="--env-file ../../web/.env"
mod_compose=""

docker compose ${env_file} ${base_compose} ${mod_compose} -p tree_replication "$@"
