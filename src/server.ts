import * as Router from 'koa-router';
import TodosController from './controllers/todos.controller';
import UserController from './controllers/user.controller';

const router = new Router();

router.get('/todos', TodosController.getCards);
router.post('/todos', TodosController.updateCards);
router.delete('/todos/:id', TodosController.deleteCards);

router.post('/login', UserController.loginUser);
router.post('/register', UserController.registerUser);

export default router;
