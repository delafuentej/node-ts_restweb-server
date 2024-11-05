import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";


// const todos = [
//     {id: 1, text: 'Go running', completedAt: new Date()},
//     {id: 2, text: 'Go to work', completedAt: null},
//     {id: 3, text: 'Go shopping', completedAt: null},
// ]

export class TodosController {
    //* no static methods => DI
    //* DI => inject repository to be able to use use cases

    constructor(){}

    public getTodos = async(req: Request, res: Response) => {
        const todos = await prisma.todo.findMany();
        return res.json(todos);
    };

    public getTodoById = async(req: Request, res: Response) => {
        
        const id = Number(req.params.id);
       
        if(isNaN(id)) return res.status(400).json({error: 'ID argument is not a number'})
       // const todo = todos.find( todo => todo.id === id);
        const todo = await prisma.todo.findFirst({
            where: {id}
        });

       (todo) ? res.json(todo) : res.status(404).json(`Todo with ${id} does not exists`);
       
    };

    public createTodo =  async(req: Request, res: Response) => {
       // const {text} = req.body;
       //const createTodoDto = CreateTodoDto.create(req.body);
       const [error, createTodoDto] = CreateTodoDto.create(req.body);

       if(error) return res.status(400).json({error});

      //  if(!text) return res.status(400).json({error: 'Text property is required' });

       const newTodo = await prisma.todo.create({
            data: createTodoDto!,
        });

        res.json(newTodo);



        // const newTodo = {
        //     id: todos.length + 1,
        //     text: text,
        //     completedAt: null
        // }
        //   todos.push(newTodo);
          
    };
    public updateTodo = async(req: Request, res: Response) => {
        const id = Number(req.params.id);

       // if(isNaN(id)) return res.status(400).json({error: 'ID argument is not a number'});
        const [error, updateTodoDto] = UpdateTodoDto.create({
            ...req.body, id
        });
        if(error) return res.status(400).json({error});

            
        const todo = await prisma.todo.findFirst({
            where: {id}
        });
     //   const todo = todos.find( todo => todo.id === id);
       if(!todo) return res.status(404).json({error: `Todo with ${id} does not exists`});

       // const { text, completedAt } = req.body;

        const updatedTodo = await prisma.todo.update({
            where: {id},
            data: updateTodoDto!.values,
        });

        res.json(updatedTodo);
       // if(!text) return res.status(400).json({error: 'Text property is required' });
      /*
       todo.text = text || todo.text; 
       (completedAt === 'null') ? 
      todo.completedAt = null : 
      todo.completedAt = new Date( completedAt ||  todo.completedAt);
      +/
       //! References
       /*
       todos.forEach( (todo, index) => {
            if(todo.id === id){
                todos[index] === todo;
            }
       }) 
            */
       
           // (todo) ? res.json(todo) : res.status(404).json(`Todo with ${id} does not exists`) 
    }

    public deleteTodoById =  async(req: Request, res: Response) => {
        const id = Number(req.params.id);
        if(isNaN(id)) return res.status(400).json({error: 'ID argument is not a number'});

        const todo = await prisma.todo.findFirst({
            where: {id}
        });
        if(!todo) return res.status(404).json({error: `Todo with ${id} does not exists`});

        const deletedTodo = await prisma.todo.delete({
            where: {id}
        });
        
        (deletedTodo) ? res.json(deletedTodo) : res.status(400).json({error: `Todo with ID:${id} not eliminated`})

        // const todoIndex = todos.findIndex( todo => todo.id === id);
        // if(todoIndex === -1 ) return res.status(404).json({error: `Todo with ${id} does not exists`});
       
        //  todos.filter(todo => todo.id !== id);

        //  const deletedTodo = todos.splice(todoIndex, 1)[0];

        //res.json({message: `Todo with ID:${id} was successful eliminated`})
    }

}