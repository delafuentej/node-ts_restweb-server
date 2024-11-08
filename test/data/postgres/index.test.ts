//check that a prisma object is being exported
import { prisma } from "../../../src/data/postgres";
import { PrismaClient } from '@prisma/client';



describe('src/data/postgres  testing prisma', ()=>{

    jest.mock('@prisma/client testing prisma', () => {
        return {
          PrismaClient: jest.fn(() => ({})), // Mock of the instance
        };
      });

    test('should export an instance of prisma client',()=> {
        expect(prisma).toBeInstanceOf(PrismaClient);
    })


})