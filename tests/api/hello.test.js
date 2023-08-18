import { createMocks, createRequest, createResponse } from 'node-mocks-http';
import handler from '../../pages/api/hello'

describe('API Tests', () => {
    it('should return "Hello, world!"', async () => {
        const req = createRequest({
            method: 'GET',
            url: '/ohello',
        });

        const res = createResponse();

        handler(req, res);

        const data = res._getJSONData();
        const statusCode = res.statusCode;

        expect(statusCode).toBe(200);
        expect(data).toEqual({ name: 'John Doe' });
    });
});