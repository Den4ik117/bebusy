import {
    Chat,
    ChatType,
    ChatUser,
    Direction, Mentor,
    Message,
    NodeChat,
    Opinion, Request,
    Resume,
    Session,
    Update,
    User
} from "../models";
import {CreationAttributes, Op} from "@sequelize/core";
import {v4 as generateUuid} from "uuid";

export const runSeeders = async (): Promise<void> => {
    await upsertUsers()
    await upsertDirections()
    await upsertMentors()
}

const upsertDirections = async (): Promise<void> => {
    const directions = [
        {id: 1, name: 'Фронтенд-разработка'},
        {id: 2, name: 'Бэкенд-разработка'},
        {id: 3, name: 'Мобильная разработка'},
        {id: 4, name: 'Десктопная разработка'},
        {id: 5, name: 'Data Science'},
        {id: 6, name: 'Разработка игр'},
    ]

    const directionIds = []

    for (const { id, name } of directions) {
        let direction = await Direction.findByPk(id)

        if (direction) {
            await direction.update({
                name: name,
            })
        } else {
            direction = await Direction.create({
                id: id,
                name: name,
            })
        }

        directionIds.push(direction.id)
    }

    const someDirections = await Direction.findAll({
        where: {
            id: {
                [Op.notIn]: directionIds,
            },
        },
    })

    someDirections.forEach((direction) => direction.destroy())
}

const upsertMentors = async (): Promise<void> => {
    const directions = [
        {
            id: 1,
            grade: 'Senior Full-Stack Developer',
            description: 'Я твой будущий наставник. Я Senior Full-Stack разработчик. Работаю в Google 7 лет, был наставником 7324 человек.',
            isActive: true,
            userId: 1,
        },
        {
            id: 2,
            grade: 'Middle+ Frontend Developer',
            description: 'Я твой будущий наставник. Работает Middle+ Frontend в Точке уже более 10-ти лет. Был наставником 1700 человек.',
            isActive: true,
            userId: 3,
        },
    ]

    const directionIds = []

    for (const data of directions) {
        let direction = await Mentor.findByPk(data.id)

        if (direction) {
            await direction.update({
                grade: data.grade,
                description: data.description,
                isActive: data.isActive,
                userId: data.userId,
            })
        } else {
            direction = await Mentor.create({
                id: data.id,
                grade: data.grade,
                description: data.description,
                isActive: data.isActive,
                userId: data.userId,
            })
        }

        directionIds.push(direction.id)
    }

    const someMentors = await Mentor.findAll({
        where: {
            id: {
                [Op.notIn]: directionIds,
            },
        },
    })

    someMentors.forEach((direction) => direction.destroy())
}

const upsertUsers = async (): Promise<void> => {
    const users = [
        {
            id: 1,
            is_bot: false,
            foreign_id: '108339345',
            lastName: 'Загвоздин',
            firstName: 'Денис',
            token: null,
            webhookUrl: null,
            uuid: generateUuid(),
        },
        {
            id: 2,
            is_bot: true,
            foreign_id: '',
            lastName: 'Помощь в',
            firstName: 'трудоустройстве',
            token: process.env.RESUME_BOT_TOKEN,
            webhookUrl: 'http://127.0.0.1:5000/bots/callback',
            uuid: generateUuid(),
        },
        {
            id: 3,
            is_bot: false,
            foreign_id: '142236867',
            lastName: 'Федоров',
            firstName: 'Семен',
            token: null,
            webhookUrl: null,
            uuid: generateUuid(),
        }
    ] as Array<CreationAttributes<User>>

    for (const user of users) {
        let userModel = await User.findByPk(user.id)

        !userModel && await User.create(user)
    }
}