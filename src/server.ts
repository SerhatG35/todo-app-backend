import * as Router from "koa-router";
import TodosController from "./controllers/todos.controller";
import UserController from "./controllers/user.controller";

const router = new Router();


router.get("/todos", TodosController.getTodos);
router.post("/todos", TodosController.postTodo);

router.get("/users" ,UserController.getUsers)
router.post("/user/:username", UserController.loginUser);
router.post("/user", UserController.registerUser);

export default router;
