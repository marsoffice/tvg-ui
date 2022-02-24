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
      from: "/api/editor/(.*)",
      to: "http://localhost:7007/api/editor/$1",
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
    {
      from: "/api/translate(.*)",
      to: "http://localhost:7011/api/translate$1",
    },
    {
      from: "/api/audiodownloader(.*)",
      to: "http://localhost:7008/api/audiodownloader$1",
    },
    {
      from: "/api/videodownloader(.*)",
      to: "http://localhost:7009/api/videodownloader$1",
    },
    {
      from: "/api/tiktok(.*)",
      to: "http://localhost:7010/api/tiktok$1",
    }
  ],
  directory: "dist/tvg-ui",
  logFormat: "stats",
};
