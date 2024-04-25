import {ref} from "vue";
import {useAxios} from "./useAxios.js";
import {getErrorMessage} from "@/utils/index.js";
import {useMessage} from "naive-ui";

export const users = ref([])
export const me = ref()

export const useUsers = () => {
    const axios = useAxios()
    const message = useMessage()

    const fetch = (params) => {
        axios.get('/api/users', { params })
            .then(response => {
                users.value = response.data.data
            })
    }

    const fetchOne = (id) => {
        return axios.get(`/api/users/${id}`)
    }

    const getMe = () => {
        return axios.get('/api/me')
            .then(response => {
                me.value = response.data.data

                return response
            })
    }

    const updateMe = (data) => {
        axios.patch('/api/me', data)
            .then(response => {
                me.value = response.data.data

                message.success('Информация о пользователе успешно обновлена')
            })
            .catch(e => {
                message.error(getErrorMessage(e))
            })
    }

    const create = (data) => {
        return axios.post('/api/users', data)
            .then((response) => {
                message.success('Пользователь успешно создан')

                return response
            })
            .catch(e => {
                message.error(getErrorMessage(e))

                throw e
            })
    }

    const update = (id, data) => {
        return axios.put(`/api/users/${id}`, data)
            .then(response => {
                message.success('Информация о пользователе успешно обновлена')

                return response
            })
            .catch(e => {
                message.error(getErrorMessage(e))

                throw e
            })
    }

    const destroy = (id) => {
        return axios.delete(`/api/users/${id}`)
            .then(() => {
                message.success('Пользователь успешно удален')
            })
            .catch((e) => {
                message.error(getErrorMessage(e))

                throw e
            })
    }

    return {
        fetch,
        fetchOne,
        getMe,
        updateMe,
        create,
        update,
        destroy,
    }
}