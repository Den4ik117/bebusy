import {ref} from "vue";
import {useAxios} from "./useAxios.js";

export const users = ref([])

export const useUsers = () => {
    const axios = useAxios()

    const fetch = (params) => {
        axios.get('/api/users', { params })
            .then(response => {
                users.value = response.data.data
            })
    }

    const getMe = () => {
        return axios.get('/api/me')
    }

    return {
        fetch,
        getMe,
    }
}