import { createStore } from 'vuex';
import { request } from '@/api';
import { getCookie } from '@/utils'

let socket;

export const fetchChats = async () => {
    await request('/api/chats', 'GET', undefined, undefined, (data) => {
        store.commit({
            type: 'setChats',
            value: data.data,
        });
    });
}

export const store = createStore({
    state() {
        const hash = window.location.pathname.replace('/_/', '').replace('/', '');

        return {
            hash: hash,
            chats: [],
            me: null,
            token: getCookie('auth-session'),
            message: '',
            page: '',
            search: '',
            // resumes: [],
        };
    },
    getters: {
        activeChat: (state) => {
            return state.chats.find(chat => chat.uuid === state.hash);
        },
        computedChats: (state) => {
            if (state.search) {
                return state.chats.filter(chat => chat.name.toLowerCase().indexOf(state.search.toLowerCase()) > -1);
            }

            return state.chats
        },
    },
    mutations: {
        setHash: (state, { value = '' }) => {
            state.hash = value;

            const url = value ? `/_/${value}` : '/';

            const data = {
                hash: value,
            };

            history.pushState(data, value, url);
        },
        setChats: (state, { value = [] }) => {
            state.chats = value;
        },
        pushMessages: (state, { messages, callback }) => {
            for (let i = 0; i < messages.length; i++) {
                const index = state.chats.findIndex(chat => chat.id === messages[i].chat_id);

                if (state.chats[index]) {
                    state.chats[index].messages.push(messages[i]);

                    callback && callback();
                }
            }
        },
        setMe: (state, { value = null }) => {
            state.me = value;
        },
        // setToken: (state, { value = null }) => {
        //     state.token = value;
        //
        //     window.localStorage.setItem('token', value);
        // },
        setMessage: (state, { value = '' }) => {
            state.message = value;
        },
        setPage: (state, { value = '' }) => {
            state.page = value
        },
        setSearch: (state, { value = '' }) => {
            state.search = value
        },
    },
    actions: {
        sendMessage: (context) => {
            const msg = {
                id: Date.now(),
                event: 'message',
                text: context.state.message,
                chat_id: context.getters.activeChat.id,
                user_id: context.state.me.id,
            };

            socket.send(JSON.stringify(msg));

            context.commit({
                type: 'setMessage',
                value: '',
            })
        },
    },
});

export const initStore = async () => {
    window.addEventListener('popstate', (event) => {
        store.commit({
            type: 'setHash',
            value: event.state?.hash || '',
        });
    });

    await fetchChats()

    await request('/api/me', 'GET', undefined, undefined, (data) => {
        store.commit({
            type: 'setMe',
            value: data.data,
        });
    });

    // !store.state.token && await request('/api/token', 'GET', undefined, undefined, (data) => {
    //     store.commit({
    //         type: 'setToken',
    //         value: data.data,
    //     });
    // });

    // await request(`/api/resumes`, 'GET', undefined, undefined, data => {
    //     store.commit({
    //         type: 'setResumes',
    //         value: data.data,
    //     })
    // })

    let wsURL = import.meta.env.VITE_APP_URL || ''

    wsURL = wsURL.replace('https', 'wss').replace('http', 'ws')

    const createWebSocketConnection = () => {
        console.log('Пытаюсь установить WebSocket соединение')

        socket = new WebSocket(wsURL)

        socket.onopen = () => {
            const message = {
                id: Date.now(),
                event: 'connection',
                token: store.state.token,
            };

            socket.send(JSON.stringify(message))

            console.log('WebSocket подключение установлено');
        };

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            switch (message.event) {
                case 'message':
                    // form.message = '';

                    store.commit({
                        type: 'pushMessages',
                        messages: [message.data],
                        callback: () => {},
                    });

                    break;
            }

            console.log('Пришло сообщение:', message);
        };

        socket.onclose = () => {
            console.log('WebSocket соединение закрыто')

            setTimeout(() => createWebSocketConnection(), 2000)
        };

        socket.onerror = (event) => {
            console.log(`WebSocket ошибка: ${event.message}. Закрываю соединение`)

            socket.close()

            // setTimeout(() => createWebSocketConnection(), 2000)
        };
    }

    createWebSocketConnection()
};
