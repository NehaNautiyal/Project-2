module.exports = {

  "development": {
    "username": process.env.MYSQL_USER || "root",
    "password": process.env.MYSQL_KEY || "" || "root",
    "database": process.env.MYSQL_DBNAME || "betsdb",
    "host": process.env.MYSQL_HOST || "127.0.0.1",
    "port": process.env.PORT || 3306 || 8889,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }
}
