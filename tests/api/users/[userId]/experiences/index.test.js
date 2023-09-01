import handler from '../../../../../pages/api/users/[userId]/experiences/index'
import {prismaMock} from '../../../../../lib/singleton'
import {createRequest, createResponse} from "node-mocks-http";
import * as nextAuthReact from 'next-auth/react';
import {
    ownUserSession,
    superadminSession,
    adminSession,
    unauthorizedSession,
    experienceOne,
    experienceTwo
} from "../../../../../lib/testVariables";

jest.mock('next-auth/react');
const nextAuthReactMocked = nextAuthReact

describe("/api/users/[userId]/experiences/", () => {
    nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return {data: null, status: 'loading'};
        }
    );
    it('[GET] returns experiences of a specific user', async () => {
        const req = createRequest({
            method: 'GET',
        });
        const res = createResponse();
        jest.spyOn(prismaMock.experience, 'findMany').mockResolvedValue(
            [experienceOne, experienceTwo]);

        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(200);
        expect(data).toEqual([
            {
                id: "experienceid1",
                name: "Frontend Developer",
                dateBegin: "2023-08-31T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                companyName: "companyone",
                description: "description",
                userId: "usertest"
            },
            {
                id: "experienceid2",
                name: "Backend Developer",
                dateBegin: "2023-08-11T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                companyName: "companytwo",
                description: "description",
                userId: "usertest"
            }
        ]);
    })
    it('[GET] returns 404 error', async () => {
        const req = createRequest({
            method: 'GET',
        });
        const res = createResponse();
        jest.spyOn(prismaMock.experience, 'findMany').mockResolvedValue(null);

        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(404);
        expect(data).toEqual({message: "Not found"});
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
    it('[POST] returns new experience if own profile', async () => {
        const req = createRequest({
            method: 'POST',
            query: {
                userId: "testid"
            },
            body: {
                name: "Engineer",
                dateBegin: "2023-08-31T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                companyName: "Tesla",
                description: "Has been quite challenging...",
                userId: "testid"
            }
        });
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return ownUserSession;
        })
        jest.spyOn(prismaMock.experience, 'create').mockResolvedValue({
            id: 'newexperience',
            name: "Engineer",
            dateBegin: "2023-08-31T00:00:00.000Z",
            dateFinish: "2023-08-31T00:00:00.000Z",
            companyName: "Tesla",
            description: "Has been quite challenging...",
            userId: "testid"
        });

        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(201);
        expect(data).toEqual({
            message: "Created Successfully!", experience: {
                id: 'newexperience',
                name: "Engineer",
                dateBegin: "2023-08-31T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                companyName: "Tesla",
                description: "Has been quite challenging...",
                userId: "testid"
            }
        })
    })
    it('[POST] returns new experience if not own profile and admin', async () => {
        const req = createRequest({
            method: 'POST',
            query: {
                userId: "testid"
            },
            body: {
                name: "Engineer",
                dateBegin: "2023-08-31T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                companyName: "Tesla",
                description: "Has been quite challenging...",
                userId: "testid"
            }
        });
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return adminSession;
        })
        jest.spyOn(prismaMock.experience, 'create').mockResolvedValue({
            id: 'newexperience',
            name: "Engineer",
            dateBegin: "2023-08-31T00:00:00.000Z",
            dateFinish: "2023-08-31T00:00:00.000Z",
            companyName: "Tesla",
            description: "Has been quite challenging...",
            userId: "testid"
        });

        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(201);
        expect(data).toEqual({
            message: "Created Successfully!", experience: {
                id: 'newexperience',
                name: "Engineer",
                dateBegin: "2023-08-31T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                companyName: "Tesla",
                description: "Has been quite challenging...",
                userId: "testid"
            }
        })
    })
    it('[POST] returns new experience if not own profile and superadmin', async () => {
        const req = createRequest({
            method: 'POST',
            query: {
                userId: "testid"
            },
            body: {
                name: "Engineer",
                dateBegin: "2023-08-31T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                companyName: "Tesla",
                description: "Has been quite challenging...",
                userId: "testid"
            }
        });
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return superadminSession;
        })
        jest.spyOn(prismaMock.experience, 'create').mockResolvedValue({
            id: 'newexperience',
            name: "Engineer",
            dateBegin: "2023-08-31T00:00:00.000Z",
            dateFinish: "2023-08-31T00:00:00.000Z",
            companyName: "Tesla",
            description: "Has been quite challenging...",
            userId: "testid"
        });

        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(201);
        expect(data).toEqual({
            message: "Created Successfully!", experience: {
                id: 'newexperience',
                name: "Engineer",
                dateBegin: "2023-08-31T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                companyName: "Tesla",
                description: "Has been quite challenging...",
                userId: "testid"
            }
        })
    })
    it('[POST] returns 404 error no name passed', async () => {
        const req = createRequest({
            method: 'POST',
            query: {
                userId: "testid"
            },
            body: {
                dateBegin: "2023-08-31T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                companyName: "Tesla",
                description: "Has been quite challenging...",
                userId: "testid"
            }
        });
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return ownUserSession;
        })
        jest.spyOn(prismaMock.experience, 'create').mockResolvedValue(null);

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
                userId: "testid"
            },
            body: {
                name: "Engineer",
                dateBegin: "2023-08-31T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                companyName: "Tesla",
                description: "Has been quite challenging...",
                userId: "testid"
            }
        });
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return ownUserSession;
        })
        jest.spyOn(prismaMock.experience, 'create').mockRejectedValue(new Error("error - uncaughtException: Error [ERR_STREAM_WRITE_AFTER_END]: write after end\n" +
            "at new NodeError (node:internal/errors:387:5)\nat ServerResponse.end (node:_http_outgoing:968:15)\n" +
            "at ServerResponse.end (/usr/src/app/node_modules/next/dist/compiled/compression/index.js:22:782)\n" +
            "at ServerResponse.apiRes.end (/usr/src/app/node_modules/next/dist/server/api-utils/node.js:159:25)\n" +
            "at NodeNextResponse.send (/usr/src/app/node_modules/next/dist/server/base-http/node.js:92:19)\n" +
            "at DevServer.run (/usr/src/app/node_modules/next/dist/server/dev/next-dev-server.js:543:51)\n" +
            "at async DevServer.handleRequest (/usr/src/app/node_modules/next/dist/server/base-server.js:317:20) {\n" +
            "code: 'ERR_STREAM_WRITE_AFTER_END'\n}"));

        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(404);
        expect(data).toEqual("error - uncaughtException: Error [ERR_STREAM_WRITE_AFTER_END]: write after end\n" +
            "at new NodeError (node:internal/errors:387:5)\nat ServerResponse.end (node:_http_outgoing:968:15)\n" +
            "at ServerResponse.end (/usr/src/app/node_modules/next/dist/compiled/compression/index.js:22:782)\n" +
            "at ServerResponse.apiRes.end (/usr/src/app/node_modules/next/dist/server/api-utils/node.js:159:25)\n" +
            "at NodeNextResponse.send (/usr/src/app/node_modules/next/dist/server/base-http/node.js:92:19)\n" +
            "at DevServer.run (/usr/src/app/node_modules/next/dist/server/dev/next-dev-server.js:543:51)\n" +
            "at async DevServer.handleRequest (/usr/src/app/node_modules/next/dist/server/base-server.js:317:20) {\n" +
            "code: 'ERR_STREAM_WRITE_AFTER_END'\n}")
    })
})