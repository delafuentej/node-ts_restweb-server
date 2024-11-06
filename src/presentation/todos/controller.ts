import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { GetTodo, GetTodos, CreateTodo, UpdateTodo, DeleteTodo } from "../../domain/use-cases";
import { TodoRepository } from "../../domain";




export class TodosController {

    //* no static methods => DI
    //* DI => inject repository to be able to use use cases
    constructor(
        private readonly todoRepository: TodoRepository,
    ){}

    public getTodos = (req: Request, res: Response) => {
        new GetTodos(this.todoRepository)
        .execute()
        .then( todos => res.json(todos))
        .catch( error => res.status(400).json({error}))
    };

    public getTodoById = (req: Request, res: Response) => {
        const id = Number(req.params.id);

        new GetTodo(this.todoRepository)
        .execute(id)
        .then( todo => res.json(todo))
        .catch( error => res.status(400).json({error}))
        
    };


    public createTodo =  (req: Request, res: Response) => {
       
       const [error, createTodoDto] = CreateTodoDto.create(req.body);

       if(error) return res.status(400).json({error});

        new CreateTodo(this.todoRepository)
        .execute(createTodoDto!)
        .then( newTodo => res.status(201).json(newTodo))
        .catch( error => res.status(400).json({error}))
      
    };
    public updateTodo = (req: Request, res: Response) => {

        const id = Number(req.params.id);

        const [error, updateTodoDto] = UpdateTodoDto.create({
            ...req.body, id
        });
        if(error) return res.status(400).json({error});

        new UpdateTodo(this.todoRepository)
        .execute(updateTodoDto!)
        .then( updatedTodo => res.json(updatedTodo))
        .catch( error => res.status(400).json({error}))
    };

    public deleteTodoById = (req: Request, res: Response) => {
        const id = Number(req.params.id);
        if(isNaN(id)) return res.status(400).json({error: 'ID argument is not a number'});

        new DeleteTodo(this.todoRepository)
        .execute(id)
        .then( deletedTodo => res.json(deletedTodo))
        .catch( error => res.status(400).json({error}))
    }

}