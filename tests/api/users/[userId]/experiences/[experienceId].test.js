import handler from '../../../../../pages/api/users/[userId]/experiences/[experienceId]'
import {prismaMock} from '../../../../../lib/singleton'
import {createRequest, createResponse} from "node-mocks-http";
import * as nextAuthReact from 'next-auth/react';
import {
    ownUserSession,
    superadminSession,
    adminSession,
    unauthorizedSession,
    experienceOne, updatedExperience
} from "../../../../../lib/testVariables";

jest.mock('next-auth/react');
const nextAuthReactMocked = nextAuthReact

describe("/api/users/[userId]/experiences/[experienceId]", () => {
    nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return {data: null, status: 'loading'};
        }
    );
    it("[GET] returns specific experience", async () => {
        const req = createRequest({
            method: "GET",
            query: {
                userId: "testid",
                experienceId: "experienceid1"
            }
        })
        const res = createResponse();

        jest.spyOn(prismaMock.experience, 'findUnique').mockResolvedValue(experienceOne);
        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(200);
        expect(data).toEqual({
            id: "experienceid1",
            name: "Frontend Developer",
            dateBegin: "2023-08-31T00:00:00.000Z",
            dateFinish: "2023-08-31T00:00:00.000Z",
            companyName: "companyone",
            description: "description",
            userId: "usertest"
        });
    })
    it("[GET] returns 404", async () => {
        const req = createRequest({
            method: "GET",
            query: {
                userId: "testid",
                experienceId: "experienceid1"
            }
        })
        const res = createResponse();
        jest.spyOn(prismaMock.experience, 'findUnique').mockResolvedValue(null);
        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(404);
        expect(data).toEqual({message: "Not found"});
    })
    it("[DELETE] unauthorized", async () => {
        const req = createRequest({
            method: "DELETE",
            query: {
                userId: "testid",
                experienceId: "experienceid1"
            }
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
    it("[DELETE] returns 200 if own experience", async () => {
        const req = createRequest({
            method: "DELETE",
            query: {
                userId: "testid",
                experienceId: "experienceid1"
            }
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return ownUserSession;
        })
        jest.spyOn(prismaMock.experience, 'delete').mockResolvedValue(experienceOne);
        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(200);
        expect(data).toEqual({message: "Successfully deleted!"});
    })
    it("[DELETE] returns 200 if not own experience but admin", async () => {
        const req = createRequest({
            method: "DELETE",
            query: {
                userId: "otherid",
                experienceId: "experienceid1"
            }
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return adminSession;
        })
        jest.spyOn(prismaMock.experience, 'delete').mockResolvedValue(experienceOne);
        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(200);
        expect(data).toEqual({message: "Successfully deleted!"});
    })
    it("[DELETE] returns 200 if not own experience but superadmin", async () => {
        const req = createRequest({
            method: "DELETE",
            query: {
                userId: "otherid",
                experienceId: "experienceid1"
            }
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return superadminSession;
        })
        jest.spyOn(prismaMock.experience, 'delete').mockResolvedValue(experienceOne);
        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(200);
        expect(data).toEqual({message: "Successfully deleted!"});
    })
    it("[DELETE] returns 404 catch error", async () => {
        const req = createRequest({
            method: "DELETE",
            query: {
                userId: "otherid",
                experienceId: "experienceid1"
            }
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return superadminSession;
        })
        jest.spyOn(prismaMock.experience, 'delete').mockRejectedValue(new Error("error"));
        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(404);
        expect(data).toEqual({message: "Not Found"});
    })
    it("[PUT] returns updated experience if own profile", async () => {
        const req = createRequest({
            method: "PUT",
            query: {
                userId: "testid",
                experienceId: "experienceid1"
            },
            body: {
                name: "Engineer",
                dateBegin: "2023-08-31T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                companyName: "Tesla",
                description: "Has been quite challenging...",
            }
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return ownUserSession;
        })
        jest.spyOn(prismaMock.experience, 'update').mockResolvedValue(updatedExperience);
        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(200);
        expect(data).toEqual({
            message: "Successfully updated",
            experience: {
                id: "experienceid1",
                name: "Frontend Developer",
                dateBegin: "2023-08-31T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                companyName: "NASA",
                description: "description",
                userId: "usertest"
            }
        });
    })
    it("[PUT] returns updated experience if not own profile but admin", async () => {
        const req = createRequest({
            method: "PUT",
            query: {
                userId: "testid",
                experienceId: "experienceid1"
            },
            body: {
                name: "Engineer",
                dateBegin: "2023-08-31T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                companyName: "Tesla",
                description: "Has been quite challenging...",
            }
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return adminSession;
        })
        jest.spyOn(prismaMock.experience, 'update').mockResolvedValue(updatedExperience);
        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(200);
        expect(data).toEqual({
            message: "Successfully updated",
            experience: {
                id: "experienceid1",
                name: "Frontend Developer",
                dateBegin: "2023-08-31T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                companyName: "NASA",
                description: "description",
                userId: "usertest"
            }
        });
    })
    it("[PUT] returns updated experience if not own profile but superadmin", async () => {
        const req = createRequest({
            method: "PUT",
            query: {
                userId: "testid",
                experienceId: "experienceid1"
            },
            body: {
                name: "Engineer",
                dateBegin: "2023-08-31T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                companyName: "Tesla",
                description: "Has been quite challenging...",
            }
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return superadminSession;
        })
        jest.spyOn(prismaMock.experience, 'update').mockResolvedValue(updatedExperience);
        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(200);
        expect(data).toEqual({
            message: "Successfully updated",
            experience: {
                id: "experienceid1",
                name: "Frontend Developer",
                dateBegin: "2023-08-31T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                companyName: "NASA",
                description: "description",
                userId: "usertest"
            }
        });
    })
    it("[PUT] returns 404", async () => {
        const req = createRequest({
            method: "PUT",
            query: {
                userId: "testid",
                experienceId: "experienceid1"
            },
            body: {
                name: "Frontend Developer",
                dateBegin: "2023-08-31T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                companyName: "NASA",
                description: "description",
            }
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return ownUserSession;
        })
        jest.spyOn(prismaMock.experience, 'update').mockResolvedValue(null);
        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(404);
        expect(data).toEqual({message: "Not found"});
    })
    it("[POST] returns 501", async () => {
        const req = createRequest({
            method: "POST",
            query: {
                userId: "testid",
                experienceId: "experienceid1"
            },
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return ownUserSession;
        })
        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(501);
        expect(data).toEqual({message: "Not implemented"});
    })
    it("[HEAD] returns 501", async () => {
        const req = createRequest({
            method: "HEAD",
            query: {
                userId: "testid",
                experienceId: "experienceid1"
            },
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return ownUserSession;
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
                userId: "testid",
                experienceId: "experienceid1"
            },
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return ownUserSession;
        })
        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(501);
        expect(data).toEqual({message: "Not implemented"});
    })
})