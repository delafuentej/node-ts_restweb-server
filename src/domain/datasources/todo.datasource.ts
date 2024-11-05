import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";


export abstract class TodoDatasource {
    //abstract => prevent creating a instance of the class
    // to enforce the behaviour of this class over other classes
    //methods(business rules for  datasource):
    // todo-pending getAll():  pagination!
    abstract getAll(): Promise<TodoEntity[]>;

    abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;

    abstract findById(id: number): Promise<TodoEntity>;

    abstract updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>;

    abstract deleteById(id: number): Promise<TodoEntity>;

}