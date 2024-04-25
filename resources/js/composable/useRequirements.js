import {ref} from "vue";
import {useAxios} from "./useAxios.js";
import {useMessage} from "naive-ui";

export const requirements = ref([])

export const useRequirements = () => {
    const axios = useAxios()
    const message = useMessage()

    const fetch = () => {
        axios.get('/api/requirements')
            .then(response => {
                requirements.value = response.data.data
            })
    }

    const create = (data) => {
        return axios.post('/api/requirements', data)
            .then((response) => {
                message.success('Требование успешно создано')

                return response
            })
            .catch((e) => {
                message.error('При создании требования произошла ошибка')

                throw e
            })
    }

    const edit = (id, data) => {
        return axios.put(`/api/requirements/${id}`, data)
            .then((response) => {
                message.success('Требование успешно изменено')

                return response
            })
            .catch((e) => {
                message.error('При изменении требования произошла ошибка')

                throw e
            })
    }

    const destroy = (id) => {
        return axios.delete(`/api/requirements/${id}`)
            .then(() => {
                message.success('Требование успешно удалено')
            })
            .catch((e) => {
                message.error('Произошла ошибка при удалении требования')

                throw e
            })
    }

    const fetchOne = (id) => {
        return axios.get(`/api/requirements/${id}`)
    }

    return {
        fetch,
        create,
        edit,
        fetchOne,
        destroy,
    }
}