import handler from '../../../pages/api/users/index'
import {prismaMock} from '../../../lib/singleton';
import {createRequest, createResponse} from 'node-mocks-http';

describe('/api/users/', () => {
    it('returns list of users', async () => {
        const req = createRequest({
            method: 'GET',
            url: "/users/index"
        });
        const res = createResponse();

        jest.spyOn(prismaMock.user, 'findMany').mockResolvedValue([
            {
                id: 'testid',
                name: 'usertest',
                email: 'user.test@mail.com',
                emailVerified: null,
                image: 'https://avatars.githubusercontent.com/u/54867968?v=4',
                description: 'efefzefrfgefgegergre',
                role: 'user',
                jobTitle: 'Développeur Python'
            },
            {
                id: 'otherid',
                name: 'otheruser',
                email: 'otheruser.test@mail.com',
                emailVerified: null,
                image: 'https://avatars.githubusercontent.com/u/54867968?v=4',
                description: 'ceci est une description',
                role: 'user',
                jobTitle: 'Développeur React'
            }
        ]);
        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(200);
        expect(data).toEqual([
            {
                id: 'testid',
                name: 'usertest',
                email: 'user.test@mail.com',
                emailVerified: null,
                image: 'https://avatars.githubusercontent.com/u/54867968?v=4',
                description: 'efefzefrfgefgegergre',
                role: 'user',
                jobTitle: 'Développeur Python'
            },
            {
                id: 'otherid',
                name: 'otheruser',
                email: 'otheruser.test@mail.com',
                emailVerified: null,
                image: 'https://avatars.githubusercontent.com/u/54867968?v=4',
                description: 'ceci est une description',
                role: 'user',
                jobTitle: 'Développeur React'
            }
        ]);

    });
});