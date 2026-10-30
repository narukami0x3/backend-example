const db = require('mysql2/promise')
require('dotenv').config()

const pool = db.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    connectionLimit: 10
})

module.exports = pool;
