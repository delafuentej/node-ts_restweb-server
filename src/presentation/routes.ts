import { Router } from "express";
import { TodosController } from "./todos/controller";
import { TodosRoutes } from "./todos/routes";
//* only the routes must be defined and their controller.
//* no business logic to implement


export class AppRoutes {
    static get routes() : Router {
        const router = Router();

        //* middleware
        router.use('/api/todos', TodosRoutes.routes)
        return router;
    }
}