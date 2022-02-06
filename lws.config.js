module.exports = {
  port: 4200,
  key: "ssl/cert.key",
  cert: "ssl/cert.crt",
  https: true,
  rewrite: [
    {
      from: "/api/users/(.*)",
      to: "http://localhost:7001/api/users/$1",
    },
    {
      from: "/api/speech/(.*)",
      to: "http://localhost:7002/api/speech/$1",
    },
    {
      from: "/api/notifications(.*)",
      to: "http://localhost:7003/api/notifications$1",
    },
    {
      from: "/api/jobs(.*)",
      to: "http://localhost:7004/api/jobs$1",
    },
    {
      from: "/api/videos(.*)",
      to: "http://localhost:7005/api/videos$1",
    },
    {
      from: "/api/content(.*)",
      to: "http://localhost:7006/api/content$1",
    },
  ],
  directory: "dist/tvg-ui",
  logFormat: "stats",
};
