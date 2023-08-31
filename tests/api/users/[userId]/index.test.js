import handler from '../../../../pages/api/users/[userId]/index'
import {prismaMock} from '../../../../lib/singleton'
import {createRequest, createResponse} from "node-mocks-http";
import * as nextAuthReact from 'next-auth/react';

jest.mock('next-auth/react');
const nextAuthReactMocked = nextAuthReact

describe('/api/users/[userId]/', () => {
    const ownUserSession = {
        user: {
            name: 'usertest',
            email: 'user.test@mail.com',
            image: 'https://avatars.githubusercontent.com/u/54867968?v=4',
            id: 'testid'
        },
        expires: '2023-09-30T07:25:23.720Z',
        role: 'user'
    }
    const adminSession = {
        user: {
            name: 'otheruser',
            email: 'otheruser.test@mail.com',
            image: 'https://avatars.githubusercontent.com/u/54867968?v=4',
            id: 'otherid'
        },
        expires: '2023-09-30T07:25:23.720Z',
        role: 'admin'
    }
    const superadminSession = {
        user: {
            name: 'otheruser',
            email: 'otheruser.test@mail.com',
            image: 'https://avatars.githubusercontent.com/u/54867968?v=4',
            id: 'otherid'
        },
        expires: '2023-09-30T07:25:23.720Z',
        role: 'superadmin'
    }
    const unauthorizedSession = {
        user: {
            name: 'otheruser',
            email: 'otheruser.test@mail.com',
            image: 'https://avatars.githubusercontent.com/u/54867968?v=4',
            id: 'otherid'
        },
        expires: '2023-09-30T07:25:23.720Z',
        role: 'user'
    }

    nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return {data: null, status: 'loading'};
        }
    );
    it('returns a specific user', async () => {
        const req = createRequest({
            method: 'GET',
            url: "/users/[userId]/index"
        });
        const res = createResponse();

        jest.spyOn(prismaMock.user, 'findUnique').mockResolvedValue({id: 1, name: 'Alice'});
        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(200);
        expect(data).toEqual({id: 1, name: 'Alice'});
    })

    it('returns a 404 error if user is not found', async () => {
        const req = createRequest({
            method: 'GET',
            url: "/users/[userId]/index"
        });
        const res = createResponse();

        jest.spyOn(prismaMock.user, 'findUnique').mockResolvedValue(null);
        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(404);
        expect(data).toEqual({"message": "Not found"});
    })
    const updatedUser = {
        id: 'testid',
        name: 'usertest',
        email: 'user.test@mail.com',
        emailVerified: null,
        image: 'https://avatars.githubusercontent.com/u/54867968?v=4',
        description: 'efefzefrfgefgegergre',
        role: 'user',
        jobTitle: 'Développeur Python'
    }
    it('returns updated version of user if own profile', async () => {
        const req = createRequest(({
            method: 'PUT',
            url: "/user/[userId]/index",
            query: {
                userId: "testid"
            },
            body: {
                jobTitle: "Développeur web",
                description: "Créatif, réactif et disponible aujourd'hui !"
            }
        }))
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return ownUserSession;
        })

        jest.spyOn(prismaMock.user, 'update').mockResolvedValue(updatedUser);

        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(200);
        expect(data).toEqual({
            "message": "Successfully updated",
            "user": {
                id: 'testid',
                name: 'usertest',
                email: 'user.test@mail.com',
                emailVerified: null,
                image: 'https://avatars.githubusercontent.com/u/54867968?v=4',
                description: 'efefzefrfgefgegergre',
                role: 'user',
                jobTitle: 'Développeur Python'
            }
        })
    })
    it('returns updated version of user if not own profile and admin', async () => {
        const req = createRequest(({
            method: 'PUT',
            url: "/user/[userId]/index",
            query: {
                userId: "testid"
            },
            body: {
                jobTitle: "Développeur web",
                description: "Créatif, réactif et disponible aujourd'hui !"
            }
        }))
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return adminSession;
        })

        jest.spyOn(prismaMock.user, 'update').mockResolvedValue(updatedUser);

        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(200);
        expect(data).toEqual({
            "message": "Successfully updated",
            "user": {
                id: 'testid',
                name: 'usertest',
                email: 'user.test@mail.com',
                emailVerified: null,
                image: 'https://avatars.githubusercontent.com/u/54867968?v=4',
                description: 'efefzefrfgefgegergre',
                role: 'user',
                jobTitle: 'Développeur Python'
            }
        })
    })
    it('returns updated version of user if not own profile and superadmin', async () => {
        const req = createRequest(({
            method: 'PUT',
            url: "/user/[userId]/index",
            query: {
                userId: "testid"
            },
            body: {
                jobTitle: "Développeur web",
                description: "Créatif, réactif et disponible aujourd'hui !"
            }
        }))
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return superadminSession;
        })

        jest.spyOn(prismaMock.user, 'update').mockResolvedValue(updatedUser);

        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(200);
        expect(data).toEqual({
            "message": "Successfully updated",
            "user": {
                id: 'testid',
                name: 'usertest',
                email: 'user.test@mail.com',
                emailVerified: null,
                image: 'https://avatars.githubusercontent.com/u/54867968?v=4',
                description: 'efefzefrfgefgegergre',
                role: 'user',
                jobTitle: 'Développeur Python'
            }
        })
    })

    it('returns 404 error if prisma update failed', async () => {
        const req = createRequest(({
            method: 'PUT',
            url: "/user/[userId]/index",
            query: {
                userId: "testid"
            },
            body: {
                jobTitle: "Développeur web",
                description: "Créatif, réactif et disponible aujourd'hui !"
            }
        }))
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return ownUserSession;
        })

        jest.spyOn(prismaMock.user, 'update').mockResolvedValue(null);

        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(404);
        expect(data).toEqual({"message": "Not found"})
    })

    it('return 401 error if unauthorized', async () => {
        const req = createRequest(({
            method: 'PUT',
            url: "/user/[userId]/index",
            query: {
                userId: "testid"
            },
            body: {
                jobTitle: "Développeur web",
                description: "Créatif, réactif et disponible aujourd'hui !"
            }
        }))
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return unauthorizedSession;
        })

        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(401);
        expect(data).toEqual({"message": "Unauthorized"})
    })
    it('returns 501 error if HEAD method', async () => {
        const req = createRequest(({
            method: 'HEAD',
            url: "/user/[userId]/index",
        }))
        const res = createResponse();
        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(501);
        expect(data).toEqual({"message": "Not implemented"})
    })
    it('returns 501 error if POST method', async () => {
        const req = createRequest(({
            method: 'POST',
            url: "/user/[userId]/index",
        }))
        const res = createResponse();
        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(501);
        expect(data).toEqual({"message": "Not implemented"})
    })
    it('returns 501 error if DELETE method', async () => {
        const req = createRequest(({
            method: 'DELETE',
            url: "/user/[userId]/index",
        }))
        const res = createResponse();
        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(501);
        expect(data).toEqual({"message": "Not implemented"})
    })
    it('returns 501 error if PATCH method', async () => {
        const req = createRequest(({
            method: 'PATCH',
            url: "/user/[userId]/index",
        }))
        const res = createResponse();
        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(501);
        expect(data).toEqual({"message": "Not implemented"})
    })
})