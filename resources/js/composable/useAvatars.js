import {useAxios} from "./useAxios.js";

export const useAvatars = () => {
  const axios = useAxios()

  const upload = (file) => {
    const form = new FormData()
    form.append('file', file)

    return axios.post("/api/avatars", form)
  }

  return {
    upload,
  }
}
