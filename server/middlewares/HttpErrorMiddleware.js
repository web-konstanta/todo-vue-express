import HttpErrorHandler from '../exceptions/HttpErrorHandler.js'

export default (err, req, res, next) => {
    try {
        if (err instanceof HttpErrorHandler) {
            return res.status(err.status).json({
                message: err.message,
                errors: err.errors
            })
        }

        return res.status(400).json({message: 'Unprocessable error'})
    } catch (e) {
        next(e)
    }
}