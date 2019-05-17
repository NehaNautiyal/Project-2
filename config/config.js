module.exports = {

  "development": {
<<<<<<< HEAD:config/config.json
    "username": "root",
    "password": "0420",
    "database": "betsdb",
    "host": "127.0.0.1",
    "port": 3306,
=======
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_KEY,
    "database": process.env.MYSQL_DBNAME,
    "host": process.env.MYSQL_HOST,
    "port": process.env.PORT || 3306,
>>>>>>> edited jawsdb configuration:config/config.js
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "0420",
    "database": "database_test",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  },
  "production": {
<<<<<<< HEAD:config/config.json
    "username": "root",
    "password": "0420",
    "database": "database_production",
    "host": "127.0.0.1",
    "port": 3306,
=======
    "use_env_variable": "JAWSDB_URL",
>>>>>>> edited jawsdb configuration:config/config.js
    "dialect": "mysql"
  }
}
