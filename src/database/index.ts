import mysql, { Connection } from 'mysql2/promise'

export const createConnection = async (): Promise<Connection> => {
    return await mysql.createConnection({
        host: process.env.DB_HOST,
        port: <number | undefined> process.env.DB_PORT,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    })
}
