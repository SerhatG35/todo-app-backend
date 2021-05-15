import * as Router from 'koa-router';
import TodosController from './controllers/todos.controller';
import UserController from './controllers/user.controller';

const router = new Router();

router.get('/todos', TodosController.getTodos);
router.post('/todos', TodosController.postTodo);
router.delete('/todos/:id', TodosController.deleteTodo);

router.post('/login', UserController.loginUser);
router.post('/register', UserController.registerUser);

export default router;
