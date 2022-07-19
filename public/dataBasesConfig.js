import knex from 'knex'

const configMysql = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "ecommerce",
  },
  pool: { min: 0, max: 7 },
}

const configSQLite3 = {
  client: "sqlite3",
  connection: { filename: './public/db/mydb.sqlite' },
  useNullAsDefault: true
}


const mySqlConnection = knex(configMysql)
const mySqliteConnection = knex(configSQLite3)


export {mySqlConnection, mySqliteConnection}