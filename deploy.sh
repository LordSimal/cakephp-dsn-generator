cd ~/cakephp-dsn-generator
git checkout .
git pull

# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# enable PNPM packages
export PATH="$HOME/.local/share/pnpm:$PATH"

nvm use 22
pnpm i
pnpm run build
pm2 restart dsn-generator