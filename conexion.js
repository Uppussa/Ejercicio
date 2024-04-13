import pool from 'mysql2'
export const pool = pool.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bike'
})