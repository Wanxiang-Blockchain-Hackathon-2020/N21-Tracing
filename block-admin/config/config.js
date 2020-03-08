const config = {
  // debug 为 true 时，用于本地调试
  debug: true,
  host: 'localhost',
  port: 3306,
  external_url: process.env.GITBOOK_EXTERNAL_URL ? process.env.GITBOOK_EXTERNAL_URL : 'http://localhost:3000/',
  db: {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'ces',
    connectionLimit: 1000,
    debug: false,
    multipleStatements: false,
  },
  session: {
    name: 'connect.sid',
    secret: 'fgsdfsdfdgdg',
    resave: false,
    saveUninitialized: false
  },
  // data_dir: '/usr/src/data'
  // 其他配置项...
};
module.exports = config;

