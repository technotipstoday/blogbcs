// db.js
import { Pool } from 'pg';

const pool = new Pool({
    user: 'sampleuser',
    host: 'localhost',
    database: 'apidb',
    password: 'samplepassword123',
    port: 5432,
});

export default pool;