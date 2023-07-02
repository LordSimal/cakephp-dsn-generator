#/bin/bash
cd ~/cakephp-dsn-generator
git checkout .
git pull
npm i
npm run build
pm2 restart dsn-generator