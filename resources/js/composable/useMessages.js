import {useAxios} from "@/composable/useAxios.js";

export const useMessages = () => {
    const axios = useAxios()

    const create = (data) => {
        return axios.post('/api/messages', data);
    }

    return {
        create,
    }
}