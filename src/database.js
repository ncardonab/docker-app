const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "127.0.0.1",
  port: "3308",
  user: "root",
  password: "123456",
  database: "quotes_db",
});

const getConnection = async () => {
  try {
    const connection = await pool.getConnection();
    return connection;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getConnection };
