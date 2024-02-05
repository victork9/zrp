const request = require("supertest");
const { server } = require("./index");
require("dotenv").config();

describe("Should teste Endpoints", () => {
    it("should get success", async () => {
        const res = await request(server).get("/ditto");
        expect(res.statusCode).toEqual(200);
    });
});
