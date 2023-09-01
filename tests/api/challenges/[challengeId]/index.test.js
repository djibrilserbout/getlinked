import handler from '../../../../pages/api/challenges/[challengeId]/index'
import {prismaMock} from '../../../../lib/singleton'
import {createRequest, createResponse} from "node-mocks-http";
import * as nextAuthReact from 'next-auth/react';
import {
    superadminSession,
    adminSession,
    unauthorizedSession,
    challengeOne,
    updatedChallenge
} from "../../../../lib/testVariables";

jest.mock('next-auth/react');
const nextAuthReactMocked = nextAuthReact

describe("/api/challenges/[challengeId]", () => {
    nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return {data: null, status: 'loading'};
        }
    );
    it("[GET] returns a challenge", async () => {
        const req = createRequest({
            method: "GET",
            query: {
                challengeId: "challengeone"
            }
        });
        const res = createResponse();
        jest.spyOn(prismaMock.challenge, "findUnique").mockResolvedValue(challengeOne)
        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(200);
        expect(data).toEqual({
            id: "challengeone",
            name: "Faire une calculatrice en JS"
        });
    })
    it('[GET] returns 404 error', async () => {
        const req = createRequest({
            method: 'GET',
            query: {
                challengeId: "challengeone"
            }
        });
        const res = createResponse();
        jest.spyOn(prismaMock.challenge, 'findUnique').mockResolvedValue(null);

        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(404);
        expect(data).toEqual({message: "Not found"});
    })
    it('[DELETE] unauthorized user', async () => {
        const req = createRequest({
            method: 'DELETE',
            query: {
                challengeId: "challengeone"
            }
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
    it('[DELETE] delete challenge if admin', async () => {
        const req = createRequest({
            method: 'DELETE',
            query: {
                challengeId: "challengeone"
            },
        });
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return adminSession;
        })
        jest.spyOn(prismaMock.challenge, 'delete').mockResolvedValue(challengeOne);

        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(200);
        expect(data).toEqual({message: "Successfully deleted!"})
    })
    it('[DELETE] delete challenge if superadmin', async () => {
        const req = createRequest({
            method: 'DELETE',
            query: {
                challengeId: "challengeone"
            },
        });
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return superadminSession;
        })
        jest.spyOn(prismaMock.challenge, 'delete').mockResolvedValue(challengeOne);

        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(200);
        expect(data).toEqual({message: "Successfully deleted!"})
    })
    it('[DELETE] returns 404 error result is null', async () => {
        const req = createRequest({
            method: 'DELETE',
            query: {
                challengeId: "challengeone"
            },
            body: {}
        });
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return adminSession;
        })
        jest.spyOn(prismaMock.challenge, 'delete').mockResolvedValue(null);

        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(404);
        expect(data).toEqual({message: "Error"})
    })
    it('[DELETE] returns 404 error catch error', async () => {
        const req = createRequest({
            method: 'DELETE',
            query: {
                challengeId: "challengeone"
            },
            body: {}
        });
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return adminSession;
        })
        jest.spyOn(prismaMock.challenge, 'delete').mockRejectedValue(new Error("Error"));

        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(404);
        expect(data).toEqual({message: "Error"})
    })
    it('[PUT] unauthorized user', async () => {
        const req = createRequest({
            method: 'PUT',
            query: {
                challengeId: "challengeone"
            }
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
    it('[PUT] modify challenge if admin', async () => {
        const req = createRequest({
            method: 'PUT',
            query: {
                challengeId: "challengeone"
            },
            body: {
                name: "Faire une calculatrice en Python"
            }
        });
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return adminSession;
        })
        jest.spyOn(prismaMock.challenge, 'update').mockResolvedValue(updatedChallenge);

        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(200);
        expect(data).toEqual({
            message: "Successfully updated",
            challenge: {
                id: "challengeone",
                name: "Faire une calculatrice en Python"
            }
        })
    })
    it('[PUT] modify challenge if superadmin', async () => {
        const req = createRequest({
            method: 'PUT',
            query: {
                challengeId: "challengeone"
            },
            body: {
                name: "Faire une calculatrice en Python"
            }
        });
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return superadminSession;
        })
        jest.spyOn(prismaMock.challenge, 'update').mockResolvedValue(updatedChallenge);

        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(200);
        expect(data).toEqual({
            message: "Successfully updated",
            challenge: {
                id: "challengeone",
                name: "Faire une calculatrice en Python"
            }
        })
    })
    it('[PUT] returns 404 error result is null', async () => {
        const req = createRequest({
            method: 'PUT',
            query: {
                challengeId: "challengeone"
            },
            body: {
                name: "Faire une calculatrice en Python"
            }
        });
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return adminSession;
        })
        jest.spyOn(prismaMock.challenge, 'update').mockResolvedValue(null);

        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(404);
        expect(data).toEqual({message: "Not found"})
    })
    it('returns 501 error if HEAD method', async () => {
        const req = createRequest(({
            method: 'HEAD',
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
        }))
        const res = createResponse();
        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(501);
        expect(data).toEqual({"message": "Not implemented"})
    })
})