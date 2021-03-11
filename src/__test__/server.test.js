const request = require("supertest");
const app = require("../server/server.js");

describe("Test the root path", () => {
    test("It should response the GET method", async() => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
    });
});

//resource https://zellwk.com/blog/endpoint-testing/