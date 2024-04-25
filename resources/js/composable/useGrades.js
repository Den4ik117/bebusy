import {ref} from "vue";
import {useAxios} from "./useAxios.js";
import {useMessage} from "naive-ui";

export const grades = ref([])

export const useGrades = () => {
    const axios = useAxios()
    const message = useMessage()

    const fetch = () => {
        axios.get('/api/grades')
            .then(response => {
                grades.value = response.data.data
            })
    }

    const create = (data) => {
        return axios.post('/api/grades', data)
            .then((response) => {
                message.success('Ментор успешно создан')

                return response
            })
            .catch(() => {
                message.error('При создании ментора произошла ошибка')
            })
    }

    const edit = (id, data) => {
        return axios.put(`/api/grades/${id}`, data)
            .then((response) => {
                message.success('Ментор успешно изменен')

                return response
            })
            .catch(() => {
                message.error('При изменении ментора произошла ошибка')
            })
    }

    const destroy = (id) => {
        return axios.delete(`/api/grades/${id}`)
            .then(() => {
                message.success('Ментор успешно удален')
            })
            .catch(() => {
                message.error('Произошла ошибка при удалении ментора')
            })
    }

    const fetchOne = (id) => {
        return axios.get(`/api/grades/${id}`)
    }

    return {
        fetch,
        create,
        edit,
        fetchOne,
        destroy,
    }
}