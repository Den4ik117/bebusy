import { IUser } from './user'
import { IMessage, IAction } from './message'
import { IUpdate } from './update'
import { IResume, IHHResume } from './resume'
import { ISession } from './session'
import { IChat, ChatType } from './chat'
import { INodeChat } from './node-chat'
import { IOpinion } from './opinion'
import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
    Sequelize
} from "@sequelize/core";
import {RowDataPacket} from "mysql2";
const { Attribute, AutoIncrement, PrimaryKey, NotNull, Table, Default, BelongsTo, BelongsToMany } = require('@sequelize/core/decorators-legacy')

@Table({
    underscored: true,
    tableName: 'files',
})
export class File extends Model<InferAttributes<File>, InferCreationAttributes<File>> {
    @Attribute(DataTypes.BIGINT.UNSIGNED)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>

    @Attribute(DataTypes.STRING(36))
    @NotNull
    declare uuid: string

    @Attribute(DataTypes.STRING)
    @NotNull
    declare content: string
}

@Table({
    underscored: true,
    tableName: 'users',
})
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    @Attribute(DataTypes.BIGINT.UNSIGNED)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>

    @Attribute(DataTypes.STRING(36))
    @NotNull
    declare uuid: string

    @Attribute(DataTypes.STRING)
    @NotNull
    declare foreign_id: string

    @Attribute(DataTypes.STRING)
    @NotNull
    declare firstName: string

    @Attribute(DataTypes.STRING)
    declare middleName: string | null

    @Attribute(DataTypes.STRING)
    @NotNull
    declare lastName: string

    @Attribute(DataTypes.STRING)
    declare email: string | null

    @Attribute(DataTypes.BOOLEAN)
    @NotNull
    @Default(0)
    declare is_bot: boolean

    @Attribute(DataTypes.JSON)
    declare data: string | null

    @Attribute(DataTypes.STRING)
    declare token: string | null

    @Attribute(DataTypes.STRING)
    declare webhookUrl: string | null

    @Attribute(DataTypes.STRING)
    declare rememberToken: string | null

    @Attribute(DataTypes.BIGINT.UNSIGNED)
    declare avatarId: number | null

    @Attribute(DataTypes.STRING)
    declare image_url: string | null

    @BelongsTo(() => File, 'avatarId')
    declare avatar?: NonAttribute<File>

    @BelongsToMany(() => Chat, {
        through: () => ChatUser,
        // foreignKey: 'user_dd',
        // otherKey: 'chat_id',
    })
    declare chats?: NonAttribute<Chat[]>;

    @Attribute(DataTypes.VIRTUAL(DataTypes.STRING))
    get fullName(): NonAttribute<string> {
        return `${this.lastName} ${this.firstName}`;
    }
}

@Table({
    underscored: true,
    tableName: 'messages',
})
export class Message extends Model<InferAttributes<Message>, InferCreationAttributes<Message>> {
    @Attribute(DataTypes.BIGINT.UNSIGNED)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>

    @Attribute(DataTypes.STRING)
    declare text: string

    @Attribute(DataTypes.BIGINT.UNSIGNED)
    declare userId: number | null

    @Attribute(DataTypes.BIGINT.UNSIGNED)
    declare chatId: number

    @Attribute(DataTypes.BIGINT.UNSIGNED)
    declare resumeId: number | null

    @Attribute(DataTypes.JSON)
    declare actions: string | null

    @BelongsTo(() => User, 'userId')
    declare user?: NonAttribute<User>

    @BelongsTo(() => Chat, 'chatId')
    declare chat?: NonAttribute<Chat>

    @BelongsTo(() => Resume, 'resumeId')
    declare resume?: NonAttribute<Resume>
}

@Table({
    underscored: true,
    tableName: 'updates',
})
export class Update extends Model<InferAttributes<Update>, InferCreationAttributes<Update>> {
    @Attribute(DataTypes.BIGINT.UNSIGNED)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>

    @Attribute(DataTypes.BIGINT.UNSIGNED)
    declare messageId: number

    @Attribute(DataTypes.BIGINT.UNSIGNED)
    declare userId: number

    @Attribute(DataTypes.DATE(6))
    declare processed_at: string | null
}

@Table({
    underscored: true,
    tableName: 'resumes',
})
export class Resume extends Model<InferAttributes<Resume>, InferCreationAttributes<Resume>> {
    @Attribute(DataTypes.BIGINT.UNSIGNED)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>

    @Attribute(DataTypes.STRING(36))
    @NotNull
    declare uuid: string

    @Attribute(DataTypes.BIGINT.UNSIGNED)
    @NotNull
    declare userId: number

    @Attribute(DataTypes.JSON)
    @NotNull
    declare data: string

    @Attribute(DataTypes.DATE(6))
    declare published_at: string | null
}

@Table({
    underscored: true,
    tableName: 'sessions',
})
export class Session extends Model<InferAttributes<Session>, InferCreationAttributes<Session>> {
    @Attribute(DataTypes.STRING(36))
    @PrimaryKey
    declare uuid: string

    @Attribute(DataTypes.BIGINT.UNSIGNED)
    @NotNull
    declare userId: number

    @Attribute(DataTypes.STRING)
    declare hhAccessToken: string | null

    @Attribute(DataTypes.STRING)
    declare hhExpiresAt: string | null

    @Attribute(DataTypes.STRING)
    declare hhRefreshToken: string | null

    @Attribute(DataTypes.DATE(6))
    @NotNull
    declare expiresAt: string
}

@Table({
    underscored: true,
    tableName: 'chats',
})
export class Chat extends Model<InferAttributes<Chat>, InferCreationAttributes<Chat>> {
    @Attribute(DataTypes.BIGINT.UNSIGNED)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>

    @Attribute(DataTypes.STRING(36))
    @NotNull
    declare uuid: string

    @Attribute(DataTypes.STRING)
    @NotNull
    declare name: string

    @Attribute(DataTypes.STRING)
    @NotNull
    declare type: string
}

@Table({
    underscored: true,
    tableName: 'chat_user',
    timestamps: false,
})
export class ChatUser extends Model<InferAttributes<ChatUser>, InferCreationAttributes<ChatUser>> {
    @Attribute(DataTypes.BIGINT.UNSIGNED)
    @PrimaryKey
    @NotNull
    declare chatId: number

    @Attribute(DataTypes.BIGINT.UNSIGNED)
    @PrimaryKey
    @NotNull
    declare userId: number

    // @BelongsTo(() => Chat, 'chatId')
    // declare chat?: NonAttribute<Chat>
    //
    // @BelongsTo(() => User, 'userId')
    // declare user?: NonAttribute<User>
}

@Table({
    underscored: true,
    tableName: 'node_chat',
    timestamps: false,
})
export class NodeChat extends Model<InferAttributes<NodeChat>, InferCreationAttributes<NodeChat>> {
    @Attribute(DataTypes.BIGINT.UNSIGNED)
    @PrimaryKey
    @NotNull
    declare chatId: number

    @Attribute(DataTypes.BIGINT.UNSIGNED)
    @PrimaryKey
    @NotNull
    declare userId: number

    @Attribute(DataTypes.BIGINT.UNSIGNED)
    @NotNull
    declare nodeId: number

    @BelongsTo(() => Chat, 'chatId')
    declare chat?: NonAttribute<Chat>

    @BelongsTo(() => User, 'userId')
    declare user?: NonAttribute<User>
}

@Table({
    underscored: true,
    tableName: 'opinions',
})
export class Opinion extends Model<InferAttributes<Opinion>, InferCreationAttributes<Opinion>> {
    @Attribute(DataTypes.BIGINT.UNSIGNED)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>

    @Attribute(DataTypes.BIGINT.UNSIGNED)
    @NotNull
    declare resumeId: number

    @Attribute(DataTypes.BIGINT.UNSIGNED)
    @NotNull
    declare userId: number

    @Attribute(DataTypes.TINYINT.UNSIGNED)
    declare photo: number | null

    @Attribute(DataTypes.TINYINT.UNSIGNED)
    declare readable: number | null

    @Attribute(DataTypes.TINYINT.UNSIGNED)
    declare capacity: number | null

    @Attribute(DataTypes.TINYINT.UNSIGNED)
    declare experience: number | null

    @Attribute(DataTypes.TINYINT.UNSIGNED)
    declare total: number | null

    @Attribute(DataTypes.STRING(1024))
    declare comment: string | null

    @Attribute(DataTypes.DATE(6))
    declare completedAt: string | null
}

@Table({
    underscored: true,
    tableName: 'directions',
})
export class Direction extends Model<InferAttributes<Direction>, InferCreationAttributes<Direction>> {
    @Attribute(DataTypes.BIGINT.UNSIGNED)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>

    @Attribute(DataTypes.STRING)
    @NotNull
    declare name: string
}

export enum RequestStatus {
    New = 'new',
    Active = 'active',
    Inactive = 'inactive',
}

@Table({
    underscored: true,
    tableName: 'requests',
})
export class Request extends Model<InferAttributes<Request>, InferCreationAttributes<Request>> {
    @Attribute(DataTypes.BIGINT.UNSIGNED)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>

    @Attribute(DataTypes.STRING)
    @NotNull
    declare full_name: number

    @Attribute(DataTypes.DATE)
    @NotNull
    declare birthdate: number

    @Attribute(DataTypes.STRING(1024))
    @NotNull
    declare about: number

    @Attribute(DataTypes.STRING)
    @Default(RequestStatus.New)
    @NotNull
    declare status: RequestStatus

    @Attribute(DataTypes.BOOLEAN)
    @Default(false)
    @NotNull
    declare isMentor: boolean

    @Attribute(DataTypes.BIGINT.UNSIGNED)
    @NotNull
    declare directionId: number

    @Attribute(DataTypes.BIGINT.UNSIGNED)
    @NotNull
    declare userId: number

    @Attribute(DataTypes.JSON)
    declare data: CreationOptional<string>

    @Attribute(DataTypes.STRING)
    declare type: CreationOptional<string>

    @BelongsTo(() => Direction, 'directionId')
    declare direction?: NonAttribute<Direction>

    @BelongsTo(() => User, 'userId')
    declare user?: NonAttribute<User>
}

@Table({
    underscored: true,
    tableName: 'mentors',
})
export class Mentor extends Model<InferAttributes<Mentor>, InferCreationAttributes<Mentor>> {
    @Attribute(DataTypes.BIGINT.UNSIGNED)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>

    @Attribute(DataTypes.STRING)
    @NotNull
    declare grade: string

    @Attribute(DataTypes.STRING)
    @NotNull
    declare description: string

    @Attribute(DataTypes.BOOLEAN)
    @NotNull
    @Default(true)
    declare isActive: boolean

    @Attribute(DataTypes.BIGINT.UNSIGNED)
    @NotNull
    declare userId: number

    @BelongsTo(() => User, 'userId')
    declare user?: NonAttribute<User>
}

export {
    IUser,
    IMessage,
    IAction,
    IUpdate,
    IResume,
    ISession,
    IChat,
    ChatType,
    IHHResume,
    INodeChat,
    IOpinion,
}
