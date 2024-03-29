import mysql from 'mysql'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.USER_DB,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
})

export default pool
