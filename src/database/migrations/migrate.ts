import dotenv from 'dotenv'
import mysql, { Connection } from 'mysql2/promise'
import MigrationOne from './0001_create_sessions_table'

const createConnection = async (): Promise<Connection> => {
    return await mysql.createConnection({
        host: process.env.DB_HOST,
        port: <number | undefined> process.env.DB_PORT,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    })
}


(async () => {
    dotenv.config()

    const connection = await createConnection()

    const migrations = [
        MigrationOne,
    ]

    if (process.argv[2] === 'up') {
        for (const migration of migrations) {
            const [result] = await connection.execute(migration.up())

            console.log(result)
        }
    } else if(process.argv[2] === 'down') {
        for (const migration of migrations) {
            const [result] = await connection.execute(migration.down())

            console.log(result)
        }
    } else {
        console.log('Неизвестная команда')
    }
})()
