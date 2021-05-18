import * as Router from 'koa-router';
import CardsController from './controllers/cards.controller';
import TodosController from './controllers/todos.controller';
import UserController from './controllers/user.controller';

const router = new Router();

router.get('/cards', CardsController.getCards);
router.post('/cards', CardsController.updateCards);
router.delete('/cards/:title', CardsController.deleteCards);

router.delete('/todos/:title/:todo', TodosController.deleteTodo);

router.post('/login', UserController.loginUser);
router.post('/register', UserController.registerUser);

export default router;
