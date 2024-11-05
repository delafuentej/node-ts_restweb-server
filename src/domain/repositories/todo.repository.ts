import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoRepository {
    //allows to call methods found in the datasource
  // (as the repository is going to have the datasource), 
  abstract getAll(): Promise<TodoEntity[]>;

  abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;

  abstract findById(id: number): Promise<TodoEntity>;

  abstract updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>;

  abstract deleteById(id: number): Promise<TodoEntity>;
}