import {ref} from "vue";
import {useAxios} from "./useAxios.js";
import {useMessage} from "naive-ui";

export const developmentDirections = ref([])

export const useDevelopmentDirections = () => {
    const axios = useAxios()
    const message = useMessage()

    const fetch = () => {
        axios.get('/api/development-directions')
            .then(response => {
                developmentDirections.value = response.data.data
            })
    }

    const create = (data) => {
        return axios.post('/api/development-directions', data)
            .then((response) => {
                message.success('Вопрос успешно создан')

                return response
            })
            .catch((e) => {
                message.error('При создании вопроса произошла ошибка')

                throw e
            })
    }

    const edit = (id, data) => {
        return axios.put(`/api/development-directions/${id}`, data)
            .then((response) => {
                message.success('Вопрос успешно изменен')

                return response
            })
            .catch((e) => {
                message.error('При изменении вопроса произошла ошибка')

                throw e
            })
    }

    const destroy = (id) => {
        return axios.delete(`/api/development-directions/${id}`)
            .then(() => {
                message.success('Вопрос успешно удален')
            })
            .catch((e) => {
                message.error('Произошла ошибка при удалении вопроса')

                throw e
            })
    }

    const fetchOne = (id) => {
        return axios.get(`/api/development-directions/${id}`)
    }

    return {
        fetch,
        create,
        edit,
        fetchOne,
        destroy,
    }
}