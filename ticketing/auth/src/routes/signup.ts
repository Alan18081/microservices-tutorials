import express, {NextFunction, Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import {RequestValidationError} from '../errors/request-validation-error';

const router = express.Router();

router.post('/api/users/signup',
    [
        body('email').isEmail().withMessage('Email must be provided'),
        body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters')
    ],
    (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        next(new RequestValidationError(errors.array()));
    }

    const { email, password } = req.body;
    console.log('Creating user...');
    res.send({});
});

export { router as signupRouter };