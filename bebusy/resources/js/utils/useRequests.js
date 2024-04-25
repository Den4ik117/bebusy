import axios from "axios";
import {getErrorMessage} from "@/utils/index";
import {useMessage} from "naive-ui";

export const RequestType = {
    FindMentor: 'FIND_MENTOR',
    BecomeMentor: 'BECOME_MENTOR',
    RequestCodeReview: 'REQUEST_CODE_REVIEW',
    IndividualInterview: 'INDIVIDUAL_INTERVIEW',
    GroupInterview: 'GROUP_INTERVIEW',
}

export const useRequests = () => {
    const message = useMessage()

    const storeRequest = (form) => {
        return axios.post('/api/requests', form)
            .then(data => {
                message.success('Заявка успешно создана')

                return data
            })
            .catch(e => {
                message.error(getErrorMessage(e))

                throw e
            })
    }

    return {
        storeRequest,
    }
}