import {CustomError} from './custom-error';

export class NotFoundError extends CustomError {
    statusCode = 400;

    serializeErrors(): Array<{ message: string; field?: string }> {
        return [{ message: 'Page not found' }];
    }
}