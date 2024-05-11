#/bin/bash
cd ~/cakephp-dsn-generator
git checkout .
git pull
pnpm i
pnpm run build
pm2 restart dsn-generator