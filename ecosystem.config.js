module.exports = {
  apps: [
    {
      name: "demo-flowbase",
      cwd: __dirname,
      script: "node_modules/.bin/next",
      args: "start -p 3213 -H 127.0.0.1",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
