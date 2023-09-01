import handler from '../../../../../pages/api/challenges/[challengeId]/steps/[stepId]'
import {prismaMock} from '../../../../../lib/singleton'
import {createRequest, createResponse} from "node-mocks-http";
import * as nextAuthReact from 'next-auth/react';
import {
    superadminSession,
    adminSession,
    unauthorizedSession,
    stepOne, updatedStep
} from "../../../../../lib/testVariables";

jest.mock('next-auth/react');
const nextAuthReactMocked = nextAuthReact

describe("/api/challenges/[challengeId]/steps/[stepId]", () => {
    nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return {data: null, status: 'loading'};
        }
    );
    it("[GET] returns specific step", async () => {
        const req = createRequest({
            method: "GET",
            query: {
                challengeId: "challengeone",
                stepId: "stepone"
            }
        })
        const res = createResponse();
        jest.spyOn(prismaMock.step, 'findUnique').mockResolvedValue(stepOne);
        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(200);
        expect(data).toEqual({
            id: "stepone",
            challengeId: "challengeone",
            name: "Planifier à quoi va ressembler votre jeu",
            description: "Démarrer par ça puis fait ça ensuite ..."
        })
    })
    it("[GET] returns 404 error", async () => {
        const req = createRequest({
            method: "GET",
            query: {
                challengeId: "challengeone",
                stepId: "stepone"
            }
        })
        const res = createResponse();
        jest.spyOn(prismaMock.step, 'findUnique').mockResolvedValue(null);
        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(404);
        expect(data).toEqual({message: "Not found"})
    })
    it('[DELETE] unauthorized user', async () => {
        const req = createRequest({
            method: 'DELETE',
            query: {
                challengeId: "challengeone",
                stepId: "stepone"
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
    it('[DELETE] delete step if admin', async () => {
        const req = createRequest({
            method: 'DELETE',
            query: {
                challengeId: "challengeone",
                stepId: "stepone"
            },
        });
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return adminSession;
        })
        jest.spyOn(prismaMock.step, 'delete').mockResolvedValue(stepOne);

        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(200);
        expect(data).toEqual({message: "Successfully deleted!"})
    })
    it('[DELETE] delete step if superadmin', async () => {
        const req = createRequest({
            method: 'DELETE',
            query: {
                challengeId: "challengeone",
                stepId: "stepone"
            },
        });
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return superadminSession;
        })
        jest.spyOn(prismaMock.step, 'delete').mockResolvedValue(stepOne);

        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(200);
        expect(data).toEqual({message: "Successfully deleted!"})
    })
    it('[DELETE] returns 404 error catch error', async () => {
        const req = createRequest({
            method: 'DELETE',
            query: {
                challengeId: "challengeone",
                stepId: "stepone"
            },
            body: {}
        });
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return adminSession;
        })
        jest.spyOn(prismaMock.step, 'delete').mockRejectedValue(new Error("Error"));

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
                challengeId: "challengeone",
                stepId: "stepone"
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
                challengeId: "challengeone",
                stepId: "stepone"
            },
            body: {
                challengeId: "challengeone",
                name: "Planifier à quoi va ressembler votre application",
            }
        });
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return adminSession;
        })
        jest.spyOn(prismaMock.step, 'update').mockResolvedValue(updatedStep);

        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(200);
        expect(data).toEqual({
            message: "Successfully updated",
            step: {
                id: "stepone",
                challengeId: "challengeone",
                name: "Planifier à quoi va ressembler votre application",
                description: "Démarrer par ça puis fait ça ensuite ..."
            }
        })
    })
    it('[PUT] modify challenge if superadmin', async () => {
        const req = createRequest({
            method: 'PUT',
            query: {
                challengeId: "challengeone",
                stepId: "stepone"
            },
            body: {
                challengeId: "challengeone",
                name: "Planifier à quoi va ressembler votre application",
            }
        });
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return superadminSession;
        })
        jest.spyOn(prismaMock.step, 'update').mockResolvedValue(updatedStep);

        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(200);
        expect(data).toEqual({
            message: "Successfully updated",
            step: {
                id: "stepone",
                challengeId: "challengeone",
                name: "Planifier à quoi va ressembler votre application",
                description: "Démarrer par ça puis fait ça ensuite ..."
            }
        })
    })
    it('[PUT] returns 404 error result is null', async () => {
        const req = createRequest({
            method: 'PUT',
            query: {
                challengeId: "challengeone",
                stepId: stepOne
            },
            body: {
                name: "Faire une calculatrice en Python"
            }
        });
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return adminSession;
        })
        jest.spyOn(prismaMock.step, 'update').mockResolvedValue(null);

        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(404);
        expect(data).toEqual({message: "Not found"})
    })
})