import handler from '../../../../../pages/api/users/[userId]/educations/index'
import {prismaMock} from '../../../../../lib/singleton'
import {createRequest, createResponse} from "node-mocks-http";
import * as nextAuthReact from 'next-auth/react';
import {
    ownUserSession,
    superadminSession,
    adminSession,
    unauthorizedSession,
    educationOne,
    educationTwo
} from "../../../../../lib/testVariables";

jest.mock('next-auth/react');
const nextAuthReactMocked = nextAuthReact

describe("/api/users/[userId]/educations", () => {
    nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return {data: null, status: 'loading'};
        }
    );
    it('[GET] returns educations of a specific user', async () => {
        const req = createRequest({
            method: 'GET',
        });
        const res = createResponse();
        jest.spyOn(prismaMock.education, 'findMany').mockResolvedValue(
            [educationOne, educationTwo]);

        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();

        expect(statusCode).toBe(200);
        expect(data).toEqual([
            {
                id: "educationid1",
                name: "Master degree",
                dateBegin: "2023-08-31T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                schoolName: "schoolone",
                description: "description",
                userId: "usertest"
            },
            {
                id: "educationid2",
                name: "PHD",
                dateBegin: "2023-08-11T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                schoolName: "schooltwo",
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
        jest.spyOn(prismaMock.education, 'findMany').mockResolvedValue(null);

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
    it('[POST] returns new education if own profile', async () => {
        const req = createRequest({
            method: 'POST',
            query: {
                userId: "testid"
            },
            body: {
                name: "bachelor degree computer science",
                dateBegin: "2023-08-31T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                schoolName: "Harvard",
                description: "Have learned a lot ! ✔️",
                userId: "testid"
            }
        });
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return ownUserSession;
        })
        jest.spyOn(prismaMock.education, 'create').mockResolvedValue({
            id: 'cllz37t0c03070jpdeu47eruo',
            name: "bachelor degree computer science",
            dateBegin: "2023-08-31T00:00:00.000Z",
            dateFinish: "2023-08-31T00:00:00.000Z",
            schoolName: "Harvard",
            description: "Have learned a lot ! ✔️",
            userId: "testid"
        });

        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(201);
        expect(data).toEqual({
            message: "Created Successfully!", education: {
                id: 'cllz37t0c03070jpdeu47eruo',
                name: "bachelor degree computer science",
                dateBegin: "2023-08-31T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                schoolName: "Harvard",
                description: "Have learned a lot ! ✔️",
                userId: "testid"
            }
        })
    })
    it('[POST] returns new education if not own profile and admin', async () => {
        const req = createRequest({
            method: 'POST',
            query: {
                userId: "testid"
            },
            body: {
                name: "bachelor degree computer science",
                dateBegin: "2023-08-31T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                schoolName: "Harvard",
                description: "Have learned a lot ! ✔️",
                userId: "testid"
            }
        });
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return adminSession;
        })
        jest.spyOn(prismaMock.education, 'create').mockResolvedValue({
            id: 'cllz37t0c03070jpdeu47eruo',
            name: "bachelor degree computer science",
            dateBegin: "2023-08-31T00:00:00.000Z",
            dateFinish: "2023-08-31T00:00:00.000Z",
            schoolName: "Harvard",
            description: "Have learned a lot ! ✔️",
            userId: "testid"
        });

        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(201);
        expect(data).toEqual({
            message: "Created Successfully!", education: {
                id: 'cllz37t0c03070jpdeu47eruo',
                name: "bachelor degree computer science",
                dateBegin: "2023-08-31T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                schoolName: "Harvard",
                description: "Have learned a lot ! ✔️",
                userId: "testid"
            }
        })
    })
    it('[POST] returns new education if not own profile and superadmin', async () => {
        const req = createRequest({
            method: 'POST',
            query: {
                userId: "testid"
            },
            body: {
                name: "bachelor degree computer science",
                dateBegin: "2023-08-31T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                schoolName: "Harvard",
                description: "Have learned a lot ! ✔️",
                userId: "testid"
            }
        });
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return superadminSession;
        })
        jest.spyOn(prismaMock.education, 'create').mockResolvedValue({
            id: 'cllz37t0c03070jpdeu47eruo',
            name: "bachelor degree computer science",
            dateBegin: "2023-08-31T00:00:00.000Z",
            dateFinish: "2023-08-31T00:00:00.000Z",
            schoolName: "Harvard",
            description: "Have learned a lot ! ✔️",
            userId: "testid"
        });

        await handler(req, res);

        const data = res._getJSONData();
        const statusCode = res._getStatusCode();
        expect(statusCode).toBe(201);
        expect(data).toEqual({
            message: "Created Successfully!", education: {
                id: 'cllz37t0c03070jpdeu47eruo',
                name: "bachelor degree computer science",
                dateBegin: "2023-08-31T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                schoolName: "Harvard",
                description: "Have learned a lot ! ✔️",
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
                schoolName: "Harvard",
                description: "Have learned a lot ! ✔️",
                userId: "testid"
            }
        });
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return ownUserSession;
        })
        jest.spyOn(prismaMock.education, 'create').mockResolvedValue(null);

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
                dateBegin: "2023-08-31T00:00:00.000Z",
                dateFinish: "2023-08-31T00:00:00.000Z",
                schoolName: "Harvard",
                description: "Have learned a lot ! ✔️",
                userId: "testid"
            }
        });
        const res = createResponse();
        nextAuthReactMocked.getSession.mockImplementation((_options) => {
            return ownUserSession;
        })
        jest.spyOn(prismaMock.education, 'create').mockRejectedValue(new Error("error - uncaughtException: Error [ERR_STREAM_WRITE_AFTER_END]: write after end\n" +
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