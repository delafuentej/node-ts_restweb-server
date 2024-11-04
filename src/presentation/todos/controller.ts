import { Request, Response } from "express";



export class TodosController {
    //* no static methods => DI
    //* DI => inject repository to be able to use use cases

    constructor(){}

    public getTodos = (req: Request, res: Response) => {
        return  res.json([
              {id: 1, text: 'Go running', createAt: new Date()},
              {id: 2, text: 'Go to work', createAt: new Date()},
              {id: 3, text: 'Go shopping', createAt: new Date()},
          ]);
        }
}