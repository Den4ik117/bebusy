import http from 'http'
import express from 'express'
import { WebSocketServer } from 'ws'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { createConnection } from './database'
import { createRepositories } from './repositories'
import { createServices } from './services'
import { createRouter } from './routes'
import { createHandlers, createWebsocketHandlers } from './handlers'

(async () => {
    dotenv.config()

    const connection = await createConnection()
    const repositories = await createRepositories(connection)
    const services = await createServices(repositories)
    const handlers = await createHandlers(services)
    const router = await createRouter(handlers)

    const app = express()

    app.use(bodyParser.json())

    app.use('/', router)

    const server = http.createServer(app)

    await createWebsocketHandlers(server, services)

    const port = process.env.APP_PORT

    server.listen(port, () => console.log(`Сервер запущен на ${port} порту`))
})()
