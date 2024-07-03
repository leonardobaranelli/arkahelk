import Express from 'express';
import usersRouter from './users.routes';

const mainRouter = Express.Router();

mainRouter.use('/users', usersRouter);

export default mainRouter;
