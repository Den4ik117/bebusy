import { createConnection as createMySqlConnection, Connection, createPool } from 'mysql2/promise'
import { Sequelize } from '@sequelize/core'
import { v4 as generateUuid } from 'uuid'
import {
    Chat,
    ChatType,
    ChatUser,
    Direction,
    Message,
    NodeChat,
    Opinion, Request,
    Resume,
    Session,
    Update,
    User
} from "../models";
import {runSeeders} from "./seeders";

export const createConnection = async (): Promise<Connection> => {
    return createPool({
        connectionLimit: 100,
        host: process.env.DB_HOST,
        port: +(process.env.DB_PORT || 3306),
        database: process.env.DB_DATABASE,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    })
}

export const createSequelizeConnection = async (): Promise<Sequelize> => {
    const connection = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: +(process.env.DB_PORT || 3306),
        database: process.env.DB_DATABASE,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        models: [
            User,
            Message,
            Update,
            Resume,
            Session,
            Chat,
            ChatUser,
            NodeChat,
            Opinion,
            Direction,
            Request,
        ],
    })

    try {
        await connection.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    // await connection.sync({ alter: true })
    await connection.sync({ force: true })
    // //
    // const user = await User.create({
    //     id: 1,
    //     is_bot: false,
    //     foreign_id: '108339345',
    //     lastName: 'Zagvozdin',
    //     firstName: 'Denis',
    //     uuid: generateUuid(),
    // })
    //
    // await User.create({
    //     id: 2,
    //     is_bot: true,
    //     foreign_id: '',
    //     lastName: 'Помощь в',
    //     firstName: 'трудоустройстве',
    //     token: '1S1DO1SQ6SDR3UEIPSGN2QQ205',
    //     webhookUrl: 'http://127.0.0.1:5000/bots/callback',
    //     uuid: generateUuid(),
    // })
    //
    // await Chat.create({
    //     id: 1,
    //     uuid: generateUuid(),
    //     name: 'Zagvozdin Denis',
    //     type: 'PRIVATE',
    // })
    //
    // await ChatUser.create({
    //     chatId: 1,
    //     userId: 1,
    // })
    //
    // await ChatUser.create({
    //     chatId: 1,
    //     userId: 2,
    // })
    //
    // await Message.create({
    //     text: 'Чат создан',
    //     chatId: 1,
    // })

    await runSeeders()

    return connection
}
