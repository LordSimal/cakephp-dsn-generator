module.exports = {
  apps: [
    {
      name: 'dsngenerator',
      script: 'pnpm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};