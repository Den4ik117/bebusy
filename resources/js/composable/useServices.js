import {ref} from "vue";
import {useAxios} from "./useAxios.js";
import {useMessage} from "naive-ui";

export const services = ref([])

export const useServices = () => {
    const axios = useAxios()
    const message = useMessage()

    const fetch = () => {
        axios.get('/api/services')
            .then(response => {
                services.value = response.data.data
            })
    }

    const create = (data) => {
        return axios.post('/api/services', data)
            .then((response) => {
                message.success('Ментор успешно создан')

                return response
            })
            .catch(() => {
                message.error('При создании ментора произошла ошибка')
            })
    }

    const edit = (id, data) => {
        return axios.put(`/api/services/${id}`, data)
            .then((response) => {
                message.success('Ментор успешно изменен')

                return response
            })
            .catch(() => {
                message.error('При изменении ментора произошла ошибка')
            })
    }

    const destroy = (id) => {
        return axios.delete(`/api/services/${id}`)
            .then(() => {
                message.success('Ментор успешно удален')
            })
            .catch(() => {
                message.error('Произошла ошибка при удалении ментора')
            })
    }

    const fetchOne = (id) => {
        return axios.get(`/api/services/${id}`)
    }

    return {
        fetch,
        create,
        edit,
        fetchOne,
        destroy,
    }
}