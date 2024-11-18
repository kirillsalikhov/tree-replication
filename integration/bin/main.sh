#!/bin/bash

usage="
Script usage:
  bin/main.sh [--mod=MOD_LETTERS] {up|down|stop|other docker-compose cmd}

  MOD_LETTERS:
    p - prod mode
  Examples:
    main.sh up

    // modify behavior
    main.sh --mod=p build web // build rails container
    // then
    main.sh --mod=p up
"

cd "$(dirname "$0")"

if [[ -z $@ ]]; then
    echo "$usage"
fi

ARGS=()
mod=''
for i in "$@"
do
    if [[ $i == "--mod="* ]]
    then
        mod="${i#*=}"
        shift
    else
        ARGS+=("$i")
    fi
done

base_compose="-f ../compose/base.yml"
env_file="--env-file ../../web/.env"
mod_compose=""

for l in $(echo ${mod} | grep -o .)
do
    case $l in
        p)
            echo "MOD prod env : p"
            mod_compose+=" -f ../compose/mod/prod.yml"
        ;;
    esac
done

docker compose ${env_file} ${base_compose} ${mod_compose} -p tree_replication "$@"
