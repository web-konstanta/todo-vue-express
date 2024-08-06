export default class HttpErrorHandler extends Error {
    constructor(status, message, errors = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static badRequest(status, message, errors) {
        return new HttpErrorHandler(status, message, errors)
    }

    static unauthorized() {
        return new HttpErrorHandler(403, 'Unauthorized')
    }
}