import * as Router from 'koa-router';
import TodosController from './controllers/todos.controller';
import UserController from './controllers/user.controller';

const router = new Router();

router.get('/todos', TodosController.getTodos);
router.get('/todo', TodosController.getTodo);
router.post('/todos', TodosController.postTodo);

router.post('/user', UserController.register);

export default router;
