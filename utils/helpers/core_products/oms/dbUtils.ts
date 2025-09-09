const { Client } = require('pg');

export interface QueryResultRow {
    [column: string]: any;
}

export async function queryDB(query: string, params: any[] = []): Promise<QueryResultRow[]> {
    const client = new Client({
        host: `${process.env.DB_HOST}`,
        port: process.env.DB_PORT,
        user: `${process.env.DB_USER}`,
        password: `${process.env.DB_PASSWORD}`,
        database: `${process.env.DB_PASSWORD}`
    });

    await client.connect();
    const res = await client.query(query, params);
    await client.end();

    return res.rows;
}