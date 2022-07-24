require('dotenv').config();

module.exports = {
  "development": {
    "username": "pzokeoxgrnivli",
    "password": "bc9a6a2943a7d0d353f836c49d4ca6a17bc9d4e06530f21d826f439a5836d457",
    "database": "dd7dvffbhgjmd6",
    "host": "ec2-100-26-39-41.compute-1.amazonaws.com",
    dialect: "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  },
  "test": {
    "username": "pzokeoxgrnivli",
    "password": "bc9a6a2943a7d0d353f836c49d4ca6a17bc9d4e06530f21d826f439a5836d457",
    "database": "dd7dvffbhgjmd6",
    "host": "ec2-100-26-39-41.compute-1.amazonaws.com",
    dialect: "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  },
  "production": {
    "username": "pzokeoxgrnivli",
    "password": "bc9a6a2943a7d0d353f836c49d4ca6a17bc9d4e06530f21d826f439a5836d457",
    "database": "dd7dvffbhgjmd6",
    "host": "ec2-100-26-39-41.compute-1.amazonaws.com",
    dialect: "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  },
}