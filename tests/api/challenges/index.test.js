import handler from '../../../pages/api/challenges/index'
import {prismaMock} from '../../../lib/singleton'
import {createRequest, createResponse} from "node-mocks-http";
import * as nextAuthReact from 'next-auth/react';
import {
    superadminSession,
    adminSession,
    unauthorizedSession,
    challengeOne,
    challengeTwo
} from "../../../lib/testVariables";

jest.mock('next-auth/react');
const nextAuthReactMocked = nextAuthReact

describe("/api/challenges/", () => {
    nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return {data: null, status: 'loading'};
        }
    );
    it("[GET] returns list of challenge", async () => {
        const req = createRequest({
            method: "GET"
        });
        const res = createResponse();
        jest.spyOn(prismaMock.challenge, "findMany").mockResolvedValue([challengeOne, challengeTwo])
        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(200);
        expect(data).toEqual([
            {
                id: "challengeone",
                name: "Faire une calculatrice en JS"
            },
            {
                id: "challengetwo",
                name: "Faire un site e-commerce de A à Z"
            }
        ]);
    })
    it('[GET] returns 404 error', async () => {
        const req = createRequest({
            method: 'GET',
        });
        const res = createResponse();
        jest.spyOn(prismaMock.challenge, 'findMany').mockRejectedValue(new Error("error"));

        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(404);
        expect(data).toEqual({message: "error"});
    })
    it('[POST] unauthorized user', async () => {
        const req = createRequest({
            method: 'POST',
        });
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
    it('[POST] returns new challenge if admin', async () => {
        const req = createRequest({
            method: 'POST',
            query: {
            },
            body: {
                name: "Faire une calculatrice en JS",
            }
        });
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return adminSession;
        })
        jest.spyOn(prismaMock.challenge, 'create').mockResolvedValue(challengeOne);

        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(201);
        expect(data).toEqual({
            message: "Created Successfully!", challenge: {
                id: 'challengeone',
                name: "Faire une calculatrice en JS",
            }
        })
    })
    it('[POST] returns new challenge if superadmin', async () => {
        const req = createRequest({
            method: 'POST',
            query: {
            },
            body: {
                name: "Faire une calculatrice en JS",
            }
        });
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return superadminSession;
        })
        jest.spyOn(prismaMock.challenge, 'create').mockResolvedValue(challengeOne);

        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(201);
        expect(data).toEqual({
            message: "Created Successfully!", challenge: {
                id: 'challengeone',
                name: "Faire une calculatrice en JS",
            }
        })
    })
    it('[POST] returns 404 error no name passed', async () => {
        const req = createRequest({
            method: 'POST',
            query: {

            },
            body: {
            }
        });
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return adminSession;
        })
        jest.spyOn(prismaMock.challenge, 'create').mockResolvedValue(null);

        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(404);
        expect(data).toEqual({message: "Error"})
    })
    it('[POST] returns 404 error catch error', async () => {
        const req = createRequest({
            method: 'POST',
            query: {
            },
            body: {
            }
        });
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return adminSession;
        })
        jest.spyOn(prismaMock.challenge, 'create').mockRejectedValue(new Error("error"));

        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(404);
        expect(data).toEqual({message: "error"})
    })
    it("[HEAD] returns 501", async () => {
        const req = createRequest({
            method: "HEAD",
            query: {
            },
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return adminSession;
        })
        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(501);
        expect(data).toEqual({message: "Not implemented"});
    })
    it("[DELETE] returns 501", async () => {
        const req = createRequest({
            method: "DELETE",
            query: {
            },
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return adminSession;
        })
        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(501);
        expect(data).toEqual({message: "Not implemented"});
    })
    it("[PUT] returns 501", async () => {
        const req = createRequest({
            method: "PUT",
            query: {
            },
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return adminSession;
        })
        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(501);
        expect(data).toEqual({message: "Not implemented"});
    })
    it("[PATCH] returns 501", async () => {
        const req = createRequest({
            method: "PATCH",
            query: {
            },
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return adminSession;
        })
        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(501);
        expect(data).toEqual({message: "Not implemented"});
    })
})