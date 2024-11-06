import request from 'supertest';
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres';

describe('routes.ts AppRoutes', ()=> {

    beforeAll(async()=> {
       await  testServer.start();
    });
    beforeEach(async()=> {
        await prisma.todo.deleteMany();
    })
    afterEach(async()=> {
        await prisma.todo.deleteMany();
    })

    afterAll(()=> {
        testServer.close();

    })
 

    const todo1 = { text: "test-todo1" };
    const todo2 = { text: "test-todo2" };

    test('should return TODOs ', async()=> {

       
        await prisma.todo.createMany({
            data: [todo1, todo2]
        })

        const { body } = await request(testServer.app)
        .get('/api/todos')
        .expect(200);

        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBe(2);
        expect(body[0].text).toBe(todo1.text);
        expect(body[1].text).toBe(todo2.text);
        expect(body[0].completedAt).toBeNull();
        expect(body[1].completedAt).toBeNull();
    })

    test('should return a todo api/todos/:id', async()=> {

        const todo = await prisma.todo.create({
            data: todo1
        })

        const {body}  = await request(testServer.app)
        .get(`/api/todos/${todo.id}`)
        .expect(200)
        
      
        expect(body).toEqual({
            id: todo.id,
            text: todo.text,
            completedAt: todo.completedAt,
        })

    });

    test('should return a 404-NotFound api/todos/:id ', async()=> {
        const todoId =123

        const {body}  = await request(testServer.app)
        .get(`/api/todos/${todoId}`)
        .expect(400)

       expect(body).toEqual({ error: `Todo with Id:${todoId} not fount` });
    });

    test('should return a new todo api/todos', async()=> {

        const {body}  = await request(testServer.app)
        .post(`/api/todos`)
        .send(todo1)
        .expect(201)

       expect(body).toEqual({
        id: expect.any(Number),
        text:todo1.text,
        completedAt: null,
        
       });

    })

    test('should return an error if text does not exists - new todo api/todos', async()=> {

        const {body}  = await request(testServer.app)
        .post(`/api/todos`)
        .send({})
        .expect(400)

        expect(body).toEqual({ error: 'Text property is required' } );
        
    });


    test('should return an error if text is empty- new todo api/todos', async()=> {

        const {body}  = await request(testServer.app)
        .post(`/api/todos`)
        .send({ text: ''})
        .expect(400)

        expect(body).toEqual({ error: 'Text property is required' } );
        
    });

    test('should return an updated todo  api/todo/:id', async()=> {

        const todo = await prisma.todo.create({
            data: todo1
        })


        const {body}  = await request(testServer.app)
        .put(`/api/todos/${todo.id}`)
        .send({ text: 'updated-todo1', completedAt: '2024-11-06'})
        .expect(200)

        
        expect(body).toEqual({
            id: expect.any(Number),
            text: 'updated-todo1',
            completedAt: '2024-11-06T00:00:00.000Z'
        });
        
    });

    test('should return a 404-NotFound UPDATED TODO api/todos/:id ', async()=> {
        const todoId =999

        const {body}  = await request(testServer.app)
        .put(`/api/todos/${todoId}`)
        .expect(400)

       
       expect(body).toEqual({ error: `Todo with Id:${todoId} not fount` });
    });

    test('should return an updated  todo -ONLY DATE- api/todos/:id ', async()=> {
    
        
        const todo = await prisma.todo.create({
            data: todo1
        })

        const {body}  = await request(testServer.app)
        .put(`/api/todos/${todo.id}`)
        .send({ completedAt: '2024-11-06'})
        .expect(200)

        expect(body).toEqual({
            id: expect.any(Number),
            text: todo.text,
            completedAt: '2024-11-06T00:00:00.000Z'
        });
       
    });

    test('should return an updated  todo -ONLY TEXT- api/todos/:id ', async()=> {
        
        const todo = await prisma.todo.create({
            data: todo1
        })

        const {body}  = await request(testServer.app)
        .put(`/api/todos/${todo.id}`)
        .send({ text:'updated-text-todo1'})
        .expect(200)

        expect(body).toEqual({
            id:todo.id,
            text: 'updated-text-todo1',
            completedAt: null,
        });
       
    });

    test('should delete a todo api/todos/:id', async()=> {

        const todo = await prisma.todo.create({
            data: todo1
        });

        const {body}  = await request(testServer.app)
        .delete(`/api/todos/${todo.id}`)
        .expect(200)

       expect(body).toEqual({
        id: todo.id,
        text: todo.text,
        completedAt: todo.completedAt,
       })

    });

    test('should return a 404-NotFound if todo does not exists - DELATED TODO api/todos/:id', async()=> {

       const todoId= 999;

        const {body}  = await request(testServer.app)
        .delete(`/api/todos/${todoId}`)
        .expect(400)

       
        expect(body).toEqual({ error: `Todo with Id:${todoId} not fount` });

    });




})
