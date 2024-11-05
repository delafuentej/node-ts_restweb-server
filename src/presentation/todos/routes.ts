import { Router } from "express";
import { TodosController } from './controller';
import { TodoDatasourceImplementation, TodoRepositoryImplementation } from "../../infrastructure";

//* only the routes must be defined and their controller.
//* no business logic to implement



export class TodosRoutes {
    static get routes() : Router {
        const router = Router();

       const todoDatasource = new TodoDatasourceImplementation();
       const todoRepository = new TodoRepositoryImplementation(todoDatasource);
       
       const todosController = new TodosController(todoRepository);

        router.get('/', todosController.getTodos);
        router.get('/:id', todosController.getTodoById);
        router.post('/', todosController.createTodo);
        router.put('/:id', todosController.updateTodo);
        router.delete('/:id', todosController.deleteTodoById);

        return router;
    }
}