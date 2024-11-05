import { TodoRepository, TodoEntity, CreateTodoDto, UpdateTodoDto, TodoDatasource} from "../../domain";




export class TodoRepositoryImplementation implements TodoRepository {


    constructor(
        private readonly todoDataSource : TodoDatasource,
    ){}
     getAll(): Promise<TodoEntity[]>{
      return this.todoDataSource.getAll();
     }

     create(createTodoDto: CreateTodoDto): Promise<TodoEntity>{
        return this.todoDataSource.create(createTodoDto);
     }
  
     findById(id: number): Promise<TodoEntity>{
        return this.todoDataSource.findById(id);
     }
  
     updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>{
        return this.todoDataSource.updateById(updateTodoDto);
     }
  
     deleteById(id: number): Promise<TodoEntity>{
       return this.deleteById(id);
     }

}