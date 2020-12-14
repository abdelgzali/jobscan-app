const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "us-cdbr-east-02.cleardb.com",
  user: "b203aeb3034e60",
  password: "11cae05d",
  database: "heroku_70e1098b0c1cd31",
});

let jobsdb = {};

jobsdb.all = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM jobs`, (err, results) => {
      if (err) return reject(err);
      console.log('returning jobs')
      return resolve(results);
    });
  });
};

jobsdb.one = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM jobs WHERE id = ?`, [id], (err, results) => {
      if (err) return reject(err);
      console.log('returning jobs')
      return resolve(results[0]);
    });
  });
};

module.exports = jobsdb;
