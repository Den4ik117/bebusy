import { createConnection as createMySqlConnection, Connection } from 'mysql2/promise'

export const createConnection = async (): Promise<Connection> => {
    return await createMySqlConnection({
        host: process.env.DB_HOST,
        port: +(process.env.DB_PORT || 3306),
        database: process.env.DB_DATABASE,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    })
}
