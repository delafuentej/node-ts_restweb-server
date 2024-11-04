import { Request, Response } from "express";

const todos = [
    {id: 1, text: 'Go running', completedAt: new Date()},
    {id: 2, text: 'Go to work', completedAt: null},
    {id: 3, text: 'Go shopping', completedAt: null},
]

export class TodosController {
    //* no static methods => DI
    //* DI => inject repository to be able to use use cases

    constructor(){}

    public getTodos = (req: Request, res: Response) => {
        return  res.json(todos);
    };

    public getTodoById = (req: Request, res: Response) => {
        
        const id = Number(req.params.id);
       
        if(isNaN(id)) return res.status(400).json({error: 'ID argument is not a number'})
        const todo = todos.find( todo => todo.id === id);

        (todo) ? res.json(todo) : res.status(404).json(`Todo with ${id} does not exists`);
       // return res.json( todos.map( todo => todo.id === id))
    };
    public createTodo =  (req: Request, res: Response) => {
        const {text} = req.body;
        if(!text) return res.status(400).json({error: 'Text property is required' })

        const newTodo = {
            id: todos.length + 1,
            text: text,
            completedAt: null
        }
        todos.push(newTodo);
        res.json(newTodo);
    };
    public updateTodo = (req: Request, res: Response) => {
        const id = Number(req.params.id);

        if(isNaN(id)) return res.status(400).json({error: 'ID argument is not a number'});

            
        const todo = todos.find( todo => todo.id === id);
        if(!todo) return res.status(404).json({error: `Todo with ${id} does not exists`});

        const { text, completedAt } = req.body;
       // if(!text) return res.status(400).json({error: 'Text property is required' });

       todo.text = text || todo.text; 
       (completedAt === 'null') ? 
       todo.completedAt = null : 
       todo.completedAt = new Date( completedAt ||  todo.completedAt);
       //! References
       /*
       todos.forEach( (todo, index) => {
            if(todo.id === id){
                todos[index] === todo;
            }
       }) 
            */
        res.json(todo);
           // (todo) ? res.json(todo) : res.status(404).json(`Todo with ${id} does not exists`) 
    }

    public deleteTodoById =  (req: Request, res: Response) => {
        const id = Number(req.params.id);
        if(isNaN(id)) return res.status(400).json({error: 'ID argument is not a number'});

        const todoIndex = todos.findIndex( todo => todo.id === id);
        if(todoIndex === -1 ) return res.status(404).json({error: `Todo with ${id} does not exists`});
       
         todos.filter(todo => todo.id !== id);

         const deletedTodo = todos.splice(todoIndex, 1)[0];

        return res.json({message: `Todo with ID:${id} was sucessful eliminated`})
    }

}