import handler from '../../../../../pages/api/challenges/[challengeId]/steps/index'
import {prismaMock} from '../../../../../lib/singleton'
import {createRequest, createResponse} from "node-mocks-http";
import * as nextAuthReact from 'next-auth/react';
import {
    superadminSession,
    adminSession,
    unauthorizedSession,
    stepOne, stepTwo
} from "../../../../../lib/testVariables";

jest.mock('next-auth/react');
const nextAuthReactMocked = nextAuthReact

describe("/api/challenges/[challengeId]/steps", () => {
    nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return {data: null, status: 'loading'};
        }
    );
    it("[GET] returns all steps of a challenge", async () => {
        const req = createRequest({
            method: "GET",
            query: {
                challengeId: "challengeone"
            }
        })
        const res = createResponse();
        jest.spyOn(prismaMock.step, 'findMany').mockResolvedValue(
            [stepOne, stepTwo]);
        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(200);
        expect(data).toEqual([
            {
                id: "stepone",
                challengeId: "challengeone",
                name: "Planifier à quoi va ressembler votre jeu",
                description: "Démarrer par ça puis fait ça ensuite ..."
            },
            {
                id: "steptwo",
                challengeId: "challengeone",
                name: "Créer un input en HTML",
                description: "Ajouter un input pour l'ecran de la calculatrice"
            }
        ])
    })
    it("[GET] returns 404", async () => {
        const req = createRequest({
            method: "GET",
            query: {
                challengeId: "challengeone"
            }
        })
        const res = createResponse();
        jest.spyOn(prismaMock.step, 'findMany').mockResolvedValue(null);
        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(404);
        expect(data).toEqual({message: "Not found"})
    })
    it('[POST] unauthorized user', async () => {
        const req = createRequest({
            method: 'POST',
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
    it('[POST] post step if admin', async () => {
        const req = createRequest({
            method: 'POST',
            query: {
                challengeId: "challengeone"
            },
        });
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return adminSession;
        })
        jest.spyOn(prismaMock.step, 'create').mockResolvedValue(stepOne);

        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(201);
        expect(data).toEqual({
            message: "Created Successfully!",
            step: {
                id: "stepone",
                challengeId: "challengeone",
                name: "Planifier à quoi va ressembler votre jeu",
                description: "Démarrer par ça puis fait ça ensuite ..."
            }
        })
    })
    it('[POST] post step if superadmin', async () => {
        const req = createRequest({
            method: 'POST',
            query: {
                challengeId: "challengeone"
            },
        });
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return superadminSession;
        })
        jest.spyOn(prismaMock.step, 'create').mockResolvedValue(stepOne);

        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(201);
        expect(data).toEqual({
            message: "Created Successfully!",
            step: {
                id: "stepone",
                challengeId: "challengeone",
                name: "Planifier à quoi va ressembler votre jeu",
                description: "Démarrer par ça puis fait ça ensuite ..."
            }
        })
    })
    it("[POST] returns 404 error result is null", async () => {
        const req = createRequest({
            method: 'POST',
            query: {
                challengeId: "challengeone"
            },
        });
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return superadminSession;
        })
        jest.spyOn(prismaMock.step, 'create').mockResolvedValue(null);

        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(404);
        expect(data).toEqual({message: "Error"})
    })
    it("[POST] returns 404 error catch error", async () => {
        const req = createRequest({
            method: 'POST',
            query: {
                challengeId: "challengeone"
            },
        });
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return superadminSession;
        })
        jest.spyOn(prismaMock.step, 'create').mockRejectedValue(new Error("Error"));

        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(404);
        expect(data).toEqual({message: "Error"})
    })
})