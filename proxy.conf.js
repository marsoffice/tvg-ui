module.exports = {
  "/api/users": {
    target: "http://localhost:7001",
    secure: false,
  },
  "/api/speech": {
    target: "http://localhost:7002",
    secure: false,
  },
  "/api/notifications": {
    target: "http://localhost:7003",
    secure: false,
  },
  "/api/jobs": {
    target: "http://localhost:7004",
    secure: false,
  },
  "/api/videos": {
    target: "http://localhost:7005",
    secure: false,
  },
  "/api/content": {
    target: "http://localhost:7006",
    secure: false,
  }
};
