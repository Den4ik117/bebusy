import * as http from 'http'
import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { createConnection } from './database'
import { createRepositories } from './repositories'
import { createServices } from './services'
import { createRouter } from './routes'
import { createHandlers, createWebsocketHandlers } from './handlers'
import cors from 'cors'

(async () => {
    dotenv.config()

    const connection = await createConnection()
    const repositories = await createRepositories(connection)
    const services = await createServices(repositories)
    const handlers = await createHandlers(services)
    const { router, webSocketRouter } = await createRouter(handlers)

    const app = express()

    app.set('view engine', 'ejs');

    app.use(cors())

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(cookieParser())

    app.use('/', router)

    const server = http.createServer(app)

    await createWebsocketHandlers(server, webSocketRouter)

    const port = process.env.APP_PORT

    server.listen(port, () => console.log(`Сервер запущен на ${port} порту`))
})()
