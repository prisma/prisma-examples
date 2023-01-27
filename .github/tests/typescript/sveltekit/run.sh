#!/bin/sh

set -eu

curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash 

# load the nvm environment
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" 
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

nvm install 16
nvm use 16

npm install 
npx prisma migrate dev --name init
npm run dev &
pid=$!

sleep 15

# check frontend
curl --fail 'http://localhost:5173/'

kill "$pid"
