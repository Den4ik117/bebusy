import {useAxios} from "./useAxios.js";
import {getErrorMessage} from "../utils/index.js";
import {useMessage} from "naive-ui";
import {ref} from "vue";

export const requests = ref([])

export const useRequests = () => {
  const axios = useAxios()
  const message = useMessage()

  const fetch = () => {
    axios.get('/api/requests')
      .then(response => {
        requests.value = response.data.data
      })
  }

  const fetchOne = (uuid) => {
    return axios.get(`/api/requests/${uuid}`)
  }

  const create = (data) => {
    return axios.post('/api/requests', data)
      .then(response => {
        message.success('Вы успешно оставили заявку на код-ревью, скоро с вами свяжутся')

        return response
      })
      .catch(e => {
        message.error(getErrorMessage(e))

        throw e
      })
  }

  const edit = (uuid, data) => {
    return axios.patch(`/api/requests/${uuid}`, data)
      .then((response) => {
        message.success('Заявка успешно изменена')

        return response
      })
      .catch((e) => {
        message.error('При изменении заявки произошла ошибка')

        throw e
      })
  }

  const destroy = (uuid) => {
    return axios.delete(`/api/requests/${uuid}`)
      .then(() => {
        message.success('Заявление успешно удалено')
      })
      .catch((e) => {
        message.error('Произошла ошибка при удалении заявления')

        throw e
      })
  }

  return {
    fetch,
    fetchOne,
    create,
    edit,
    destroy,
  }
}
