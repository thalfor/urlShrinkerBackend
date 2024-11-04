//
const config = {
  client: 'sqlite3',
  connection: {
    filename: './db/app.db',
  },
  useNullAsDefault: true,
  migrations: {
    directory: './migrations',
  },
};
//
module.exports = config;
//