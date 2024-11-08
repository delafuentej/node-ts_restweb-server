//check that a prisma object is being exported
import { prisma } from "../../../src/data/postgres";
import { PrismaClient } from '@prisma/client';

describe('src/data/postgres  testing prisma', ()=>{

    test('should  an instance of prisma client',()=> {
        expect(prisma).toBeInstanceOf(PrismaClient);
    })


})