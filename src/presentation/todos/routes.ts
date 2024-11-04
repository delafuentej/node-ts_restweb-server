import { Router } from "express";
import { TodosController } from './controller';
//* only the routes must be defined and their controller.
//* no business logic to implement



export class TodosRoutes {
    static get routes() : Router {
        const router = Router();

        const todosController = new TodosController();

        router.get('/', todosController.getTodos);
        router.get('/:id', todosController.getTodoById);
        router.post('/', todosController.createTodo);
        router.put('/:id', todosController.updateTodo);
        router.delete('/:id', todosController.deleteTodoById);

        return router;
    }
}