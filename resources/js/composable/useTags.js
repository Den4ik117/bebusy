import {ref} from "vue";
import {useAxios} from "./useAxios.js";
import {useMessage} from "naive-ui";

export const tags = ref([])

export const useTags = () => {
    const axios = useAxios()
    const message = useMessage()

    const fetch = () => {
        axios.get('/api/tags')
            .then(response => {
                tags.value = response.data.data
            })
    }

    const create = (data) => {
        return axios.post('/api/tags', data)
            .then((response) => {
                message.success('Собеседование успешно создано')

                return response
            })
            .catch((e) => {
                message.error('При создании собеседования произошла ошибка')

                throw e
            })
    }

    const edit = (id, data) => {
        return axios.put(`/api/tags/${id}`, data)
            .then((response) => {
                message.success('Собеседование успешно изменено')

                return response
            })
            .catch((e) => {
                message.error('При изменении собеседования произошла ошибка')

                throw e
            })
    }

    const destroy = (id) => {
        return axios.delete(`/api/tags/${id}`)
            .then(() => {
                message.success('Собеседование успешно удалено')
            })
            .catch((e) => {
                message.error('Произошла ошибка при удалении собеседования')

                throw e
            })
    }

    const fetchOne = (id) => {
        return axios.get(`/api/tags/${id}`)
    }

    return {
        fetch,
        create,
        edit,
        fetchOne,
        destroy,
    }
}