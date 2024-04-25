import axios from 'axios'

let globalAxiosInstance = null

export const useAxios = () => {
    const instance = globalAxiosInstance || axios.create({})

    return instance
}