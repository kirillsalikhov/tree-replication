#!/usr/bin/env bash
cd "$(dirname "$0")"

USER="deployer"
HOST="95.217.39.185"
PROJECT="tree_replication"
REMOTE_PATH="/home/$USER/projects/$PROJECT"

# prepare folders
ssh -tt $USER@$HOST << EOF
mkdir -p $REMOTE_PATH
cd $REMOTE_PATH
mkdir -p integration/compose/mod
mkdir -p integration/bin
mkdir -p web
exit
EOF

scp ../compose/base.yml \
    $USER@$HOST:$REMOTE_PATH/integration/compose/
scp ../compose/mod/prod.yml \
    $USER@$HOST:$REMOTE_PATH/integration/compose/mod

scp ../bin/main.sh \
    $USER@$HOST:$REMOTE_PATH/integration/bin/

ssh -tt $USER@$HOST << EOF
cd "$REMOTE_PATH/integration/bin"
./main.sh --mod=p pull \
&& ./main.sh --mod=p down \
&& ./main.sh --mod=p up -d
exit
EOF
