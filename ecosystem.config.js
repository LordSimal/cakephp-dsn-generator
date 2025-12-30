module.exports = {
  apps: [
    {
      name: 'dsn-generator',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
}
