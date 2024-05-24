import {ref} from "vue";
import {useAxios} from "./useAxios.js";
import {useMessage} from "naive-ui";

export const skills = ref([])

export const useSkills = () => {
    const axios = useAxios()
    const message = useMessage()

    const fetch = () => {
        axios.get('/api/skills')
            .then(response => {
                skills.value = response.data.data
            })
    }

    const create = (data) => {
        return axios.post('/api/skills', data)
            .then((response) => {
                message.success('Ментор успешно создан')

                return response
            })
            .catch(() => {
                message.error('При создании ментора произошла ошибка')
            })
    }

    const edit = (id, data) => {
        return axios.put(`/api/skills/${id}`, data)
            .then((response) => {
                message.success('Ментор успешно изменен')

                return response
            })
            .catch(() => {
                message.error('При изменении ментора произошла ошибка')
            })
    }

    const destroy = (id) => {
        return axios.delete(`/api/skills/${id}`)
            .then(() => {
                message.success('Ментор успешно удален')
            })
            .catch(() => {
                message.error('Произошла ошибка при удалении ментора')
            })
    }

    const fetchOne = (id) => {
        return axios.get(`/api/skills/${id}`)
    }

    return {
        fetch,
        create,
        edit,
        fetchOne,
        destroy,
    }
}