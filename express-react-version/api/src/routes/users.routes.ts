import Express from 'express';
import UsersController from '../controllers/users.controller';

const router = Express.Router();

//GET
router.get('/', UsersController.getAll);
router.get('/username/:username', UsersController.getByUsername);
router.get('/id/:id', UsersController.getById);

//POST
router.post('/register', UsersController.register);
router.post('/login', UsersController.login);

//PUT
router.put('/username/:username', UsersController.updateByUsername);
router.put('/id/:id', UsersController.updateById);

//DELETE
router.delete('/all', UsersController.deleteAll);
router.delete('/username/:username', UsersController.deleteByUsername);
router.delete('/id/:id', UsersController.deleteById);

export default router;
