import { createStore } from 'vuex';
import { request } from '@/api';

let socket;

export const store = createStore({
    state() {
        const hash = window.location.pathname.replace('/_/', '').replace('/', '');
        const token = window.localStorage.getItem('token');

        return {
            hash: hash,
            chats: [],
            me: null,
            token: token,
            message: '',
            resumes: [],
        };
    },
    getters: {
        activeChat: (state) => {
            return state.chats.find(chat => chat.uuid === state.hash);
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
        setToken: (state, { value = null }) => {
            state.token = value;

            window.localStorage.setItem('token', value);
        },
        setMessage: (state, { value = '' }) => {
            state.message = value;
        },
        setResumes: (state, { value = [] }) => {
            state.resumes = value;
        },
        setResume: (state, { value }) => {
            const index = state.resumes.findIndex(resume => resume.id === value.id)

            if (!state.resumes[index]) return

            state.resumes[index] = value
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
        publishResume: (context, { uuid }) => {
            request(
                `http://127.0.0.1:5000/api/resumes/${uuid}/publish?token=${store.state.token}`,
                'POST',
                undefined,
                undefined,
                (data) => {
                    context.commit({
                        type: 'setResume',
                        value: data.data,
                    })
                }
            )
        }
    },
});

export const initStore = async () => {
    window.addEventListener('popstate', (event) => {
        store.commit({
            type: 'setHash',
            value: event.state?.hash || '',
        });
    });

    await request('/api/chats', 'GET', undefined, undefined, (data) => {
        store.commit({
            type: 'setChats',
            value: data.data,
        });
    });

    await request('/api/me', 'GET', undefined, undefined, (data) => {
        store.commit({
            type: 'setMe',
            value: data.data,
        });
    });

    !store.state.token && await request('/api/token', 'GET', undefined, undefined, (data) => {
        store.commit({
            type: 'setToken',
            value: data.data,
        });
    });

    await request(`http://127.0.0.1:5000/api/resumes?token=${store.state.token}`, 'GET', undefined, undefined, data => {
        store.commit({
            type: 'setResumes',
            value: data.data,
        })
    })

    socket = new WebSocket('ws://127.0.0.1:5000');

    socket.onopen = () => {
        const message = {
            id: Date.now(),
            event: 'connection',
            token: store.state.token,
        };

        // console.log(store.state.token);

        socket.send(JSON.stringify(message))

        console.log('подюключение уставновленоо');
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
        console.log('closed ws')
    };

    socket.onerror = () => {
        console.log('error')
    };
};