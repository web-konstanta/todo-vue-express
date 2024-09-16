export default class HttpErrorException extends Error {
    public message: string
    public status: number
    public errors: Array<any>

    constructor(message: string, status: number, errors: Array<any> = []) {
        super(message)
        this.message = message
        this.status = status
        this.errors = errors
    }

    public static validationError(errors: Array<any>): HttpErrorException {
        return new HttpErrorException('Validation error', 422, errors)
    }

    public static badRequest(message: string, status: number): HttpErrorException {
        return new HttpErrorException(message, status)
    }

    public static unauthorized(): HttpErrorException {
        return new HttpErrorException('Unauthorized', 401)
    }
}