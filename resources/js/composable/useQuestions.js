import {ref} from "vue";
import {useAxios} from "./useAxios.js";
import {useMessage} from "naive-ui";

export const questions = ref([])

export const useQuestions = () => {
    const axios = useAxios()
    const message = useMessage()

    const fetch = () => {
        axios.get('/api/questions')
            .then(response => {
                questions.value = response.data.data
            })
    }

    const create = (data) => {
        return axios.post('/api/questions', data)
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
        return axios.put(`/api/questions/${id}`, data)
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
        return axios.delete(`/api/questions/${id}`)
            .then(() => {
                message.success('Вопрос успешно удален')
            })
            .catch((e) => {
                message.error('Произошла ошибка при удалении вопроса')

                throw e
            })
    }

    const fetchOne = (id) => {
        return axios.get(`/api/questions/${id}`)
    }

    return {
        fetch,
        create,
        edit,
        fetchOne,
        destroy,
    }
}