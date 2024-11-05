import { TodoDatasource, TodoEntity, CreateTodoDto, UpdateTodoDto } from "../../domain";
import { prisma } from "../../data/postgres";

export class TodoDatasourceImplementation implements TodoDatasource {

    async getAll(): Promise<TodoEntity[]>{
        const todos = await prisma.todo.findMany();
        return todos.map(TodoEntity.fromObject);
    }

    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity>{
        const newTodo = await prisma.todo.create({
            data: createTodoDto!,
        });

        return TodoEntity.fromObject(newTodo);
    }

    async findById(id: number): Promise<TodoEntity>{
        const todo = await prisma.todo.findFirst({
            where: {id}
        });

        if(!todo) throw `Todo with Id:${id} not fount`
        return TodoEntity.fromObject(todo);
    }

    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>{
       await this.findById(updateTodoDto.id);

       const updatedTodo = await prisma.todo.update({
        where: {id: updateTodoDto.id},
        data: updateTodoDto!.values,
    });

        return TodoEntity.fromObject(updatedTodo);
    }

    async deleteById(id: number): Promise<TodoEntity>{
        
        await this.findById(id);
     
        const deletedTodo = await prisma.todo.delete({
            where: {id}
        });

        return TodoEntity.fromObject(deletedTodo);


    }

}