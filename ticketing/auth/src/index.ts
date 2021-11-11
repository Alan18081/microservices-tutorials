import express, {NextFunction} from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import {NotFoundError} from './errors/not-found-error';
import mongoose from 'mongoose';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all('*', (req, res, next: NextFunction) => {
    next(new NotFoundError());
})

app.use(errorHandler);

const start = async () => {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    app.listen(3000, () => console.log('Auth service is listening on port 3000'));
}

start();
