import {ref} from "vue";
import {useAxios} from "@/composable/useAxios.js";
import {fetchChats} from "@/app/store.js";

export const chats = ref([])
export const activeChat = ref()

window.Echo.channel('test').listen('MessageSent', (event) => {
    // const index = chats.value.findIndex(chat => chat.information.id === event.message.chat_id)
    //
    // if (index !== -1) {
    //     chats.value[index].messages.push(event.message)
    // }

    fetchChats()
});

export const useChats = () => {
    const axios = useAxios()

    const fetch = () => {
        return axios.get('/api/chats')
            .then(response => {
                chats.value = response.data.data

                return response
            })
    }

    const create = (data) => {
        return axios.post('/api/chats', data)
    }

    const fetchOne = (uuid) => {
        return axios.get(`/api/chats/${uuid}`)
            .then(response => {
                activeChat.value = response.data.data
                // chats.value = response.data.data
                // console.log(response.data.data)

                return response
            })
    }

    return {
        fetch,
        create,
        fetchOne,
    }
}