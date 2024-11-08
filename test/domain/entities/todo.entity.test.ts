import { TodoEntity } from "../../../src/domain/entities/todo.entity";

describe('testing TodoEntity', ()=> {

    test('should create a TodoEntity instance', ()=> {

        const newTodo =  new TodoEntity(200,'testing todo.entity')

        console.log(newTodo)
        expect(newTodo).toBeInstanceOf(TodoEntity);
        expect(newTodo.id).toBe(200);
        expect(newTodo.text).toBe('testing todo.entity');
        expect(newTodo.completedAt).toBe(null);
    });

    test('should create a TodoEntity instance from object', ()=> {

        const newTodo =  TodoEntity.fromObject({
            id:200,
            text: 'testing todo.entity'
        })

        console.log(newTodo)
        expect(newTodo).toBeInstanceOf(TodoEntity);
        expect(newTodo.id).toBe(200);
        expect(newTodo.text).toBe('testing todo.entity');
        expect(newTodo.completedAt).toBe(null);
    });


})