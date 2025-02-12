cd ~/cakephp-dsn-generator
git checkout .
git pull

# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm use 22
npm i
npm run build
pm2 restart dsn-generator