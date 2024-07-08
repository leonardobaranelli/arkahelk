import Express from 'express';
import userRouter from './user.routes';
import connectorRouter from './connector.routes';

const mainRouter = Express.Router();

mainRouter.use('/users', userRouter);
mainRouter.use('/connectors', connectorRouter);

export default mainRouter;
