import {useAxios} from "./useAxios.js";
import {ref} from "vue";

export const dashboard = ref()

export const useDashboard = () => {
  const axios = useAxios();

  const fetch = () => {
    return axios.get('/api/dashboard')
      .then(response => {
        dashboard.value = response.data.data
      })
  }

  return {
    fetch,
  }
}
