import http from 'http'
import express from 'express'
import dotenv from 'dotenv'
import { createConnection } from './database'
import { createRepositories } from './repositories'
import { createServices } from './services'
import { createRouter } from './routes'
import { createHandlers } from './handlers'

(async () => {
    dotenv.config()

    const connection = await createConnection()
    const repositories = await createRepositories(connection)
    const services = await createServices(repositories)
    const handlers = await createHandlers(services)
    const router = await createRouter(handlers)

    const app = express()

    app.use('/', router)

    const server = http.createServer(app)

    const port = process.env.APP_PORT;

    server.listen(port, () => console.log(`Сервер запущен на ${port} порту`))
})()
