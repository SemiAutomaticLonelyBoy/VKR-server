const { Pool } = require('pg');

export const pool = new Pool({
    max: 300,
    connectionTimeoutMillis: 5000,
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'root',
    database: 'final',
    ssl: false,
});
