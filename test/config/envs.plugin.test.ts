import { envs } from "../../src/config/envs.plugin";

 describe('envs.plugin.ts testing envs', ()=> {

    test('should return env options', ()=> {
     
        expect(envs).toEqual({
            PORT: envs.PORT,
            PUBLIC_PATH: envs.PUBLIC_PATH
        })
    });

    test('should return an error if env not found', async()=> {
        jest.resetModules();
        process.env.PORT = 'ABCDEF';
     
        try{
            await import('../../src/config/envs.plugin');
            expect(true).toBe(false)

        }catch(error){
           // console.log(error)
           expect(`${error}`).toContain('"PORT" should be a valid integer')
        }
    })

 })