import { createStore } from 'vuex';
import {useUsers, isAuth} from "@/composable/useUsers.js";
import {useChats} from "@/composable/useChats.js";
import {useRoute} from "vue-router";

const usersStore = useUsers()
const chatsStore = useChats()

export const fetchChats = async () => {
    chatsStore.fetch().then(response => {
        store.commit({
            type: 'setChats',
            value: response.data.data,
        });
    })
}

export const store = createStore({
    state() {
        const hash = window.location.pathname.replace('/_/', '').replace('/', '');

        if (window.location.pathname.startsWith('/_/')) {
            chatsStore.fetchOne(hash)
        }

        return {
            hash: hash,
            chats: [],
            me: null,
            message: '',
            page: '',
            search: '',
        };
    },
    getters: {
        activeChat: (state) => {
            return state.chats.find(chat => chat.information.uuid === state.hash);
        },
        computedChats: (state) => {
            if (state.search) {
                return state.chats.filter(chat => {
                    const name = chat.user?.full_name || chat.information.name

                    return name.toLowerCase().indexOf(state.search.toLowerCase()) > -1
                });
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

            chatsStore.fetchOne(value)

            history.pushState(data, value, url);
        },
        setChats: (state, { value = [] }) => {
            state.chats = value;
        },
        setMe: (state, { value = null }) => {
            state.me = value;
        },
        setMessage: (state, { value = '' }) => {
            state.message = value;
        },
        setPage: (state, { value = '' }) => {
            state.page = value
        },
        setSearch: (state, { value = '' }) => {
            state.search = value
        },
    }
});

export const initStore = async () => {
  if (!isAuth.value) return

  window.addEventListener('popstate', (event) => {
    store.commit({
      type: 'setHash',
      value: event.state?.hash || '',
    });
  });

  await fetchChats()

  usersStore.getMe().then(response => {
    store.commit({
      type: 'setMe',
      value: response.data.data,
    });
  })
};
