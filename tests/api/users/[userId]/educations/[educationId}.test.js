import handler from '../../../../../pages/api/users/[userId]/educations/[educationId]'
import {prismaMock} from '../../../../../lib/singleton'
import {createRequest, createResponse} from "node-mocks-http";
import * as nextAuthReact from 'next-auth/react';
import {
    ownUserSession,
    superadminSession,
    adminSession,
    unauthorizedSession,
    educationOne, updatedEducation
} from "../../../../../lib/testVariables";

jest.mock('next-auth/react');
const nextAuthReactMocked = nextAuthReact

describe("/api/users/[userId]/educations/[educationId]", () => {
    nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return {data: null, status: 'loading'};
        }
    );
    it("[GET] returns specific education", async () => {
        const req = createRequest({
            method: "GET",
            query: {
                userId: "testid",
                educationId: "educationid1"
            }
        })
        const res = createResponse();

        jest.spyOn(prismaMock.education, 'findUnique').mockResolvedValue(educationOne);
        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(200);
        expect(data).toEqual({
            id: "educationid1",
            name: "Master degree",
            dateBegin: "2023-08-31T00:00:00.000Z",
            dateFinish: "2023-08-31T00:00:00.000Z",
            schoolName: "schoolone",
            description: "description",
            userId: "usertest"
        });
    })
    it("[GET] returns 404", async () => {
        const req = createRequest({
            method: "GET",
            query: {
                userId: "testid",
                educationId: "educationid1"
            }
        })
        const res = createResponse();
        jest.spyOn(prismaMock.education, 'findUnique').mockResolvedValue(null);
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
                educationId: "educationid1"
            }
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return unauthorizedSession;
        })
        //jest.spyOn(prismaMock.education, 'delete').mockResolvedValue(null);
        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(401);
        expect(data).toEqual({message: "Unauthorized"});
    })
    it("[DELETE] returns 200 if own education", async () => {
        const req = createRequest({
            method: "DELETE",
            query: {
                userId: "testid",
                educationId: "educationid1"
            }
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return ownUserSession;
        })
        jest.spyOn(prismaMock.education, 'delete').mockResolvedValue(educationOne);
        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(200);
        expect(data).toEqual({message: "Successfully deleted!"});
    })
    it("[DELETE] returns 200 if not own education but admin", async () => {
        const req = createRequest({
            method: "DELETE",
            query: {
                userId: "otherid",
                educationId: "educationid1"
            }
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return adminSession;
        })
        jest.spyOn(prismaMock.education, 'delete').mockResolvedValue(educationOne);
        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(200);
        expect(data).toEqual({message: "Successfully deleted!"});
    })
    it("[DELETE] returns 200 if not own education but superadmin", async () => {
        const req = createRequest({
            method: "DELETE",
            query: {
                userId: "otherid",
                educationId: "educationid1"
            }
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return superadminSession;
        })
        jest.spyOn(prismaMock.education, 'delete').mockResolvedValue(educationOne);
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
                educationId: "educationid1"
            }
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return superadminSession;
        })
        jest.spyOn(prismaMock.education, 'delete').mockRejectedValue(new Error("error"));
        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(404);
        expect(data).toEqual({message: "Not Found"});
    })
    it("[PUT] returns updated education if own profile", async () => {
        const req = createRequest({
            method: "PUT",
            query: {
                userId: "testid",
                educationId: "educationid1"
            },
            body: {
                name: "education",
                description: "description",
                dateBegin: "2023-08-31T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                schoolName: "etna"
            }
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return ownUserSession;
        })
        jest.spyOn(prismaMock.education, 'update').mockResolvedValue(updatedEducation);
        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(200);
        expect(data).toEqual({
            message: "Successfully updated",
            education: {
                id: "educationid1",
                name: "education",
                dateBegin: "2023-08-31T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                schoolName: "etna",
                description: "description",
                userId: "usertest"
            }
        });
    })
    it("[PUT] returns updated education if not own profile but admin", async () => {
        const req = createRequest({
            method: "PUT",
            query: {
                userId: "otherid",
                educationId: "educationid1"
            },
            body: {
                name: "education",
                description: "description",
                dateBegin: "2023-08-31T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                schoolName: "etna"
            }
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return adminSession;
        })
        jest.spyOn(prismaMock.education, 'update').mockResolvedValue(updatedEducation);
        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(200);
        expect(data).toEqual({
            message: "Successfully updated",
            education: {
                id: "educationid1",
                name: "education",
                dateBegin: "2023-08-31T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                schoolName: "etna",
                description: "description",
                userId: "usertest"
            }
        });
    })
    it("[PUT] returns updated education if not own profile but superadmin", async () => {
        const req = createRequest({
            method: "PUT",
            query: {
                userId: "otherid",
                educationId: "educationid1"
            },
            body: {
                name: "education",
                description: "description",
                dateBegin: "2023-08-31T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                schoolName: "etna"
            }
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return superadminSession;
        })
        jest.spyOn(prismaMock.education, 'update').mockResolvedValue(updatedEducation);
        await handler(req, res);
        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(200);
        expect(data).toEqual({
            message: "Successfully updated",
            education: {
                id: "educationid1",
                name: "education",
                dateBegin: "2023-08-31T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                schoolName: "etna",
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
                educationId: "educationid1"
            },
            body: {
                name: "education",
                description: "description",
                dateBegin: "2023-08-31T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                schoolName: "etna"
            }
        })
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return ownUserSession;
        })
        jest.spyOn(prismaMock.education, 'update').mockResolvedValue(null);
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
                educationId: "educationid1"
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
                educationId: "educationid1"
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
                educationId: "educationid1"
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