import {INodeChat, IUpdate} from '../models'
import { Service } from '../services'

export interface INode {
    id: number
    middleware(req: BotRequest, res: BotResponse): BotResponse
    handler(req: BotRequest, res: BotResponse): BotResponse
}

export class BotRequest {
    public readonly update: IUpdate
    public readonly node: INode

    constructor(update: IUpdate, node: INode) {
        this.update = update
        this.node = node
    }
}

export class BotResponse {
    private readonly texts: string[]
    private readonly services: Service
    private readonly nodeChat: INodeChat
    private readonly nodes: INode[]
    private nextNodeId: number

    constructor(services: Service, nodeChat: INodeChat, nodes: INode[]) {
        this.texts = []
        this.services = services
        this.nodeChat = nodeChat
        this.nodes = nodes
        this.nextNodeId = 0
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

    public run(): INode | undefined {
        if (this.nextNodeId !== 0) {
            this.services.ResumeBotService.updateNodeIdByChatIdAndUserId(
                this.nodeChat.chat_id,
                this.nodeChat.user_id,
                this.nextNodeId,
            )
            return this.nodes.find(node => node.id === this.nextNodeId)
        }

        for (let i = 0; i < this.texts.length; i++) {
            this.services.ResumeBotService.sendMessage(
                this.nodeChat.chat_id,
                this.texts[i],
            )
        }

        return undefined
    }
}
