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
import {Op} from "@sequelize/core";

export const runSeeders = async (): Promise<void> => {
    await upsertDirections()
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