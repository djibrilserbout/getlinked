import handler from '../../../pages/api/users/index'
import { prismaMock } from '../../../lib/singleton'
import prisma from "../../../lib/prisma";
import { createMocks, createRequest, createResponse } from 'node-mocks-http';
/*
test('should select all users ', async () => {
    const user = {
        id: 1,
        name: 'Rich',
        email: 'hello@prisma.io',
        acceptTermsAndConditions: true,
    }

    prismaMock.user.findMany.mockResolvedValue()

    await expect(handler()).resolves.toEqual({
        id: 1,
        name: 'Rich',
        email: 'hello@prisma.io',
        acceptTermsAndConditions: true,
    })
})*/
/*
*/
describe('/api/[animal]', () => {
    it('returns a message with the specified animal', async () => {
        const req = createRequest({
            method: 'GET',
            url: "/users/index"
        });
        const res = createResponse();


        jest.spyOn(prismaMock.user, 'findMany').mockResolvedValue([{ id: 1, name: 'Alice' }]);
        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(200);
        expect(data).toEqual([{ id: 1, name: 'Alice' }]);

    });


});

describe('/api/[animal]', () => {
    it('returns a message with the specified animal', async () => {
        const req = createRequest({
            method: 'GET',
            url: "/users/index"
        });
        const res = createResponse();


        jest.spyOn(prismaMock.user, 'findMany').mockResolvedValue([{ id: 1, name: 'Alice' }]);
        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(200);
        expect(data).toEqual([{ id: 1, name: 'Alice' }]);

    });


});