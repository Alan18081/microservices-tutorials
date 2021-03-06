import { Request, Response, NextFunction } from 'express';
import {RequestValidationError} from '../errors/request-validation-error';
import {DatabaseConnectionError} from '../errors/database-connection-error';
import {CustomError} from '../errors/custom-error';

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.log('Something went wrong', err);

    if (err instanceof RequestValidationError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    if (err instanceof DatabaseConnectionError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    res.status(400).send({ errors: [{ message: 'Something went wrong' }] });
};