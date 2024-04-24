import {ref} from "vue";
import {useAxios} from "@/composable/useAxios.js";

export const chats = ref([])

window.Echo.channel('test').listen('MessageSent', (event) => {
    const index = chats.value.findIndex(chat => chat.information.id === event.message.chat_id)

    if (index !== -1) {
        chats.value[index].messages.push(event.message)
    }
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

    return {
        fetch,
    }
}