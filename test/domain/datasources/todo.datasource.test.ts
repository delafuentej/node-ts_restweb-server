import { TodoDatasource } from '../../../src/domain/datasources/todo.datasource';
import { TodoEntity } from '../../../src/domain/entities/todo.entity';
import { CreateTodoDto, UpdateTodoDto } from '../../../src/domain/dtos';



describe('todo.datasource.ts: testing TodoDatasource', ()=> {

    const newTodo =  new TodoEntity(1, 'testing');

   
    class MockTodoDatasource implements TodoDatasource{

        async getAll(): Promise<TodoEntity[]>{
            return [newTodo];
         }

        async create(createTodoDto: CreateTodoDto): Promise<TodoEntity>{
           return newTodo;
        }
    
        async findById(id: number): Promise<TodoEntity>{
            return newTodo;
        }
    
         async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>{
           return newTodo
         }
    
         async deleteById(id: number): Promise<TodoEntity>{
            return newTodo;
         }
    }


    test('should test the abstract class', async()=>{
        const mockTodoDatasource = new MockTodoDatasource();

        expect(mockTodoDatasource).toBeInstanceOf(MockTodoDatasource);
        // expect(mockTodoDatasource).toHaveProperty('getAll');
        // expect(mockTodoDatasource).toHaveProperty('create');
        // expect(mockTodoDatasource).toHaveProperty('findById');
        // expect(mockTodoDatasource).toHaveProperty('updateById');
        // expect(mockTodoDatasource).toHaveProperty('deleteById');

        expect(typeof mockTodoDatasource.getAll).toBe('function');
        expect(typeof mockTodoDatasource.create).toBe('function');
        expect(typeof mockTodoDatasource.findById).toBe('function');
        expect(typeof mockTodoDatasource.updateById).toBe('function');
        expect(typeof mockTodoDatasource.deleteById).toBe('function');

        const todos = await mockTodoDatasource.getAll();
       const createdTodo = await mockTodoDatasource.create(newTodo);
       const foundTodo = await mockTodoDatasource.findById(newTodo.id);
       const deletedTodo =await mockTodoDatasource.deleteById(newTodo.id)
        //await mockTodoDatasource.updateById(newTodo.id.)
        expect(todos).toHaveLength(1);
        expect(createdTodo).toBeInstanceOf(TodoEntity);
        expect(foundTodo).toBeInstanceOf(TodoEntity);
        expect(deletedTodo).toBeInstanceOf(TodoEntity);


    })
})