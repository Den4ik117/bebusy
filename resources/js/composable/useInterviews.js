import {ref} from "vue";
import {useAxios} from "./useAxios.js";
import {useMessage} from "naive-ui";

export const interviews = ref([])

export const useInterviews = () => {
    const axios = useAxios()
    const message = useMessage()

    const fetch = () => {
        axios.get('/api/interviews')
            .then(response => {
                interviews.value = response.data.data
            })
    }

    const create = (data) => {
        return axios.post('/api/interviews', data)
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
        return axios.put(`/api/interviews/${id}`, data)
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
        return axios.delete(`/api/interviews/${id}`)
            .then(() => {
                message.success('Собеседование успешно удалено')
            })
            .catch((e) => {
                message.error('Произошла ошибка при удалении собеседования')

                throw e
            })
    }

    const fetchOne = (id) => {
        return axios.get(`/api/interviews/${id}`)
    }

    return {
        fetch,
        create,
        edit,
        fetchOne,
        destroy,
    }
}