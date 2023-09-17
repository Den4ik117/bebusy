export interface WebSocketRoutes {
    [key: string]: Function
}

export interface IWebSocketRouter {
    routes: WebSocketRoutes
    receive: Function
}

export const WebSocketRouter: () => IWebSocketRouter  = () => {
    const routes: WebSocketRoutes = {}

    const receive = (type: string, handler: Function) => {
        routes[type] = handler
    }

    return {
        routes,
        receive,
    }
}
