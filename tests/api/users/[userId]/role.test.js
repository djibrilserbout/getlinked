import handler from '../../../../pages/api/users/[userId]/role'
import {prismaMock} from '../../../../lib/singleton'
import {createRequest, createResponse} from "node-mocks-http";
import * as nextAuthReact from 'next-auth/react';
import {
    superadminSession,
    unauthorizedSession,
    normalUser, adminUser
} from "../../../../lib/testVariables";

jest.mock('next-auth/react');
const nextAuthReactMocked = nextAuthReact

describe("/api/user/[userId]/role/", () => {
    nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return {data: null, status: 'loading'};
        }
    );
    it("[PUT] unauthorized", async () => {
        const req = createRequest({
            method: "PUT",
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return unauthorizedSession;
        })
        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(401);
        expect(data).toEqual({message: "Unauthorized"});
    })
    /*it("[PUT] unauthorized because same id", async () => {
        const req = createRequest({
            method: "PUT",
            query: {
                userId: "otheruer"
            }
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return superadminSession;
        })
        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(401);
        expect(data).toEqual({message: "Unauthorized"});
    })*/
    it("[PUT] superadmin grant user to admin", async () => {
        const req = createRequest({
            method: "PUT",
            query: {
                userId: "otheruser"
            },
            body: {
                action: "grant"
            }
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return superadminSession;
        })
        jest.spyOn(prismaMock.user, 'update').mockResolvedValue(adminUser);
        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(200);
        expect(data).toEqual({
            message: "Successfully updated",
            user: {
                id: 'admin',
                name: 'admin',
                email: 'admin@mail.com',
                emailVerified: null,
                image: 'https://avatars.githubusercontent.com/u/112714807?v=4',
                description: null,
                role: 'admin',
                jobTitle: null
            }
        });
    })
    it("[PUT] superadmin error on grant user to admin", async () => {
        const req = createRequest({
            method: "PUT",
            query: {
                userId: "otheruser"
            },
            body: {
                action: "grant"
            }
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return superadminSession;
        })
        jest.spyOn(prismaMock.user, 'update').mockResolvedValue(null);
        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(404);
        expect(data).toEqual({
            message: "Not found",
        });
    })
    it("[PUT] superadmin revoke admin to user", async () => {
        const req = createRequest({
            method: "PUT",
            query: {
                userId: "admin"
            },
            body: {
                action: "revoke"
            }
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return superadminSession;
        })
        jest.spyOn(prismaMock.user, 'update').mockResolvedValue(normalUser);
        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(200);
        expect(data).toEqual({
            message: "Successfully updated",
            user: {
                id: 'testid',
                name: 'usertest',
                email: 'user.test@mail.com',
                emailVerified: null,
                image: 'https://avatars.githubusercontent.com/u/112714807?v=4',
                description: null,
                role: 'user',
                jobTitle: null
            }
        });
    })
    it("[PUT] superadmin error on revoke user to admin", async () => {
        const req = createRequest({
            method: "PUT",
            query: {
                userId: "otheruser"
            },
            body: {
                action: "revoke"
            }
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return superadminSession;
        })
        jest.spyOn(prismaMock.user, 'update').mockResolvedValue(null);
        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(404);
        expect(data).toEqual({
            message: "Not found",
        });
    })
    it("[POST] returns 501", async () => {
        const req = createRequest({
            method: "POST",
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return superadminSession;
        })
        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(501);
        expect(data).toEqual({
            message: "Not implemented",
        });
    })
    it("[HEAD] returns 501", async () => {
        const req = createRequest({
            method: "HEAD",
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return superadminSession;
        })
        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(501);
        expect(data).toEqual({
            message: "Not implemented",
        });
    })
    it("[PATCH] returns 501", async () => {
        const req = createRequest({
            method: "PATCH",
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return superadminSession;
        })
        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(501);
        expect(data).toEqual({
            message: "Not implemented",
        });
    })
    it("[DELETE] returns 501", async () => {
        const req = createRequest({
            method: "DELETE",
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return superadminSession;
        })
        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(501);
        expect(data).toEqual({
            message: "Not implemented",
        });
    })
})