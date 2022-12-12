const request = require("supertest");
const baseURL = "http://localhost:8888/api";

describe("GET /animals", () => {
    it("should return 200", async () => {
        const response = await request(baseURL).get("/animals");
        expect(response.statusCode).toBe(200);
    });
    it("should return animals", async () => {
        const response = await request(baseURL).get("/animals");
        expect(response.body.length >= 1).toBe(true);
    });
});
