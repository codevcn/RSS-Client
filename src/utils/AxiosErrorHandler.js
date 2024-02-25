import { isAxiosError } from 'axios'

class HttpRequestErrorHandler {
    handleAxiosError(error) {
        if (isAxiosError(error)) {
            const response_of_error = error.response
        }
    }
}

export const httpRequestErrorHandler = new HttpRequestErrorHandler()
