import * as Router from "koa-router";
import TodosController from "./controllers/todos.controller";
import UserController from "./controllers/user.controller";

const router = new Router();

router.get("/todos", TodosController.getTodos);
router.get("/todo", TodosController.getTodo);
router.post("/todos", TodosController.postTodo);

router.get("/users", UserController.getUsers)
// router.post("/user/:username", (ctx) => UserController.loginUser(ctx,ctx.params));
router.get("/user/:username", (ctx) => UserController.loginUser(ctx,ctx.params));
router.post("/user", UserController.registerUser);

export default router;
