import {IAction, INodeChat, IUpdate} from '../models'
import { Service } from '../services'

export interface INode {
    id: number
    middleware(req: BotRequest, res: BotResponse): BotResponse | Promise<BotResponse>
    handler(req: BotRequest, res: BotResponse): BotResponse | Promise<BotResponse>
}

export class BotRequest {
    public readonly update: IUpdate
    public readonly node: INode
    public readonly message: string

    constructor(update: IUpdate, node: INode) {
        this.update = update
        this.node = node
        this.message = update.message?.text || ''
    }
}

export class BotResponse {
    private readonly texts: string[]
    private readonly _actions: string[]
    private readonly services: Service
    public readonly nodeChat: INodeChat
    private readonly nodes: INode[]
    private nextNodeId: number
    private resumeId: number

    constructor(services: Service, nodeChat: INodeChat, nodes: INode[]) {
        this.texts = []
        this._actions = []
        this.services = services
        this.nodeChat = nodeChat
        this.nodes = nodes
        this.nextNodeId = 0
        this.resumeId = 0
    }

    public text(text: string): this {
        this.texts.push(text)

        return this
    }

    public next(id: number): this {
        const has = this.nodes.some((node) => node.id === id)

        if (!has) throw new Error(`Node с ID (${id}) не существует`)

        this.nextNodeId = id

        return this
    }

    public actions(action: string|string[]): this {
        if (typeof action === 'object') {
            this._actions.push(...action)
            return this
        }

        this._actions.push(action)

        return this
    }

    public resume(id: number): this {
        this.resumeId = id

        return this
    }

    public run(): INode | undefined {
        if (this.nextNodeId !== 0) {
            this.services.ResumeBotService.updateNodeIdByChatIdAndUserId(
                this.nodeChat.chat_id,
                this.nodeChat.user_id,
                this.nextNodeId,
            )
            return this.nodes.find(node => node.id === this.nextNodeId)
        }

        const actions: IAction[][] = []

        for (let i = 0; i < this._actions.length; i++) {
            actions.push([{ text: this._actions[i] }])
        }

        for (let i = 0; i < this.texts.length; i++) {
            const resumeId = this.resumeId !== 0 && i === this.text.length - 1 ? this.resumeId : undefined

            this.services.ResumeBotService.sendMessage(
                this.nodeChat.chat_id,
                this.texts[i],
                actions.length > 0 ? actions : undefined,
                resumeId,
            )
        }

        // if (this.resumeId !== 0) {
        //     this.services.ResumeBotService.sendMessage(
        //         this.nodeChat.chat_id,
        //         'Резюме',
        //         actions.length > 0 ? actions : undefined,
        //         this.resumeId,
        //     )
        // }

        return undefined
    }
}
